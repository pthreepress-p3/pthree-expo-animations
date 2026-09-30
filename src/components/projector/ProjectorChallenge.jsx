import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';

export default function ProjectorChallenge() {
  const cards = EXPO_DATA.challenges;

  // Variants for scattered cards
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.5 }
    }
  };

  const cardVariants = [
    { hidden: { opacity: 0, x: -200, y: -200 }, visible: { opacity: 1, x: -300, y: -150 } }, // Top Left
    { hidden: { opacity: 0, x: 200, y: -200 }, visible: { opacity: 1, x: 300, y: -100 } },   // Top Right
    { hidden: { opacity: 0, x: -200, y: 200 }, visible: { opacity: 1, x: -250, y: 150 } },  // Bottom Left
    { hidden: { opacity: 0, x: 200, y: 200 }, visible: { opacity: 1, x: 250, y: 200 } }     // Bottom Right
  ];

  return (
    <motion.div 
      className="scene-full"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 2, duration: 1 }}
        style={{ zIndex: 10, textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '4.5rem', marginBottom: '20px' }}>Too many moving parts.</h1>
        <h1 style={{ fontSize: '4.5rem', color: '#94a3b8' }}>Too little visibility.</h1>
      </motion.div>

      {/* Background weak dashed lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.path 
          d="M 200 200 Q 960 540 1720 880 M 1720 200 Q 960 540 200 880"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="10 20"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: [0, 100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Floating Cards */}
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className="expo-panel"
          variants={cardVariants[i]}
          style={{ position: 'absolute', width: '350px' }}
          animate={{ 
            y: [cardVariants[i].visible.y, cardVariants[i].visible.y - 15, cardVariants[i].visible.y],
            x: [cardVariants[i].visible.x, cardVariants[i].visible.x + 10, cardVariants[i].visible.x]
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <h3 style={{ fontSize: '1.8rem', color: EXPO_DATA.brand.colors.cyan, marginBottom: '10px' }}>{card.title}</h3>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>{card.desc}</p>
        </motion.div>
      ))}
      
    </motion.div>
  );
}
