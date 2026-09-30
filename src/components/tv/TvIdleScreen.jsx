import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function TvIdleScreen() {
  const text = "Awaiting Data...";
  
  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}
    >
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div 
          style={{ position: 'absolute', top: '-20%', left: '-20%', width: '1000px', height: '1000px', borderRadius: '50%', background: `radial-gradient(circle, ${EXPO_DATA.brand.colors.cyan}22 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '1000px', height: '1000px', borderRadius: '50%', background: `radial-gradient(circle, ${EXPO_DATA.brand.colors.magenta}22 0%, transparent 70%)` }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Futuristic Rotating HUD Rings */}
        <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Outer Ring */}
          <motion.div 
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px dashed ${EXPO_DATA.brand.colors.cyan}`, opacity: 0.5 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner Ring */}
          <motion.div 
            style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: `1px solid ${EXPO_DATA.brand.colors.yellow}`, opacity: 0.3 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          {/* Core Core */}
          <motion.div 
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: EXPO_DATA.brand.colors.cyan, boxShadow: `0 0 30px ${EXPO_DATA.brand.colors.cyan}` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Staggered Text Reveal */}
        <div style={{ fontSize: '3rem', color: '#fff', fontWeight: 600, letterSpacing: '8px', textTransform: 'uppercase', display: 'flex' }}>
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: index * 0.05, type: 'spring' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        
        {/* Sweeping Scanner Line */}
        <div style={{ width: '300px', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '30px', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: `linear-gradient(90deg, transparent, ${EXPO_DATA.brand.colors.cyan}, transparent)` }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

      </div>
    </motion.div>
  );
}
