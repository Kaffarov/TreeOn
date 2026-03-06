// src/pages/public/PrivacyPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaShieldAlt className="text-5xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Last updated */}
      <div className="container mx-auto px-4 py-4 text-right text-sm text-gray-500">
        Last updated: March 6, 2026
      </div>

      {/* Content */}
      <section className="py-8 container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
          <p>
            TreeOn ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website treeon.org, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you register on the Site, express an interest in obtaining information about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us.
          </p>
          <p>
            The personal information we collect may include:
          </p>
          <ul>
            <li>Name and contact data (such as email address, phone number, mailing address)</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
            <li>Demographic information (such as country, language preferences)</li>
            <li>Profile data (your interests, preferences, feedback)</li>
            <li>Usage data (pages visited, time spent on Site, interactions)</li>
          </ul>
          <p>
            If you choose to donate anonymously, we will not display your name publicly, but we still retain your information internally for record-keeping.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your donations and subscriptions</li>
            <li>Send you certificates, receipts, and impact updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website and services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
          </p>
          <p>
            We use cookies to:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Understand how you use our Site</li>
            <li>Improve your experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist us in operating our website and processing payments</li>
            <li>Partner farmers and planters (only necessary information to facilitate tree planting)</li>
            <li>Legal authorities if required by law</li>
          </ul>
          <p>
            If you choose to be anonymous, your name will not appear in the public tree registry, but we may still share anonymized data for research or reporting purposes.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul>
            <li>The right to access – request copies of your personal data</li>
            <li>The right to rectification – request correction of inaccurate data</li>
            <li>The right to erasure – request deletion of your data</li>
            <li>The right to restrict processing – request limitation of processing</li>
            <li>The right to data portability – request transfer of your data</li>
            <li>The right to object – object to processing for direct marketing</li>
          </ul>
          <p>
            To exercise these rights, please contact us at <a href="mailto:privacy@treeon.org" className="text-primary-600 hover:underline">privacy@treeon.org</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Third-Party Links</h2>
          <p>
            Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any third-party websites you visit.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Children's Privacy</h2>
          <p>
            Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p>
            By email: <a href="mailto:privacy@treeon.org" className="text-primary-600 hover:underline">privacy@treeon.org</a><br />
            By mail: TreeOn, 123 Green Street, Amsterdam, 1012 AB, Netherlands
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;