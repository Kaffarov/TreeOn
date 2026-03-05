// src/pages/admin/ManageNursery.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSeedling, 
  FaTree, 
  FaTag, 
  FaHeartbeat,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageNursery = () => {
  const [activeTab, setActiveTab] = useState('seedlings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    badgeId: '',
    species: '',
    nursingStartDate: '',
    healthStatus: 'healthy',
    notes: '',
  });

  // Mock stats
  const stats = {
    totalSeedlings: 1250,
    readyForPlanting: 342,
    healthy: 980,
    underTreatment: 180,
    recentlyPlanted: 128,
  };

  // Mock seedlings data
  const seedlings = [
    { id: 'S001', badgeId: 'B001', species: 'Oak', nursingStart: '2026-01-15', healthStatus: 'healthy', readyDate: '2026-04-15', notes: 'Fast growth' },
    { id: 'S002', badgeId: 'B002', species: 'Mahogany', nursingStart: '2026-01-20', healthStatus: 'healthy', readyDate: '2026-05-20', notes: '' },
    { id: 'S003', badgeId: 'B003', species: 'Mangrove', nursingStart: '2026-02-01', healthStatus: 'underTreatment', readyDate: '2026-06-01', notes: 'Fungal infection' },
    { id: 'S004', badgeId: 'B004', species: 'Pine', nursingStart: '2026-02-10', healthStatus: 'healthy', readyDate: '2026-05-10', notes: '' },
    { id: 'S005', badgeId: 'B005', species: 'Teak', nursingStart: '2026-02-15', healthStatus: 'healthy', readyDate: '2026-06-15', notes: '' },
  ];

  // Mock badges data
  const badges = [
    { id: 'B001', assignedTo: 'S001', qrCode: 'QR12345', issuedDate: '2026-01-15', status: 'assigned' },
    { id: 'B002', assignedTo: 'S002', qrCode: 'QR12346', issuedDate: '2026-01-20', status: 'assigned' },
    { id: 'B003', assignedTo: 'S003', qrCode: 'QR12347', issuedDate: '2026-02-01', status: 'assigned' },
    { id: 'B004', assignedTo: null, qrCode: 'QR12348', issuedDate: '2026-02-05', status: 'available' },
    { id: 'B005', assignedTo: null, qrCode: 'QR12349', issuedDate: '2026-02-10', status: 'available' },
  ];

  // Mock health records
  const healthRecords = [
    { id: 'H001', seedlingId: 'S003', date: '2026-02-15', issue: 'Fungal infection', treatment: 'Antifungal spray', status: 'ongoing' },
    { id: 'H002', seedlingId: 'S001', date: '2026-02-10', issue: 'Routine check', treatment: 'None', status: 'resolved' },
  ];

  const tabs = [
    { id: 'seedlings', label: 'Seedlings', icon: FaSeedling, count: seedlings.length },
    { id: 'badges', label: 'Badges', icon: FaTag, count: badges.length },
    { id: 'health', label: 'Health Records', icon: FaHeartbeat, count: healthRecords.length },
  ];

  const getHealthBadge = (status) => {
    const colors = {
      healthy: 'bg-green-100 text-green-800',
      underTreatment: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status === 'underTreatment' ? 'Under Treatment' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    // Populate form based on activeTab
    if (activeTab === 'seedlings') {
      setFormData({
        badgeId: item.badgeId,
        species: item.species,
        nursingStartDate: item.nursingStart,
        healthStatus: item.healthStatus,
        notes: item.notes,
      });
    } else if (activeTab === 'badges') {
      setFormData({
        badgeId: item.id,
        assignedTo: item.assignedTo,
        qrCode: item.qrCode,
        status: item.status,
      });
    } else if (activeTab === 'health') {
      setFormData({
        seedlingId: item.seedlingId,
        date: item.date,
        issue: item.issue,
        treatment: item.treatment,
        status: item.status,
      });
    }
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      toast.success(`Item ${id} deleted (mock)`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('Item added successfully (mock)');
    setIsAddModalOpen(false);
    setFormData({});
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    toast.success(`Item updated (mock)`);
    setIsEditModalOpen(false);
  };

  const filteredSeedlings = seedlings.filter(s => 
    (statusFilter === 'all' || s.healthStatus === statusFilter) &&
    (s.id.toLowerCase().includes(searchTerm.toLowerCase()) || s.species.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredBadges = badges.filter(b => 
    (statusFilter === 'all' || b.status === statusFilter) &&
    (b.id.toLowerCase().includes(searchTerm.toLowerCase()) || (b.assignedTo && b.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const filteredHealth = healthRecords.filter(h => 
    (statusFilter === 'all' || h.status === statusFilter) &&
    (h.id.toLowerCase().includes(searchTerm.toLowerCase()) || h.seedlingId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Nursery</h1>
            <p className="text-gray-600 mt-2">Track seedlings, badges, and health records.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add New</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalSeedlings}</div>
            <div className="text-sm text-gray-500">Total Seedlings</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.readyForPlanting}</div>
            <div className="text-sm text-gray-500">Ready for Planting</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.healthy}</div>
            <div className="text-sm text-gray-500">Healthy</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.underTreatment}</div>
            <div className="text-sm text-gray-500">Under Treatment</div>
          </div>
          <div className="bg-earth-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-earth-600">{stats.recentlyPlanted}</div>
            <div className="text-sm text-gray-500">Recently Planted</div>
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
              placeholder="Search..."
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
              {activeTab === 'seedlings' && (
                <>
                  <option value="healthy">Healthy</option>
                  <option value="underTreatment">Under Treatment</option>
                </>
              )}
              {activeTab === 'badges' && (
                <>
                  <option value="assigned">Assigned</option>
                  <option value="available">Available</option>
                </>
              )}
              {activeTab === 'health' && (
                <>
                  <option value="ongoing">Ongoing</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
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
          {activeTab === 'seedlings' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nursing Start</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ready Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSeedlings.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{item.id}</td>
                      <td className="px-6 py-4">{item.badgeId}</td>
                      <td className="px-6 py-4">{item.species}</td>
                      <td className="px-6 py-4">{item.nursingStart}</td>
                      <td className="px-6 py-4">{getHealthBadge(item.healthStatus)}</td>
                      <td className="px-6 py-4">{item.readyDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          <button onClick={() => handleEdit(item)} className="text-green-600 hover:text-green-800"><FaEdit /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSeedlings.length === 0 && <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No seedlings found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBadges.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{item.id}</td>
                      <td className="px-6 py-4">{item.qrCode}</td>
                      <td className="px-6 py-4">{item.assignedTo || '—'}</td>
                      <td className="px-6 py-4">{item.issuedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'assigned' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          <button onClick={() => handleEdit(item)} className="text-green-600 hover:text-green-800"><FaEdit /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBadges.length === 0 && <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No badges found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seedling ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHealth.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{item.id}</td>
                      <td className="px-6 py-4">{item.seedlingId}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.issue}</td>
                      <td className="px-6 py-4">{item.treatment}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                          <button onClick={() => handleEdit(item)} className="text-green-600 hover:text-green-800"><FaEdit /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredHealth.length === 0 && <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No health records found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Modal (simplified, adapt based on activeTab) */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isAddModalOpen ? 'Add New' : 'Edit'} {activeTab === 'seedlings' ? 'Seedling' : activeTab === 'badges' ? 'Badge' : 'Health Record'}
            </h2>
            <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-4">
              {activeTab === 'seedlings' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge ID</label>
                      <input type="text" value={formData.badgeId || ''} onChange={e => setFormData({...formData, badgeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                      <input type="text" value={formData.species || ''} onChange={e => setFormData({...formData, species: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nursing Start Date</label>
                      <input type="date" value={formData.nursingStartDate || ''} onChange={e => setFormData({...formData, nursingStartDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                      <select value={formData.healthStatus || 'healthy'} onChange={e => setFormData({...formData, healthStatus: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                        <option value="healthy">Healthy</option>
                        <option value="underTreatment">Under Treatment</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea rows="3" value={formData.notes || ''} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
                  </div>
                </>
              )}
              {activeTab === 'badges' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge ID</label>
                      <input type="text" value={formData.badgeId || ''} onChange={e => setFormData({...formData, badgeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
                      <input type="text" value={formData.qrCode || ''} onChange={e => setFormData({...formData, qrCode: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To (Seedling ID)</label>
                      <input type="text" value={formData.assignedTo || ''} onChange={e => setFormData({...formData, assignedTo: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={formData.status || 'available'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                        <option value="available">Available</option>
                        <option value="assigned">Assigned</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'health' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seedling ID</label>
                      <input type="text" value={formData.seedlingId || ''} onChange={e => setFormData({...formData, seedlingId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
                      <input type="text" value={formData.issue || ''} onChange={e => setFormData({...formData, issue: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                      <input type="text" value={formData.treatment || ''} onChange={e => setFormData({...formData, treatment: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={formData.status || 'ongoing'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                        <option value="ongoing">Ongoing</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                  {isAddModalOpen ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key}>
                  <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value || '—'}
                </div>
              ))}
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

export default ManageNursery;