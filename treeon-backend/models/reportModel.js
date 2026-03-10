const db = require('../db');

/**
 * Find death reports with optional status filter
 * @param {Object} options - { status }
 * @returns {Promise<Array>} list of reports
 */
exports.findDeathReports = async ({ status }) => {
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
 * Update a death report
 * @param {string} reportId - replacement_id
 * @param {Object} updates - fields to update
 * @returns {Promise<Object>} updated report
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