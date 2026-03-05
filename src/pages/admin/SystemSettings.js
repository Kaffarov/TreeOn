// src/pages/admin/SystemSettings.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCog, 
  FaEnvelope, 
  FaCreditCard, 
  FaBell, 
  FaLock, 
  FaPalette,
  FaSave,
  FaGlobe,
  FaUserShield,
  FaDatabase
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      siteName: 'TreeOn',
      siteUrl: 'https://treeon.org',
      adminEmail: 'admin@treeon.org',
      timezone: 'UTC',
      language: 'en',
      maintenanceMode: false,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'noreply@treeon.org',
      smtpPass: '********',
      fromEmail: 'noreply@treeon.org',
      fromName: 'TreeOn',
      useTLS: true,
    },
    payments: {
      currency: 'EUR',
      stripePublicKey: 'pk_test_...',
      stripeSecretKey: 'sk_test_...',
      paypalClientId: 'test_client_id',
      paypalSecret: 'test_secret',
      testMode: true,
    },
    notifications: {
      newDonor: true,
      newFarmer: true,
      deathReport: true,
      replacementRequest: true,
      paymentFailed: true,
      weeklyDigest: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30, // minutes
      passwordMinLength: 8,
      requireStrongPasswords: true,
      ipWhitelist: '',
      allowRegistration: true,
    },
    appearance: {
      primaryColor: '#2e8b57',
      secondaryColor: '#f39c12',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      customCSS: '',
    },
  });

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'email', label: 'Email', icon: FaEnvelope },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
  ];

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully');
      setIsSaving(false);
    }, 1000);
  };

  const renderGeneral = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
          <input
            type="url"
            value={settings.general.siteUrl}
            onChange={(e) => handleChange('general', 'siteUrl', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => handleChange('general', 'adminEmail', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="Europe/London">London</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={settings.general.maintenanceMode}
            onChange={(e) => handleChange('general', 'maintenanceMode', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
            Enable Maintenance Mode
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUser}
            onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPass}
            onChange={(e) => handleChange('email', 'smtpPass', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleChange('email', 'fromName', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useTLS"
            checked={settings.email.useTLS}
            onChange={(e) => handleChange('email', 'useTLS', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="useTLS" className="ml-2 block text-sm text-gray-700">
            Use TLS/SSL
          </label>
        </div>
      </div>
      <div>
        <button className="text-primary-600 text-sm font-medium">Send Test Email</button>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            value={settings.payments.currency}
            onChange={(e) => handleChange('payments', 'currency', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="testMode"
            checked={settings.payments.testMode}
            onChange={(e) => handleChange('payments', 'testMode', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="testMode" className="ml-2 block text-sm text-gray-700">
            Test Mode (Sandbox)
          </label>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800">Stripe</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
          <input
            type="text"
            value={settings.payments.stripePublicKey}
            onChange={(e) => handleChange('payments', 'stripePublicKey', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
          <input
            type="password"
            value={settings.payments.stripeSecretKey}
            onChange={(e) => handleChange('payments', 'stripeSecretKey', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800">PayPal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
          <input
            type="text"
            value={settings.payments.paypalClientId}
            onChange={(e) => handleChange('payments', 'paypalClientId', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secret</label>
          <input
            type="password"
            value={settings.payments.paypalSecret}
            onChange={(e) => handleChange('payments', 'paypalSecret', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newDonor"
            checked={settings.notifications.newDonor}
            onChange={(e) => handleChange('notifications', 'newDonor', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="newDonor" className="ml-2 block text-sm text-gray-700">
            New Donor Registration
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newFarmer"
            checked={settings.notifications.newFarmer}
            onChange={(e) => handleChange('notifications', 'newFarmer', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="newFarmer" className="ml-2 block text-sm text-gray-700">
            New Farmer Registration
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deathReport"
            checked={settings.notifications.deathReport}
            onChange={(e) => handleChange('notifications', 'deathReport', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="deathReport" className="ml-2 block text-sm text-gray-700">
            Tree Death Report
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="replacementRequest"
            checked={settings.notifications.replacementRequest}
            onChange={(e) => handleChange('notifications', 'replacementRequest', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="replacementRequest" className="ml-2 block text-sm text-gray-700">
            Replacement Request
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="paymentFailed"
            checked={settings.notifications.paymentFailed}
            onChange={(e) => handleChange('notifications', 'paymentFailed', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="paymentFailed" className="ml-2 block text-sm text-gray-700">
            Failed Payment Alert
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="weeklyDigest"
            checked={settings.notifications.weeklyDigest}
            onChange={(e) => handleChange('notifications', 'weeklyDigest', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="weeklyDigest" className="ml-2 block text-sm text-gray-700">
            Weekly Digest Email
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="twoFactorAuth"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
            Require Two-Factor Authentication for Admins
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireStrongPasswords"
            checked={settings.security.requireStrongPasswords}
            onChange={(e) => handleChange('security', 'requireStrongPasswords', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="requireStrongPasswords" className="ml-2 block text-sm text-gray-700">
            Require Strong Passwords
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowRegistration"
            checked={settings.security.allowRegistration}
            onChange={(e) => handleChange('security', 'allowRegistration', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-700">
            Allow New User Registration
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
          <input
            type="number"
            min="1"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
          <input
            type="number"
            min="6"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">IP Whitelist (comma separated)</label>
          <input
            type="text"
            value={settings.security.ipWhitelist}
            onChange={(e) => handleChange('security', 'ipWhitelist', e.target.value)}
            placeholder="192.168.1.1, 10.0.0.1"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
          <div className="flex">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleChange('appearance', 'primaryColor', e.target.value)}
              className="w-12 h-10 border rounded-l-lg"
            />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border-t border-b border-r rounded-r-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
          <div className="flex">
            <input
              type="color"
              value={settings.appearance.secondaryColor}
              onChange={(e) => handleChange('appearance', 'secondaryColor', e.target.value)}
              className="w-12 h-10 border rounded-l-lg"
            />
            <input
              type="text"
              value={settings.appearance.secondaryColor}
              onChange={(e) => handleChange('appearance', 'secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border-t border-b border-r rounded-r-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            type="url"
            value={settings.appearance.logo}
            onChange={(e) => handleChange('appearance', 'logo', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Favicon URL</label>
          <input
            type="url"
            value={settings.appearance.favicon}
            onChange={(e) => handleChange('appearance', 'favicon', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom CSS</label>
          <textarea
            rows="4"
            value={settings.appearance.customCSS}
            onChange={(e) => handleChange('appearance', 'customCSS', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500"
            placeholder="/* Add custom styles here */"
          />
        </div>
      </div>
    </div>
  );

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
            <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
            <p className="text-gray-600 mt-2">Configure system-wide settings.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'general' && renderGeneral()}
          {activeTab === 'email' && renderEmail()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'appearance' && renderAppearance()}
        </motion.div>
      </div>
    </div>
  );
};

export default SystemSettings;
