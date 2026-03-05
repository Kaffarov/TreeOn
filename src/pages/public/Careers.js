// src/pages/public/Careers.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaLeaf, 
  FaUsers, 
  FaHeart, 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaClock, 
  FaBriefcase,
  FaEnvelope,
  FaHandsHelping
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock job listings
  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Berlin',
      type: 'Full-time',
      description: 'Build and maintain our tree planting platform, donor dashboard, and internal tools.',
      posted: '2026-03-01',
    },
    {
      id: 2,
      title: 'Community Manager',
      department: 'Community',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      description: 'Engage with our farmer community, organize training events, and share success stories.',
      posted: '2026-02-28',
    },
    {
      id: 3,
      title: 'Forestation Project Manager',
      department: 'Operations',
      location: 'Manaus, Brazil',
      type: 'Full-time',
      description: 'Oversee tree planting projects in the Amazon, coordinate with farmers and partners.',
      posted: '2026-02-25',
    },
    {
      id: 4,
      title: 'Data Analyst',
      department: 'Data',
      location: 'Remote',
      type: 'Part-time',
      description: 'Analyze impact data, generate reports, and help improve our monitoring systems.',
      posted: '2026-02-20',
    },
    {
      id: 5,
      title: 'Social Media Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Contract',
      description: 'Create engaging content for our social channels, tell our story to the world.',
      posted: '2026-02-18',
    },
  ];

  const departments = ['all', ...new Set(jobs.map(job => job.department))];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  const handleApply = (jobTitle) => {
    toast.success(`Application started for ${jobTitle} (mock)`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaTree className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the TreeOn Team</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Help us restore the planet, empower farmers, and build a greener future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Work at TreeOn?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a passionate team dedicated to making a real impact. Join us and be part of the solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FaLeaf, title: 'Purpose-Driven', desc: 'Every day, you’ll contribute to reforestation and climate action.' },
            { icon: FaUsers, title: 'Global Community', desc: 'Work with farmers and partners across the world.' },
            { icon: FaHeart, title: 'Supportive Culture', desc: 'We value work-life balance, diversity, and growth.' },
            { icon: FaGlobe, title: 'Remote-Friendly', desc: 'Flexible work options – from home or our hubs.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <item.icon className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Current Openings */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Current Openings</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore opportunities to join our growing team.
            </p>
          </motion.div>

          {/* Department filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedDepartment === dept
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-100'
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center"><FaBriefcase className="mr-1 text-primary-500" /> {job.department}</span>
                      <span className="flex items-center"><FaMapMarkerAlt className="mr-1 text-primary-500" /> {job.location}</span>
                      <span className="flex items-center"><FaClock className="mr-1 text-primary-500" /> {job.type}</span>
                    </div>
                    <p className="mt-3 text-gray-600">{job.description}</p>
                    <p className="mt-2 text-xs text-gray-400">Posted {job.posted}</p>
                  </div>
                  <button
                    onClick={() => handleApply(job.title)}
                    className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredJobs.length === 0 && (
              <p className="text-center text-gray-500 py-8">No openings in this category right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits & Perks</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We take care of our team so they can focus on changing the world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-primary-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Health & Wellness</h3>
            <p className="text-gray-600 text-sm">Comprehensive health insurance, wellness stipend, and mental health support.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-primary-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Annual Tree Benefit</h3>
            <p className="text-gray-600 text-sm">100 trees planted in your name every year, with geotagged certificates.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="text-primary-600 text-xl" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Remote Work</h3>
            <p className="text-gray-600 text-sm">Work from anywhere, with flexible hours and home office stipend.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact / Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Don't see the right role?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're always looking for passionate people. Send us your CV and tell us how you can contribute.
            </p>
            <a
              href="mailto:careers@treeon.org"
              className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg space-x-3"
            >
              <FaEnvelope />
              <span>careers@treeon.org</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;