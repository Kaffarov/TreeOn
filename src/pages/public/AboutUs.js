// src/pages/public/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTree, FaHandsHelping, FaGlobe, FaUsers, FaLeaf, FaSeedling } from 'react-icons/fa';

const AboutUs = () => {
  const stats = [
    { icon: FaTree, value: '50K+', label: 'Trees Planted' },
    { icon: FaUsers, value: '5K+', label: 'Active Donors' },
    { icon: FaHandsHelping, value: '200+', label: 'Partner Farmers' },
    { icon: FaGlobe, value: '12', label: 'Countries' },
  ];

  const team = [
    { name: 'Engr. Arrey Egbe', role: 'Founder & CEO', image: 'https://via.placeholder.com/150' },
    { name: 'John Forester', role: 'Head of Operations', image: 'https://via.placeholder.com/150' },
    { name: 'Maria Silva', role: 'Community Manager', image: 'https://via.placeholder.com/150' },
    { name: 'David Kim', role: 'Lead Agronomist', image: 'https://via.placeholder.com/150' },
  ];

  const partners = [
    { name: 'EcoFund', logo: 'https://via.placeholder.com/120x60?text=EcoFund' },
    { name: 'GreenFuture', logo: 'https://via.placeholder.com/120x60?text=GreenFuture' },
    { name: 'WorldForest', logo: 'https://via.placeholder.com/120x60?text=WorldForest' },
    { name: 'ClimateAction', logo: 'https://via.placeholder.com/120x60?text=ClimateAction' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <FaTree className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About TreeOn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Growing a greener future, one tree at a time.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-50 p-8 rounded-2xl shadow-lg"
          >
            <FaSeedling className="text-primary-600 text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To restore the Earth's forests and combat climate change by empowering individuals and communities to plant, nurture, and protect trees, while ensuring sustainable livelihoods for farmers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-leaf-50 p-8 rounded-2xl shadow-lg"
          >
            <FaLeaf className="text-primary-600 text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where thriving forests, biodiversity, and communities coexist in harmony, and every person has the opportunity to contribute to a sustainable planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                TreeOn was founded in 2020 by a group of environmental scientists and community activists who saw the urgent need for reforestation and sustainable farming. What started as a small pilot project in one village has grown into a global movement.
              </p>
              <p>
                We work directly with farmers, providing them with training, resources, and fair compensation to plant and care for trees on their land. Every tree is geotagged and tracked, creating a transparent connection between donors and the environment.
              </p>
              <p>
                Today, TreeOn has planted over 50,000 trees across 12 countries, restored habitats, and improved the livelihoods of hundreds of farming families. But we're just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact So Far</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
                <stat.icon className="text-primary-600 text-3xl" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                  <p className="text-primary-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className="h-12 md:h-16 grayscale hover:grayscale-0 transition"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the solution. Plant trees, track your impact, and help us create a greener planet.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Plant a Tree Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;