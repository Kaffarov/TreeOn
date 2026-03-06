// src/pages/farmer/TrainingCalendar.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaList, 
  FaTh, 
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TrainingCalendar = () => {
  // Mock training data
  const trainings = [
    { id: 1, title: 'Pruning Workshop', date: '2026-03-15', time: '09:00', location: 'Davao City Hall', trainer: 'Dr. Jane Green', capacity: 20, registered: 15 },
    { id: 2, title: 'Soil Health Management', date: '2026-03-20', time: '14:00', location: 'Community Center', trainer: 'John Forester', capacity: 25, registered: 12 },
    { id: 3, title: 'Pest Control Basics', date: '2026-03-22', time: '10:00', location: 'Training Farm', trainer: 'Maria Silva', capacity: 15, registered: 8 },
    { id: 4, title: 'Water Management', date: '2026-03-25', time: '13:00', location: 'Online', trainer: 'Carlos Mendez', capacity: 30, registered: 20 },
    { id: 5, title: 'Tree Planting Techniques', date: '2026-03-28', time: '09:30', location: 'Green Valley', trainer: 'David Kim', capacity: 20, registered: 5 },
    { id: 6, title: 'Agroforestry Basics', date: '2026-04-02', time: '11:00', location: 'Online', trainer: 'Dr. Jane Green', capacity: 25, registered: 7 },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const days = [];
    // Previous month days (to fill first row)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        month: 'prev',
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: 'current',
        date: new Date(year, month, i),
      });
    }
    // Next month days (to fill last row)
    const remainingCells = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        month: 'next',
        date: new Date(year, month + 1, i),
      });
    }
    return days;
  };

  const getTrainingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return trainings.filter(t => t.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleTrainingClick = (training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const handleRegister = (trainingId) => {
    toast.success(`Registered for training ${trainingId} (mock)`);
    setIsModalOpen(false);
  };

  const monthDays = getMonthDays(currentDate);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          <h1 className="text-3xl font-bold text-gray-800">Training Calendar</h1>
          <p className="text-gray-600 mt-2">View and register for upcoming training sessions.</p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FaChevronLeft />
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'calendar' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center font-medium text-gray-500">
              {weekdays.map(day => <div key={day}>{day}</div>)}
            </div>
            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day, idx) => {
                const trainingsForDay = getTrainingsForDate(day.date);
                const isCurrentMonth = day.month === 'current';
                return (
                  <div
                    key={idx}
                    className={`min-h-24 p-1 border rounded-lg ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                    } ${trainingsForDay.length > 0 ? 'border-primary-300' : 'border-gray-200'}`}
                  >
                    <div className="text-right text-sm font-medium p-1">{day.day}</div>
                    <div className="space-y-1">
                      {trainingsForDay.slice(0, 2).map(t => (
                        <button
                          key={t.id}
                          onClick={() => handleTrainingClick(t)}
                          className="w-full text-left text-xs bg-primary-100 text-primary-800 p-1 rounded hover:bg-primary-200 transition truncate"
                        >
                          {t.title}
                        </button>
                      ))}
                      {trainingsForDay.length > 2 && (
                        <div className="text-xs text-gray-500">+{trainingsForDay.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="divide-y divide-gray-200">
              {trainings.map(training => (
                <div key={training.id} className="py-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{training.title}</h3>
                    <div className="mt-1 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-primary-500" />
                        {training.date} at {training.time}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-primary-500" />
                        {training.location}
                      </div>
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-primary-500" />
                        {training.trainer}
                      </div>
                      <div className="text-xs text-gray-500">
                        {training.registered} / {training.capacity} registered
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTrainingClick(training)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Details Modal */}
        {isModalOpen && selectedTraining && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedTraining.title}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <div><span className="font-semibold">Date:</span> {selectedTraining.date} at {selectedTraining.time}</div>
                <div><span className="font-semibold">Location:</span> {selectedTraining.location}</div>
                <div><span className="font-semibold">Trainer:</span> {selectedTraining.trainer}</div>
                <div><span className="font-semibold">Capacity:</span> {selectedTraining.registered} / {selectedTraining.capacity} registered</div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRegister(selectedTraining.id)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                >
                  <FaCheckCircle />
                  <span>Register</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingCalendar;