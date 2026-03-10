const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getPlans,
  getPlanById,
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  getInvoices,
  getInvoice,
} = require('../controllers/subscriptionController');

// Public plans info
router.get('/plans', getPlans);
router.get('/plans/:planId', getPlanById);

// Donor subscription management
router.post('/', authenticate, authorize('donor'), createSubscription);
router.get('/:subId', authenticate, authorize('donor'), getSubscription);
router.put('/:subId', authenticate, authorize('donor'), updateSubscription);
router.delete('/:subId', authenticate, authorize('donor'), cancelSubscription);
router.get('/invoices', authenticate, authorize('donor'), getInvoices);
router.get('/invoices/:invoiceId', authenticate, authorize('donor'), getInvoice);

module.exports = router;