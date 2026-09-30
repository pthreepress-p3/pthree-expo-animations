import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function ProjectorIntro() {
  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Subtle halftone/particle background effect (simplified as CSS background in a real implementation) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <motion.div 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
        initial={{ scale: 0.9, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          {/* Abstract Print Mark / Stylized P */}
          <svg width="80" height="80" viewBox="0 0 100 100">
            <motion.path 
              d="M 20 80 L 20 20 L 70 20 L 70 60 L 40 60 L 40 80 Z" 
              fill="none" 
              stroke="#fff" 
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* CMYK Accent Blocks */}
            <motion.rect x="75" y="20" width="20" height="20" fill={EXPO_DATA.brand.colors.cyan} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
            <motion.rect x="75" y="45" width="20" height="20" fill={EXPO_DATA.brand.colors.yellow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} />
            <motion.rect x="75" y="70" width="20" height="20" fill={EXPO_DATA.brand.colors.magenta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} />
          </svg>
          
          <h1 style={{ fontSize: '6rem', letterSpacing: '8px', margin: 0, fontWeight: 700 }}>
            {EXPO_DATA.brand.name}
          </h1>
        </div>
        
        <motion.h2 
          style={{ fontSize: '2rem', color: '#94a3b8', fontWeight: 300, letterSpacing: '2px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          {EXPO_DATA.brand.tagline}
        </motion.h2>

        <motion.p
          style={{ fontSize: '1.5rem', marginTop: '40px', color: '#fff', fontWeight: 500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          {EXPO_DATA.brand.vision}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
