// src/pages/public/ContactUs.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaPaperPlane
} from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form submitted:', formData);
      toast.success('Message sent! We’ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: 'Visit Us', details: '123 Green Street, Eco City, EC 12345' },
    { icon: FaPhone, title: 'Call Us', details: '+1 (234) 567-890', link: 'tel:+1234567890' },
    { icon: FaEnvelope, title: 'Email Us', details: 'info@treeon.org', link: 'mailto:info@treeon.org' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/treeon', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/treeon', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/treeon', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/treeon', label: 'LinkedIn' },
  ];

  const faqs = [
    { q: 'How soon will I get a reply?', a: 'We aim to respond within 24-48 hours on business days.' },
    { q: 'Can I visit your planting sites?', a: 'Absolutely! Contact us to arrange a visit to our partner farms.' },
    { q: 'Do you accept volunteers?', a: 'Yes, we welcome volunteers. Please send us your details through this form.' },
    { q: 'How are donations used?', a: '90% of donations go directly to tree planting and farmer support. Read more on our Impact page.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <item.icon className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              {item.link ? (
                <a href={item.link} className="text-primary-600 hover:text-primary-700 transition">
                  {item.details}
                </a>
              ) : (
                <p className="text-gray-600">{item.details}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-3/5 bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/5 space-y-6"
            >
              {/* Map placeholder - you can replace with actual iframe */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-64">
                <img 
                  src="https://via.placeholder.com/600x400?text=Map+Location" 
                  alt="Office location"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Optionally use iframe with Google Maps embed */}
              {/* <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." 
                className="w-full h-64 rounded-2xl shadow-lg"
                allowFullScreen=""
                loading="lazy"
                title="Office location"
              /> */}

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition"
                      aria-label={social.label}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between"><span>Monday - Friday:</span> <span>9:00 AM – 6:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM – 4:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to common inquiries.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8">
          Still have questions? <a href="#contact-form" className="text-primary-600 hover:underline">Contact us</a> directly.
        </p>
      </section>
    </div>
  );
};

export default ContactUs;