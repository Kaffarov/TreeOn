// src/pages/public/MobileAppDownload.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaAndroid, FaQrcode, FaTree, FaMapMarkedAlt, FaCertificate, FaBell } from 'react-icons/fa';

const MobileAppDownload = () => {
  const features = [
    { icon: FaTree, title: 'Track Your Trees', description: 'View your planted trees on an interactive map.' },
    { icon: FaMapMarkedAlt, title: 'Geolocation', description: 'Find trees near you and explore global forests.' },
    { icon: FaCertificate, title: 'Digital Certificates', description: 'Download and share your tree planting certificates.' },
    { icon: FaBell, title: 'Push Notifications', description: 'Get updates when your trees are planted or need attention.' },
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
            TreeOn Mobile App
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Take your tree planting journey wherever you go. Available for iOS and Android.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          App Features
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <feature.icon className="text-primary-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Download buttons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Download the App
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="#"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FaApple className="mr-2 text-2xl" />
              <span>App Store</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <FaAndroid className="mr-2 text-2xl" />
              <span>Google Play</span>
            </a>
          </div>

          {/* QR code placeholder */}
          <div className="mt-8">
            <p className="text-gray-600 mb-2">Or scan to download</p>
            <div className="inline-block bg-white p-4 rounded-lg shadow">
              <div className="w-32 h-32 bg-gray-300 flex items-center justify-center">
                <FaQrcode className="text-5xl text-gray-500" />
                <span className="sr-only">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots placeholder */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">App Preview</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-48 h-96 bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/200x400?text=Screenshot+1" alt="App screenshot 1" className="w-full h-full object-cover" />
          </div>
          <div className="w-48 h-96 bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/200x400?text=Screenshot+2" alt="App screenshot 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-48 h-96 bg-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/200x400?text=Screenshot+3" alt="App screenshot 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileAppDownload;