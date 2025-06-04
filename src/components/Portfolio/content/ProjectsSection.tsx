'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '🛒',
      status: 'Live',
      link: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time collaborative task management with WebSocket integration',
      tech: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind'],
      image: '📋',
      status: 'In Progress',
      link: '#'
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using OpenAI API',
      tech: ['Python', 'FastAPI', 'OpenAI', 'React'],
      image: '🤖',
      status: 'Live',
      link: '#'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with data visualization',
      tech: ['Vue.js', 'D3.js', 'Express', 'Weather API'],
      image: '🌤️',
      status: 'Live',
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="mb-16" variants={cardVariants}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          My Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
        <p className="text-gray-400 mt-4 text-lg">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image/Icon */}
            <div className="h-48 bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center">
              <span className="text-6xl">{project.image}</span>
            </div>

            {/* Project Info */}
            <div className="p-6">
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Live
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Code
                </motion.button>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects */}
      <motion.div
        className="text-center mt-12"
        variants={cardVariants}
      >
        <motion.button
          className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 px-8 py-3 rounded-lg font-medium transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects on GitHub
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection; 