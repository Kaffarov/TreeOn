// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTree, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Impact', path: '/impact' },
        { name: 'Success Stories', path: '/stories' },
        { name: 'Partners', path: '/partners' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Plant Trees', path: '/donate' },
        { name: 'Subscription Plans', path: '/subscribe' },
        { name: 'Gift Trees', path: '/gift' },
        { name: 'Corporate Giving', path: '/corporate' },
        { name: 'Fundraising', path: '/campaigns' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Events', path: '/events' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Press Kit', path: '/press' },
        { name: 'Developers', path: '/developers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Accessibility', path: '/accessibility' },
        { name: 'Cookie Policy', path: '/privacy#cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/treeon', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://x.com/tree_0n', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: 'https://instagram.com/tree.0n', color: 'hover:text-pink-600' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/treeon', color: 'hover:text-blue-700' },
    { icon: FaYoutube, href: 'https://youtube.com/@treeon-f', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
               {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="TreeOn" className="h-20 w-auto" />
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              Making the world greener, one tree at a time. Join us in our mission to combat climate change through reforestation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors text-xl`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-gray-400">
              <FaEnvelope className="text-primary-400" />
              <a href="mailto:info@treeon.org" className="hover:text-primary-400">
                info@treeon.org
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <FaPhone className="text-primary-400" />
              <a href="tel:+2348028280993" className="hover:text-primary-400">
                +234 8028-280-993
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <FaMapMarkerAlt className="text-primary-400" />
              <span>No: 149 FARIN GADA, JOS</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for tree planting updates and impact stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-400"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} TreeOn. All rights reserved. | Registered NGO | RC - 9386253</p>
          <p className="text-sm mt-2">
            Made by Yousef
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;