const db = require('../db');

/**
 * Find donor by donor_id (which equals user_id)
 */
exports.findById = async (donorId) => {
  const result = await db.query(
    `SELECT d.*, u.first_name, u.last_name, u.email, u.phone
     FROM donors d
     JOIN users u ON d.donor_id = u.user_id
     WHERE d.donor_id = $1`,
    [donorId]
  );
  return result.rows[0];
};

/**
 * Create a donor record (after user registration)
 */
exports.create = async ({ donorId, isAnonymous }) => {
  const result = await db.query(
    'INSERT INTO donors (donor_id, is_anonymous) VALUES ($1, $2) RETURNING *',
    [donorId, isAnonymous]
  );
  return result.rows[0];
};

/**
 * Update donor settings (privacy, etc.)
 */
exports.updateSettings = async (donorId, settings) => {
  const { isAnonymous, preferences } = settings;
  const result = await db.query(
    `UPDATE donors SET is_anonymous = COALESCE($1, is_anonymous),
                       preferences = COALESCE($2, preferences)
     WHERE donor_id = $3 RETURNING *`,
    [isAnonymous, preferences ? JSON.stringify(preferences) : null, donorId]
  );
  return result.rows[0];
};

/**
 * Get recent trees planted by donor
 */
exports.findRecentTrees = async (donorId, limit = 5) => {
  const result = await db.query(
    `SELECT t.tree_id, s.common_name AS species, t.planted_date,
            t.latitude, t.longitude, t.status
     FROM trees t
     JOIN species s ON t.species_id = s.species_id
     WHERE t.donor_id = $1
     ORDER BY t.planted_date DESC
     LIMIT $2`,
    [donorId, limit]
  );
  return result.rows;
};

/**
 * Get donor's impact (trees planted, CO2 offset, countries, etc.)
 */
exports.getImpact = async (donorId) => {
  const result = await db.query(
    `SELECT
        COUNT(t.tree_id) AS total_trees,
        COALESCE(SUM(s.co2_absorption_rate), 0) AS co2_offset,
        COUNT(DISTINCT t.farmer_id) AS farmers_supported,
        COUNT(DISTINCT t.status) FILTER (WHERE t.status = 'dead') AS dead_trees,
        COUNT(DISTINCT t.status) FILTER (WHERE t.status = 'replaced') AS replaced_trees
     FROM trees t
     LEFT JOIN species s ON t.species_id = s.species_id
     WHERE t.donor_id = $1`,
    [donorId]
  );
  return result.rows[0];
};

/**
 * Get all trees planted by donor (with pagination)
 */
exports.findTrees = async (donorId, { limit, offset }) => {
  const result = await db.query(
    `SELECT t.tree_id, s.common_name AS species, t.planted_date,
            t.latitude, t.longitude, t.status, t.health_status
     FROM trees t
     JOIN species s ON t.species_id = s.species_id
     WHERE t.donor_id = $1
     ORDER BY t.planted_date DESC
     LIMIT $2 OFFSET $3`,
    [donorId, limit, offset]
  );
  return result.rows;
};