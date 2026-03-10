const db = require('../db');

/**
 * Find badges earned by donor (you may need a badges table and donor_badges junction)
 * For simplicity, assume we have a donor_badges table.
 */
exports.findByDonor = async (donorId) => {
  const result = await db.query(
    `SELECT b.*, db.earned_date
     FROM donor_badges db
     JOIN badges b ON db.badge_id = b.badge_id
     WHERE db.donor_id = $1
     ORDER BY db.earned_date DESC`,
    [donorId]
  );
  return result.rows;
};