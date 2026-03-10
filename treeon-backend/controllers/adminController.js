const userModel = require('../models/userModel');
const reportModel = require('../models/reportModel');
const nurseryModel = require('../models/nurseryModel');
const paymentModel = require('../models/paymentModel');
const farmerModel = require('../models/farmerModel');

/**
 * Admin dashboard statistics
 */
exports.getStats = async (req, res, next) => {
  try {
    const stats = await userModel.getAdminStats(); // custom query
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

/**
 * List all users with pagination
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, role } = req.query;
    const users = await userModel.findAll({ limit, offset, role });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user details
 */
exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user role
 */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const updated = await userModel.updateRole(userId, role);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user (soft or hard)
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userModel.delete(userId);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending death reports
 */
exports.getDeathReports = async (req, res, next) => {
  try {
    const reports = await reportModel.findDeathReports({ status: 'pending' });
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

/**
 * Verify a death report (approve/reject)
 */
exports.verifyDeathReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { status, notes } = req.body; // status = 'verified' or 'rejected'
    const updated = await reportModel.updateDeathReport(reportId, {
      status,
      verifiedBy: req.user.userId,
      verificationDate: new Date(),
      notes,
    });
    // If verified, create replacement request automatically
    if (status === 'verified') {
      await replacementModel.createFromReport(updated);
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending replacement requests
 */
exports.getReplacements = async (req, res, next) => {
  try {
    const replacements = await replacementModel.findAll({ status: 'approved' });
    res.json(replacements);
  } catch (error) {
    next(error);
  }
};

/**
 * Process a replacement (assign new tree)
 */
exports.processReplacement = async (req, res, next) => {
  try {
    const { repId } = req.params;
    const { newTreeId } = req.body;
    const updated = await replacementModel.process(repId, {
      newTreeId,
      status: 'completed',
      replacementDate: new Date(),
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * List seedlings in nursery
 */
exports.getSeedlings = async (req, res, next) => {
  try {
    const seedlings = await nurseryModel.getAllSeedlings();
    res.json(seedlings);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a seedling to nursery
 */
exports.addSeedling = async (req, res, next) => {
  try {
    const seedlingData = req.body;
    const newSeedling = await nurseryModel.createSeedling(seedlingData);
    res.status(201).json(newSeedling);
  } catch (error) {
    next(error);
  }
};

/**
 * List badges
 */
exports.getBadges = async (req, res, next) => {
  try {
    const badges = await nurseryModel.getAllBadges();
    res.json(badges);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new badge
 */
exports.createBadge = async (req, res, next) => {
  try {
    const badgeData = req.body;
    const newBadge = await nurseryModel.createBadge(badgeData);
    res.status(201).json(newBadge);
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending farmer verifications
 */
exports.getPendingFarmers = async (req, res, next) => {
  try {
    const farmers = await farmerModel.findPending();
    res.json(farmers);
  } catch (error) {
    next(error);
  }
};

/**
 * Verify a farmer
 */
exports.verifyFarmer = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const { verified } = req.body; // true/false
    await farmerModel.updateStatus(farmerId, verified ? 'active' : 'rejected');
    res.json({ message: `Farmer ${verified ? 'verified' : 'rejected'}` });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all payments (with optional filters)
 */
exports.getPayments = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, status } = req.query;
    const payments = await paymentModel.findAll({ limit, offset, status });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

/**
 * Process a refund
 */
exports.refundPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentModel.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Call payment gateway to refund
    await paymentService.refund(payment.transaction_id);

    await paymentModel.update(paymentId, { status: 'refunded' });
    res.json({ message: 'Payment refunded' });
  } catch (error) {
    next(error);
  }
};