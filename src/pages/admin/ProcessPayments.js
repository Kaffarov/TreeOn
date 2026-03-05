// src/pages/admin/ProcessPayments.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDollarSign, 
  FaCreditCard, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch,
  FaFilter,
  FaEye,
  FaUndoAlt,
  FaFileInvoice,
  FaMoneyBillWave
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ProcessPayments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  // Mock stats
  const stats = {
    totalRevenue: 285000,
    pendingAmount: 12350,
    successfulCount: 1245,
    failedCount: 23,
    refundedCount: 12,
  };

  // Mock payments data
  const payments = [
    { id: 'PAY-001', donor: 'John Smith', amount: 100, date: '2026-03-04', method: 'Credit Card', status: 'completed', transactionId: 'txn_123456' },
    { id: 'PAY-002', donor: 'Emma Wilson', amount: 250, date: '2026-03-04', method: 'PayPal', status: 'completed', transactionId: 'txn_123457' },
    { id: 'PAY-003', donor: 'Michael Brown', amount: 50, date: '2026-03-03', method: 'Bank Transfer', status: 'pending', transactionId: null },
    { id: 'PAY-004', donor: 'Sophia Garcia', amount: 500, date: '2026-03-03', method: 'Credit Card', status: 'completed', transactionId: 'txn_123458' },
    { id: 'PAY-005', donor: 'Robert Johnson', amount: 75, date: '2026-03-02', method: 'PayPal', status: 'failed', transactionId: 'txn_123459' },
    { id: 'PAY-006', donor: 'Maria Santos', amount: 29.90, date: '2026-03-01', method: 'Credit Card', status: 'refunded', transactionId: 'txn_123460' },
    { id: 'PAY-007', donor: 'David Chen', amount: 200, date: '2026-03-05', method: 'Credit Card', status: 'pending', transactionId: null },
    { id: 'PAY-008', donor: 'Sarah Johnson', amount: 150, date: '2026-03-04', method: 'PayPal', status: 'completed', transactionId: 'txn_123461' },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', icon: FaHourglassHalf, count: payments.filter(p => p.status === 'pending').length },
    { id: 'completed', label: 'Completed', icon: FaCheckCircle, count: payments.filter(p => p.status === 'completed').length },
    { id: 'failed', label: 'Failed', icon: FaTimesCircle, count: payments.filter(p => p.status === 'failed').length },
    { id: 'refunded', label: 'Refunded', icon: FaUndoAlt, count: payments.filter(p => p.status === 'refunded').length },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const handleProcessPayment = (payment) => {
    setSelectedPayment(payment);
    setIsProcessModalOpen(true);
  };

  const handleMarkAsCompleted = (id) => {
    toast.success(`Payment ${id} marked as completed (mock)`);
    // In real app, you'd update the status via API
  };

  const handleRefund = (id) => {
    if (window.confirm('Process refund for this payment?')) {
      toast.success(`Refund initiated for ${id} (mock)`);
    }
  };

  const filteredPayments = payments.filter(p => 
    (activeTab === 'pending' ? p.status === 'pending' :
     activeTab === 'completed' ? p.status === 'completed' :
     activeTab === 'failed' ? p.status === 'failed' :
     activeTab === 'refunded' ? p.status === 'refunded' : true) &&
    (p.donor.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (p.transactionId && p.transactionId.toLowerCase().includes(searchTerm.toLowerCase())))
  );

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
          <h1 className="text-3xl font-bold text-gray-800">Process Payments</h1>
          <p className="text-gray-600 mt-2">Manage and process all financial transactions.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">€{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">€{stats.pendingAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.successfulCount}</div>
            <div className="text-sm text-gray-500">Successful</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.failedCount}</div>
            <div className="text-sm text-gray-500">Failed</div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.refundedCount}</div>
            <div className="text-sm text-gray-500">Refunded</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
                <span className="ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by donor, ID, transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500">
              <option>All Methods</option>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{payment.id}</td>
                    <td className="px-6 py-4 font-medium">{payment.donor}</td>
                    <td className="px-6 py-4 font-semibold">€{payment.amount}</td>
                    <td className="px-6 py-4">{payment.date}</td>
                    <td className="px-6 py-4">{payment.method}</td>
                    <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                    <td className="px-6 py-4 font-mono text-sm">{payment.transactionId || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleViewDetails(payment)} className="text-blue-600 hover:text-blue-800" title="View Details"><FaEye /></button>
                        {payment.status === 'pending' && (
                          <>
                            <button onClick={() => handleMarkAsCompleted(payment.id)} className="text-green-600 hover:text-green-800" title="Mark Completed"><FaCheckCircle /></button>
                            <button onClick={() => handleProcessPayment(payment)} className="text-primary-600 hover:text-primary-800" title="Process"><FaMoneyBillWave /></button>
                          </>
                        )}
                        {payment.status === 'completed' && (
                          <button onClick={() => handleRefund(payment.id)} className="text-purple-600 hover:text-purple-800" title="Refund"><FaUndoAlt /></button>
                        )}
                        {payment.status === 'failed' && (
                          <button onClick={() => handleMarkAsCompleted(payment.id)} className="text-green-600 hover:text-green-800" title="Retry"><FaCreditCard /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr><td colSpan="8" className="px-6 py-8 text-center text-gray-500">No payments found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
            <div className="space-y-3">
              <div><span className="font-semibold">ID:</span> {selectedPayment.id}</div>
              <div><span className="font-semibold">Donor:</span> {selectedPayment.donor}</div>
              <div><span className="font-semibold">Amount:</span> €{selectedPayment.amount}</div>
              <div><span className="font-semibold">Date:</span> {selectedPayment.date}</div>
              <div><span className="font-semibold">Method:</span> {selectedPayment.method}</div>
              <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedPayment.status)}</div>
              <div><span className="font-semibold">Transaction ID:</span> {selectedPayment.transactionId || '—'}</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsDetailsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Close</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Process Payment Modal (manual) */}
      {isProcessModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Process Payment</h2>
            <p className="text-gray-600 mb-4">Manually process payment for {selectedPayment.donor} (€{selectedPayment.amount}).</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter transaction ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows="3" className="w-full px-3 py-2 border rounded-lg" placeholder="Optional notes"></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setIsProcessModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={() => { toast.success('Payment processed (mock)'); setIsProcessModalOpen(false); }} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Process</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProcessPayments;