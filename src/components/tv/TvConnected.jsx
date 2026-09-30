import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';
import { CheckCircle2 } from "lucide-react";

export default function TvConnected() {
  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Raycast snappy out
      style={{ perspective: 1200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className="expo-panel" style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        
        {/* Cinematic Glitch / Light Flash on Entry */}
        <motion.div 
          style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 1000, pointerEvents: 'none' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Fast flash out
        />

        {/* Thriller Scanning Laser Line */}
        <motion.div 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: EXPO_DATA.brand.colors.cyan, boxShadow: `0 0 40px ${EXPO_DATA.brand.colors.cyan}`, zIndex: 100 }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Dashboard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '4px' }}>PTHREE HUB</div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              <CheckCircle2 size={16} /> SYSTEM SYNCED
            </motion.div>
          </div>
        </div>

        {/* Cinematic 3D Pop Body */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <motion.div 
            className="expo-panel" 
            style={{ 
              width: '800px', 
              textAlign: 'center', 
              border: `2px solid ${EXPO_DATA.brand.colors.cyan}`,
              background: 'rgba(10, 15, 25, 0.8)',
              backdropFilter: 'blur(30px)',
              transformStyle: 'preserve-3d',
              boxShadow: `0 50px 100px rgba(0,0,0,0.8), inset 0 0 40px rgba(0, 174, 239, 0.2)`
            }}
            // Fast Raycast / Thriller Pop
            initial={{ scale: 0.2, opacity: 0, rotateX: 60 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
          >
            {/* Dramatic Floating Abstract Elements */}
            <motion.div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', border: `4px solid ${EXPO_DATA.brand.colors.yellow}`, borderRadius: '16px', opacity: 0.4 }} animate={{ rotateZ: 360, scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
            <motion.div style={{ position: 'absolute', bottom: '-50px', left: '-30px', width: '120px', height: '120px', border: `4px solid ${EXPO_DATA.brand.colors.magenta}`, borderRadius: '50%', opacity: 0.4 }} animate={{ rotateY: 360, scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />

            <motion.h2 
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }} 
              style={{ fontSize: '4.5rem', marginBottom: '10px', color: '#fff', textShadow: `0 0 40px ${EXPO_DATA.brand.colors.cyan}`, letterSpacing: '4px' }}
            >
              {EXPO_DATA.job.id}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} 
              style={{ fontSize: '1.8rem', color: EXPO_DATA.brand.colors.cyan, marginBottom: '50px', textTransform: 'uppercase', letterSpacing: '8px', fontWeight: 700 }}
            >
              Data Pipeline Established
            </motion.div>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', color: '#fff', fontSize: '1.5rem', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 300 }}>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Client Node</div>
                <div style={{ fontWeight: 800 }}>{EXPO_DATA.job.customer}</div>
              </motion.div>
              <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7, type: "spring", stiffness: 300 }}>
                <div style={{ color: '#94a3b8', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Batch Size</div>
                <div style={{ fontWeight: 800 }}>{EXPO_DATA.job.quantity}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
