const db = require('../db');

/**
 * Find all training sessions (public)
 */
exports.findAll = async ({ upcoming }) => {
  let query = 'SELECT * FROM training_sessions';
  const params = [];
  if (upcoming) {
    query += ' WHERE training_date >= CURRENT_DATE';
  }
  query += ' ORDER BY training_date';
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Find training by ID
 */
exports.findById = async (trainingId) => {
  const result = await db.query('SELECT * FROM training_sessions WHERE training_id = $1', [trainingId]);
  return result.rows[0];
};

/**
 * Create training session
 */
exports.create = async (trainingData) => {
  const { title, description, trainingDate, location, trainerName, durationHours, topics, maxParticipants } = trainingData;
  const result = await db.query(
    `INSERT INTO training_sessions (title, description, training_date, location,
                                     trainer_name, duration_hours, topics, max_participants)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [title, description, trainingDate, location, trainerName, durationHours, topics, maxParticipants]
  );
  return result.rows[0];
};

/**
 * Update training session
 */
exports.update = async (trainingId, updates) => {
  const setClauses = [];
  const params = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`);
    params.push(value);
    paramIndex++;
  }

  if (setClauses.length === 0) return null;

  const query = `UPDATE training_sessions SET ${setClauses.join(', ')} WHERE training_id = $${paramIndex} RETURNING *`;
  params.push(trainingId);
  const result = await db.query(query, params);
  return result.rows[0];
};

/**
 * Delete training session
 */
exports.delete = async (trainingId) => {
  await db.query('DELETE FROM training_sessions WHERE training_id = $1', [trainingId]);
  return true;
};

/**
 * Find training for a farmer (upcoming/past) – join with attendance
 */
exports.findForFarmer = async (farmerId, filter) => {
  let query = `
    SELECT ts.*,
           CASE WHEN ta.attendance_id IS NOT NULL THEN true ELSE false END AS registered
    FROM training_sessions ts
    LEFT JOIN training_attendance ta ON ts.training_id = ta.training_id AND ta.farmer_id = $1
  `;
  const params = [farmerId];
  if (filter === 'upcoming') {
    query += ' WHERE ts.training_date >= CURRENT_DATE';
  } else if (filter === 'past') {
    query += ' WHERE ts.training_date < CURRENT_DATE';
  }
  query += ' ORDER BY ts.training_date';
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Register a farmer for a training
 */
exports.registerFarmer = async (farmerId, trainingId) => {
  const result = await db.query(
    `INSERT INTO training_attendance (training_id, farmer_id, status)
     VALUES ($1, $2, 'registered') RETURNING *`,
    [trainingId, farmerId]
  );
  return result.rows[0];
};

/**
 * Get attendance list for a training (admin)
 */
exports.getAttendance = async (trainingId) => {
  const result = await db.query(
    `SELECT ta.*, u.first_name, u.last_name, u.email
     FROM training_attendance ta
     JOIN farmers f ON ta.farmer_id = f.farmer_id
     JOIN users u ON f.farmer_id = u.user_id
     WHERE ta.training_id = $1`,
    [trainingId]
  );
  return result.rows;
};

/**
 * Mark attendance (admin)
 */
exports.markAttendance = async (trainingId, farmerId, { status, score }) => {
  const result = await db.query(
    `UPDATE training_attendance SET status = $1, score = $2
     WHERE training_id = $3 AND farmer_id = $4 RETURNING *`,
    [status, score, trainingId, farmerId]
  );
  return result.rows[0];
};