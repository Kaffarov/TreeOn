const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getStats,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
  getDeathReports,
  verifyDeathReport,
  getReplacements,
  processReplacement,
  getSeedlings,
  addSeedling,
  getBadges,
  createBadge,
  getPendingFarmers,
  verifyFarmer,
  getPayments,
  refundPayment,
  // ... other admin controllers
} = require('../controllers/adminController');

// All admin routes require admin role
router.use(authenticate, authorize('admin'));

router.get('/stats', getStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);

// Reports
router.get('/reports/death', getDeathReports);
router.put('/reports/death/:reportId', verifyDeathReport);
router.get('/reports/replacements', getReplacements);
router.put('/reports/replacements/:repId', processReplacement);

// Nursery
router.get('/nursery/seedlings', getSeedlings);
router.post('/nursery/seedlings', addSeedling);
router.get('/nursery/badges', getBadges);
router.post('/nursery/badges', createBadge);

// Farmers
router.get('/farmers/pending', getPendingFarmers);
router.put('/farmers/:farmerId/verify', verifyFarmer);

// Payments
router.get('/payments', getPayments);
router.post('/payments/refund/:paymentId', refundPayment);

module.exports = router;