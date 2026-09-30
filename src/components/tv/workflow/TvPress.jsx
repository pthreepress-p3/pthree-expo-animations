import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../../data/expoData';
import { Printer } from 'lucide-react';

export default function TvPress() {
  const [sheets, setSheets] = useState(0);

  useEffect(() => {
    // Fast ticking number effect for sheets
    const interval = setInterval(() => {
      setSheets(prev => {
        const next = prev + Math.floor(Math.random() * 500) + 100;
        return next > 31250 ? 31250 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      style={{ width: '80%', borderTop: `4px solid ${EXPO_DATA.brand.colors.magenta}`, position: 'relative' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Printer size={40} color={EXPO_DATA.brand.colors.magenta} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Press Production</h2>
        </div>
        <motion.div 
          style={{ padding: '8px 16px', background: 'rgba(236, 0, 140, 0.2)', color: EXPO_DATA.brand.colors.magenta, borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div style={{ width: '8px', height: '8px', borderRadius: '50%', background: EXPO_DATA.brand.colors.magenta }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
          Running
        </motion.div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.2rem', color: '#fff', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>Machine</div>
          <div style={{ fontWeight: 600 }}>{EXPO_DATA.job.machine}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>Ink Profile</div>
          <div style={{ fontWeight: 600 }}>{EXPO_DATA.job.colours}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 2, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Animated Matrix Background */}
          <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }} animate={{ y: [0, 20] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
          
          <div style={{ zIndex: 10 }}>
            <div style={{ color: '#10b981', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '10px' }}>Good Sheets</div>
            <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#fff', textShadow: '0 0 20px rgba(16,185,129,0.5)', fontVariantNumeric: 'tabular-nums' }}>
              {sheets.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#ef4444', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '10px' }}>Wastage</div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}>
            {Math.floor(sheets * 0.013)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
