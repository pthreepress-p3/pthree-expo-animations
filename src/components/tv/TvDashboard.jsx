import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function TvDashboard() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    // Fast dramatic tick
    const target = 1845000;
    let current = 0;
    const interval = setInterval(() => {
      current += 60000;
      if (current >= target) {
        setRevenue(target);
        clearInterval(interval);
      } else {
        setRevenue(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0, filter: 'brightness(2)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1200 }}
    >
      <div className="expo-panel" style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', background: 'rgba(10, 15, 25, 0.9)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 400 }} style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '4px' }}>EXECUTIVE DASHBOARD</motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ display: 'flex', gap: '15px' }}>
            <motion.div style={{ padding: '10px 20px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '8px', fontWeight: 800, border: '1px solid rgba(16,185,129,0.5)' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>LIVE FEED</motion.div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', height: '100%' }}>
          
          {/* Machine Activity List - Raycast Staggered List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: EXPO_DATA.brand.colors.cyan, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>OEE & Machine Status</motion.h3>
            
            {[
              { name: 'KOMORI 4 Colour', status: 'Running', oee: 85, color: '#10b981' },
              { name: 'Heidelberg XL 75', status: 'Idle', oee: 40, color: '#f59e0b' },
              { name: 'Polar Cutter', status: 'Cutting', oee: 92, color: '#10b981' },
              { name: 'Bobst Die Cutter', status: 'Maintenance', oee: 15, color: '#ef4444' }
            ].map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.4, delay: 0.1 + (i * 0.1), type: 'spring', stiffness: 400, damping: 25 }} // Snappy Raycast list reveal
                style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '25px', border: `1px solid ${m.color}33`, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{m.name}</span>
                  <span style={{ color: m.color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>{m.status}</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${m.oee}%` }} transition={{ duration: 1, delay: 0.4 + (i * 0.1), type: 'spring' }}
                    style={{ height: '100%', background: m.color, boxShadow: `0 0 20px ${m.color}` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Revenue / Billing - Thriller Pop */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateX: 45 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ background: 'rgba(255, 242, 0, 0.05)', borderRadius: '16px', padding: '40px', border: `2px solid rgba(255, 242, 0, 0.3)`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 50px rgba(255,242,0,0.1)' }}
            >
              <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,242,0,0.2), transparent)' }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
              
              <h3 style={{ color: EXPO_DATA.brand.colors.yellow, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '1.5rem' }}>Today's Revenue</h3>
              <div style={{ fontSize: '6rem', fontWeight: 900, textShadow: '0 0 40px rgba(255,242,0,0.6)', fontVariantNumeric: 'tabular-nums', color: '#fff' }}>
                ₹{revenue.toLocaleString()}
              </div>
            </motion.div>

            {/* AI Insights & Alerts */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateX: -45 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '16px', padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 0 50px rgba(239,68,68,0.2)' }}
            >
              <h3 style={{ color: '#ef4444', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px' }}>
                <motion.div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 20px #ef4444' }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
                CRITICAL ALERTS
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 400 }} style={{ padding: '20px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', borderLeft: '6px solid #ef4444' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px', color: '#fff' }}>Art Paper 130 GSM</div>
                  <div style={{ fontSize: '1rem', color: '#94a3b8' }}>Only 450 Sheets left. Required for JC-2026-0849.</div>
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 400 }} style={{ padding: '20px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', borderLeft: '6px solid #f59e0b' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px', color: '#fff' }}>Pantone 286 C Ink</div>
                  <div style={{ fontSize: '1rem', color: '#94a3b8' }}>Critical Level: 2 kg. Order recommended.</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
