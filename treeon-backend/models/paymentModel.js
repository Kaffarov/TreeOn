const db = require('../db');

/**
 * Find all payments with optional filters
 */
exports.findAll = async ({ limit, offset, status }) => {
  let query = 'SELECT * FROM payments';
  const params = [];
  if (status) {
    query += ' WHERE status = $1';
    params.push(status);
  }
  query += ' ORDER BY payment_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(limit, offset);
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Find payment by ID
 */
exports.findById = async (paymentId) => {
  const result = await db.query('SELECT * FROM payments WHERE payment_id = $1', [paymentId]);
  return result.rows[0];
};

/**
 * Update payment status
 */
exports.update = async (paymentId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE payments SET ${setClauses.join(', ')} WHERE payment_id = $${paramIndex} RETURNING *`;
  params.push(paymentId);
  const result = await db.query(query, params);
  return result.rows[0];
};