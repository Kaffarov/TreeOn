const db = require('../db');

/**
 * Find harvests by farmer
 */
exports.findByFarmer = async (farmerId) => {
  const result = await db.query(
    `SELECT h.*, t.tree_id, s.common_name AS species
     FROM harvest_records h
     JOIN trees t ON h.tree_id = t.tree_id
     JOIN species s ON t.species_id = s.species_id
     WHERE h.farmer_id = $1
     ORDER BY h.harvest_date DESC`,
    [farmerId]
  );
  return result.rows;
};

/**
 * Create harvest record
 */
exports.create = async ({ farmerId, treeId, harvestDate, quantityKg, productType, incomeAmount, buyerName, notes }) => {
  const result = await db.query(
    `INSERT INTO harvest_records (farmer_id, tree_id, harvest_date, quantity_kg,
                                   product_type, income_amount, buyer_name, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [farmerId, treeId, harvestDate, quantityKg, productType, incomeAmount, buyerName, notes]
  );
  return result.rows[0];
};

/**
 * Update harvest record
 */
exports.update = async (harvestId, farmerId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE harvest_records SET ${setClauses.join(', ')} WHERE harvest_id = $${paramIndex} AND farmer_id = $${paramIndex + 1} RETURNING *`;
  params.push(harvestId, farmerId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Delete harvest record
 */
exports.delete = async (harvestId, farmerId) => {
  await db.query('DELETE FROM harvest_records WHERE harvest_id = $1 AND farmer_id = $2', [harvestId, farmerId]);
  return true;
};