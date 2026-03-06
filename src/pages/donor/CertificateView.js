// src/pages/donor/CertificateView.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaDownload, 
  FaShare, 
  FaTree, 
  FaLeaf, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaArrowLeft,
  FaPrint
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CertificateView = () => {
  const { id } = useParams();

  // Mock certificate data (in real app, fetch based on id)
  const certificate = {
    id: id || 'CERT-001',
    donorName: 'John Doe',
    certificateType: 'Tree Planting Certificate',
    treeSpecies: 'Oak (Quercus robur)',
    treeId: 'T12345',
    location: 'Nakuru, Kenya',
    coordinates: { lat: -0.3031, lng: 36.0800 },
    plantedDate: '2026-02-15',
    issueDate: '2026-02-20',
    imageUrl: 'https://via.placeholder.com/800x400?text=Oak+Tree',
    message: 'This tree was planted in honor of a greener future.',
    qrCodeUrl: 'https://via.placeholder.com/100x100?text=QR',
  };

  const handleDownload = () => {
    toast.success('Downloading certificate as PDF (mock)');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link
          to="/dashboard/certificates"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Certificates
        </Link>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-8 border-primary-100 print:border-0"
        >
          {/* Certificate Header */}
          <div className="bg-primary-600 text-white text-center py-6 print:bg-primary-200 print:text-gray-800">
            <h1 className="text-3xl font-bold mb-2">TreeOn</h1>
            <p className="text-lg opacity-90">Certificate of Tree Planting</p>
          </div>

          {/* Certificate Body */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wide">This certifies that</p>
              <h2 className="text-3xl font-bold text-gray-800 my-2">{certificate.donorName}</h2>
              <p className="text-gray-600">has planted a tree through TreeOn</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Certificate ID</p>
                  <p className="font-mono text-gray-800">{certificate.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Tree ID</p>
                  <p className="font-mono text-gray-800">{certificate.treeId}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Species</p>
                  <p className="text-gray-800">{certificate.treeSpecies}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-gray-800 flex items-center"><FaMapMarkerAlt className="mr-1 text-primary-500" /> {certificate.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Planted Date</p>
                  <p className="text-gray-800 flex items-center"><FaCalendarAlt className="mr-1 text-primary-500" /> {certificate.plantedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Issue Date</p>
                  <p className="text-gray-800 flex items-center"><FaLeaf className="mr-1 text-primary-500" /> {certificate.issueDate}</p>
                </div>
              </div>
            </div>

            {/* Message */}
            {certificate.message && (
              <div className="text-center italic text-gray-600 mb-6">
                "{certificate.message}"
              </div>
            )}

            {/* Tree Image (optional) */}
            {certificate.imageUrl && (
              <div className="mb-6">
                <img src={certificate.imageUrl} alt="Tree" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}

            {/* QR Code (mock) */}
            <div className="flex justify-center">
              <img src={certificate.qrCodeUrl} alt="QR Code" className="w-24 h-24" />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 flex flex-wrap justify-between items-center text-sm text-gray-500 print:hidden">
            <div className="flex space-x-2">
              <FaTree className="text-primary-500" />
              <span>Verified by TreeOn</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={handleDownload} className="flex items-center text-gray-600 hover:text-primary-600">
                <FaDownload className="mr-1" /> Download
              </button>
              <button onClick={handlePrint} className="flex items-center text-gray-600 hover:text-primary-600">
                <FaPrint className="mr-1" /> Print
              </button>
              <button onClick={handleShare} className="flex items-center text-gray-600 hover:text-primary-600">
                <FaShare className="mr-1" /> Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional info */}
        <div className="mt-8 text-center text-gray-500 text-sm print:hidden">
          <p>This certificate is a digital record of your contribution to reforestation.</p>
          <p>You can verify this certificate on the TreeOn website using the certificate ID.</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;