const planModel = require('../models/planModel');
const subscriptionModel = require('../models/subscriptionModel');
const paymentService = require('../services/paymentService');
const invoiceModel = require('../models/invoiceModel');

/**
 * Get all available subscription plans
 */
exports.getPlans = async (req, res, next) => {
  try {
    const plans = await planModel.findAll();
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific plan by ID
 */
exports.getPlanById = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const plan = await planModel.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new subscription
 */
exports.createSubscription = async (req, res, next) => {
  try {
    const donorId = req.user.userId; // assuming donorId = userId
    const { planId, paymentMethodId } = req.body;

    const plan = await planModel.findById(planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Create payment method and setup recurring payment with Stripe/PayPal
    const paymentResult = await paymentService.createSubscription({
      customerId: donorId, // or use a customer ID stored in donor record
      paymentMethodId,
      amount: plan.monthly_fee,
      planName: plan.plan_type,
    });

    const subscription = await subscriptionModel.create({
      donorId,
      planType: plan.plan_type,
      monthlyFee: plan.monthly_fee,
      startDate: new Date(),
      nextBillingDate: paymentResult.nextBillingDate,
      paymentProviderId: paymentResult.subscriptionId,
    });

    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a subscription by ID
 */
exports.getSubscription = async (req, res, next) => {
  try {
    const { subId } = req.params;
    const subscription = await subscriptionModel.findById(subId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    // Ensure the donor owns this subscription
    if (subscription.donor_id !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * Update subscription (change plan)
 */
exports.updateSubscription = async (req, res, next) => {
  try {
    const { subId } = req.params;
    const { newPlanId } = req.body;

    const subscription = await subscriptionModel.findById(subId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    if (subscription.donor_id !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const newPlan = await planModel.findById(newPlanId);
    if (!newPlan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Update with payment provider
    await paymentService.updateSubscription(subscription.payment_provider_id, newPlan.monthly_fee);

    const updated = await subscriptionModel.update(subId, {
      planType: newPlan.plan_type,
      monthlyFee: newPlan.monthly_fee,
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel subscription
 */
exports.cancelSubscription = async (req, res, next) => {
  try {
    const { subId } = req.params;

    const subscription = await subscriptionModel.findById(subId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    if (subscription.donor_id !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await paymentService.cancelSubscription(subscription.payment_provider_id);
    await subscriptionModel.cancel(subId);

    res.json({ message: 'Subscription cancelled' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get donor's invoices
 */
exports.getInvoices = async (req, res, next) => {
  try {
    const donorId = req.user.userId;
    const invoices = await invoiceModel.findByDonor(donorId);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single invoice (with PDF)
 */
exports.getInvoice = async (req, res, next) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await invoiceModel.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    // Check permission
    if (invoice.donor_id !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    // Return invoice data (and PDF URL if stored)
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};