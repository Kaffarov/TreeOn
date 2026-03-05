// src/pages/admin/VerifyReports.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaTree, 
  FaUserTie, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const VerifyReports = () => {
  const [activeTab, setActiveTab] = useState('death');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock stats
  const stats = {
    deathPending: 12,
    replacementPending: 8,
    verifiedToday: 5,
    totalPending: 23,
  };

  // Mock reports data
  const deathReports = [
    { id: 'DR001', treeId: 'T12345', farmer: 'Maria Santos', date: '2026-03-04', reason: 'Drought', status: 'pending', notes: 'Tree dried up' },
    { id: 'DR002', treeId: 'T12346', farmer: 'John Kamau', date: '2026-03-03', reason: 'Disease', status: 'pending', notes: 'Fungal infection' },
    { id: 'DR003', treeId: 'T12347', farmer: 'Carlos Rodriguez', date: '2026-03-02', reason: 'Animal damage', status: 'verified', notes: 'Eaten by goats' },
    { id: 'DR004', treeId: 'T12348', farmer: 'Dewi Lestari', date: '2026-03-01', reason: 'Flood', status: 'rejected', notes: 'No flood reported' },
  ];

  const replacementReports = [
    { id: 'RR001', originalTreeId: 'T12345', farmer: 'Maria Santos', date: '2026-03-04', reason: 'Death verified', status: 'pending', notes: 'Awaiting new tree' },
    { id: 'RR002', originalTreeId: 'T12347', farmer: 'Carlos Rodriguez', date: '2026-03-03', reason: 'Death verified', status: 'pending', notes: 'Need to assign new badge' },
    { id: 'RR003', originalTreeId: 'T12349', farmer: 'Tsegaye Abera', date: '2026-02-28', reason: 'Farmer request', status: 'completed', notes: 'Replaced with oak' },
  ];

  const otherReports = [
    { id: 'OR001', reporter: 'Ana Silva', type: 'Issue with geotag', date: '2026-03-04', status: 'pending', notes: 'Coordinates wrong' },
    { id: 'OR002', reporter: 'Admin', type: 'System error', date: '2026-03-03', status: 'verified', notes: 'Fixed' },
  ];

  const tabs = [
    { id: 'death', label: 'Death Reports', icon: FaExclamationTriangle, count: deathReports.filter(r => r.status === 'pending').length },
    { id: 'replacement', label: 'Replacement Requests', icon: FaTree, count: replacementReports.filter(r => r.status === 'pending').length },
    { id: 'other', label: 'Other Reports', icon: FaHourglassHalf, count: otherReports.filter(r => r.status === 'pending').length },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailsModalOpen(true);
  };

  const handleVerify = (id) => {
    toast.success(`Report ${id} verified (mock)`);
  };

  const handleReject = (id) => {
    toast.error(`Report ${id} rejected (mock)`);
  };

  const filteredDeath = deathReports.filter(r => 
    (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.treeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredReplacement = replacementReports.filter(r => 
    (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.originalTreeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredOther = otherReports.filter(r => 
    (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.type.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-3xl font-bold text-gray-800">Verify Reports</h1>
          <p className="text-gray-600 mt-2">Review and verify incoming reports from farmers and system.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalPending}</div>
            <div className="text-sm text-gray-500">Total Pending</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.deathPending}</div>
            <div className="text-sm text-gray-500">Death Reports</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.replacementPending}</div>
            <div className="text-sm text-gray-500">Replacements</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.verifiedToday}</div>
            <div className="text-sm text-gray-500">Verified Today</div>
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
                {tab.count > 0 && (
                  <span className="ml-1 text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">{tab.count}</span>
                )}
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {activeTab === 'death' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tree ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDeath.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{report.id}</td>
                      <td className="px-6 py-4">{report.treeId}</td>
                      <td className="px-6 py-4">{report.farmer}</td>
                      <td className="px-6 py-4">{report.date}</td>
                      <td className="px-6 py-4">{report.reason}</td>
                      <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(report)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          {report.status === 'pending' && (
                            <>
                              <button onClick={() => handleVerify(report.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                              <button onClick={() => handleReject(report.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDeath.length === 0 && <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No death reports found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'replacement' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original Tree</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReplacement.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{report.id}</td>
                      <td className="px-6 py-4">{report.originalTreeId}</td>
                      <td className="px-6 py-4">{report.farmer}</td>
                      <td className="px-6 py-4">{report.date}</td>
                      <td className="px-6 py-4">{report.reason}</td>
                      <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(report)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          {report.status === 'pending' && (
                            <>
                              <button onClick={() => handleVerify(report.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                              <button onClick={() => handleReject(report.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredReplacement.length === 0 && <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No replacement requests found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'other' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOther.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{report.id}</td>
                      <td className="px-6 py-4">{report.reporter}</td>
                      <td className="px-6 py-4">{report.type}</td>
                      <td className="px-6 py-4">{report.date}</td>
                      <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(report)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          {report.status === 'pending' && (
                            <>
                              <button onClick={() => handleVerify(report.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                              <button onClick={() => handleReject(report.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOther.length === 0 && <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No other reports found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Details</h2>
            <div className="space-y-3">
              {Object.entries(selectedReport).map(([key, value]) => {
                if (key === 'id') return null;
                return (
                  <div key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value || '—'}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsDetailsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VerifyReports;
