// src/pages/public/QRCodeScanner.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaCamera, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Note: For a real QR scanner, install react-qr-reader:
// npm install react-qr-reader
// Then import QrReader from 'react-qr-reader';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Mock function to simulate QR detection
  const handleScan = (data) => {
    if (data) {
      setScanning(false);
      setScanResult(data);
      toast.success('QR code scanned!');
    }
  };

  const handleError = (err) => {
    console.error(err);
    toast.error('Camera error: ' + err.message);
  };

  const startScan = () => {
    setScanning(true);
    setScanResult(null);
  };

  const stopScan = () => {
    setScanning(false);
  };

  const handleManualLookup = () => {
    if (manualCode.trim()) {
      setScanResult(manualCode.trim());
    } else {
      toast.error('Please enter a tree ID or QR code');
    }
  };

  // In a real implementation, you would fetch tree data based on the scanned code
  // For now, we'll just display the scanned code with a link
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            QR Code Scanner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Scan the QR code on your tree badge to view tree details.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          {/* Camera / Scanner area */}
          <div className="mb-6">
            {scanning ? (
              <div className="relative">
                <div className="bg-black rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                  {/* This is where the actual QrReader component would go */}
                  <div className="text-white text-center p-4">
                    <p className="mb-2">Camera active – point at QR code</p>
                    <div className="w-32 h-32 border-2 border-white mx-auto rounded-lg animate-pulse"></div>
                  </div>
                  {/* Simulated scanner for demo purposes */}
                </div>
                <button
                  onClick={stopScan}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg aspect-square flex flex-col items-center justify-center p-6 text-center">
                <FaQrcode className="text-5xl text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Click "Start Scanner" to use your camera.</p>
                <button
                  onClick={startScan}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                >
                  <FaCamera />
                  <span>Start Scanner</span>
                </button>
              </div>
            )}
          </div>

          {/* Manual entry */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Or enter code manually</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Tree ID or QR text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleManualLookup}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Look up
              </button>
            </div>
          </div>

          {/* Scan result */}
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200"
            >
              <h4 className="font-bold text-gray-800 mb-2">Scanned Code:</h4>
              <p className="text-sm text-gray-600 break-all mb-3">{scanResult}</p>
              <Link
                to={`/tree/${scanResult}`}
                className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
              >
                View Tree Details
              </Link>
            </motion.div>
          )}

          {/* Note about installation */}
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p>
              <strong>Note:</strong> For actual camera scanning, please install{' '}
              <code className="bg-gray-200 px-1">react-qr-reader</code> and uncomment the QrReader component.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QRCodeScanner;