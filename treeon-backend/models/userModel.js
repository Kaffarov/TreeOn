const db = require('../db');

/**
 * Find user by email
 */
exports.findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

/**
 * Find user by ID
 */
exports.findById = async (userId) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return result.rows[0];
};

/**
 * Create a new user
 */
exports.create = async ({ email, passwordHash, firstName, lastName, role }) => {
  const result = await db.query(
    `INSERT INTO users (email, password_hash, first_name, last_name, user_role)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [email, passwordHash, firstName, lastName, role]
  );
  return result.rows[0];
};

/**
 * Update user role (admin)
 */
exports.updateRole = async (userId, role) => {
  const result = await db.query(
    'UPDATE users SET user_role = $1 WHERE user_id = $2 RETURNING *',
    [role, userId]
  );
  return result.rows[0];
};

/**
 * Delete user (soft delete optional – we'll just delete)
 */
exports.delete = async (userId) => {
  await db.query('DELETE FROM users WHERE user_id = $1', [userId]);
  return true;
};

/**
 * Find all users with optional filters (admin)
 */
exports.findAll = async ({ limit = 50, offset = 0, role }) => {
  let query = 'SELECT * FROM users';
  const params = [];
  if (role) {
    query += ' WHERE user_role = $1';
    params.push(role);
  }
  query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(limit, offset);
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Get admin dashboard stats
 */
exports.getAdminStats = async () => {
  const result = await db.query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM users WHERE user_role = 'donor') AS total_donors,
      (SELECT COUNT(*) FROM users WHERE user_role = 'farmer') AS total_farmers,
      (SELECT COUNT(*) FROM trees) AS total_trees,
      (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'completed') AS total_revenue
  `);
  return result.rows[0];
};

/**
 * Store password reset token (simplified – you may want a separate reset_tokens table)
 */
exports.storeResetToken = async (userId, token) => {
  await db.query(
    'UPDATE users SET reset_token = $1 WHERE user_id = $2',
    [token, userId]
  );
};

/**
 * Get stored reset token
 */
exports.getResetToken = async (userId) => {
  const result = await db.query('SELECT reset_token FROM users WHERE user_id = $1', [userId]);
  return result.rows[0]?.reset_token;
};

/**
 * Update user password
 */
exports.updatePassword = async (userId, passwordHash) => {
  await db.query(
    'UPDATE users SET password_hash = $1 WHERE user_id = $2',
    [passwordHash, userId]
  );
};

/**
 * Clear reset token
 */
exports.clearResetToken = async (userId) => {
  await db.query('UPDATE users SET reset_token = NULL WHERE user_id = $1', [userId]);
};