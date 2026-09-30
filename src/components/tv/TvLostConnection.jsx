import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function TvLostConnection() {
  return (
    <div 
      className="scene-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#020617',
        position: 'relative'
      }}
    >
      {/* Secret Red Blinking Dot for Staff in Top Right */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '16px',
          height: '16px',
          backgroundColor: '#EF4444',
          borderRadius: '50%',
          boxShadow: '0 0 15px #EF4444',
          zIndex: 50
        }}
      />

      {/* Subtle Ambient Background */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${EXPO_DATA.brand.colors.cyan}15, transparent 70%)`
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Central Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ 
          zIndex: 10, 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <img 
          src="/pthree white.png" 
          alt="PTHREE" 
          style={{ width: '800px', maxWidth: '80%', height: 'auto', marginBottom: '20px' }} 
        />
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ 
            fontSize: '4rem', 
            fontWeight: 500, 
            color: '#e2e8f0', 
            letterSpacing: '12px',
            textTransform: 'uppercase',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          Print Automation Simplified
        </motion.h2>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '60px',
          fontSize: '1.8rem',
          color: '#64748b',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 600
        }}
      >
        A product by <span style={{ color: EXPO_DATA.brand.colors.cyan }}>Lamacode Tech</span>
      </motion.div>
    </div>
  );
}
