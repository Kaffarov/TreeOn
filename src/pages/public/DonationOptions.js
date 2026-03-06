// src/pages/public/DonationOptions.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaLeaf, FaArrowRight } from 'react-icons/fa';

const DonationOptions = () => {
  const [customTrees, setCustomTrees] = useState(5);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Plan data
  const plans = [
    {
      name: 'Basic',
      price: 9.90,
      trees: 9,
      co2: '2 tons',
      features: ['9 trees/year', '2+ countries', '2 tons CO₂'],
      popular: false,
    },
    {
      name: 'Standard',
      price: 19.90,
      trees: 18,
      co2: '4 tons',
      features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species'],
      popular: true,
    },
    {
      name: 'Premium',
      price: 29.90,
      trees: 24,
      co2: '6 tons',
      features: ['24 trees/year', '5+ states', '6 tons CO₂', '2 limited editions', '3 exclusive species'],
      popular: false,
    },
  ];

  // One-time tree options
  const treeOptions = [1, 5, 10, 20];

  const handleCustomChange = (e) => {
    setCustomTrees(parseInt(e.target.value) || 1);
  };

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
            Support TreeOn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Choose how you'd like to contribute – one‑time or monthly. Every tree makes a difference.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* One‑time Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Plant Trees – One Time</h2>
            <p className="text-gray-600 mb-6">
              Make a one‑time donation and we'll plant trees on your behalf. You'll receive a certificate and can track your trees on our map.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {treeOptions.map(num => (
                <button
                  key={num}
                  onClick={() => setCustomTrees(num)}
                  className={`px-5 py-3 border rounded-lg font-semibold transition ${
                    customTrees === num
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {num} {num === 1 ? 'Tree' : 'Trees'}
                </button>
              ))}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 bg-gray-100 text-gray-700">€</span>
                <input
                  type="number"
                  min="1"
                  value={customTrees * 5}
                  readOnly
                  className="w-20 px-2 py-3 border-l border-gray-300 text-center focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                to={`/checkout?trees=${customTrees}&amount=${customTrees * 5}`}
                className="inline-flex items-center bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition space-x-2"
              >
                <span>Donate €{customTrees * 5}</span>
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>

          {/* Monthly Subscription Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Monthly Subscriptions</h2>
            <p className="text-gray-600 mb-8">Maximize your impact with a recurring plan.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl shadow-lg p-6 border-2 ${
                  plan.popular ? 'border-primary-500 ring-2 ring-primary-500 scale-105 z-10' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-primary-600 mb-2">€{plan.price}</p>
                <p className="text-gray-500 mb-4">per month</p>
                <p className="text-gray-600 mb-4">{plan.trees} trees/year • {plan.co2} CO₂ offset</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-600 text-sm">
                      <FaLeaf className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/checkout?plan=${plan.name.toLowerCase()}&trees=${plan.trees}&amount=${plan.price}`}
                  className="block text-center bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition"
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>All donations are secure and tax‑deductible (where applicable). You'll receive a receipt via email.</p>
            <p>Questions? <Link to="/contact" className="text-primary-600 hover:underline">Contact us</Link>.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationOptions;