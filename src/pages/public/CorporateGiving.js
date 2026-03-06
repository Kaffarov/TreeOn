// src/pages/public/CorporateGiving.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaHandshake, 
  FaUsers, 
  FaGlobe,
  FaChartLine,
  FaLeaf,
  FaSeedling,
  FaBuilding
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CorporateGiving = () => {
  // Mock stats
  const stats = [
    { icon: FaTree, value: '58K+', label: 'Trees Planted' },
    { icon: FaHandshake, value: '25+', label: 'Corporate Partners' },
    { icon: FaUsers, value: '1.2K', label: 'Employee Volunteers' },
    { icon: FaGlobe, value: '8', label: 'Countries' },
  ];

  // Mock testimonials
  const testimonials = [
    {
      company: 'EcoCorp',
      logo: 'https://via.placeholder.com/150x50?text=EcoCorp',
      quote: 'Partnering with TreeOn has been a highlight of our sustainability efforts. Our employees love the tree planting events.',
      name: 'Jane Smith',
      title: 'CSR Manager',
    },
    {
      company: 'GreenFuture Ltd',
      logo: 'https://via.placeholder.com/150x50?text=GreenFuture',
      quote: 'We offset our carbon footprint through TreeOn’s corporate program. Transparent and impactful.',
      name: 'Mike Johnson',
      title: 'CEO',
    },
  ];

  // Contact form state (optional – you can link to contact page instead)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you! A representative will contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaBuilding className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Corporate Giving</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-200">
              Partner with TreeOn to amplify your environmental impact and engage your employees in meaningful reforestation.
            </p>
          </motion.div>
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

      {/* Why partner */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Why Partner with TreeOn?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaLeaf, title: 'Real Impact', desc: 'Every tree is geotagged and tracked – you’ll see exactly where your contributions go.' },
              { icon: FaUsers, title: 'Employee Engagement', desc: 'Organize tree planting days or virtual events to boost team morale.' },
              { icon: FaChartLine, title: 'CSR Reporting', desc: 'We provide detailed reports and certificates to showcase your environmental commitment.' },
              { icon: FaSeedling, title: 'Custom Projects', desc: 'Tailor projects to your goals – from local forests to global initiatives.' },
              { icon: FaGlobe, title: 'Global Reach', desc: 'Work with farming communities in Africa, Asia, and South America.' },
              { icon: FaHandshake, title: 'Brand Alignment', desc: 'Demonstrate your values and build trust with eco-conscious customers.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <item.icon className="text-primary-600 text-4xl mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-primary-100 p-6 rounded-xl text-center"
          >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTree className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">One-Time Donation</h3>
            <p className="text-gray-600 mb-4">Sponsor a specific number of trees in a project of your choice.</p>
            <p className="text-primary-600 font-semibold">From €5/tree</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-primary-300 p-6 rounded-xl text-center shadow-lg relative"
          >
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">Popular</span>
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Monthly Subscription</h3>
            <p className="text-gray-600 mb-4">Recurring support with predictable impact. Perfect for ongoing CSR.</p>
            <p className="text-primary-600 font-semibold">From €99/month</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-primary-100 p-6 rounded-xl text-center"
          >
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandshake className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Custom Project</h3>
            <p className="text-gray-600 mb-4">Design a bespoke reforestation initiative aligned with your brand.</p>
            <p className="text-primary-600 font-semibold">Tailored quote</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trusted by Leading Companies</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <img src={t.logo} alt={t.company} className="h-10 object-contain mb-4" />
                <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.title}, {t.company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry Form */}
      <section className="py-16 container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Let's Talk</h2>
          <p className="text-gray-600 text-center mb-6">Tell us about your company's goals and we'll create a custom plan.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us about your interests or questions..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition"
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default CorporateGiving;