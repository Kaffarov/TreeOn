// src/pages/public/FAQ.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  // Mock FAQ data
  const faqCategories = [
    {
      category: 'General',
      items: [
        { id: 1, question: 'What is TreeOn?', answer: 'TreeOn is a non-profit organization dedicated to reforestation and empowering farmers. Donors can plant trees, track them online, and support sustainable farming communities.' },
        { id: 2, question: 'How are my donations used?', answer: '90% of donations go directly to tree planting, farmer support, and project management. 10% covers operational costs. Detailed financial reports are available on our Impact page.' },
        { id: 3, question: 'Can I visit the planting sites?', answer: 'Absolutely! We encourage donors to visit. Contact us to arrange a visit to our partner farms.' },
      ],
    },
    {
      category: 'Donations & Subscriptions',
      items: [
        { id: 4, question: 'How do I plant a tree?', answer: 'Simply go to our Donate page, choose a one-time donation or subscription, and complete the checkout. Your trees will be planted and geotagged.' },
        { id: 5, question: 'Can I gift trees to someone?', answer: 'Yes! Choose the "Gift Trees" option during checkout. You can add a personal message and the recipient will receive a certificate.' },
        { id: 6, question: 'What is the difference between one-time and subscription?', answer: 'One-time donations plant a set number of trees immediately. Subscriptions provide recurring support and include benefits like exclusive species and limited editions.' },
        { id: 7, question: 'Is my donation tax-deductible?', answer: 'TreeOn is a registered non-profit. Donations may be tax-deductible depending on your country. Consult your tax advisor.' },
      ],
    },
    {
      category: 'Tree Tracking & Registry',
      items: [
        { id: 8, question: 'How do I track my trees?', answer: 'After planting, you’ll receive a certificate with a tree ID. You can view your trees on our interactive map or in your dashboard.' },
        { id: 9, question: 'Can I remain anonymous?', answer: 'Yes. During checkout, you can choose to remain anonymous. Your name will be hidden from the public registry.' },
        { id: 10, question: 'What if a tree dies?', answer: 'If a tree dies, the farmer reports it. We verify and replace it with a new tree from our nursery at no extra cost.' },
      ],
    },
    {
      category: 'Farmers & Communities',
      items: [
        { id: 11, question: 'How do farmers benefit?', answer: 'Farmers receive training, resources, and income from tree products like fruit. They also benefit from improved soil and water retention.' },
        { id: 12, question: 'How can I become a partner farmer?', answer: 'If you are a farmer interested in joining, please contact us through the Contact page or visit our Farmers Program section.' },
      ],
    },
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Flatten all items with category for filtering
  const allItems = faqCategories.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.category }))
  );

  const filteredItems = allItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Find answers to common questions about TreeOn, donations, and tree planting.
          </motion.p>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="mb-3 border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition text-left"
                >
                  <span className="font-medium text-gray-800 flex items-center">
                    <FaQuestionCircle className="text-primary-500 mr-3 flex-shrink-0" />
                    {item.question}
                  </span>
                  {openItems[item.id] ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openItems[item.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 px-5 py-4 border-t border-gray-200"
                    >
                      <p className="text-gray-700">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>No results found for "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* Still need help */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            If you couldn't find the answer you were looking for, please contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;