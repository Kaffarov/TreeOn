// src/pages/donor/Notifications.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, 
  FaTree, 
  FaLeaf, 
  FaCreditCard, 
  FaCheckCircle,
  FaTrash,
  FaCheckDouble,
  FaClock
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'
  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      type: 'tree',
      icon: FaTree,
      title: 'Your tree has been planted!',
      message: 'Your Oak tree (T12345) has been planted in Kenya.',
      date: '2026-03-04T10:30:00Z',
      isRead: false,
      link: '/dashboard/tree/T12345',
    },
    {
      id: 'N002',
      type: 'subscription',
      icon: FaCreditCard,
      title: 'Subscription renewal',
      message: 'Your Premium plan will renew on April 1st.',
      date: '2026-03-03T08:15:00Z',
      isRead: true,
      link: '/dashboard/subscription',
    },
    {
      id: 'N003',
      type: 'leaf',
      icon: FaLeaf,
      title: 'New badge earned',
      message: 'Congratulations! You earned the "Forest Friend" badge.',
      date: '2026-03-02T14:45:00Z',
      isRead: false,
      link: '/dashboard/badges',
    },
    {
      id: 'N004',
      type: 'general',
      icon: FaBell,
      title: 'Impact report available',
      message: 'Your Q1 2026 impact report is ready to view.',
      date: '2026-03-01T09:00:00Z',
      isRead: true,
      link: '/dashboard/impact',
    },
    {
      id: 'N005',
      type: 'tree',
      icon: FaTree,
      title: 'Tree needs attention',
      message: 'One of your trees in Brazil requires check-up.',
      date: '2026-02-28T16:20:00Z',
      isRead: false,
      link: '/dashboard/tree/T12346',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || (filter === 'unread' && !n.isRead)
  );

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
    toast.success('Marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
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
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              <FaCheckDouble />
              <span>Mark all as read</span>
            </button>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`py-3 px-4 border-b-2 transition ${
                filter === 'all'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`py-3 px-4 border-b-2 transition relative ${
                filter === 'unread'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-6 hover:bg-gray-50 transition ${
                        !notification.isRead ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-3 rounded-full mr-4 ${
                          !notification.isRead ? 'bg-primary-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`text-xl ${
                            !notification.isRead ? 'text-primary-600' : 'text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${
                                !notification.isRead ? 'text-gray-800' : 'text-gray-600'
                              }`}>
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-primary-500 rounded-full"></span>
                                )}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                              <div className="flex items-center mt-2 text-xs text-gray-400">
                                <FaClock className="mr-1" />
                                {formatDate(notification.date)}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-green-600 hover:text-green-800 p-2"
                                  title="Mark as read"
                                >
                                  <FaCheckCircle />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600 hover:text-red-800 p-2"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          {notification.link && (
                            <a
                              href={notification.link}
                              className="mt-2 inline-block text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              View details →
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-16">
              <FaBell className="text-5xl mx-auto mb-4 text-gray-300" />
              <p>No notifications found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
