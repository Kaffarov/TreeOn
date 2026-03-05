// src/pages/public/CountryImpact.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaLeaf, 
  FaHandsHelping, 
  FaGlobeAmericas,
  FaMapMarkedAlt
} from 'react-icons/fa';

const CountryImpact = () => {
  const countries = [
    { 
      name: 'Kenya', 
      flag: '🇰🇪', 
      trees: 15420, 
      farmers: 87, 
      co2: 385, 
      hectares: 62,
      description: 'Restoring savanna and community forests.'
    },
    { 
      name: 'Brazil', 
      flag: '🇧🇷', 
      trees: 28350, 
      farmers: 124, 
      co2: 708, 
      hectares: 113,
      description: 'Protecting Amazon rainforest corridors.'
    },
    { 
      name: 'Philippines', 
      flag: '🇵🇭', 
      trees: 12580, 
      farmers: 63, 
      co2: 314, 
      hectares: 50,
      description: 'Mangrove and upland reforestation.'
    },
    { 
      name: 'Indonesia', 
      flag: '🇮🇩', 
      trees: 18940, 
      farmers: 92, 
      co2: 473, 
      hectares: 76,
      description: 'Borneo rainforest restoration.'
    },
    { 
      name: 'Ethiopia', 
      flag: '🇪🇹', 
      trees: 10230, 
      farmers: 55, 
      co2: 255, 
      hectares: 41,
      description: 'Highland forest regeneration.'
    },
    { 
      name: 'Colombia', 
      flag: '🇨🇴', 
      trees: 8760, 
      farmers: 41, 
      co2: 219, 
      hectares: 35,
      description: 'Andean cloud forest protection.'
    },
    { 
      name: 'India', 
      flag: '🇮🇳', 
      trees: 21450, 
      farmers: 118, 
      co2: 536, 
      hectares: 86,
      description: 'Western Ghats biodiversity hotspot.'
    },
    { 
      name: 'Madagascar', 
      flag: '🇲🇬', 
      trees: 6540, 
      farmers: 29, 
      co2: 163, 
      hectares: 26,
      description: 'Endemic species habitat restoration.'
    },
  ];

  const totalStats = countries.reduce(
    (acc, c) => {
      acc.trees += c.trees;
      acc.farmers += c.farmers;
      acc.co2 += c.co2;
      acc.hectares += c.hectares;
      return acc;
    },
    { trees: 0, farmers: 0, co2: 0, hectares: 0 }
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Global Impact by Country
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-primary-100"
          >
            See where your support is making a difference. We're planting trees across multiple continents, working with local farmers to restore ecosystems.
          </motion.p>
        </div>
      </section>

      {/* World Map Placeholder (optional interactive) */}
      <section className="py-12 container mx-auto px-4">
        <div className="bg-gray-100 rounded-2xl p-6 shadow-inner">
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
            <FaMapMarkedAlt className="text-primary-500 text-2xl" />
            <h2 className="text-2xl font-semibold">Countries We Work In</h2>
          </div>
          <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src="https://via.placeholder.com/1200x400?text=World+Map+Highlighting+TreeOn+Countries" 
              alt="World map with TreeOn countries"
              className="w-full h-full object-cover"
            />
            {/* You could integrate a library like react-simple-maps or leaflet here */}
          </div>
          <p className="text-center text-gray-500 mt-4">
            Interactive map coming soon. Currently active in {countries.length} countries.
          </p>
        </div>
      </section>

      {/* Global Stats Summary */}
      <section className="py-8 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-primary-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary-600">{totalStats.trees.toLocaleString()}+</div>
            <div className="text-gray-600">Trees Planted</div>
          </div>
          <div className="bg-leaf-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary-600">{totalStats.farmers}+</div>
            <div className="text-gray-600">Partner Farmers</div>
          </div>
          <div className="bg-earth-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary-600">{totalStats.co2.toLocaleString()} tons</div>
            <div className="text-gray-600">CO₂ Offset</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary-600">{totalStats.hectares.toLocaleString()} ha</div>
            <div className="text-gray-600">Land Restored</div>
          </div>
        </div>
      </section>

      {/* Country Cards Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Country-by-Country Impact</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
            >
              <div className="h-2 bg-primary-500"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{country.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{country.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center"><FaTree className="mr-1 text-primary-500" /> Trees:</span>
                    <span className="font-semibold text-gray-800">{country.trees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center"><FaHandsHelping className="mr-1 text-primary-500" /> Farmers:</span>
                    <span className="font-semibold text-gray-800">{country.farmers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center"><FaLeaf className="mr-1 text-primary-500" /> CO₂ offset:</span>
                    <span className="font-semibold text-gray-800">{country.co2} tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 flex items-center"><FaGlobeAmericas className="mr-1 text-primary-500" /> Hectares:</span>
                    <span className="font-semibold text-gray-800">{country.hectares} ha</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 text-right">
                <a 
                  href={`/countries/${country.name.toLowerCase()}`} 
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                >
                  View details <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Help Us Expand Our Reach</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every donation helps us plant more trees in these countries and beyond. Join us in making a global impact.
          </p>
          <a
            href="/donate"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 text-lg"
          >
            Plant Trees Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default CountryImpact;