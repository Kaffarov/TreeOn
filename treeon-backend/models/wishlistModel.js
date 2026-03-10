const db = require('../db');

/**
 * Get wishlist items for donor (join with trees/species)
 */
exports.findByDonor = async (donorId) => {
  const result = await db.query(
    `SELECT w.*, s.common_name AS species
     FROM wishlist w
     JOIN trees t ON w.tree_id = t.tree_id
     JOIN species s ON t.species_id = s.species_id
     WHERE w.donor_id = $1
     ORDER BY w.added_date DESC`,
    [donorId]
  );
  return result.rows;
};

/**
 * Add tree to wishlist
 */
exports.add = async (donorId, treeId) => {
  await db.query(
    'INSERT INTO wishlist (donor_id, tree_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [donorId, treeId]
  );
  return true;
};

/**
 * Remove tree from wishlist
 */
exports.remove = async (donorId, treeId) => {
  await db.query(
    'DELETE FROM wishlist WHERE donor_id = $1 AND tree_id = $2',
    [donorId, treeId]
  );
  return true;
};