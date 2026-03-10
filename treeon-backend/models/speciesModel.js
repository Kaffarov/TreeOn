const db = require('../db');

/**
 * Get all species
 */
exports.findAll = async () => {
  const result = await db.query('SELECT * FROM species WHERE is_active = true');
  return result.rows;
};

/**
 * Find species by ID
 */
exports.findById = async (speciesId) => {
  const result = await db.query('SELECT * FROM species WHERE species_id = $1', [speciesId]);
  return result.rows[0];
};