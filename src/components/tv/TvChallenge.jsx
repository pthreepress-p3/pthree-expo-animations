import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';
import { AlertTriangle, AlertCircle, Clock, FileMinus } from 'lucide-react';

export default function TvChallenge() {
  const cards = EXPO_DATA.challenges;
  
  const getIcon = (id) => {
    switch(id) {
      case 'manual': return <FileMinus size={32} color="#EF4444" />;
      case 'followups': return <AlertCircle size={32} color="#F59E0B" />;
      case 'material': return <AlertTriangle size={32} color="#EF4444" />;
      case 'billing': return <Clock size={32} color="#F59E0B" />;
      default: return <AlertTriangle size={32} color="#EF4444" />;
    }
  };

  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }}
    >
      <motion.h2 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ fontSize: '3rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '60px', letterSpacing: '4px' }}
      >
        IS THIS YOUR PRINT SHOP?
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        width: '80%',
        maxWidth: '1000px'
      }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            className="expo-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1 + (i * 0.4), duration: 0.8, type: 'spring' }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              padding: '40px',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Pulsing red background gradient */}
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                zIndex: 0
              }}
            />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: Math.random() * 2 + 1 }}
                >
                  {getIcon(card.id)}
                </motion.div>
                <div style={{ fontSize: '1.8rem', color: '#f8fafc', fontWeight: 600 }}>{card.title}</div>
              </div>
              <div style={{ fontSize: '1.3rem', color: '#94a3b8', paddingLeft: '47px' }}>
                {card.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
