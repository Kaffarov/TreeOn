// src/pages/farmer/ReplacementStatus.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTree, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaHourglassHalf,
  FaEye,
  FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ReplacementStatus = () => {
  // Mock replacement requests data
  const [requests, setRequests] = useState([
    { id: 'RR001', originalTree: 'T12345', reportedDate: '2026-03-01', status: 'pending', reason: 'Drought', notes: 'Tree dried up completely' },
    { id: 'RR002', originalTree: 'T12347', reportedDate: '2026-02-25', status: 'verified', reason: 'Disease', notes: 'Fungal infection, verified by planter' },
    { id: 'RR003', originalTree: 'T12348', reportedDate: '2026-02-20', status: 'approved', reason: 'Animal damage', notes: 'Approved, new tree assigned' },
    { id: 'RR004', originalTree: 'T12350', reportedDate: '2026-02-15', status: 'completed', newTree: 'T12355', completionDate: '2026-02-28', reason: 'Flood' },
    { id: 'RR005', originalTree: 'T12346', reportedDate: '2026-02-10', status: 'rejected', reason: 'No evidence', notes: 'Rejected after verification' },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats
  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    verified: requests.filter(r => r.status === 'verified').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    total: requests.length,
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCancelRequest = (id) => {
    if (window.confirm('Are you sure you want to cancel this replacement request?')) {
      setRequests(prev => prev.filter(r => r.id !== id));
      toast.success('Request cancelled');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`${colors[status]} px-2 py-1 rounded-full text-xs font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaHourglassHalf className="text-yellow-500" />;
      case 'verified': return <FaExclamationTriangle className="text-blue-500" />;
      case 'approved': return <FaCheckCircle className="text-green-500" />;
      case 'completed': return <FaCheckCircle className="text-green-500" />;
      case 'rejected': return <FaTimesCircle className="text-red-500" />;
      default: return null;
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Replacement Status</h1>
          <p className="text-gray-600 mt-2">Track your tree replacement requests.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.verified}</p>
            <p className="text-xs text-gray-500">Verified</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-xs text-gray-500">Approved</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-xs text-gray-500">Rejected</p>
          </div>
        </motion.div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Tree</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{req.id}</td>
                    <td className="px-6 py-4">{req.originalTree}</td>
                    <td className="px-6 py-4">{req.reportedDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(req.status)}
                        {getStatusBadge(req.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4">{req.reason}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(req)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {req.status === 'pending' && (
                          <button
                            onClick={() => handleCancelRequest(req.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel Request"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No replacement requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Replacement Request Details</h2>
              <div className="space-y-3">
                <div><span className="font-semibold">Request ID:</span> {selectedRequest.id}</div>
                <div><span className="font-semibold">Original Tree:</span> {selectedRequest.originalTree}</div>
                <div><span className="font-semibold">Reported Date:</span> {selectedRequest.reportedDate}</div>
                <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedRequest.status)}</div>
                <div><span className="font-semibold">Reason:</span> {selectedRequest.reason}</div>
                {selectedRequest.notes && (
                  <div><span className="font-semibold">Notes:</span> {selectedRequest.notes}</div>
                )}
                {selectedRequest.newTree && (
                  <div><span className="font-semibold">New Tree ID:</span> {selectedRequest.newTree}</div>
                )}
                {selectedRequest.completionDate && (
                  <div><span className="font-semibold">Completion Date:</span> {selectedRequest.completionDate}</div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReplacementStatus;