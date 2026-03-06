// src/pages/public/MemorialTrees.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaHeart, FaLeaf, FaCertificate, FaQuoteRight } from 'react-icons/fa';

const MemorialTrees = () => {
  const testimonials = [
    {
      name: 'The Williams Family',
      quote: 'We planted a tree for our father. Every time we visit the site or check the map, we feel connected to him.',
    },
    {
      name: 'Laura Martinez',
      quote: 'A living memorial is so much more meaningful than a stone. My mother’s tree grows and blossoms – just like her memory.',
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
            Memorial Trees
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-200"
          >
            A living tribute to honor and remember a loved one. Their legacy grows stronger with every passing year.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg text-gray-700 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">A Lasting Legacy</h2>
            <p>
              Planting a tree in memory of a loved one creates a living, growing monument that benefits the environment and future generations. Each tree is a symbol of life, hope, and remembrance.
            </p>
            <p>
              With TreeOn, you can choose the tree species, add a personal message, and receive a digital certificate. Your tree will be planted with care by our partner farmers and geotagged so you can visit its location or track its growth online.
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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <FaLeaf className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">1. Choose your tree</p>
                  <p className="text-sm text-gray-600">Select the number and species (optional).</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaHeart className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">2. Add a personal message</p>
                  <p className="text-sm text-gray-600">Write a tribute to be included on the certificate.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaTree className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">3. We plant the tree</p>
                  <p className="text-sm text-gray-600">Our farmers plant it and geotag the location.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaCertificate className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">4. Receive your certificate</p>
                  <p className="text-sm text-gray-600">A digital certificate with your message and tree details.</p>
                </div>
              </div>
            </div>
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
              to="/gift?type=memorial"
              className="inline-flex items-center bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg space-x-2"
            >
              <FaHeart />
              <span>Plant a Memorial Tree</span>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Your donation supports reforestation and farming communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemorialTrees;