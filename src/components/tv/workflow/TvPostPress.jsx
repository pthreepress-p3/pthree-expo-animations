import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../../data/expoData';

export default function TvPostPress() {
  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      style={{ width: '80%', borderTop: `4px solid ${EXPO_DATA.brand.colors.cyan}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Post Press Finishing</h2>
        <div style={{ padding: '8px 16px', background: 'rgba(0, 174, 239, 0.2)', color: EXPO_DATA.brand.colors.cyan, borderRadius: '20px', fontWeight: 'bold' }}>
          In Progress
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.2rem', color: '#fff', marginBottom: '40px' }}>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Process</div>
          {EXPO_DATA.job.finishing}
        </div>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Adhesive</div>
          8 GSM
        </div>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Film</div>
          Matte Lamination Film
        </div>
      </div>

      <div style={{ height: '60px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)` }}
          animate={{ left: ['-30%', '130%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94a3b8', zIndex: 1 }}>
          Laminating...
        </div>
      </div>
    </motion.div>
  );
}
