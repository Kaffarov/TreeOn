// src/pages/public/TermsOfService.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract } from 'react-icons/fa';

const TermsOfService = () => {
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
            <FaFileContract className="text-5xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Please read these terms carefully before using our website or services.
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
          <h2 className="text-2xl font-bold text-gray-800">1. Acceptance of Terms</h2>
          <p>
            Welcome to TreeOn ("we", "our", "us"). By accessing or using our website at treeon.org (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use the Site.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Site after such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">3. Eligibility</h2>
          <p>
            You must be at least 18 years old to use the Site. By using the Site, you represent and warrant that you are 18 or older. If you are using the Site on behalf of an organization, you represent that you have authority to bind that organization.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">4. Account Registration</h2>
          <p>
            To make a donation or subscribe, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">5. Donations and Subscriptions</h2>
          <p>
            <strong>One-time donations:</strong> When you make a one-time donation, you authorize us to charge your payment method the specified amount. Donations are final and non-refundable except as required by law.
          </p>
          <p className="mt-2">
            <strong>Subscriptions:</strong> Monthly subscriptions will be charged on a recurring basis until cancelled. You may cancel at any time through your account dashboard or by contacting us. Cancellation will take effect at the end of the current billing period. No refunds for partial periods.
          </p>
          <p className="mt-2">
            All payments are processed securely by third-party payment processors. We do not store your full payment details.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">6. Trees and Planting</h2>
          <p>
            When you donate, we commit to planting the specified number of trees on your behalf. Trees are planted in partnership with local farmers and organizations. While we strive to ensure all trees are planted and cared for, we cannot guarantee the survival of every tree due to factors beyond our control (e.g., drought, disease, natural disasters). If a tree dies, we will make reasonable efforts to replace it.
          </p>
          <p>
            Geotagged locations are approximate and may change if a tree is replaced or relocated. The public registry may display donor names unless you choose to remain anonymous.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">7. User Content</h2>
          <p>
            You may post content such as comments, photos, or messages (collectively, "User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute your User Content in connection with the Site and our mission. You represent that your User Content does not violate any laws or third-party rights.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">8. Intellectual Property</h2>
          <p>
            The Site and its original content, features, and functionality are owned by TreeOn and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">9. Prohibited Activities</h2>
          <p>You may not use the Site to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Violate any applicable laws or regulations.</li>
            <li>Impersonate any person or entity.</li>
            <li>Interfere with or disrupt the Site or servers.</li>
            <li>Upload or transmit viruses or malicious code.</li>
            <li>Collect or track personal information of others.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">10. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for the content or practices of those sites. Your use of third-party sites is at your own risk.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">11. Disclaimer of Warranties</h2>
          <p>
            The Site is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the operation or availability of the Site, or the accuracy or completeness of any content. To the fullest extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, in no event shall TreeOn, its directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential damages, or any damages whatsoever arising out of or connected with your use of the Site. Some jurisdictions do not allow limitations of liability, so the above may not apply to you.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">13. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless TreeOn and its affiliates from any claims, damages, expenses, or losses arising out of your violation of these Terms or your use of the Site.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">14. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the Netherlands, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts of Amsterdam.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">15. Termination</h2>
          <p>
            We may terminate or suspend your access to the Site immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Site will cease immediately.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">16. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p>
            By email: <a href="mailto:legal@treeon.org" className="text-primary-600 hover:underline">legal@treeon.org</a><br />
            By mail: TreeOn, 123 Green Street, Amsterdam, 1012 AB, Netherlands
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;