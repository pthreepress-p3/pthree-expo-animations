import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function ProjectorClosing() {
  const modules = EXPO_DATA.modules;
  const radius = 450; 

  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0, filter: 'brightness(2)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{ perspective: 1500, overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transformStyle: 'preserve-3d' }}>
        
        {/* Deep 3D Rotating Rings - Cinematic Thriller Vibe */}
        <motion.div style={{ position: 'absolute', width: '1600px', height: '1600px', border: '2px solid rgba(0, 174, 239, 0.2)', borderRadius: '50%', zIndex: 0, boxShadow: 'inset 0 0 100px rgba(0,174,239,0.2)' }} animate={{ rotateX: [70, 70], rotateZ: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
        <motion.div style={{ position: 'absolute', width: '1200px', height: '1200px', border: '2px solid rgba(236, 0, 140, 0.3)', borderRadius: '50%', zIndex: 0 }} animate={{ rotateX: [60, 60], rotateZ: [360, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />

        {/* Orbiting Floating Modules (FIXED) */}
        {modules.map((mod, i) => {
          const initialAngle = (i / modules.length) * 360;
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: 0, height: 0,
                transformStyle: 'preserve-3d'
              }}
              animate={{ rotateZ: [initialAngle, initialAngle + 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  padding: '20px 30px',
                  whiteSpace: 'nowrap',
                  color: i % 2 === 0 ? EXPO_DATA.brand.colors.cyan : EXPO_DATA.brand.colors.yellow,
                  background: 'rgba(10, 15, 25, 0.9)',
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${i % 2 === 0 ? EXPO_DATA.brand.colors.cyan : EXPO_DATA.brand.colors.yellow}44`,
                  boxShadow: `0 30px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)`,
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  borderRadius: '12px',
                  // Push out by radius, then rotate opposite to stay upright
                  transform: `translateX(${radius}px)`,
                }}
              >
                {/* Counter-rotate to keep text upright */}
                <motion.div
                  animate={{ rotateZ: [-initialAngle, -(initialAngle + 360)], rotateY: [-20, 20, -20] }}
                  transition={{ 
                    rotateZ: { duration: 60, repeat: Infinity, ease: "linear" },
                    rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {mod}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Central Closing Message - Cinematic Pop */}
        <motion.div 
          style={{ zIndex: 50, textAlign: 'center', background: 'radial-gradient(circle, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.9) 50%, rgba(0,0,0,0) 100%)', padding: '100px', borderRadius: '50%', transform: 'translateZ(100px)' }}
          initial={{ scale: 0.1, opacity: 0, rotateZ: 90 }}
          animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100, damping: 20 }}
        >
          <div style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '12px' }}>
            {EXPO_DATA.brand.vision}
          </div>
          <motion.h1 
            style={{ fontSize: '8rem', letterSpacing: '16px', margin: 0, fontWeight: 900, textShadow: '0 0 80px rgba(0,174,239,0.8)' }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {EXPO_DATA.brand.name}
          </motion.h1>
          <div style={{ fontSize: '2rem', color: EXPO_DATA.brand.colors.cyan, marginTop: '20px', fontWeight: 600, letterSpacing: '2px' }}>
            {EXPO_DATA.brand.tagline}
          </div>
          
          <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* REPLACE QR CODE HERE */}
            <motion.div 
              style={{ width: '180px', height: '180px', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '24px', padding: '15px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={{ width: '100%', height: '100%', border: '4px dashed #000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}>
                QR<br/>Placeholder
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
