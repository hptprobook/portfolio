'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', url: '#', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: '💼', url: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-sky-400' },
    { name: 'Email', icon: '✉️', url: '#', color: 'hover:text-red-400' }
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="mb-16 text-center" variants={itemVariants}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto"></div>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to chat? Feel free to reach out. 
          I am always excited to work on new and challenging projects.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-8"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="john@example.com"
                required
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message 🚀
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info & Social Links */}
        <motion.div className="space-y-8" variants={itemVariants}>
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">john.doe@example.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Connect with me</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className={`flex items-center space-x-3 p-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg transition-all duration-200 ${social.color}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="font-medium">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <motion.div
            className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <motion.div
              className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-400 font-bold">Available for new projects</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 text-center"
        variants={itemVariants}
      >
        <p className="text-gray-400 mb-6">
          Prefer email? Drop me a line directly at{' '}
          <a href="mailto:john.doe@example.com" className="text-cyan-400 hover:underline">
            john.doe@example.com
          </a>
        </p>
        
        <motion.button
          className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 px-8 py-3 rounded-lg font-medium transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download My Resume 📄
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ContactSection; 