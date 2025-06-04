'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="mb-16" variants={itemVariants}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Text Content */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <p className="text-lg text-gray-300 leading-relaxed">
            I&apos;m a passionate full-stack developer with over 5 years of experience 
            in creating digital solutions that make a difference. My journey in 
            technology started with curiosity and has evolved into a deep love 
            for crafting innovative applications.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring the latest tech trends, 
            contributing to open-source projects, or mentoring aspiring developers. 
            I believe in the power of technology to transform ideas into reality.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <motion.div
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-cyan-400">50+</div>
              <div className="text-gray-400">Projects Completed</div>
            </motion.div>
            
            <motion.div
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-cyan-400">5+</div>
              <div className="text-gray-400">Years Experience</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Image & Details */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
            </div>

            {/* Details */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">John Doe</h3>
              <p className="text-cyan-400">Full Stack Developer</p>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <span>📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>🎓</span>
                  <span>Computer Science, Stanford</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>💼</span>
                  <span>Available for hire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-3 text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📄 Download CV
            </motion.button>
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg p-3 text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              💬 Let&apos;s Talk
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Technologies */}
      <motion.div className="mt-16" variants={itemVariants}>
        <h3 className="text-2xl font-bold text-white mb-6">Technologies I Love</h3>
        <div className="flex flex-wrap gap-3">
          {[
            'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 
            'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL'
          ].map((tech, index) => (
            <motion.span
              key={tech}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-default"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection; 