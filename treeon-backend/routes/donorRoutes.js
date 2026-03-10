const express = require('express');
const router = express.Router({ mergeParams: true }); // allows accessing donorId from parent router
const { authenticate, authorize } = require('../middleware/auth');
const {
  getDashboard,
  getTrees,
  getCertificates,
  getSubscription,
  getImpact,
  getBadges,
  getReferralData,
  createReferralCode,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  updateSettings,
} = require('../controllers/donorController');

// All routes require donor authentication and that the donorId matches the authenticated user
router.use(authenticate, authorize('donor'));

router.get('/:donorId/dashboard', getDashboard);
router.get('/:donorId/trees', getTrees);
router.get('/:donorId/certificates', getCertificates);
router.get('/:donorId/subscription', getSubscription);
router.get('/:donorId/impact', getImpact);
router.get('/:donorId/badges', getBadges);
router.get('/:donorId/referrals', getReferralData);
router.post('/:donorId/referrals', createReferralCode);
router.get('/:donorId/wishlist', getWishlist);
router.post('/:donorId/wishlist', addToWishlist);
router.delete('/:donorId/wishlist/:treeId', removeFromWishlist);
router.put('/:donorId/settings', updateSettings);

module.exports = router;