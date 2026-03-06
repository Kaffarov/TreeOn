// src/pages/public/FarmersProgram.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHandsHelping, 
  FaTree, 
  FaSeedling, 
  FaGraduationCap,
  FaDollarSign,
  FaHeart,
  FaQuoteRight
} from 'react-icons/fa';

const FarmersProgram = () => {
  const stats = [
    { label: 'Partner Farmers', value: '287', icon: FaHandsHelping },
    { label: 'Trees Planted', value: '58K+', icon: FaTree },
    { label: 'Trainings Held', value: '42', icon: FaGraduationCap },
    { label: 'Hectares Restored', value: '489', icon: FaSeedling },
  ];

  const benefits = [
    { icon: FaDollarSign, title: 'Income Generation', description: 'Farmers earn from fruit, nuts, and other tree products.' },
    { icon: FaGraduationCap, title: 'Free Training', description: 'Workshops on sustainable farming, pruning, and soil health.' },
    { icon: FaTree, title: 'Free Seedlings', description: 'High-quality native and fruit tree seedlings provided.' },
    { icon: FaHeart, title: 'Community Support', description: 'Join a network of farmers and receive ongoing advice.' },
  ];

  const steps = [
    { number: 1, title: 'Contact Us', description: 'Reach out through our website or local coordinator.' },
    { number: 2, title: 'Assessment', description: 'We visit your land to discuss goals and suitability.' },
    { number: 3, title: 'Training & Planting', description: 'Attend training, receive seedlings, and start planting.' },
    { number: 4, title: 'Ongoing Support', description: 'Regular visits, monitoring, and additional trainings.' },
  ];

  const testimonials = [
    { name: 'Maria Santos', location: 'Philippines', quote: 'TreeOn changed my life. Now I have a thriving farm and extra income.', image: 'https://via.placeholder.com/100x100?text=Maria' },
    { name: 'John Kamau', location: 'Kenya', quote: 'The training was excellent. My land is greener and my family eats better.', image: 'https://via.placeholder.com/100x100?text=John' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Farmers Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Empowering farmers to restore the land and improve their livelihoods through sustainable tree planting.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <stat.icon className="text-primary-600 text-3xl" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Join */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Why Join the Program?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <benefit.icon className="text-primary-600 text-4xl mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative text-center"
            >
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-primary-200 -z-10 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Farmers' Voices</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start"
              >
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                <div>
                  <FaQuoteRight className="text-primary-200 text-xl mb-2" />
                  <p className="text-gray-700 italic mb-2">"{t.quote}"</p>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          If you're a farmer interested in joining the program, we'd love to hear from you.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default FarmersProgram;