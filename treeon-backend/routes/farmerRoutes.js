const express = require('express');
const router = express.Router({ mergeParams: true });
const { authenticate, authorize } = require('../middleware/auth');
const {
  getDashboard,
  getTrees,
  getLand,
  addLand,
  updateLand,
  deleteLand,
  getTraining,
  registerForTraining,
  getHarvests,
  addHarvest,
  updateHarvest,
  deleteHarvest,
  reportDeath,
  getReplacements,
} = require('../controllers/farmerController');

router.use(authenticate, authorize('farmer'));

router.get('/:farmerId/dashboard', getDashboard);
router.get('/:farmerId/trees', getTrees);
router.get('/:farmerId/land', getLand);
router.post('/:farmerId/land', addLand);
router.put('/:farmerId/land/:parcelId', updateLand);
router.delete('/:farmerId/land/:parcelId', deleteLand);
router.get('/:farmerId/training', getTraining);
router.post('/:farmerId/training/:trainingId/register', registerForTraining);
router.get('/:farmerId/harvests', getHarvests);
router.post('/:farmerId/harvests', addHarvest);
router.put('/:farmerId/harvests/:harvestId', updateHarvest);
router.delete('/:farmerId/harvests/:harvestId', deleteHarvest);
router.post('/:farmerId/report-death', reportDeath);
router.get('/:farmerId/replacements', getReplacements);

module.exports = router;