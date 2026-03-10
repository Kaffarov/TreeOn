const db = require('../db');

/**
 * Find tree by ID
 */
exports.findById = async (treeId) => {
  const result = await db.query(
    `SELECT t.*,
            s.common_name AS species,
            s.scientific_name,
            u_donor.first_name || ' ' || u_donor.last_name AS donor_name,
            d.is_anonymous,
            u_farmer.first_name || ' ' || u_farmer.last_name AS farmer_name,
            u_planter.first_name || ' ' || u_planter.last_name AS planter_name
     FROM trees t
     JOIN species s ON t.species_id = s.species_id
     LEFT JOIN donors d ON t.donor_id = d.donor_id
     LEFT JOIN users u_donor ON d.donor_id = u_donor.user_id
     LEFT JOIN users u_farmer ON t.farmer_id = u_farmer.user_id
     LEFT JOIN users u_planter ON t.planter_id = u_planter.user_id
     WHERE t.tree_id = $1`,
    [treeId]
  );
  return result.rows[0];
};

/**
 * Find trees by farmer
 */
exports.findByFarmer = async (farmerId, { limit, offset }) => {
  const result = await db.query(
    `SELECT t.*, s.common_name AS species
     FROM trees t
     JOIN species s ON t.species_id = s.species_id
     WHERE t.farmer_id = $1
     ORDER BY t.planted_date DESC
     LIMIT $2 OFFSET $3`,
    [farmerId, limit, offset]
  );
  return result.rows;
};

/**
 * Find all trees with optional filters (public)
 */
exports.findAll = async ({ limit, offset, filters }) => {
  let query = `
    SELECT t.tree_id, s.common_name AS species, t.latitude, t.longitude,
           t.planted_date, t.status,
           CASE WHEN d.is_anonymous THEN 'Anonymous' ELSE u.first_name || ' ' || u.last_name END AS donor_name
    FROM trees t
    JOIN species s ON t.species_id = s.species_id
    LEFT JOIN donors d ON t.donor_id = d.donor_id
    LEFT JOIN users u ON d.donor_id = u.user_id
    WHERE 1=1
  `;
  const params = [];
  let paramIndex = 1;

  if (filters.species) {
    query += ` AND s.common_name ILIKE $${paramIndex}`;
    params.push(`%${filters.species}%`);
    paramIndex++;
  }
  if (filters.country) {
    // country is stored in farmer's location? This is simplified – you may need a location table.
    query += ` AND t.farmer_id IN (SELECT farmer_id FROM farmers WHERE country ILIKE $${paramIndex})`;
    params.push(`%${filters.country}%`);
    paramIndex++;
  }
  if (filters.status) {
    query += ` AND t.status = $${paramIndex}`;
    params.push(filters.status);
    paramIndex++;
  }

  query += ` ORDER BY t.planted_date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit, offset);
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Find trees within bounding box (for map clusters)
 */
exports.findInBounds = async (bounds, zoom) => {
  // This is a simplified version – for production use PostGIS.
  // Here we assume lat/lng are within the box.
  const { sw, ne } = bounds;
  const result = await db.query(
    `SELECT t.tree_id, s.common_name AS species, t.latitude, t.longitude
     FROM trees t
     JOIN species s ON t.species_id = s.species_id
     WHERE t.latitude BETWEEN $1 AND $2
       AND t.longitude BETWEEN $3 AND $4
       AND t.status != 'dead'
     LIMIT 500`, // limit to avoid overload
    [sw.lat, ne.lat, sw.lng, ne.lng]
  );
  return result.rows;
};

/**
 * Create a new tree
 */
exports.create = async (treeData) => {
  const {
    badgeId,
    speciesId,
    donorId,
    farmerId,
    planterId,
    plantedDate,
    latitude,
    longitude,
    status,
    notes,
  } = treeData;
  const result = await db.query(
    `INSERT INTO trees (badge_id, species_id, donor_id, farmer_id, planter_id,
                        planted_date, latitude, longitude, status, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [badgeId, speciesId, donorId, farmerId, planterId, plantedDate, latitude, longitude, status, notes]
  );
  return result.rows[0];
};

/**
 * Update tree
 */
exports.update = async (treeId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE trees SET ${setClauses.join(', ')} WHERE tree_id = $${paramIndex} RETURNING *`;
  params.push(treeId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Delete tree
 */
exports.delete = async (treeId) => {
  await db.query('DELETE FROM trees WHERE tree_id = $1', [treeId]);
  return true;
};

/**
 * Record status change in history table
 */
exports.recordStatusChange = async (treeId, changedBy, newStatus, healthStatus) => {
  await db.query(
    `INSERT INTO tree_status_history (tree_id, new_status, changed_by)
     VALUES ($1, $2, $3)`,
    [treeId, newStatus, changedBy]
  );
  // You could also pass healthStatus if you extend the table
};