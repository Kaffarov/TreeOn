// src/pages/admin/ScheduleTraining.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaChalkboardTeacher, 
  FaMapMarkerAlt, 
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaUserGraduate
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ScheduleTraining = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    trainer: '',
    maxParticipants: '',
    topics: '',
  });

  // Mock stats
  const stats = {
    totalTrainings: 24,
    upcoming: 8,
    past: 16,
    totalFarmersTrained: 187,
    averageAttendance: 12,
  };

  // Mock trainings data
  const trainings = [
    { id: 'TR001', title: 'Tree Planting Techniques', date: '2026-03-15', time: '09:00', location: 'Nakuru, Kenya', trainer: 'Dr. Jane Green', attendees: 15, max: 25, status: 'upcoming', topics: ['Planting depth', 'Spacing', 'Mulching'] },
    { id: 'TR002', title: 'Soil Conservation Methods', date: '2026-03-18', time: '10:00', location: 'Davao, Philippines', trainer: 'John Forester', attendees: 8, max: 20, status: 'upcoming', topics: ['Terracing', 'Cover crops'] },
    { id: 'TR003', title: 'Pest Management', date: '2026-03-10', time: '14:00', location: 'Amazonas, Brazil', trainer: 'Maria Silva', attendees: 12, max: 20, status: 'upcoming', topics: ['Natural pesticides', 'Monitoring'] },
    { id: 'TR004', title: 'Pruning and Maintenance', date: '2026-02-20', time: '09:30', location: 'Kalimantan, Indonesia', trainer: 'David Kim', attendees: 18, max: 25, status: 'past', topics: ['Pruning cuts', 'Tools'] },
    { id: 'TR005', title: 'Climate Change Basics', date: '2026-02-10', time: '11:00', location: 'Oromia, Ethiopia', trainer: 'Dr. Jane Green', attendees: 22, max: 30, status: 'past', topics: ['Carbon cycle', 'Reforestation'] },
    { id: 'TR006', title: 'Water Management', date: '2026-02-05', time: '13:00', location: 'Bahia, Brazil', trainer: 'Carlos Mendez', attendees: 14, max: 20, status: 'past', topics: ['Irrigation', 'Rainwater harvesting'] },
  ];

  const filteredTrainings = trainings.filter(t => 
    (activeTab === 'upcoming' ? t.status === 'upcoming' : t.status === 'past') &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     t.trainer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('Training session added (mock)');
    setIsAddModalOpen(false);
    setFormData({});
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    toast.success(`Training ${selectedTraining.id} updated (mock)`);
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this training session?')) {
      toast.success(`Training ${id} deleted (mock)`);
    }
  };

  const handleViewDetails = (training) => {
    setSelectedTraining(training);
    setIsViewModalOpen(true);
  };

  const handleEdit = (training) => {
    setSelectedTraining(training);
    setFormData({
      title: training.title,
      description: training.description || '',
      date: training.date,
      time: training.time,
      location: training.location,
      trainer: training.trainer,
      maxParticipants: training.max,
      topics: training.topics ? training.topics.join(', ') : '',
    });
    setIsEditModalOpen(true);
  };

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
            <h1 className="text-3xl font-bold text-gray-800">Schedule Training</h1>
            <p className="text-gray-600 mt-2">Manage farmer training sessions.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>New Training</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalTrainings}</div>
            <div className="text-sm text-gray-500">Total Sessions</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.upcoming}</div>
            <div className="text-sm text-gray-500">Upcoming</div>
          </div>
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.past}</div>
            <div className="text-sm text-gray-500">Past</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalFarmersTrained}</div>
            <div className="text-sm text-gray-500">Farmers Trained</div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.averageAttendance}</div>
            <div className="text-sm text-gray-500">Avg Attendance</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'upcoming'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'past'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search by title, location, trainer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Trainings List */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4"
        >
          {filteredTrainings.map(training => (
            <div key={training.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">{training.title}</h3>
                    {training.status === 'upcoming' && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center"><FaCalendarAlt className="mr-2 text-primary-500" />{training.date} at {training.time}</div>
                    <div className="flex items-center"><FaMapMarkerAlt className="mr-2 text-primary-500" />{training.location}</div>
                    <div className="flex items-center"><FaChalkboardTeacher className="mr-2 text-primary-500" />{training.trainer}</div>
                    <div className="flex items-center"><FaUsers className="mr-2 text-primary-500" />{training.attendees}/{training.max} attendees</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleViewDetails(training)} className="text-blue-600 hover:text-blue-800" title="View"><FaEye /></button>
                  <button onClick={() => handleEdit(training)} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></button>
                  <button onClick={() => handleDelete(training.id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
          {filteredTrainings.length === 0 && (
            <div className="text-center text-gray-500 py-8">No training sessions found.</div>
          )}
        </motion.div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule New Training</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trainer *</label>
                  <input type="text" required value={formData.trainer} onChange={(e) => setFormData({...formData, trainer: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input type="number" min="1" value={formData.maxParticipants} onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma separated)</label>
                  <input type="text" value={formData.topics} onChange={(e) => setFormData({...formData, topics: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Planting, Pruning, Pest control" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Schedule</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Training</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input type="time" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trainer *</label>
                  <input type="text" required value={formData.trainer} onChange={(e) => setFormData({...formData, trainer: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input type="number" min="1" value={formData.maxParticipants} onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma separated)</label>
                  <input type="text" value={formData.topics} onChange={(e) => setFormData({...formData, topics: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Update</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Training Details</h2>
            <div className="space-y-3">
              <div><span className="font-semibold">Title:</span> {selectedTraining.title}</div>
              <div><span className="font-semibold">Date & Time:</span> {selectedTraining.date} at {selectedTraining.time}</div>
              <div><span className="font-semibold">Location:</span> {selectedTraining.location}</div>
              <div><span className="font-semibold">Trainer:</span> {selectedTraining.trainer}</div>
              <div><span className="font-semibold">Attendance:</span> {selectedTraining.attendees}/{selectedTraining.max}</div>
              <div><span className="font-semibold">Topics:</span> {selectedTraining.topics?.join(', ') || '—'}</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsViewModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTraining;