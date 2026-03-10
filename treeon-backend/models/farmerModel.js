const db = require('../db');

/**
 * Find farmer by ID
 */
exports.findById = async (farmerId) => {
  const result = await db.query(
    `SELECT f.*, u.first_name, u.last_name, u.email, u.phone
     FROM farmers f
     JOIN users u ON f.farmer_id = u.user_id
     WHERE f.farmer_id = $1`,
    [farmerId]
  );
  return result.rows[0];
};

/**
 * Create a farmer record (after user registration)
 */
exports.create = async ({ farmerId, landSize, village, district, region, country, joinDate }) => {
  const result = await db.query(
    `INSERT INTO farmers (farmer_id, land_size_hectares, village, district, region, country, joined_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [farmerId, landSize, village, district, region, country, joinDate]
  );
  return result.rows[0];
};

/**
 * Get farmer stats (trees, land, etc.)
 */
exports.getStats = async (farmerId) => {
  const result = await db.query(
    `SELECT
        COUNT(t.tree_id) AS total_trees,
        COUNT(CASE WHEN t.status = 'dead' THEN 1 END) AS dead_trees,
        COUNT(CASE WHEN t.status = 'replaced' THEN 1 END) AS replaced_trees,
        f.land_size_hectares,
        COALESCE(SUM(h.income_amount), 0) AS total_harvest_income
     FROM farmers f
     LEFT JOIN trees t ON f.farmer_id = t.farmer_id
     LEFT JOIN harvest_records h ON f.farmer_id = h.farmer_id
     WHERE f.farmer_id = $1
     GROUP BY f.land_size_hectares`,
    [farmerId]
  );
  return result.rows[0];
};

/**
 * Update farmer status (active/pending/rejected) – used by admin
 */
exports.updateStatus = async (farmerId, status) => {
  const result = await db.query(
    'UPDATE farmers SET is_active = $1 WHERE farmer_id = $2 RETURNING *',
    [status === 'active', farmerId]
  );
  return result.rows[0];
};

/**
 * Find pending farmers (where is_active = false)
 */
exports.findPending = async () => {
  const result = await db.query(
    `SELECT f.*, u.first_name, u.last_name, u.email
     FROM farmers f
     JOIN users u ON f.farmer_id = u.user_id
     WHERE f.is_active = false`
  );
  return result.rows;
};