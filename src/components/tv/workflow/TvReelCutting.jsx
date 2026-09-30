import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../../data/expoData';
import { Scissors } from 'lucide-react';

export default function TvReelCutting() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress up to 45%
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 45) {
          clearInterval(interval);
          return 45;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, type: 'spring' }}
      style={{ width: '80%', borderTop: `4px solid ${EXPO_DATA.brand.colors.yellow}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Scissors size={40} color={EXPO_DATA.brand.colors.yellow} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Material Issue</h2>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(255, 242, 0, 0.2)', color: EXPO_DATA.brand.colors.yellow, borderRadius: '20px', fontWeight: 'bold' }}>
          Cutting in Progress
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        
        {/* Left Data */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.2rem', color: '#fff' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Material</div>
            {EXPO_DATA.job.paper}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Initial Weight</div>
            520 kg
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '5px' }}>Feeding Size</div>
            23 × 36 inch
          </motion.div>
          
          <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#94a3b8' }}>Live Processed Ratio</span>
              <span style={{ color: EXPO_DATA.brand.colors.yellow, fontWeight: 700 }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
              <motion.div 
                style={{ height: '100%', background: EXPO_DATA.brand.colors.yellow, boxShadow: `0 0 10px ${EXPO_DATA.brand.colors.yellow}` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        {/* Right Circular Gauge */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
            {/* Animated Progress Stroke */}
            <motion.circle 
              cx="100" cy="100" r="80" fill="none" 
              stroke={EXPO_DATA.brand.colors.yellow} 
              strokeWidth="12" 
              strokeLinecap="round"
              strokeDasharray="502"
              strokeDashoffset="502"
              initial={{ strokeDashoffset: 502 }}
              animate={{ strokeDashoffset: 502 - (502 * (progress / 100)) }}
              transition={{ duration: 0.1 }}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '3rem', fontWeight: 700 }}>{progress}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Percent</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
