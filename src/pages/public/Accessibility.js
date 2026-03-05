// src/pages/public/Accessibility.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversalAccess, FaKeyboard, FaAdjust, FaTextHeight, FaVolumeUp, FaEnvelope } from 'react-icons/fa';

const Accessibility = () => {
  const features = [
    { icon: FaKeyboard, title: 'Keyboard Navigation', description: 'Full keyboard accessibility – navigate using Tab, Enter, and arrow keys.' },
    { icon: FaAdjust, title: 'High Contrast Mode', description: 'Sufficient color contrast for users with visual impairments.' },
    { icon: FaTextHeight, title: 'Resizable Text', description: 'Text can be resized up to 200% without loss of functionality.' },
    { icon: FaVolumeUp, title: 'Screen Reader Compatible', description: 'Semantic HTML and ARIA labels for screen reader support.' },
    { icon: FaUniversalAccess, title: 'WCAG 2.1 AA', description: 'We aim to meet Web Content Accessibility Guidelines 2.1 Level AA.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaUniversalAccess className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              TreeOn is committed to making our website accessible to everyone, regardless of ability or technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Our Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              TreeOn believes that everyone should be able to participate in creating a greener planet. We are continuously working to improve the accessibility of our website to ensure that all users, including those with disabilities, can access and interact with our content and services with ease.
            </p>
          </motion.div>

          {/* Standards Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Standards Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines outline how to make web content more accessible for people with disabilities.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
              <p className="text-gray-700">
                <strong>Conformance status:</strong> The TreeOn website is partially conformant with WCAG 2.1 Level AA. Partially conformant means that some parts of the content may not fully conform to the accessibility standard, but we are actively working to address any issues.
              </p>
            </div>
          </motion.div>

          {/* Accessibility Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Accessibility Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg flex items-start">
                  <feature.icon className="text-primary-500 text-2xl mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Known Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Known Limitations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we aim for full compliance, some older content or third-party components may not yet be fully accessible. We are prioritizing fixes for these issues. Known limitations include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Some PDF documents may not be fully screen-reader accessible.</li>
              <li>Interactive maps may have limited keyboard navigation.</li>
              <li>Videos may lack captions for all languages.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              If you encounter any barrier, please let us know – we'll work to resolve it promptly.
            </p>
          </motion.div>

          {/* Feedback & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-primary-50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">We Value Your Feedback</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have difficulty using any part of our website, or if you have suggestions for improvement, please contact us. We welcome your input and will do our best to accommodate your needs.
            </p>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-primary-500 text-2xl" />
              <a href="mailto:accessibility@treeon.org" className="text-primary-600 hover:underline text-lg font-medium">
                accessibility@treeon.org
              </a>
            </div>
            <p className="text-gray-600 mt-4">
              Or call us at <a href="tel:+1234567890" className="text-primary-600 hover:underline">+1 (234) 567-890</a> (Monday–Friday, 9am–6pm).
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Accessibility;
