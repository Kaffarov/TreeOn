// src/pages/public/InMemoriam.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaHeart, FaLeaf, FaQuoteRight } from 'react-icons/fa';

const InMemoriam = () => {
  const testimonials = [
    {
      name: 'The Johnson Family',
      quote: 'Planting a forest in memory of our grandmother has brought us so much peace. Every tree is a living tribute.',
    },
    {
      name: 'Michael Chen',
      quote: 'I planted 50 trees for my father. Now his legacy grows stronger with each passing year.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            In Memoriam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-200"
          >
            Honor a loved one’s memory by planting a tree. A living legacy that grows for generations.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg text-gray-700 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">A Living Tribute</h2>
            <p>
              When we lose someone we love, we look for meaningful ways to honor their memory.
              Planting a tree with TreeOn creates a lasting legacy – a living, growing monument
              that benefits the planet and future generations.
            </p>
            <p>
              Each tree is geotagged, and you'll receive a certificate with a personal message.
              You can visit the location or track its growth online. It's a beautiful way to
              remember and celebrate a life.
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary-50 p-8 rounded-xl mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <span>Choose the number of trees you wish to plant (minimum 1).</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <span>Add a personal message to appear on the certificate.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <span>We plant the trees with our partner farmers and geotag them.</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <span>You receive a digital certificate and can track the trees on our map.</span>
              </li>
            </ul>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Stories of Remembrance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <FaQuoteRight className="text-primary-200 text-3xl mb-2" />
                  <p className="text-gray-700 italic mb-3">"{t.quote}"</p>
                  <p className="font-semibold text-gray-800">– {t.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <div className="text-center">
            <Link
              to="/gift"
              className="inline-flex items-center bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg space-x-2"
            >
              <FaHeart />
              <span>Plant a Memorial Tree</span>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Your donation will plant trees and support farming communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InMemoriam;