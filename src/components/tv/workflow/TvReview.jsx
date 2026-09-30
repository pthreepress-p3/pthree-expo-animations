import React from 'react';
import { motion } from 'framer-motion';

export default function TvReview() {
  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      style={{ width: '80%', borderTop: `4px solid #10b981` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Manager Review</h2>
        <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '20px', fontWeight: 'bold' }}>
          Approved
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.2rem', color: '#fff', marginBottom: '40px' }}>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Job Value</div>
          ₹2,84,500
        </div>
        <div>
          <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Production Status</div>
          <span style={{ color: '#10b981' }}>Completed</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <motion.div 
          initial={{ scale: 3, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
          style={{ border: '4px solid #10b981', padding: '10px 40px', borderRadius: '8px', color: '#10b981', fontSize: '2rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}
        >
          APPROVED
        </motion.div>
      </div>
    </motion.div>
  );
}
