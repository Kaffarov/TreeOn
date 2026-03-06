// src/pages/public/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaLeaf, 
  FaMapMarkedAlt, 
  FaHandsHelping, 
  FaQuoteRight,
  FaArrowRight,
  FaSeedling,
  FaGlobeAmericas,
  FaUserFriends
} from 'react-icons/fa';

const Homepage = () => {
  // Stats data
  const stats = [
    { icon: FaTree, value: '50,000+', label: 'Trees Planted' },
    { icon: FaUserFriends, value: '5,000+', label: 'Active Donors' },
    { icon: FaHandsHelping, value: '200+', label: 'Partner Farmers' },
    { icon: FaGlobeAmericas, value: '12', label: 'Countries' },
  ];

  // How it works steps
  const steps = [
    { icon: FaSeedling, title: 'Choose Trees', description: 'Select a one-time donation or subscribe monthly.' },
    { icon: FaMapMarkedAlt, title: 'We Plant & Geotag', description: 'Your trees are planted and mapped for you to track.' },
    { icon: FaLeaf, title: 'Track Impact', description: 'See your CO₂ offset and the forest you\'re growing.' },
  ];

  // Subscription plans
  const plans = [
    { 
      name: 'Basic', 
      price: '9.90', 
      trees: 9, 
      co2: '2 tons', 
      features: ['9 trees/year', '2+ countries', '2 tons CO₂'],
      bg: 'bg-white',
      border: 'border-gray-200'
    },
    { 
      name: 'Standard', 
      price: '19.90', 
      trees: 18, 
      co2: '4 tons', 
      features: ['18 trees/year', '3+ states', '4 tons CO₂', '1 limited edition', '2 exclusive species'],
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      popular: true
    },
    { 
      name: 'Premium', 
      price: '29.90', 
      trees: 24, 
      co2: '6 tons', 
      features: ['24 trees/year', '5+ states', '6 tons CO₂', '2 limited editions', '3 exclusive species'],
      bg: 'bg-white',
      border: 'border-gray-200'
    },
  ];

  // Farmer spotlight
  const farmerSpotlight = {
    name: 'Maria Santos',
    location: 'Philippines',
    story: 'Since joining TreeOn, I’ve planted over 300 trees on my land. They’ve restored the soil and now provide fruit for my family and income for my community.',
    image: 'https://via.placeholder.com/400x300?text=Farmer+Maria'
  };

  // Testimonials
  const testimonials = [
    { 
      name: 'David Chen', 
      role: 'Monthly Donor', 
      quote: 'TreeOn makes it so easy to see the impact of my subscription. I love getting updates and seeing my trees on the map.',
      avatar: 'https://via.placeholder.com/60x60?text=DC'
    },
    { 
      name: 'Sarah Johnson', 
      role: 'One-time Donor', 
      quote: 'I gifted trees to my family for Christmas. They were thrilled to receive the geotagged certificates. Amazing experience!',
      avatar: 'https://via.placeholder.com/60x60?text=SJ'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Plant Trees, <br />
                <span className="text-primary-200">Save the Planet</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-xl mx-auto md:mx-0">
                Join a global community restoring forests, empowering farmers, and fighting climate change – one tree at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/donate"
                  className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 text-center"
                >
                  Plant Your First Tree
                </Link>
                <Link
                  to="/impact"
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition text-center"
                >
                  See Our Impact
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <img 
                src="https://via.placeholder.com/600x400?text=Tree+Planting+Hero" 
                alt="Tree planting"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to start making a difference.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <step.icon className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monthly subscriptions that maximize your impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl shadow-lg p-6 border-2 ${plan.border} ${plan.bg} ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                      <FaLeaf className="text-primary-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/subscribe/${plan.name.toLowerCase()}`}
                  className={`block text-center font-semibold py-3 px-4 rounded-lg transition ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            All plans include geotagged trees and a personalized impact dashboard.
          </p>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-primary-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Explore Our Global Forest</h2>
              <p className="text-lg mb-6 text-primary-100">
                Every tree we plant is geotagged and publicly visible. Zoom in to see individual trees, their species, and planting date.
              </p>
              <Link
                to="/map"
                className="inline-flex items-center bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Open Full Map <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="lg:w-1/2 bg-gray-300 h-64 lg:h-auto">
              <img 
                src="https://via.placeholder.com/600x400?text=Interactive+Map+Preview" 
                alt="Map preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Farmer Spotlight</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the people nurturing our forests.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src={farmerSpotlight.image} 
                  alt={farmerSpotlight.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-8">
                <div className="flex items-center mb-4">
                  <FaQuoteRight className="text-primary-300 text-4xl mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{farmerSpotlight.name}</h3>
                    <p className="text-primary-600">{farmerSpotlight.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{farmerSpotlight.story}"
                </p>
                <Link
                  to="/farmers"
                  className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center"
                >
                  Meet more farmers <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Donors and partners share their experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-primary-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of others in restoring our planet. Plant your first tree today.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 text-lg"
          >
            Plant Your First Tree
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;