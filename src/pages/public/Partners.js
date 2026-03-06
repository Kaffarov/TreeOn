// src/pages/public/Partners.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHandshake, 
  FaLeaf, 
  FaBuilding, 
  FaGlobe, 
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';

const Partners = () => {
  const partners = {
    corporate: [
      { name: 'EcoCorp', logo: 'https://via.placeholder.com/200x100?text=EcoCorp', description: 'Sustainable packaging leader' },
      { name: 'GreenEnergy Inc.', logo: 'https://via.placeholder.com/200x100?text=GreenEnergy', description: 'Renewable energy provider' },
      { name: 'BioLife', logo: 'https://via.placeholder.com/200x100?text=BioLife', description: 'Organic farming advocates' },
      { name: 'FutureForest', logo: 'https://via.placeholder.com/200x100?text=FutureForest', description: 'Forestry technology' },
    ],
    nonprofit: [
      { name: 'World Wildlife Fund', logo: 'https://via.placeholder.com/200x100?text=WWF', description: 'Global conservation' },
      { name: 'Rainforest Alliance', logo: 'https://via.placeholder.com/200x100?text=Rainforest+Alliance', description: 'Protecting forests' },
      { name: 'One Tree Planted', logo: 'https://via.placeholder.com/200x100?text=One+Tree+Planted', description: 'Reforestation nonprofit' },
      { name: 'The Nature Conservancy', logo: 'https://via.placeholder.com/200x100?text=TNC', description: 'Land and water protection' },
    ],
    community: [
      { name: 'Local Farmers Co-op', logo: 'https://via.placeholder.com/200x100?text=Co-op', description: 'Philippines' },
      { name: 'Amazonian Communities', logo: 'https://via.placeholder.com/200x100?text=Amazon+Com', description: 'Brazil' },
      { name: 'Kenyan Women\'s Group', logo: 'https://via.placeholder.com/200x100?text=Kenya+Women', description: 'Kenya' },
    ],
    academic: [
      { name: 'University of Green Sciences', logo: 'https://via.placeholder.com/200x100?text=Uni+Green', description: 'Research partner' },
      { name: 'Forest Research Institute', logo: 'https://via.placeholder.com/200x100?text=Forest+Inst', description: 'Tree biology studies' },
    ],
  };

  const partnerCategories = [
    { id: 'corporate', title: 'Corporate Partners', icon: FaBuilding },
    { id: 'nonprofit', title: 'Nonprofit Organizations', icon: FaHeart },
    { id: 'community', title: 'Community Groups', icon: FaGlobe },
    { id: 'academic', title: 'Academic Institutions', icon: FaLeaf },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaHandshake className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Collaborating with organizations worldwide to restore forests and empower communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="space-y-16">
          {partnerCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center mb-8">
                <category.icon className="text-primary-600 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partners[category.id].map((partner, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition flex flex-col items-center text-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-20 object-contain mb-4"
                    />
                    <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{partner.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Partner With Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our mission to restore the planet. Whether you're a corporation, nonprofit, or community group, we'd love to collaborate.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg"
            >
              Become a Partner <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;