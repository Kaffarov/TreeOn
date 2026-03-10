const donorModel = require('../models/donorModel');
const treeModel = require('../models/treeModel');
const subscriptionModel = require('../models/subscriptionModel');
const certificateModel = require('../models/certificateModel');
const badgeModel = require('../models/badgeModel');
const referralModel = require('../models/referralModel');
const wishlistModel = require('../models/wishlistModel');

/**
 * Get donor dashboard data
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const { donorId } = req.params;

    const donor = await donorModel.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    const recentTrees = await donorModel.findRecentTrees(donorId, 5);
    const impact = await donorModel.getImpact(donorId);
    const subscription = await subscriptionModel.findActiveByDonor(donorId);

    res.json({
      donor,
      recentTrees,
      co2Offset: impact.co2,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get trees planted by this donor (with pagination)
 */
exports.getTrees = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const trees = await donorModel.findTrees(donorId, { limit, offset });
    res.json(trees);
  } catch (error) {
    next(error);
  }
};

/**
 * Get donor's certificates
 */
exports.getCertificates = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const certificates = await certificateModel.findByDonor(donorId);
    res.json(certificates);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current subscription
 */
exports.getSubscription = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const subscription = await subscriptionModel.findActiveByDonor(donorId);
    res.json(subscription || null);
  } catch (error) {
    next(error);
  }
};

/**
 * Get impact summary (trees, CO2, countries, etc.)
 */
exports.getImpact = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const impact = await donorModel.getImpact(donorId);
    res.json(impact);
  } catch (error) {
    next(error);
  }
};

/**
 * Get achievement badges
 */
exports.getBadges = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const badges = await badgeModel.findByDonor(donorId);
    res.json(badges);
  } catch (error) {
    next(error);
  }
};

/**
 * Get referral program data
 */
exports.getReferralData = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const data = await referralModel.getData(donorId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new referral code
 */
exports.createReferralCode = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const code = await referralModel.createCode(donorId);
    res.status(201).json({ code });
  } catch (error) {
    next(error);
  }
};

/**
 * Get wishlist
 */
exports.getWishlist = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const wishlist = await wishlistModel.findByDonor(donorId);
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

/**
 * Add tree to wishlist
 */
exports.addToWishlist = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const { treeId } = req.body; // or from params? adjust as needed
    await wishlistModel.add(donorId, treeId);
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove tree from wishlist
 */
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { donorId, treeId } = req.params;
    await wishlistModel.remove(donorId, treeId);
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

/**
 * Update privacy/notification settings
 */
exports.updateSettings = async (req, res, next) => {
  try {
    const { donorId } = req.params;
    const settings = req.body;
    await donorModel.updateSettings(donorId, settings);
    res.json({ message: 'Settings updated' });
  } catch (error) {
    next(error);
  }
};