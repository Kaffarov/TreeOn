// src/pages/public/PressKit.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaEnvelope } from 'react-icons/fa';

const PressKit = () => {
  // Mock press releases
  const pressReleases = [
    { id: 1, title: 'TreeOn Reaches 50,000 Trees Planted', date: '2026-02-15', pdf: '#' },
    { id: 2, title: 'New Partnership with Global Reforestation Initiative', date: '2026-01-20', pdf: '#' },
    { id: 3, title: 'TreeOn Launches Mobile App', date: '2025-12-10', pdf: '#' },
    { id: 4, title: 'Annual Impact Report 2025 Released', date: '2025-11-05', pdf: '#' },
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
            Press Kit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Resources for journalists, bloggers, and media professionals.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo & Brand Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Logo & Brand Assets</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-600">TreeOn</span>
                </div>
                <p className="text-gray-600 mb-3">Full Color Logo (PNG)</p>
                <button className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                  <FaDownload className="mr-2" /> Download
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">TreeOn</span>
                </div>
                <p className="text-gray-600 mb-3">White Logo (PNG)</p>
                <button className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                  <FaDownload className="mr-2" /> Download
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              By downloading these assets, you agree to our brand guidelines. For vector files, please contact us.
            </p>
          </motion.div>

          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Press Releases</h2>
            <div className="space-y-3">
              {pressReleases.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <a
                    href={item.pdf}
                    className="text-primary-600 hover:text-primary-700 flex items-center"
                  >
                    <FaFilePdf className="mr-1" /> PDF
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fact Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fact Sheet</h2>
            <div className="bg-primary-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-semibold">Founded:</span> 2020</li>
                <li><span className="font-semibold">Trees Planted:</span> 58,000+</li>
                <li><span className="font-semibold">Countries:</span> 12</li>
                <li><span className="font-semibold">Partner Farmers:</span> 287</li>
                <li><span className="font-semibold">Headquarters:</span> Amsterdam, Netherlands</li>
                <li><span className="font-semibold">Website:</span> treeon.org</li>
              </ul>
              <button className="mt-4 inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                <FaDownload className="mr-2" /> Download Fact Sheet (PDF)
              </button>
            </div>
          </motion.div>

          {/* Media Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Media Contact</h2>
            <div className="flex items-start">
              <FaEnvelope className="text-primary-500 text-2xl mr-3 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Press & Media Inquiries</p>
                <a href="mailto:press@treeon.org" className="text-primary-600 hover:underline">press@treeon.org</a>
                <p className="text-sm text-gray-500 mt-1">+31 (0)20 123 4567</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PressKit;