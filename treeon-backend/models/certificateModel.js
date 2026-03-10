const db = require('../db');

/**
 * Find certificates by donor
 */
exports.findByDonor = async (donorId) => {
  const result = await db.query(
    `SELECT c.*, s.common_name AS species
     FROM certificates c
     LEFT JOIN trees t ON c.tree_id = t.tree_id
     LEFT JOIN species s ON t.species_id = s.species_id
     WHERE c.donor_id = $1
     ORDER BY c.issue_date DESC`,
    [donorId]
  );
  return result.rows;
};