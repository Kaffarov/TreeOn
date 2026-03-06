// src/pages/donor/BillingHistory.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileInvoiceDollar, 
  FaDownload, 
  FaEye, 
  FaCalendarAlt,
  FaDollarSign,
  FaCreditCard,
  FaSearch
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const BillingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock billing data
  const billingData = [
    { id: 'INV-001', date: '2026-03-01', description: 'Monthly subscription - Premium', amount: 29.90, status: 'paid', invoiceUrl: '#' },
    { id: 'INV-002', date: '2026-02-01', description: 'Monthly subscription - Premium', amount: 29.90, status: 'paid', invoiceUrl: '#' },
    { id: 'INV-003', date: '2026-01-01', description: 'Monthly subscription - Premium', amount: 29.90, status: 'paid', invoiceUrl: '#' },
    { id: 'INV-004', date: '2025-12-01', description: 'Monthly subscription - Premium', amount: 29.90, status: 'paid', invoiceUrl: '#' },
    { id: 'INV-005', date: '2025-11-15', description: 'One-time donation - 5 trees', amount: 50.00, status: 'paid', invoiceUrl: '#' },
    { id: 'INV-006', date: '2025-10-20', description: 'Gift trees to Maria', amount: 75.00, status: 'paid', invoiceUrl: '#' },
  ];

  // Summary stats
  const totalPaid = billingData.reduce((acc, inv) => acc + inv.amount, 0);
  const lastPayment = billingData[0]?.amount || 0;
  const nextBilling = '2026-04-01'; // mock

  const filteredBilling = billingData.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (invoiceId) => {
    toast.success(`Downloading invoice ${invoiceId} (mock)`);
  };

  const handleView = (invoiceId) => {
    toast.success(`Viewing invoice ${invoiceId} (mock)`);
  };

  const getStatusBadge = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
          <h1 className="text-3xl font-bold text-gray-800">Billing History</h1>
          <p className="text-gray-600 mt-2">View and download your past invoices.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaDollarSign className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Paid</p>
                <p className="text-2xl font-bold text-gray-800">€{totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Payment</p>
                <p className="text-2xl font-bold text-gray-800">€{lastPayment.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Next Billing</p>
                <p className="text-2xl font-bold text-gray-800">{nextBilling}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <FaFileInvoiceDollar className="text-amber-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-800">{billingData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Billing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBilling.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{item.id}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4 font-semibold">€{item.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(item.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Download PDF"
                        >
                          <FaDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBilling.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No billing records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BillingHistory;