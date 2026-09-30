import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function TvClosing() {
  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Background ambient motion so it doesn't look frozen */}
      <motion.div 
        style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${EXPO_DATA.brand.colors.cyan}22, ${EXPO_DATA.brand.colors.magenta}11)` }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        className="expo-panel" 
        style={{ 
          zIndex: 10, 
          textAlign: 'center', 
          padding: '80px', 
          background: 'rgba(2, 6, 23, 0.85)',
          border: `1px solid ${EXPO_DATA.brand.colors.cyan}55`,
          boxShadow: `0 30px 60px -15px ${EXPO_DATA.brand.colors.cyan}44`,
          backdropFilter: 'blur(20px)',
          borderRadius: '32px'
        }}
      >
        <h2 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '20px', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
          See {EXPO_DATA.brand.name} in action
        </h2>
        <p style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '60px' }}>
          Live product demo available at this stall
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <motion.div 
            animate={{ 
              boxShadow: [
                `0 0 0 0px ${EXPO_DATA.brand.colors.cyan}88`,
                `0 0 0 25px ${EXPO_DATA.brand.colors.cyan}00`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ 
              width: '280px', height: '280px', 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '15px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
            }}
          >
            <div style={{ 
              width: '100%', height: '100%', 
              border: `4px dashed ${EXPO_DATA.brand.colors.cyan}`, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              color: EXPO_DATA.brand.colors.cyan, 
              fontSize: '1.5rem', 
              textAlign: 'center',
              fontWeight: 800,
              borderRadius: '12px'
            }}>
              SCAN FOR<br/>LIVE DEMO
            </div>
          </motion.div>
        </div>

        <div style={{ fontSize: '2.5rem', color: EXPO_DATA.brand.colors.cyan, fontWeight: 700, letterSpacing: '2px' }}>
          {EXPO_DATA.brand.website}
        </div>
      </motion.div>
    </motion.div>
  );
}
