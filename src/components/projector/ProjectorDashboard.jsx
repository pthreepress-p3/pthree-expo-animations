import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function ProjectorDashboard() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring" } }
  };

  return (
    <motion.div 
      className="scene-full"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '60px' }}>
        <motion.h1 
          style={{ fontSize: '4.5rem', marginBottom: '10px' }}
          variants={cardVariants}
        >
          Real-time visibility across your operations
        </motion.h1>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', width: '80%' }}>
        {EXPO_DATA.metrics.map((metric, i) => (
          <motion.div 
            key={i} 
            className="expo-panel"
            variants={cardVariants}
            style={{ 
              width: i < 3 ? '30%' : '40%', // First row 3 items, second row 2 items
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '40px',
              borderTop: `4px solid ${[EXPO_DATA.brand.colors.cyan, EXPO_DATA.brand.colors.yellow, EXPO_DATA.brand.colors.magenta, '#10b981', '#fff'][i]}`
            }}
          >
            <div style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '10px' }}>{metric.value}</div>
            <div style={{ fontSize: '1.5rem', color: '#94a3b8' }}>{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Background network connector lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', opacity: 0.3 }}>
        <path d="M 0 500 Q 960 200 1920 500 M 400 0 L 400 1080 M 1500 0 L 1500 1080" stroke={EXPO_DATA.brand.colors.cyan} strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  );
}
