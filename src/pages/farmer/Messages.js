// src/pages/farmer/Messages.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaUser, 
  FaCalendarAlt, 
  FaReply,
  FaTrash,
  FaTimes,
  FaPaperPlane
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Messages = () => {
  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'TreeOn Support',
      subject: 'Welcome to the Farmer Program!',
      content: 'Dear Maria, welcome to TreeOn! We are excited to have you as part of our farmer community. You will receive updates on training sessions, new trees, and more. If you have any questions, feel free to reply to this message.',
      date: '2026-03-01',
      read: false,
    },
    {
      id: 2,
      from: 'Training Coordinator',
      subject: 'Upcoming Pruning Workshop',
      content: 'Hello Maria, there will be a pruning workshop on March 15th at 9 AM in Davao. Please confirm your attendance by replying to this message. We look forward to seeing you!',
      date: '2026-03-03',
      read: true,
    },
    {
      id: 3,
      from: 'TreeOn Support',
      subject: 'Your replacement request',
      content: 'Regarding your request for replacing tree T12347, we have approved it. A new seedling will be delivered next week. Thank you for your patience.',
      date: '2026-02-28',
      read: false,
    },
    {
      id: 4,
      from: 'Admin',
      subject: 'Payment for harvest',
      content: 'Your recent harvest payment of $300 has been processed. It should reflect in your account within 2-3 business days.',
      date: '2026-02-25',
      read: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const markAsRead = (id) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this message?')) {
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      toast.success('Message deleted');
    }
  };

  const handleReply = (e) => {
    e.stopPropagation();
    setIsReplyModalOpen(true);
  };

  const sendReply = () => {
    if (!replyText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      toast.success('Reply sent (mock)');
      setIsSending(false);
      setIsReplyModalOpen(false);
      setReplyText('');
    }, 1000);
  };

  const unreadCount = messages.filter(m => !m.read).length;

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
            <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0
                ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                : 'No unread messages'}
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <FaEnvelope className="inline mr-2 text-primary-500" />
            <span className="font-medium">{messages.length} total</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Message List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-700">Inbox</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleMessageClick(msg)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                      selectedMessage?.id === msg.id ? 'bg-primary-50' : ''
                    } ${!msg.read ? 'font-semibold' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {!msg.read ? (
                          <FaEnvelope className="text-primary-500 mr-2" />
                        ) : (
                          <FaEnvelopeOpen className="text-gray-400 mr-2" />
                        )}
                        <span className="text-sm text-gray-500">{msg.from}</span>
                      </div>
                      <button
                        onClick={(e) => handleDelete(msg.id, e)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <p className="text-gray-800 mt-1 truncate">{msg.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No messages</div>
              )}
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            {selectedMessage ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.subject}</h2>
                  <button
                    onClick={handleReply}
                    className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition flex items-center space-x-1 text-sm"
                  >
                    <FaReply />
                    <span>Reply</span>
                  </button>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaUser className="mr-2" />
                  <span className="mr-4">From: {selectedMessage.from}</span>
                  <FaCalendarAlt className="mr-2" />
                  <span>{selectedMessage.date}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.content}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <FaEnvelopeOpen className="text-5xl mb-4" />
                <p>Select a message to read</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Reply to {selectedMessage?.from}</h2>
                <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <textarea
                rows="5"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsReplyModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendReply}
                  disabled={isSending}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 disabled:opacity-70"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;