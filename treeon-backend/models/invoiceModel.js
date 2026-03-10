const db = require('../db');

/**
 * Find invoices by donor (via payments -> donations)
 */
exports.findByDonor = async (donorId) => {
  const result = await db.query(
    `SELECT i.*, p.payment_date, p.amount, p.payment_method, p.status
     FROM invoices i
     JOIN payments p ON i.payment_id = p.payment_id
     LEFT JOIN donations d ON p.donation_id = d.donation_id
     WHERE d.donor_id = $1
     ORDER BY i.issue_date DESC`,
    [donorId]
  );
  return result.rows;
};

/**
 * Find invoice by ID
 */
exports.findById = async (invoiceId) => {
  const result = await db.query(
    `SELECT i.*, p.payment_date, p.amount, p.payment_method, p.status,
            d.donor_id, d.donation_type
     FROM invoices i
     JOIN payments p ON i.payment_id = p.payment_id
     LEFT JOIN donations d ON p.donation_id = d.donation_id
     WHERE i.invoice_id = $1`,
    [invoiceId]
  );
  return result.rows[0];
};