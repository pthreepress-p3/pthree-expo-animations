import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function ProjectorConnection() {
  const cards = EXPO_DATA.challenges;
  
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, delay: 1, ease: "easeInOut" } 
    }
  };

  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '40px' }}>
        <motion.h1 
          style={{ fontSize: '4.5rem', marginBottom: '10px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          One connected platform for print operations.
        </motion.h1>
        <motion.h2 
          style={{ fontSize: '2rem', color: '#94a3b8', fontWeight: 400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          From job creation to production, review and billing.
        </motion.h2>
      </div>

      <div style={{ position: 'relative', width: '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Central Hub */}
        <motion.div 
          className="expo-panel glow-cyan"
          style={{ width: '150px', height: '150px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5, border: `2px solid ${EXPO_DATA.brand.colors.cyan}` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>PTHREE</span>
        </motion.div>

        {/* Connector SVG */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <motion.line x1="400" y1="300" x2="150" y2="150" stroke={EXPO_DATA.brand.colors.cyan} strokeWidth="3" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.line x1="400" y1="300" x2="650" y2="150" stroke={EXPO_DATA.brand.colors.yellow} strokeWidth="3" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.line x1="400" y1="300" x2="150" y2="450" stroke={EXPO_DATA.brand.colors.magenta} strokeWidth="3" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.line x1="400" y1="300" x2="650" y2="450" stroke="#fff" strokeWidth="3" variants={lineVariants} initial="hidden" animate="visible" />
        </svg>

        {/* Converged Cards */}
        <motion.div className="expo-panel" style={{ position: 'absolute', top: '50px', left: '0px', width: '300px' }} initial={{ opacity: 0, x: -100, y: -100 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 1.5 }}>
          <h4 style={{ color: EXPO_DATA.brand.colors.cyan, fontSize: '1.2rem' }}>Job Cards</h4>
        </motion.div>
        
        <motion.div className="expo-panel" style={{ position: 'absolute', top: '50px', right: '0px', width: '300px' }} initial={{ opacity: 0, x: 100, y: -100 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 1.6 }}>
          <h4 style={{ color: EXPO_DATA.brand.colors.yellow, fontSize: '1.2rem' }}>Production</h4>
        </motion.div>

        <motion.div className="expo-panel" style={{ position: 'absolute', bottom: '50px', left: '0px', width: '300px' }} initial={{ opacity: 0, x: -100, y: 100 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 1.7 }}>
          <h4 style={{ color: EXPO_DATA.brand.colors.magenta, fontSize: '1.2rem' }}>Inventory</h4>
        </motion.div>

        <motion.div className="expo-panel" style={{ position: 'absolute', bottom: '50px', right: '0px', width: '300px' }} initial={{ opacity: 0, x: 100, y: 100 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 1.8 }}>
          <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>Billing</h4>
        </motion.div>

      </div>
    </motion.div>
  );
}
