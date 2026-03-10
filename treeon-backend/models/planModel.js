const db = require('../db');

/**
 * Get all available plans
 */
exports.findAll = async () => {
  const result = await db.query('SELECT * FROM plan_benefits ORDER BY monthly_fee');
  return result.rows;
};

/**
 * Find plan by ID
 */
exports.findById = async (planId) => {
  const result = await db.query('SELECT * FROM plan_benefits WHERE plan_type = $1', [planId]);
  return result.rows[0];
};