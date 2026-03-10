const db = require('../db');

/**
 * Find active subscription by donor
 */
exports.findActiveByDonor = async (donorId) => {
  const result = await db.query(
    `SELECT * FROM subscriptions
     WHERE donor_id = $1 AND status = 'active'
     ORDER BY start_date DESC LIMIT 1`,
    [donorId]
  );
  return result.rows[0];
};

/**
 * Create subscription
 */
exports.create = async ({ donorId, planType, monthlyFee, startDate, nextBillingDate, paymentProviderId }) => {
  const result = await db.query(
    `INSERT INTO subscriptions (donor_id, plan_type, start_date, next_billing_date,
                                monthly_fee, payment_provider_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [donorId, planType, startDate, nextBillingDate, monthlyFee, paymentProviderId]
  );
  return result.rows[0];
};

/**
 * Find subscription by ID
 */
exports.findById = async (subId) => {
  const result = await db.query('SELECT * FROM subscriptions WHERE subscription_id = $1', [subId]);
  return result.rows[0];
};

/**
 * Update subscription (e.g., change plan)
 */
exports.update = async (subId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE subscriptions SET ${setClauses.join(', ')} WHERE subscription_id = $${paramIndex} RETURNING *`;
  params.push(subId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Cancel subscription
 */
exports.cancel = async (subId) => {
  await db.query(
    "UPDATE subscriptions SET status = 'cancelled' WHERE subscription_id = $1",
    [subId]
  );
  return true;
};