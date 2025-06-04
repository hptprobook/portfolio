'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Framer Motion', level: 85 }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'GraphQL', level: 78 }
      ]
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git/GitHub', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Figma', level: 70 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const skillVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="mb-16" variants={categoryVariants}>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
        <p className="text-gray-400 mt-4 text-lg">
          Technologies and tools I use to bring ideas to life.
        </p>
      </motion.div>

      {/* Skills Categories */}
      <div className="grid lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-6"
            variants={categoryVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Category Header */}
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{category.icon}</span>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  variants={skillVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (categoryIndex * 0.3) + (skillIndex * 0.1) }}
                >
                  {/* Skill Name and Percentage */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
                  </div>

                  {/* Skill Bar */}
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1, 
                        delay: (categoryIndex * 0.3) + (skillIndex * 0.1) + 0.5,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Skills */}
      <motion.div
        className="mt-16"
        variants={categoryVariants}
      >
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Additional Technologies
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'MongoDB', icon: '🍃' },
            { name: 'Redis', icon: '🔴' },
            { name: 'Jest', icon: '🧪' },
            { name: 'Cypress', icon: '🌲' },
            { name: 'Webpack', icon: '📦' },
            { name: 'Vite', icon: '⚡' }
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:border-cyan-400/50 transition-colors"
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + (index * 0.1) }}
            >
              <div className="text-2xl mb-2">{tech.icon}</div>
              <div className="text-sm text-gray-300">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700 p-8"
        variants={categoryVariants}
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <motion.div
              className="text-4xl font-bold text-cyan-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              5+
            </motion.div>
            <div className="text-gray-400">Years of Experience</div>
          </div>
          
          <div>
            <motion.div
              className="text-4xl font-bold text-cyan-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.2, type: "spring" }}
            >
              20+
            </motion.div>
            <div className="text-gray-400">Technologies</div>
          </div>
          
          <div>
            <motion.div
              className="text-4xl font-bold text-cyan-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.4, type: "spring" }}
            >
              50+
            </motion.div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection; 