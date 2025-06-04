'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface RocketTransitionProps {
  onComplete: () => void;
}

const RocketTransition: React.FC<RocketTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Rocket */}
      <motion.div
        className="relative"
        initial={{ y: 100, scale: 0.5 }}
        animate={{ y: -200, scale: 1.5 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        {/* Rocket body */}
        <div className="w-16 h-32 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-full relative">
          {/* Rocket window */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full opacity-80"></div>
          
          {/* Rocket fins */}
          <div className="absolute bottom-0 -left-2 w-4 h-8 bg-red-500 clip-path-triangle"></div>
          <div className="absolute bottom-0 -right-2 w-4 h-8 bg-red-500 clip-path-triangle"></div>
        </div>

        {/* Rocket flames */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
          }}
        >
          <div className="w-8 h-12 bg-gradient-to-b from-orange-400 via-red-500 to-yellow-300 rounded-b-full"></div>
        </motion.div>

        {/* Particle trail */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 20],
            opacity: [1, 0],
            scale: [0.5, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-orange-400 rounded-full absolute"
              style={{
                left: `${Math.random() * 20 - 10}px`,
              }}
              animate={{
                y: [0, 30],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Launch text */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Launching into Space...
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default RocketTransition; 