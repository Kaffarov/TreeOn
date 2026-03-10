const db = require('../db');

/**
 * Get all seedlings
 */
exports.getAllSeedlings = async () => {
  const result = await db.query(`
    SELECT s.*, sp.common_name AS species
    FROM seedlings s
    JOIN species sp ON s.species_id = sp.species_id
    ORDER BY s.nursing_start_date DESC
  `);
  return result.rows;
};

/**
 * Create a seedling
 */
exports.createSeedling = async ({ badgeId, speciesId, nursingStartDate, healthStatus }) => {
  const result = await db.query(
    `INSERT INTO seedlings (badge_id, species_id, nursing_start_date, health_status)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [badgeId, speciesId, nursingStartDate, healthStatus]
  );
  return result.rows[0];
};

/**
 * Get all badges
 */
exports.getAllBadges = async () => {
  const result = await db.query('SELECT * FROM badges ORDER BY created_at DESC');
  return result.rows;
};

/**
 * Create a badge
 */
exports.createBadge = async ({ qrCode, rfidTag, nurseryName }) => {
  const result = await db.query(
    `INSERT INTO badges (qr_code, rfid_tag, nursery_name) VALUES ($1, $2, $3) RETURNING *`,
    [qrCode, rfidTag, nurseryName]
  );
  return result.rows[0];
};