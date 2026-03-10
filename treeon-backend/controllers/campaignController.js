const campaignModel = require('../models/campaignModel');
const donationModel = require('../models/donationModel');

/**
 * List campaigns (public)
 */
exports.getCampaigns = async (req, res, next) => {
  try {
    const { active } = req.query; // filter by active
    const campaigns = await campaignModel.findAll({ active: active === 'true' });
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};

/**
 * Get campaign details (public)
 */
exports.getCampaignById = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new campaign (any authenticated user)
 */
exports.createCampaign = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const campaignData = req.body;
    const newCampaign = await campaignModel.create({ ...campaignData, createdBy: userId });
    res.status(201).json(newCampaign);
  } catch (error) {
    next(error);
  }
};

/**
 * Update campaign (owner or admin)
 */
exports.updateCampaign = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const updates = req.body;
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    // Check ownership
    if (campaign.created_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await campaignModel.update(campaignId, updates);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete campaign (owner or admin)
 */
exports.deleteCampaign = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (campaign.created_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await campaignModel.delete(campaignId);
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Donate to a campaign
 */
exports.donateToCampaign = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const donorId = req.user.userId;
    const { amount, paymentMethodId } = req.body;

    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Process payment (use paymentService)
    const paymentResult = await paymentService.processDonation({
      donorId,
      amount,
      paymentMethodId,
      description: `Donation to campaign: ${campaign.title}`,
    });

    const donation = await donationModel.create({
      donorId,
      campaignId,
      amount,
      donationType: 'campaign',
      paymentMethod: paymentResult.method,
      transactionId: paymentResult.transactionId,
      status: 'completed',
    });

    res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
};