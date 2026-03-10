const db = require('../db');

/**
 * Create a photo record
 */
exports.create = async ({ treeId, imageUrl, takenBy, takenDate, caption }) => {
  const result = await db.query(
    `INSERT INTO tree_photos (tree_id, image_url, taken_by, taken_date, caption)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [treeId, imageUrl, takenBy, takenDate, caption]
  );
  return result.rows[0];
};

/**
 * Find photos by tree ID
 */
exports.findByTree = async (treeId) => {
  const result = await db.query(
    'SELECT * FROM tree_photos WHERE tree_id = $1 ORDER BY taken_date DESC',
    [treeId]
  );
  return result.rows;
};