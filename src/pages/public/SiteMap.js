// src/pages/public/SiteMap.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSitemap, FaTree, FaExternalLinkAlt } from 'react-icons/fa';

const SiteMap = () => {
  // Grouped pages for sitemap
  const sitemapData = [
    {
      category: 'Main Pages',
      pages: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Impact', path: '/impact' },
        { name: 'Success Stories', path: '/stories' },
        { name: 'Blog', path: '/blog' },
        { name: 'Events', path: '/events' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Partners', path: '/partners' },
        { name: 'Careers', path: '/careers' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Accessibility', path: '/accessibility' },
        { name: 'Site Map', path: '/sitemap' },
      ],
    },
    {
      category: 'Tree Registry & Map',
      pages: [
        { name: 'Interactive Tree Map', path: '/map' },
        { name: 'Search Trees', path: '/search' },
        { name: 'Species Gallery', path: '/species' },
        { name: 'Country Impact', path: '/countries' },
      ],
    },
    {
      category: 'Farmers & Communities',
      pages: [
        { name: 'Farmers Program', path: '/farmers' },
        { name: 'Meet the Farmers', path: '/farmers/list' },
        { name: 'Training Programs', path: '/training' },
      ],
    },
    {
      category: 'Get Involved',
      pages: [
        { name: 'Donation Options', path: '/donate' },
        { name: 'One-Time Donation', path: '/donate/one-time' },
        { name: 'Subscription Plans', path: '/subscribe' },
        { name: 'Gift Trees', path: '/gift' },
        { name: 'Memorial Trees', path: '/memorial' },
        { name: 'Corporate Giving', path: '/corporate' },
        { name: 'Fundraising Campaigns', path: '/campaigns' },
      ],
    },
    {
      category: 'Tools & Resources',
      pages: [
        { name: 'Carbon Calculator', path: '/calculator' },
        { name: 'Tree Planting Calculator', path: '/plant-calculator' },
        { name: 'Species Selector', path: '/species-selector' },
        { name: 'Live Planting Feed', path: '/live-feed' },
        { name: 'Photo Gallery', path: '/gallery' },
        { name: 'Virtual Forest', path: '/virtual-forest' },
        { name: 'Mobile App Download', path: '/app' },
        { name: 'QR Code Scanner', path: '/scan' },
        { name: 'Tree Adoption', path: '/adopt' },
        { name: 'School Programs', path: '/schools' },
        { name: 'Wedding Registry', path: '/weddings' },
        { name: 'In Memoriam', path: '/in-memoriam' },
        { name: 'Press Kit', path: '/press' },
        { name: 'API Documentation', path: '/developers' },
      ],
    },
    {
      category: 'User Account',
      pages: [
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/register' },
        { name: 'Forgot Password', path: '/forgot-password' },
        { name: 'Reset Password', path: '/reset-password' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaSitemap className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Explore all pages and sections of the TreeOn website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapData.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-primary-200">
                  {category.category}
                </h2>
                <ul className="space-y-2">
                  {category.pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-gray-600 hover:text-primary-600 transition flex items-center"
                      >
                        <FaTree className="mr-2 text-primary-400 text-sm" />
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">External Resources</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://facebook.com/treeon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              Facebook <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
            <a
              href="https://twitter.com/treeon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              Twitter <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
            <a
              href="https://instagram.com/treeon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              Instagram <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
            <a
              href="https://linkedin.com/company/treeon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              LinkedIn <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteMap;