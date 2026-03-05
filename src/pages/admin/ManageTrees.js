// src/pages/admin/ManageTrees.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaLeaf,
  FaSeedling,
  FaMapMarkedAlt
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageTrees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTree, setSelectedTree] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    species: '',
    donorId: '',
    farmerId: '',
    planterId: '',
    location: '',
    latitude: '',
    longitude: '',
    plantedDate: '',
    status: 'alive',
    healthStatus: 'healthy',
    notes: '',
  });

  // Mock stats
  const stats = {
    totalTrees: 58420,
    alive: 52190,
    dead: 3120,
    replaced: 2110,
    recentlyPlanted: 2340,
  };

  // Mock trees data
  const trees = [
    { id: 'T12345', species: 'Oak', location: 'Nakuru, Kenya', donor: 'John Smith', farmer: 'John Kamau', planter: 'Peter M.', plantedDate: '2026-02-15', status: 'alive', healthStatus: 'healthy' },
    { id: 'T12346', species: 'Mahogany', location: 'Amazonas, Brazil', donor: 'Emma Wilson', farmer: 'Carlos Rodriguez', planter: 'Ana S.', plantedDate: '2026-02-20', status: 'alive', healthStatus: 'healthy' },
    { id: 'T12347', species: 'Mangrove', location: 'Davao, Philippines', donor: 'Anonymous', farmer: 'Maria Santos', planter: 'Carlos R.', plantedDate: '2026-02-10', status: 'dead', healthStatus: 'poor' },
    { id: 'T12348', species: 'Teak', location: 'Kalimantan, Indonesia', donor: 'Michael Brown', farmer: 'Dewi Lestari', planter: 'Budi S.', plantedDate: '2026-01-25', status: 'alive', healthStatus: 'healthy' },
    { id: 'T12349', species: 'Pine', location: 'Oromia, Ethiopia', donor: 'Sophia Garcia', farmer: 'Tsegaye Abera', planter: 'Alemu G.', plantedDate: '2026-02-05', status: 'replaced', healthStatus: 'replaced' },
    { id: 'T12350', species: 'Oak', location: 'Bahia, Brazil', donor: 'Robert Johnson', farmer: 'Ana Silva', planter: 'Lucas M.', plantedDate: '2026-03-01', status: 'alive', healthStatus: 'healthy' },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      alive: 'bg-green-100 text-green-800',
      dead: 'bg-red-100 text-red-800',
      replaced: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getHealthBadge = (health) => {
    const colors = {
      healthy: 'bg-green-100 text-green-800',
      poor: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
      replaced: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[health] || 'bg-gray-100 text-gray-800'}`}>
        {health.charAt(0).toUpperCase() + health.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (tree) => {
    setSelectedTree(tree);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (tree) => {
    setSelectedTree(tree);
    setFormData({
      species: tree.species,
      donorId: tree.donor,
      farmerId: tree.farmer,
      planterId: tree.planter,
      location: tree.location,
      latitude: '',
      longitude: '',
      plantedDate: tree.plantedDate,
      status: tree.status,
      healthStatus: tree.healthStatus,
      notes: '',
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tree record?')) {
      toast.success(`Tree ${id} deleted (mock)`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('Tree added successfully (mock)');
    setIsAddModalOpen(false);
    setFormData({});
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    toast.success(`Tree ${selectedTree.id} updated (mock)`);
    setIsEditModalOpen(false);
  };

  const handleGeotag = (id) => {
    toast.success(`Geotagging initiated for tree ${id} (mock)`);
  };

  const filteredTrees = trees.filter(t => 
    (statusFilter === 'all' || t.status === statusFilter) &&
    (t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
     t.location.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <h1 className="text-3xl font-bold text-gray-800">Manage Trees</h1>
            <p className="text-gray-600 mt-2">View and manage all planted trees.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Tree</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalTrees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Trees</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.alive.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Alive</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.dead.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Dead</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.replaced.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Replaced</div>
          </div>
          <div className="bg-earth-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-earth-600">{stats.recentlyPlanted.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Planted (30d)</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, species, location..."
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
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="replaced">Replaced</option>
            </select>
          </div>
        </div>

        {/* Trees Table */}
        <motion.div
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrees.map(tree => (
                  <tr key={tree.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{tree.id}</td>
                    <td className="px-6 py-4">{tree.species}</td>
                    <td className="px-6 py-4">{tree.location}</td>
                    <td className="px-6 py-4">{tree.donor}</td>
                    <td className="px-6 py-4">{tree.farmer}</td>
                    <td className="px-6 py-4">{tree.plantedDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(tree.status)}</td>
                    <td className="px-6 py-4">{getHealthBadge(tree.healthStatus)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleViewDetails(tree)} className="text-blue-600 hover:text-blue-800" title="View Details"><FaEye /></button>
                        <button onClick={() => handleEdit(tree)} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></button>
                        <button onClick={() => handleDelete(tree.id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                        <button onClick={() => handleGeotag(tree.id)} className="text-purple-600 hover:text-purple-800" title="Geotag"><FaMapMarkedAlt /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTrees.length === 0 && (
                  <tr><td colSpan="9" className="px-6 py-8 text-center text-gray-500">No trees found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add Tree Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Tree</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
                  <input type="text" required value={formData.species} onChange={(e) => setFormData({...formData, species: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donor ID</label>
                  <input type="text" value={formData.donorId} onChange={(e) => setFormData({...formData, donorId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmer ID</label>
                  <input type="text" value={formData.farmerId} onChange={(e) => setFormData({...formData, farmerId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planter ID</label>
                  <input type="text" value={formData.planterId} onChange={(e) => setFormData({...formData, planterId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (address)</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input type="number" step="any" value={formData.latitude} onChange={(e) => setFormData({...formData, latitude: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input type="number" step="any" value={formData.longitude} onChange={(e) => setFormData({...formData, longitude: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planted Date *</label>
                  <input type="date" required value={formData.plantedDate} onChange={(e) => setFormData({...formData, plantedDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="replaced">Replaced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select value={formData.healthStatus} onChange={(e) => setFormData({...formData, healthStatus: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="healthy">Healthy</option>
                    <option value="poor">Poor</option>
                    <option value="critical">Critical</option>
                    <option value="replaced">Replaced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">Add Tree</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Tree Modal */}
      {isEditModalOpen && selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Tree: {selectedTree.id}</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
                  <input type="text" required value={formData.species} onChange={(e) => setFormData({...formData, species: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donor</label>
                  <input type="text" value={formData.donorId} onChange={(e) => setFormData({...formData, donorId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmer</label>
                  <input type="text" value={formData.farmerId} onChange={(e) => setFormData({...formData, farmerId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planter</label>
                  <input type="text" value={formData.planterId} onChange={(e) => setFormData({...formData, planterId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input type="number" step="any" value={formData.latitude} onChange={(e) => setFormData({...formData, latitude: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input type="number" step="any" value={formData.longitude} onChange={(e) => setFormData({...formData, longitude: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planted Date *</label>
                  <input type="date" required value={formData.plantedDate} onChange={(e) => setFormData({...formData, plantedDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="replaced">Replaced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select value={formData.healthStatus} onChange={(e) => setFormData({...formData, healthStatus: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="healthy">Healthy</option>
                    <option value="poor">Poor</option>
                    <option value="critical">Critical</option>
                    <option value="replaced">Replaced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">Update Tree</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tree Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="font-semibold">ID:</span> {selectedTree.id}</div>
              <div><span className="font-semibold">Species:</span> {selectedTree.species}</div>
              <div><span className="font-semibold">Location:</span> {selectedTree.location}</div>
              <div><span className="font-semibold">Donor:</span> {selectedTree.donor}</div>
              <div><span className="font-semibold">Farmer:</span> {selectedTree.farmer}</div>
              <div><span className="font-semibold">Planter:</span> {selectedTree.planter}</div>
              <div><span className="font-semibold">Planted Date:</span> {selectedTree.plantedDate}</div>
              <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedTree.status)}</div>
              <div><span className="font-semibold">Health:</span> {getHealthBadge(selectedTree.healthStatus)}</div>
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

export default ManageTrees;