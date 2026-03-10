const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const donorRoutes = require('./donorRoutes');
const farmerRoutes = require('./farmerRoutes');
const treeRoutes = require('./treeRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const trainingRoutes = require('./trainingRoutes');
const campaignRoutes = require('./campaignRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);
router.use('/donors', donorRoutes);
router.use('/farmers', farmerRoutes);
router.use('/trees', treeRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/training', trainingRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/admin', adminRoutes);

module.exports = router;