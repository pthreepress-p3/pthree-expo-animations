import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../../data/expoData';

export default function TvAccounts() {
  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, type: "spring" }}
      style={{ width: '80%', background: '#fff', color: '#000', borderTop: `8px solid ${EXPO_DATA.brand.colors.cyan}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>INVOICE</h2>
          <div style={{ fontSize: '1rem', color: '#64748b' }}>INV-2026-1248</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: EXPO_DATA.brand.colors.cyan }}>
          {EXPO_DATA.brand.name}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px', textTransform: 'uppercase' }}>Billed To</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{EXPO_DATA.job.customer}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px', textTransform: 'uppercase' }}>Status</div>
          <div style={{ padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block' }}>
            Ready to Dispatch
          </div>
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px' }}>
          <span style={{ fontWeight: 600 }}>Description</span>
          <span style={{ fontWeight: 600 }}>Amount</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{EXPO_DATA.job.name} ({EXPO_DATA.job.quantity})</span>
          <span>₹2,84,500</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '20px' }}>
          <span>GST (18%)</span>
          <span>₹51,210</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 700, borderTop: '2px solid #cbd5e1', paddingTop: '15px' }}>
          <span>Total</span>
          <span>₹3,35,710</span>
        </div>
      </div>

      <motion.div 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: EXPO_DATA.brand.colors.cyan }}>Generating Invoice...</div>
      </motion.div>
    </motion.div>
  );
}
