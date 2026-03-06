// src/pages/public/PlanDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaLeaf, FaArrowLeft } from 'react-icons/fa';

const PlanDetails = () => {
  const { plan } = useParams();

  // Plan data (same as in DonationOptions or SubscriptionPlans)
  const plans = {
    basic: {
      name: 'Basic',
      price: 9.90,
      trees: 9,
      co2: '2 tons',
      features: ['9 trees/year', '2+ countries', '2 tons CO₂'],
      description: 'Perfect for starting your reforestation journey.',
    },
    standard: {
      name: 'Standard',
      price: 19.90,
      trees: 18,
      co2: '4 tons',
      features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species'],
      description: 'Our most popular plan – great impact and exclusive perks.',
    },
    premium: {
      name: 'Premium',
      price: 29.90,
      trees: 24,
      co2: '6 tons',
      features: ['24 trees/year', '5+ states', '6 tons CO₂', '2 limited editions', '3 exclusive species'],
      description: 'Maximum impact with all exclusive benefits.',
    },
  };

  const selectedPlan = plans[plan?.toLowerCase()] || plans.basic; // fallback to basic

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {selectedPlan.name} Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            {selectedPlan.description}
          </motion.p>
        </div>
      </section>

      {/* Back link */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/subscribe" className="inline-flex items-center text-gray-600 hover:text-primary-600">
          <FaArrowLeft className="mr-2" /> Back to Plans
        </Link>
      </div>

      {/* Main content */}
      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Plan details */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Plan Overview</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">€{selectedPlan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-600 mb-4">{selectedPlan.trees} trees per year • {selectedPlan.co2} CO₂ offset</p>
                <ul className="space-y-2 mb-6">
                  {selectedPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <FaCheck className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/checkout?plan=${selectedPlan.name.toLowerCase()}&trees=${selectedPlan.trees}&amount=${selectedPlan.price}`}
                  className="block w-full text-center bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition"
                >
                  Choose {selectedPlan.name}
                </Link>
              </div>
            </div>

            {/* Right: Benefits highlights */}
            <div>
              <div className="bg-primary-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why choose this plan?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Recurring impact – trees planted every month.</span>
                  </li>
                  <li className="flex items-start">
                    <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Geotagged trees you can track online.</span>
                  </li>
                  <li className="flex items-start">
                    <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Personalized impact dashboard.</span>
                  </li>
                  <li className="flex items-start">
                    <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Exclusive species and limited editions for higher plans.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanDetails;