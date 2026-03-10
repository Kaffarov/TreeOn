const db = require('../db');

/**
 * Find replacements by farmer
 */
exports.findByFarmer = async (farmerId) => {
  const result = await db.query(
    `SELECT r.*, t_orig.tree_id AS original_tree_id, t_new.tree_id AS new_tree_id
     FROM tree_replacements r
     LEFT JOIN trees t_orig ON r.original_tree_id = t_orig.tree_id
     LEFT JOIN trees t_new ON r.new_tree_id = t_new.tree_id
     WHERE t_orig.farmer_id = $1
     ORDER BY r.death_reported_date DESC`,
    [farmerId]
  );
  return result.rows;
};

/**
 * Find all replacements with optional status filter (admin)
 */
exports.findAll = async ({ status }) => {
  let query = 'SELECT * FROM tree_replacements';
  const params = [];
  if (status) {
    query += ' WHERE status = $1';
    params.push(status);
  }
  query += ' ORDER BY death_reported_date DESC';
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Find pending replacements for a farmer
 */
exports.findPendingByFarmer = async (farmerId) => {
  const result = await db.query(
    `SELECT r.*
     FROM tree_replacements r
     JOIN trees t ON r.original_tree_id = t.tree_id
     WHERE t.farmer_id = $1 AND r.status NOT IN ('completed', 'rejected')
     ORDER BY r.death_reported_date DESC`,
    [farmerId]
  );
  return result.rows;
};

/**
 * Create a death report (reported)
 */
exports.createReport = async ({ farmerId, treeId, reason, notes, reportedDate }) => {
  const result = await db.query(
    `INSERT INTO tree_replacements (original_tree_id, death_reported_date, death_reason, notes, status)
     VALUES ($1, $2, $3, $4, 'reported') RETURNING *`,
    [treeId, reportedDate, reason, notes]
  );
  return result.rows[0];
};

/**
 * Update death report (e.g., verify)
 */
exports.updateDeathReport = async (reportId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE tree_replacements SET ${setClauses.join(', ')} WHERE replacement_id = $${paramIndex} RETURNING *`;
  params.push(reportId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Process replacement (assign new tree)
 */
exports.process = async (repId, { newTreeId, status, replacementDate }) => {
  const result = await db.query(
    `UPDATE tree_replacements SET new_tree_id = $1, status = $2, replacement_date = $3
     WHERE replacement_id = $4 RETURNING *`,
    [newTreeId, status, replacementDate, repId]
  );
  return result.rows[0];
};