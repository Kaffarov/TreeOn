const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
  getAttendance,
  markAttendance,
} = require('../controllers/trainingController');

// Public training listings
router.get('/', getTrainings);
router.get('/:trainingId', getTrainingById);

// Admin only
router.post('/', authenticate, authorize('admin'), createTraining);
router.put('/:trainingId', authenticate, authorize('admin'), updateTraining);
router.delete('/:trainingId', authenticate, authorize('admin'), deleteTraining);
router.get('/:trainingId/attendance', authenticate, authorize('admin'), getAttendance);
router.post('/:trainingId/attendance', authenticate, authorize('admin'), markAttendance);

module.exports = router;