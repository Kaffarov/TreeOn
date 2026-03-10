const db = require('../db');

/**
 * Find all land parcels for a farmer
 */
exports.findByFarmer = async (farmerId) => {
  const result = await db.query(
    'SELECT * FROM land_parcels WHERE farmer_id = $1 ORDER BY name',
    [farmerId]
  );
  return result.rows;
};

/**
 * Create a new land parcel
 */
exports.create = async ({ farmerId, name, size, coordinates, location }) => {
  const result = await db.query(
    `INSERT INTO land_parcels (farmer_id, name, size_hectares, polygon_coords, location_description)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [farmerId, name, size, JSON.stringify(coordinates), location]
  );
  return result.rows[0];
};

/**
 * Update land parcel
 */
exports.update = async (parcelId, farmerId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE land_parcels SET ${setClauses.join(', ')} WHERE parcel_id = $${paramIndex} AND farmer_id = $${paramIndex + 1} RETURNING *`;
  params.push(parcelId, farmerId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Delete land parcel
 */
exports.delete = async (parcelId, farmerId) => {
  await db.query('DELETE FROM land_parcels WHERE parcel_id = $1 AND farmer_id = $2', [parcelId, farmerId]);
  return true;
};