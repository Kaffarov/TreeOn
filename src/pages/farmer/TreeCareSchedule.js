// src/pages/farmer/TreeCareSchedule.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaTint,
  FaLeaf,
  FaCut,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TreeCareSchedule = () => {
  // Mock care tasks data
  const [tasks, setTasks] = useState([
    { id: 1, treeId: 'T12345', species: 'Oak', taskType: 'Watering', dueDate: '2026-03-10', status: 'pending', priority: 'medium', notes: 'Water deeply' },
    { id: 2, treeId: 'T12346', species: 'Mahogany', taskType: 'Fertilize', dueDate: '2026-03-12', status: 'pending', priority: 'high', notes: 'Use organic fertilizer' },
    { id: 3, treeId: 'T12347', species: 'Mangrove', taskType: 'Pruning', dueDate: '2026-03-15', status: 'pending', priority: 'low', notes: 'Remove dead branches' },
    { id: 4, treeId: 'T12348', species: 'Pine', taskType: 'Pest check', dueDate: '2026-03-08', status: 'completed', priority: 'medium', notes: 'Check for borers' },
    { id: 5, treeId: 'T12349', species: 'Teak', taskType: 'Watering', dueDate: '2026-03-09', status: 'completed', priority: 'medium', notes: '' },
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const taskTypes = [
    { value: 'Watering', icon: FaTint, color: 'text-blue-500' },
    { value: 'Fertilize', icon: FaLeaf, color: 'text-green-500' },
    { value: 'Pruning', icon: FaCut, color: 'text-amber-500' },
    { value: 'Pest check', icon: FaSearch, color: 'text-red-500' },
  ];

  const getTaskIcon = (type) => {
    const found = taskTypes.find(t => t.value === type);
    return found || { icon: FaCalendarAlt, color: 'text-gray-500' };
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`${colors[priority]} text-xs px-2 py-1 rounded-full font-medium`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (searchTerm && !task.treeId.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !task.species.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleMarkComplete = (taskId) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t)
    );
    toast.success('Task marked as completed');
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
            <h1 className="text-3xl font-bold text-gray-800">Tree Care Schedule</h1>
            <p className="text-gray-600 mt-2">Manage care tasks for your trees.</p>
          </div>
          <div className="flex space-x-2">
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center">
              <FaClock className="mr-2 text-yellow-500" />
              <span className="font-medium">{pendingCount} pending</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" />
              <span className="font-medium">{completedCount} completed</span>
            </div>
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-wrap gap-4 items-center"
        >
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tree ID or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTasks.map((task, idx) => {
            const { icon: Icon, color } = getTaskIcon(task.taskType);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                  task.status === 'completed' ? 'border-green-500' : 'border-yellow-500'
                } hover:shadow-xl transition`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Icon className={`${color} text-2xl mr-3`} />
                    <h3 className="text-lg font-bold text-gray-800">{task.taskType}</h3>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Tree:</span> {task.treeId} ({task.species})</p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    Due: {task.dueDate}
                  </p>
                  {task.notes && <p><span className="font-medium">Notes:</span> {task.notes}</p>}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewTask(task)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="View details"
                  >
                    <FaEye />
                  </button>
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleMarkComplete(task.id)}
                      className="text-green-600 hover:text-green-800 p-2"
                      title="Mark as completed"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          {filteredTasks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              <FaCalendarAlt className="text-5xl mx-auto mb-4 text-gray-300" />
              <p>No tasks found.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Care Task Details</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-3">
                <p><span className="font-semibold">Task:</span> {selectedTask.taskType}</p>
                <p><span className="font-semibold">Tree ID:</span> {selectedTask.treeId}</p>
                <p><span className="font-semibold">Species:</span> {selectedTask.species}</p>
                <p><span className="font-semibold">Due Date:</span> {selectedTask.dueDate}</p>
                <p><span className="font-semibold">Priority:</span> {getPriorityBadge(selectedTask.priority)}</p>
                <p><span className="font-semibold">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedTask.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                  </span>
                </p>
                {selectedTask.notes && <p><span className="font-semibold">Notes:</span> {selectedTask.notes}</p>}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedTask.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleMarkComplete(selectedTask.id);
                      setIsModalOpen(false);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TreeCareSchedule;