const db = require('../db');

/**
 * Create a donation record
 */
exports.create = async ({ donorId, campaignId, amount, donationType, paymentMethod, transactionId, status }) => {
  const result = await db.query(
    `INSERT INTO donations (donor_id, campaign_id, amount, donation_date,
                            donation_type, payment_method, transaction_id, status)
     VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7) RETURNING *`,
    [donorId, campaignId, amount, donationType, paymentMethod, transactionId, status]
  );
  return result.rows[0];
};