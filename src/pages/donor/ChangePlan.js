// src/pages/donor/ChangePlan.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaCheck, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ChangePlan = () => {
  // Mock current plan (in real app, fetch from user context/API)
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Standard',
    price: 19.90,
    treesPerYear: 18,
    features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species']
  });

  // Available plans
  const plans = [
    {
      name: 'Basic',
      price: 9.90,
      treesPerYear: 9,
      features: ['9 trees/year', '2+ countries', '2 tons CO₂']
    },
    {
      name: 'Standard',
      price: 19.90,
      treesPerYear: 18,
      features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species']
    },
    {
      name: 'Premium',
      price: 29.90,
      treesPerYear: 24,
      features: ['24 trees/year', '5+ states', '6 tons CO₂', '2 limited editions', '3 exclusive species']
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (plan) => {
    if (plan.name === currentPlan.name) {
      toast('You are already on this plan', { icon: 'ℹ️' });
      return;
    }
    setSelectedPlan(plan);
    setShowConfirmModal(true);
  };

  const handleConfirmChange = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentPlan(selectedPlan);
      setIsProcessing(false);
      setShowConfirmModal(false);
      toast.success(`Successfully changed to ${selectedPlan.name} plan`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/dashboard/subscription" className="inline-flex items-center text-gray-600 hover:text-primary-600">
            <FaArrowLeft className="mr-2" /> Back to Subscription
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Change Plan
        </motion.h1>
        <p className="text-gray-600 mb-8">Upgrade or downgrade your subscription at any time.</p>

        {/* Current Plan Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-primary-500"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{currentPlan.name}</p>
              <p className="text-gray-600">€{currentPlan.price}/month • {currentPlan.treesPerYear} trees/year</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</div>
          </div>
        </motion.div>

        {/* Available Plans */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition relative ${
                plan.name === currentPlan.name
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              {plan.name === currentPlan.name && (
                <span className="absolute top-3 right-3 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">Current</span>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">€{plan.price}</p>
              <p className="text-gray-500 text-sm mb-4">{plan.treesPerYear} trees per year</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-600 text-sm">
                    <FaCheck className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={plan.name === currentPlan.name}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                  plan.name === currentPlan.name
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.name === currentPlan.name ? 'Current Plan' : 'Select'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Note about proration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start"
        >
          <FaInfoCircle className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            When you change plans, your next billing date will remain the same. Any difference in price will be prorated.
          </p>
        </motion.div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Plan Change</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to change from <span className="font-semibold">{currentPlan.name}</span> to{' '}
                <span className="font-semibold">{selectedPlan.name}</span>?
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>Current:</span>
                  <span className="font-semibold">€{currentPlan.price}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>New:</span>
                  <span className="font-semibold">€{selectedPlan.price}/month</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                  <span>Difference:</span>
                  <span className="font-semibold">€{(selectedPlan.price - currentPlan.price).toFixed(2)}/month</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmChange}
                  disabled={isProcessing}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-70"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Change'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePlan;