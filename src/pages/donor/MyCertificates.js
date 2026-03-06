// src/pages/donor/MyCertificates.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCertificate, FaDownload, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MyCertificates = () => {
  // Mock certificates data
  const certificates = [
    { id: 'CERT-001', title: 'Tree Planting Certificate', date: '2026-02-20', treeSpecies: 'Oak', imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+1' },
    { id: 'CERT-002', title: 'Tree Planting Certificate', date: '2026-01-15', treeSpecies: 'Mahogany', imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+2' },
    { id: 'CERT-003', title: 'Gift Certificate', date: '2025-12-10', treeSpecies: 'Mangrove', imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+3' },
    { id: 'CERT-004', title: 'Tree Planting Certificate', date: '2025-11-05', treeSpecies: 'Pine', imageUrl: 'https://via.placeholder.com/300x200?text=Certificate+4' },
  ];

  const handleDownload = (id) => {
    toast.success(`Downloading certificate ${id} (mock)`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">My Certificates</h1>
          <p className="text-gray-600 mt-2">View and download your tree planting certificates.</p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img src={cert.imageUrl} alt={cert.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <FaCertificate className="text-primary-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">{cert.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Certificate ID:</span> {cert.id}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Tree Species:</span> {cert.treeSpecies}
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaCalendarAlt className="mr-1" />
                  {cert.date}
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/dashboard/certificate/${cert.id}`}
                    className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-1 text-sm"
                  >
                    <FaEye />
                    <span>View</span>
                  </Link>
                  <button
                    onClick={() => handleDownload(cert.id)}
                    className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center space-x-1 text-sm"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCertificates;
