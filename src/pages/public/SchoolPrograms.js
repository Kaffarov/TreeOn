// src/pages/public/SchoolPrograms.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaTree, 
  FaLeaf, 
  FaUsers, 
  FaGlobe,
  FaBookOpen,
  FaHandsHelping,
  FaArrowRight
} from 'react-icons/fa';

const SchoolPrograms = () => {
  const benefits = [
    { icon: FaGraduationCap, title: 'Environmental Education', description: 'Students learn about climate change, biodiversity, and sustainability.' },
    { icon: FaTree, title: 'Hands-On Planting', description: 'Participate in tree planting events and track the growth of your trees.' },
    { icon: FaUsers, title: 'Community Engagement', description: 'Connect with local farmers and communities.' },
    { icon: FaGlobe, title: 'Global Impact', description: 'Your school’s trees will be part of a worldwide reforestation effort.' },
  ];

  const programs = [
    {
      title: 'Classroom Planting Kit',
      ageGroup: 'Ages 6–12',
      description: 'Includes lesson plans, activities, and a class tree planting project.',
      image: 'https://via.placeholder.com/400x250?text=Classroom+Kit',
    },
    {
      title: 'School Forest Initiative',
      ageGroup: 'All ages',
      description: 'Transform a part of your school grounds into a mini forest with native trees.',
      image: 'https://via.placeholder.com/400x250?text=School+Forest',
    },
    {
      title: 'Global Student Ambassador',
      ageGroup: 'Ages 13–18',
      description: 'Leadership program where students lead fundraising and awareness campaigns.',
      image: 'https://via.placeholder.com/400x250?text=Ambassador',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaBookOpen className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">School Programs</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Inspire the next generation of environmental stewards. Bring TreeOn to your school.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Schools */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Partner with TreeOn?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our programs combine hands-on action with curriculum-aligned learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Overview */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Our Programs
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img src={program.image} alt={program.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
                    {program.ageGroup}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Learn more <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: 1, title: 'Contact us', desc: 'Fill out our interest form or email us.' },
            { step: 2, title: 'We design a plan', desc: 'We tailor a program to your school’s needs and curriculum.' },
            { step: 3, title: 'Start planting', desc: 'Engage students in planting and tracking their trees.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial / Case Study (placeholder) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FaLeaf className="text-primary-600 text-2xl" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Green Valley School</p>
                <p className="text-sm text-gray-500">California, USA</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Partnering with TreeOn has been transformative for our students. They now understand the impact they can have on the environment. We've planted over 200 trees!"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bring TreeOn to Your School</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready to inspire your students? Contact us to get started.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default SchoolPrograms;