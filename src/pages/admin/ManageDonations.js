// src/pages/admin/ManageDonations.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDollarSign, 
  FaCreditCard, 
  FaUsers, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaFileExport,
  FaEye,
  FaUndoAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageDonations = () => {
  const [activeTab, setActiveTab] = useState('one-time');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data
  const stats = {
    totalDonations: 285000,
    monthlyRecurring: 18750,
    activeSubscriptions: 1890,
    avgDonation: 48.50,
  };

  const oneTimeDonations = [
    { id: 'DON-001', donor: 'John Smith', amount: 100, date: '2026-03-04', method: 'Credit Card', status: 'completed' },
    { id: 'DON-002', donor: 'Emma Wilson', amount: 250, date: '2026-03-04', method: 'PayPal', status: 'completed' },
    { id: 'DON-003', donor: 'Michael Brown', amount: 50, date: '2026-03-03', method: 'Bank Transfer', status: 'pending' },
    { id: 'DON-004', donor: 'Sophia Garcia', amount: 500, date: '2026-03-03', method: 'Credit Card', status: 'completed' },
    { id: 'DON-005', donor: 'Robert Johnson', amount: 75, date: '2026-03-02', method: 'PayPal', status: 'failed' },
  ];

  const subscriptions = [
    { id: 'SUB-001', donor: 'David Chen', plan: 'Premium', amount: 29.90, startDate: '2026-01-15', nextBilling: '2026-04-15', status: 'active' },
    { id: 'SUB-002', donor: 'Sarah Johnson', plan: 'Standard', amount: 19.90, startDate: '2026-02-01', nextBilling: '2026-05-01', status: 'active' },
    { id: 'SUB-003', donor: 'Maria Santos', plan: 'Basic', amount: 9.90, startDate: '2025-11-10', nextBilling: '2026-03-10', status: 'past_due' },
    { id: 'SUB-004', donor: 'James Lee', plan: 'Premium', amount: 29.90, startDate: '2026-01-20', nextBilling: '2026-04-20', status: 'active' },
    { id: 'SUB-005', donor: 'Lisa Wang', plan: 'Standard', amount: 19.90, startDate: '2025-12-05', nextBilling: '2026-03-05', status: 'cancelled' },
  ];

  const failedPayments = [
    { id: 'PAY-001', donationId: 'DON-005', donor: 'Robert Johnson', amount: 75, date: '2026-03-02', reason: 'Insufficient funds' },
    { id: 'PAY-002', donationId: 'SUB-003', donor: 'Maria Santos', amount: 9.90, date: '2026-03-10', reason: 'Card expired' },
  ];

  const refunds = [
    { id: 'REF-001', donationId: 'DON-002', donor: 'Emma Wilson', amount: 250, date: '2026-03-05', reason: 'Customer request' },
  ];

  const tabs = [
    { id: 'one-time', label: 'One-Time Donations', icon: FaDollarSign, count: oneTimeDonations.length },
    { id: 'subscriptions', label: 'Subscriptions', icon: FaCreditCard, count: subscriptions.length },
    { id: 'failed', label: 'Failed Payments', icon: FaExclamationTriangle, count: failedPayments.length },
    { id: 'refunds', label: 'Refunds', icon: FaUndoAlt, count: refunds.length },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      past_due: 'bg-orange-100 text-orange-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (item) => {
    setSelectedDonation(item);
    setIsDetailsModalOpen(true);
  };

  const handleRefund = (id) => {
    if (window.confirm('Process refund for this donation?')) {
      toast.success(`Refund processed for ${id} (mock)`);
    }
  };

  const handleExport = (format) => {
    toast.success(`Exporting as ${format.toUpperCase()} (mock)`);
  };

  const filteredOneTime = oneTimeDonations.filter(d => 
    (statusFilter === 'all' || d.status === statusFilter) &&
    (d.donor.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubscriptions = subscriptions.filter(s =>
    (statusFilter === 'all' || s.status === statusFilter) &&
    (s.donor.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-3xl font-bold text-gray-800">Manage Donations</h1>
          <p className="text-gray-600 mt-2">View and manage all donations, subscriptions, and payments.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Donations</p>
                <p className="text-2xl font-bold text-gray-800">€{stats.totalDonations.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaDollarSign className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Monthly Recurring</p>
                <p className="text-2xl font-bold text-gray-800">€{stats.monthlyRecurring.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeSubscriptions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Donation</p>
                <p className="text-2xl font-bold text-gray-800">€{stats.avgDonation}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <FaDollarSign className="text-amber-600 text-xl" />
              </div>
            </div>
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
              placeholder="Search by donor or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              {activeTab === 'one-time' && (
                <>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </>
              )}
              {activeTab === 'subscriptions' && (
                <>
                  <option value="active">Active</option>
                  <option value="past_due">Past Due</option>
                  <option value="cancelled">Cancelled</option>
                </>
              )}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Start"
            />
            <span>-</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="End"
            />
          </div>
          <button
            onClick={() => handleExport('csv')}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaFileExport />
            <span>Export</span>
          </button>
        </div>

        {/* Table Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {activeTab === 'one-time' && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOneTime.map(donation => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{donation.id}</td>
                      <td className="px-6 py-4 font-medium">{donation.donor}</td>
                      <td className="px-6 py-4 font-semibold">€{donation.amount}</td>
                      <td className="px-6 py-4">{donation.date}</td>
                      <td className="px-6 py-4">{donation.method}</td>
                      <td className="px-6 py-4">{getStatusBadge(donation.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(donation)}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {donation.status === 'completed' && (
                            <button
                              onClick={() => handleRefund(donation.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Refund"
                            >
                              <FaUndoAlt />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOneTime.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No donations found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscriptions.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{sub.id}</td>
                      <td className="px-6 py-4 font-medium">{sub.donor}</td>
                      <td className="px-6 py-4">{sub.plan}</td>
                      <td className="px-6 py-4 font-semibold">€{sub.amount}</td>
                      <td className="px-6 py-4">{sub.startDate}</td>
                      <td className="px-6 py-4">{sub.nextBilling}</td>
                      <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(sub)}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {sub.status === 'active' && (
                            <button
                              onClick={() => toast.success('Cancel subscription (mock)')}
                              className="text-red-600 hover:text-red-800"
                              title="Cancel"
                            >
                              <FaTimesCircle />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSubscriptions.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No subscriptions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'failed' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {failedPayments.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{payment.id}</td>
                      <td className="px-6 py-4">{payment.donationId}</td>
                      <td className="px-6 py-4 font-medium">{payment.donor}</td>
                      <td className="px-6 py-4 font-semibold">€{payment.amount}</td>
                      <td className="px-6 py-4">{payment.date}</td>
                      <td className="px-6 py-4">{payment.reason}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toast.success('Retry payment (mock)')}
                          className="text-green-600 hover:text-green-800"
                          title="Retry"
                        >
                          <FaCheckCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {refunds.map(refund => (
                    <tr key={refund.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{refund.id}</td>
                      <td className="px-6 py-4">{refund.donationId}</td>
                      <td className="px-6 py-4 font-medium">{refund.donor}</td>
                      <td className="px-6 py-4 font-semibold">€{refund.amount}</td>
                      <td className="px-6 py-4">{refund.date}</td>
                      <td className="px-6 py-4">{refund.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation Details</h2>
            <div className="space-y-3">
              <div><span className="font-semibold">ID:</span> {selectedDonation.id}</div>
              <div><span className="font-semibold">Donor:</span> {selectedDonation.donor}</div>
              <div><span className="font-semibold">Amount:</span> €{selectedDonation.amount}</div>
              <div><span className="font-semibold">Date:</span> {selectedDonation.date}</div>
              {selectedDonation.method && <div><span className="font-semibold">Method:</span> {selectedDonation.method}</div>}
              <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedDonation.status)}</div>
              {selectedDonation.plan && <div><span className="font-semibold">Plan:</span> {selectedDonation.plan}</div>}
              {selectedDonation.nextBilling && <div><span className="font-semibold">Next Billing:</span> {selectedDonation.nextBilling}</div>}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageDonations;