// src/pages/public/DonationReceipt.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDownload, FaPrint, FaArrowLeft, FaTree, FaHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DonationReceipt = () => {
  const { id } = useParams();

  // Mock receipt data (in real app, fetch based on id)
  const receipt = {
    id: id || 'RCP-123456',
    date: '2026-03-05',
    donorName: 'John Doe',
    donorEmail: 'john.doe@example.com',
    amount: 50.00,
    trees: 10,
    paymentMethod: 'Credit Card (Visa •••• 4242)',
    status: 'Completed',
    transactionId: 'txn_1J2K3L4M5N6P',
  };

  const handleDownload = () => {
    toast.success('Downloading receipt as PDF (mock)');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition print:hidden"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border print:shadow-none"
        >
          {/* Header */}
          <div className="bg-primary-600 text-white text-center py-6 print:bg-primary-200 print:text-gray-800">
            <h1 className="text-3xl font-bold mb-2">Donation Receipt</h1>
            <p className="text-sm opacity-90">Thank you for your support!</p>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-500 text-sm">Receipt Number</p>
                <p className="font-mono text-gray-800 text-lg">{receipt.id}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Date</p>
                <p className="text-gray-800">{receipt.date}</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Donor Name</p>
                  <p className="text-gray-800 font-semibold">{receipt.donorName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Donor Email</p>
                  <p className="text-gray-800">{receipt.donorEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Amount</p>
                  <p className="text-2xl font-bold text-primary-600">€{receipt.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Trees Planted</p>
                  <p className="text-gray-800 flex items-center"><FaTree className="mr-1 text-primary-500" /> {receipt.trees}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="text-gray-800">{receipt.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Transaction ID</p>
                  <p className="font-mono text-sm text-gray-800">{receipt.transactionId}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {receipt.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer message */}
            <div className="text-center text-gray-600 italic">
              <FaHeart className="inline text-red-500 mr-1" /> Your donation helps us restore forests and empower communities.
            </div>
          </div>

          {/* Actions (hidden when printing) */}
          <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-4 print:hidden">
            <button
              onClick={handleDownload}
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              <FaDownload className="mr-1" /> Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              <FaPrint className="mr-1" /> Print
            </button>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="mt-8 text-center text-gray-500 text-sm print:hidden">
          <p>This receipt is for your records. A copy has been sent to your email.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationReceipt;