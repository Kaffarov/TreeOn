// src/pages/donor/MySubscription.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, 
  FaTree, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaHistory
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MySubscription = () => {
  // Mock subscription data (in real app, fetch from context/API)
  const [subscription, setSubscription] = useState({
    plan: 'Premium',
    price: 29.90,
    nextBilling: '2026-04-01',
    status: 'active',
    paymentMethod: 'Visa ending in 4242',
    treesAllocatedThisYear: 24,
    treesPlantedThisYear: 18,
    startDate: '2026-01-01',
    benefits: [
      '24 trees per year',
      '5+ states',
      '6 tons CO₂ offset',
      '2 limited edition trees',
      '3 exclusive species',
    ],
  });

  // Mock billing history
  const billingHistory = [
    { date: '2026-03-01', amount: 29.90, status: 'paid' },
    { date: '2026-02-01', amount: 29.90, status: 'paid' },
    { date: '2026-01-01', amount: 29.90, status: 'paid' },
  ];

  const progressPercentage = (subscription.treesPlantedThisYear / subscription.treesAllocatedThisYear) * 100;

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to benefits.')) {
      toast.success('Subscription cancelled (mock)');
    }
  };

  const handleUpdatePayment = () => {
    toast.success('Update payment method (mock)');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">My Subscription</h1>
          <p className="text-gray-600 mt-2">Manage your plan and view benefits.</p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: Plan details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current plan card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Current Plan</h2>
                  <p className="text-3xl font-bold text-primary-600 mt-1">{subscription.plan}</p>
                  <p className="text-gray-600">€{subscription.price}/month</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Plan Benefits</h3>
                <ul className="space-y-2">
                  {subscription.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <FaCheckCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Usage progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">This Year's Usage</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Trees planted</span>
                  <span>{subscription.treesPlantedThisYear} / {subscription.treesAllocatedThisYear}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center mt-6">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">{subscription.treesAllocatedThisYear}</p>
                  <p className="text-xs text-gray-600">Allocated this year</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{subscription.treesPlantedThisYear}</p>
                  <p className="text-xs text-gray-600">Planted so far</p>
                </div>
              </div>
            </motion.div>

            {/* Billing History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Billing History</h2>
              <div className="space-y-3">
                {billingHistory.map((bill, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b last:border-0 pb-2">
                    <span className="text-gray-600">{bill.date}</span>
                    <span className="font-semibold">€{bill.amount}</span>
                    <span className="text-sm text-green-600">Paid</span>
                  </div>
                ))}
              </div>
              <Link
                to="/dashboard/invoices"
                className="mt-4 inline-block text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                View all invoices <FaArrowRight className="ml-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right column: Actions and details */}
          <div className="space-y-6">
            {/* Subscription details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subscription Details</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Next billing</p>
                    <p className="font-medium">{subscription.nextBilling}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCreditCard className="text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Payment method</p>
                    <p className="font-medium">{subscription.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHistory className="text-primary-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Started on</p>
                    <p className="font-medium">{subscription.startDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Manage</h2>
              <div className="space-y-3">
                <Link
                  to="/dashboard/upgrade"
                  className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 transition font-medium"
                >
                  Change Plan
                </Link>
                <button
                  onClick={handleUpdatePayment}
                  className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Update Payment Method
                </button>
                <button
                  onClick={handleCancel}
                  className="block w-full bg-red-50 text-red-700 py-3 rounded-lg hover:bg-red-100 transition font-medium"
                >
                  Cancel Subscription
                </button>
              </div>
            </motion.div>

            {/* Need help? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 rounded-xl p-6"
            >
              <h3 className="font-bold text-gray-800 mb-2">Need help?</h3>
              <p className="text-sm text-gray-600 mb-3">If you have questions about your subscription, contact our support team.</p>
              <Link to="/contact" className="text-primary-600 hover:underline text-sm font-medium">
                Contact Support →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubscription;