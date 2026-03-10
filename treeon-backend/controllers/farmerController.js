const farmerModel = require('../models/farmerModel');
const treeModel = require('../models/treeModel');
const landModel = require('../models/landModel');
const trainingModel = require('../models/trainingModel');
const harvestModel = require('../models/harvestModel');
const replacementModel = require('../models/replacementModel');

/**
 * Farmer dashboard data
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const farmer = await farmerModel.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    const stats = await farmerModel.getStats(farmerId);
    const recentTrees = await treeModel.findByFarmer(farmerId, { limit: 5 });
    const upcomingTraining = await trainingModel.findUpcomingForFarmer(farmerId);
    const pendingReplacements = await replacementModel.findPendingByFarmer(farmerId);

    res.json({
      farmer,
      stats,
      recentTrees,
      upcomingTraining,
      pendingReplacements,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get trees on farmer's land
 */
exports.getTrees = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    const trees = await treeModel.findByFarmer(farmerId, { limit, offset });
    res.json(trees);
  } catch (error) {
    next(error);
  }
};

/**
 * Get land parcels
 */
exports.getLand = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const land = await landModel.findByFarmer(farmerId);
    res.json(land);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a land parcel
 */
exports.addLand = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const parcelData = req.body;
    const newParcel = await landModel.create({ ...parcelData, farmerId });
    res.status(201).json(newParcel);
  } catch (error) {
    next(error);
  }
};

/**
 * Update land parcel
 */
exports.updateLand = async (req, res, next) => {
  try {
    const { farmerId, parcelId } = req.params;
    const updates = req.body;
    const updated = await landModel.update(parcelId, farmerId, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Parcel not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete land parcel
 */
exports.deleteLand = async (req, res, next) => {
  try {
    const { farmerId, parcelId } = req.params;
    await landModel.delete(parcelId, farmerId);
    res.json({ message: 'Parcel deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get upcoming/past training
 */
exports.getTraining = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const { filter = 'upcoming' } = req.query; // 'upcoming' or 'past'
    const training = await trainingModel.findForFarmer(farmerId, filter);
    res.json(training);
  } catch (error) {
    next(error);
  }
};

/**
 * Register for a training session
 */
exports.registerForTraining = async (req, res, next) => {
  try {
    const { farmerId, trainingId } = req.params;
    await trainingModel.registerFarmer(farmerId, trainingId);
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get harvest records
 */
exports.getHarvests = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const harvests = await harvestModel.findByFarmer(farmerId);
    res.json(harvests);
  } catch (error) {
    next(error);
  }
};

/**
 * Add harvest record
 */
exports.addHarvest = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const harvestData = req.body;
    const newHarvest = await harvestModel.create({ ...harvestData, farmerId });
    res.status(201).json(newHarvest);
  } catch (error) {
    next(error);
  }
};

/**
 * Update harvest record
 */
exports.updateHarvest = async (req, res, next) => {
  try {
    const { farmerId, harvestId } = req.params;
    const updates = req.body;
    const updated = await harvestModel.update(harvestId, farmerId, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Harvest not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete harvest record
 */
exports.deleteHarvest = async (req, res, next) => {
  try {
    const { farmerId, harvestId } = req.params;
    await harvestModel.delete(harvestId, farmerId);
    res.json({ message: 'Harvest deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Report a dead tree
 */
exports.reportDeath = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const { treeId, reason, notes } = req.body;
    const report = await replacementModel.createReport({
      farmerId,
      treeId,
      reason,
      notes,
      reportedDate: new Date(),
      status: 'reported',
    });
    res.status(201).json({ message: 'Report submitted', reportId: report.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Get replacement requests status
 */
exports.getReplacements = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const replacements = await replacementModel.findByFarmer(farmerId);
    res.json(replacements);
  } catch (error) {
    next(error);
  }
};