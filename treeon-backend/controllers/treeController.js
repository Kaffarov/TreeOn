const treeModel = require('../models/treeModel');
const speciesModel = require('../models/speciesModel');
const photoModel = require('../models/photoModel');
const uploadService = require('../services/uploadService'); // if you separate upload logic

/**
 * List trees (public, with filters)
 */
exports.getTrees = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, species, country, status } = req.query;
    const filters = { species, country, status };
    const trees = await treeModel.findAll({ limit, offset, filters });
    res.json(trees);
  } catch (error) {
    next(error);
  }
};

/**
 * Get tree details (public)
 */
exports.getTreeById = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const tree = await treeModel.findById(treeId);
    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }
    // If donor wishes to be anonymous, hide name
    if (tree.is_anonymous) tree.donor_name = 'Anonymous';
    res.json(tree);
  } catch (error) {
    next(error);
  }
};

/**
 * Get trees within map bounds (for clustering)
 */
exports.getMapBounds = async (req, res, next) => {
  try {
    const { sw_lat, sw_lng, ne_lat, ne_lng, zoom } = req.query;
    // Convert to numbers, call model method
    const bounds = {
      sw: { lat: parseFloat(sw_lat), lng: parseFloat(sw_lng) },
      ne: { lat: parseFloat(ne_lat), lng: parseFloat(ne_lng) },
    };
    const trees = await treeModel.findInBounds(bounds, parseInt(zoom) || 10);
    res.json(trees);
  } catch (error) {
    next(error);
  }
};

/**
 * List all species
 */
exports.getSpecies = async (req, res, next) => {
  try {
    const species = await speciesModel.findAll();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

/**
 * Get species details
 */
exports.getSpeciesById = async (req, res, next) => {
  try {
    const { speciesId } = req.params;
    const species = await speciesModel.findById(speciesId);
    if (!species) {
      return res.status(404).json({ error: 'Species not found' });
    }
    res.json(species);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new tree (admin/planter)
 */
exports.createTree = async (req, res, next) => {
  try {
    const treeData = req.body;
    // Add validation, e.g., ensure species exists
    const newTree = await treeModel.create(treeData);
    res.status(201).json(newTree);
  } catch (error) {
    next(error);
  }
};

/**
 * Update tree details
 */
exports.updateTree = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const updates = req.body;
    const updated = await treeModel.update(treeId, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Tree not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete tree (admin)
 */
exports.deleteTree = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    await treeModel.delete(treeId);
    res.json({ message: 'Tree deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Geotag a tree (update coordinates)
 */
exports.geotagTree = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const { latitude, longitude } = req.body;
    const updated = await treeModel.update(treeId, { latitude, longitude });
    res.json({ message: 'Geotag updated', tree: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload a photo for a tree
 */
exports.uploadPhoto = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const file = req.file; // from multer
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Optionally upload to cloud storage and get URL
    const photoUrl = await uploadService.upload(file); // implement this

    const photo = await photoModel.create({
      treeId,
      imageUrl: photoUrl,
      takenBy: req.user.userId, // or req.body.takenBy
      takenDate: new Date(),
    });
    res.status(201).json(photo);
  } catch (error) {
    next(error);
  }
};

/**
 * Get photos for a tree
 */
exports.getPhotos = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const photos = await photoModel.findByTree(treeId);
    res.json(photos);
  } catch (error) {
    next(error);
  }
};

/**
 * Update tree status (alive/dead)
 */
exports.updateTreeStatus = async (req, res, next) => {
  try {
    const { treeId } = req.params;
    const { status, healthStatus } = req.body;
    const updated = await treeModel.update(treeId, { status, healthStatus });
    // Also record in tree_status_history
    await treeModel.recordStatusChange(treeId, req.user.userId, status, healthStatus);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};