const db = require('../db');

/**
 * Find all campaigns
 */
exports.findAll = async ({ active }) => {
  let query = 'SELECT * FROM campaigns';
  const params = [];
  if (active) {
    query += ' WHERE end_date >= CURRENT_DATE';
  }
  query += ' ORDER BY created_at DESC';
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Find campaign by ID
 */
exports.findById = async (campaignId) => {
  const result = await db.query(
    `SELECT c.*, u.first_name || ' ' || u.last_name AS creator_name
     FROM campaigns c
     LEFT JOIN users u ON c.created_by = u.user_id
     WHERE c.campaign_id = $1`,
    [campaignId]
  );
  return result.rows[0];
};

/**
 * Create a campaign
 */
exports.create = async ({ title, description, goal, endDate, category, imageUrl, isPublic, createdBy }) => {
  const result = await db.query(
    `INSERT INTO campaigns (title, description, goal, end_date, category,
                             image_url, is_public, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [title, description, goal, endDate, category, imageUrl, isPublic, createdBy]
  );
  return result.rows[0];
};

/**
 * Update campaign
 */
exports.update = async (campaignId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE campaigns SET ${setClauses.join(', ')} WHERE campaign_id = $${paramIndex} RETURNING *`;
  params.push(campaignId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Delete campaign
 */
exports.delete = async (campaignId) => {
  await db.query('DELETE FROM campaigns WHERE campaign_id = $1', [campaignId]);
  return true;
};