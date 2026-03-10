const trainingModel = require('../models/trainingModel');

/**
 * List all training sessions (public)
 */
exports.getTrainings = async (req, res, next) => {
  try {
    const { upcoming } = req.query; // optional: filter by upcoming
    const trainings = await trainingModel.findAll({ upcoming: upcoming === 'true' });
    res.json(trainings);
  } catch (error) {
    next(error);
  }
};

/**
 * Get training details
 */
exports.getTrainingById = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    const training = await trainingModel.findById(trainingId);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json(training);
  } catch (error) {
    next(error);
  }
};

/**
 * Create training session (admin)
 */
exports.createTraining = async (req, res, next) => {
  try {
    const trainingData = req.body;
    const newTraining = await trainingModel.create(trainingData);
    res.status(201).json(newTraining);
  } catch (error) {
    next(error);
  }
};

/**
 * Update training (admin)
 */
exports.updateTraining = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    const updates = req.body;
    const updated = await trainingModel.update(trainingId, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete training (admin)
 */
exports.deleteTraining = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    await trainingModel.delete(trainingId);
    res.json({ message: 'Training deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get attendance list for a training (admin)
 */
exports.getAttendance = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    const attendance = await trainingModel.getAttendance(trainingId);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

/**
 * Mark attendance for a farmer (admin)
 */
exports.markAttendance = async (req, res, next) => {
  try {
    const { trainingId } = req.params;
    const { farmerId, status, score } = req.body;
    const record = await trainingModel.markAttendance(trainingId, farmerId, { status, score });
    res.json(record);
  } catch (error) {
    next(error);
  }
};