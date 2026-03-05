// src/pages/public/APIDocumentation.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaKey, FaTree, FaUsers, FaHandsHelping, FaMapMarkedAlt, FaChartLine, FaBookOpen } from 'react-icons/fa';

const APIDocumentation = () => {
  const sections = [
    {
      title: 'Introduction',
      icon: FaBookOpen,
      content: (
        <div className="space-y-4">
          <p>
            The TreeOn API allows developers to integrate tree planting data, donor impact, and farmer information into your applications. Our RESTful API provides access to public tree registry data, donor contributions, and more.
          </p>
          <p>
            Base URL: <code className="bg-gray-800 text-white px-2 py-1 rounded">https://api.treeon.org/v1</code>
          </p>
        </div>
      ),
    },
    {
      title: 'Authentication',
      icon: FaKey,
      content: (
        <div className="space-y-4">
          <p>
            To access protected endpoints, you need an API key. Include your API key in the request header:
          </p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
          </pre>
          <p>
            To obtain an API key, please contact us at <a href="mailto:api@treeon.org" className="text-primary-600 hover:underline">api@treeon.org</a>.
          </p>
        </div>
      ),
    },
    {
      title: 'Endpoints',
      icon: FaCode,
      content: (
        <div className="space-y-8">
          {/* Trees */}
          <div className="border-l-4 border-primary-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center"><FaTree className="mr-2 text-primary-500" /> Trees</h3>
            <div className="mt-2 space-y-4">
              <div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                <code className="text-sm">/trees</code>
                <p className="text-gray-600 mt-1">List all public trees (with optional filters).</p>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Query Parameters:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li><code>species</code> – filter by species</li>
                    <li><code>country</code> – filter by country</li>
                    <li><code>status</code> – alive/dead/replaced</li>
                    <li><code>limit</code> – pagination limit (default 50)</li>
                    <li><code>offset</code> – pagination offset</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Example Request:</p>
                  <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">curl -H "Authorization: Bearer YOUR_API_KEY" "https://api.treeon.org/v1/trees?species=Oak&limit=10"</pre>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Example Response:</p>
                  <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">
{`{
  "data": [
    {
      "id": "T12345",
      "species": "Oak",
      "location": { "lat": -1.2921, "lng": 36.8219 },
      "plantedDate": "2026-02-15",
      "status": "alive"
    }
  ],
  "total": 58420,
  "limit": 10,
  "offset": 0
}`}
                  </pre>
                </div>
              </div>
              <div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                <code className="text-sm">/trees/{'{id}'}</code>
                <p className="text-gray-600 mt-1">Get details of a specific tree.</p>
                <div className="mt-2">
                  <p className="text-sm font-semibold">Example Response:</p>
                  <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">
{`{
  "id": "T12345",
  "species": "Oak",
  "location": { "lat": -1.2921, "lng": 36.8219 },
  "plantedDate": "2026-02-15",
  "donor": "John Smith",
  "farmer": "John Kamau",
  "planter": "Peter M.",
  "status": "alive",
  "healthStatus": "healthy"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Donors */}
          <div className="border-l-4 border-primary-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center"><FaUsers className="mr-2 text-primary-500" /> Donors</h3>
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
              <code className="text-sm">/donors</code>
              <p className="text-gray-600 mt-1">List public donor information (anonymous donors excluded).</p>
              <p className="text-gray-500 text-sm mt-1">Requires admin API key.</p>
            </div>
          </div>

          {/* Farmers */}
          <div className="border-l-4 border-primary-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center"><FaHandsHelping className="mr-2 text-primary-500" /> Farmers</h3>
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
              <code className="text-sm">/farmers</code>
              <p className="text-gray-600 mt-1">List farmers and their tree counts.</p>
            </div>
          </div>

          {/* Impact */}
          <div className="border-l-4 border-primary-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center"><FaChartLine className="mr-2 text-primary-500" /> Impact</h3>
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
              <code className="text-sm">/impact</code>
              <p className="text-gray-600 mt-1">Get global impact statistics (trees planted, CO₂ offset, etc.).</p>
            </div>
          </div>

          {/* Map */}
          <div className="border-l-4 border-primary-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center"><FaMapMarkedAlt className="mr-2 text-primary-500" /> Map</h3>
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
              <code className="text-sm">/map/bounds</code>
              <p className="text-gray-600 mt-1">Get trees within a bounding box (for map clustering).</p>
              <p className="text-sm font-semibold mt-2">Query Parameters:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li><code>sw_lat</code>, <code>sw_lng</code> – southwest corner</li>
                <li><code>ne_lat</code>, <code>ne_lng</code> – northeast corner</li>
                <li><code>zoom</code> – zoom level (affects clustering)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Rate Limits',
      icon: FaChartLine,
      content: (
        <div className="space-y-4">
          <p>Public endpoints are limited to 100 requests per minute per IP. Authenticated requests with an API key have a limit of 1000 requests per minute.</p>
          <p>Rate limit headers are included in responses:</p>
          <ul className="list-disc pl-5 text-gray-600">
            <li><code>X-RateLimit-Limit</code></li>
            <li><code>X-RateLimit-Remaining</code></li>
            <li><code>X-RateLimit-Reset</code></li>
          </ul>
        </div>
      ),
    },
    {
      title: 'SDKs & Libraries',
      icon: FaCode,
      content: (
        <div className="space-y-4">
          <p>Official client libraries are available for:</p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>JavaScript (Node.js / Browser) – <code className="bg-gray-100 px-1">npm install treeon-api</code></li>
            <li>Python – <code className="bg-gray-100 px-1">pip install treeon-client</code></li>
            <li>Ruby – <code className="bg-gray-100 px-1">gem install treeon</code></li>
          </ul>
          <p>View source on <a href="#" className="text-primary-600 hover:underline">GitHub</a>.</p>
        </div>
      ),
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
            <FaCode className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Integrate TreeOn data into your applications with our simple REST API.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <section.icon className="mr-3 text-primary-500" />
                {section.title}
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                {section.content}
              </div>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-50 p-8 rounded-xl text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Questions about the API? Contact our developer support team.
            </p>
            <a
              href="mailto:api@treeon.org"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              api@treeon.org
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default APIDocumentation;