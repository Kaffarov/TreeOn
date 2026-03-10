const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  donateToCampaign,
} = require('../controllers/campaignController');

// Public campaign listings
router.get('/', getCampaigns);
router.get('/:campaignId', getCampaignById);

// Authenticated users can create
router.post('/', authenticate, createCampaign);
router.put('/:campaignId', authenticate, authorize('admin', 'campaignOwner'), updateCampaign);
router.delete('/:campaignId', authenticate, authorize('admin', 'campaignOwner'), deleteCampaign);

// Donations to campaigns
router.post('/:campaignId/donate', authenticate, donateToCampaign);

module.exports = router;