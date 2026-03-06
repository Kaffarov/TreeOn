// src/pages/public/SubscriptionPlans.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaLeaf } from 'react-icons/fa';

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Basic',
      price: '9.90',
      trees: 9,
      co2: '2 tons',
      features: ['9 trees/year', '2+ countries', '2 tons CO₂'],
      popular: false,
    },
    {
      name: 'Standard',
      price: '19.90',
      trees: 18,
      co2: '4 tons',
      features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species'],
      popular: true,
    },
    {
      name: 'Premium',
      price: '29.90',
      trees: 24,
      co2: '6 tons',
      features: ['24 trees/year', '5+ states', '6 tons CO₂', '2 limited editions', '3 exclusive species'],
      popular: false,
    },
  ];

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
            Subscription Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Choose a monthly plan and make a lasting impact. Every tree is geotagged and tracked.
          </motion.p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl shadow-lg p-6 border-2 ${
                plan.popular
                  ? 'border-primary-500 ring-2 ring-primary-500 scale-105 z-10 bg-white'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary-600">€{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-4">{plan.trees} trees per year • {plan.co2} CO₂ offset</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <FaCheck className="text-primary-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/checkout?plan=${plan.name.toLowerCase()}&trees=${plan.trees}&amount=${plan.price}`}
                className={`block text-center font-semibold py-3 px-4 rounded-lg transition ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Choose {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          All plans include geotagged trees, a personalized dashboard, and digital certificates.
        </p>
      </section>

      {/* Additional info */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why subscribe?</h2>
          <p className="text-gray-600">
            With a monthly subscription, you ensure continuous support for reforestation projects. 
            You'll receive regular updates on your trees and see your impact grow month by month.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;