// src/pages/public/WeddingRegistry.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaTree, FaLeaf, FaUsers, FaQuoteRight, FaArrowRight } from 'react-icons/fa';

const WeddingRegistry = () => {
  const benefits = [
    { icon: FaTree, title: 'Lasting Legacy', description: 'Your wedding trees will grow for decades, symbolizing your love.' },
    { icon: FaLeaf, title: 'Eco-Friendly', description: 'Give your guests a meaningful, sustainable gift option.' },
    { icon: FaUsers, title: 'Track Your Forest', description: 'See your trees on a map and receive updates.' },
  ];

  const steps = [
    { step: 1, title: 'Sign up', description: 'Create your registry in minutes.' },
    { step: 2, title: 'Share with guests', description: 'Include the link in your invitations.' },
    { step: 3, title: 'We plant the trees', description: 'Your forest grows with every donation.' },
  ];

  const testimonials = [
    {
      couple: 'Emily & James',
      quote: 'Our guests loved the idea of planting trees instead of giving traditional gifts. Now we have a forest to celebrate our marriage!',
      location: 'UK',
    },
    {
      couple: 'Carlos & Maria',
      quote: 'TreeOn made it so easy. We check our forest map on anniversaries. Highly recommend!',
      location: 'Spain',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-600 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaHeart className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wedding Tree Registry</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Celebrate your love by planting trees. A gift that grows with your marriage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Why a Tree Registry?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-4">
                <benefit.icon className="text-pink-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 text-center relative"
              >
                <div className="bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-pink-200 -z-10 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Happy Couples</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <FaQuoteRight className="text-pink-200 text-3xl mb-2" />
              <p className="text-gray-700 italic mb-3">"{t.quote}"</p>
              <p className="font-semibold text-gray-800">{t.couple}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-pink-600 to-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Registry</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your personalized wedding tree registry and share it with your guests.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-pink-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition space-x-2"
          >
            <span>Contact Us to Start</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WeddingRegistry;