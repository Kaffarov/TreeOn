const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getTrees,
  getTreeById,
  getMapBounds,
  getSpecies,
  getSpeciesById,
  createTree,
  updateTree,
  deleteTree,
  geotagTree,
  uploadPhoto,
  getPhotos,
  updateTreeStatus,
} = require('../controllers/treeController');

// Public routes
router.get('/', getTrees);
router.get('/map/bounds', getMapBounds);
router.get('/species', getSpecies);
router.get('/species/:speciesId', getSpeciesById);
router.get('/:treeId', getTreeById);
router.get('/:treeId/photos', getPhotos);

// Protected routes (admin/planter only)
router.post('/', authenticate, authorize('admin', 'planter'), createTree);
router.put('/:treeId', authenticate, authorize('admin', 'planter'), updateTree);
router.delete('/:treeId', authenticate, authorize('admin'), deleteTree);
router.post('/:treeId/geotag', authenticate, authorize('planter'), geotagTree);
router.post('/:treeId/photos', authenticate, authorize('planter'), uploadPhoto);
router.put('/:treeId/status', authenticate, authorize('admin', 'planter', 'caretaker'), updateTreeStatus);

module.exports = router;