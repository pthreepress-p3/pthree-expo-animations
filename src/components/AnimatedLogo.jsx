import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  // We use the uploaded white logo as a mask to create Cyan, Magenta, Yellow, and White layers
  // This simulates the offset printing registration process
  
  const logoUrl = "url('/pthree white.png')";
  
  const maskStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    WebkitMaskImage: logoUrl,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskImage: logoUrl,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  // Movie title / Printer reveal effect
  // We reveal the container left to right (like a print head)
  const containerVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 2.5, ease: 'easeInOut' }
    }
  };

  // CMYK layers snap into place
  const cyanLayer = {
    hidden: { x: -30, y: -20, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1.5, delay: 0.5, ease: "backOut" } }
  };
  
  const magentaLayer = {
    hidden: { x: 30, y: 15, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1.5, delay: 0.7, ease: "backOut" } }
  };

  const yellowLayer = {
    hidden: { x: -10, y: 30, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1.5, delay: 0.9, ease: "backOut" } }
  };

  const whiteLayer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 2 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'relative',
        width: '500px',
        height: '150px', // approximate height for 500px width logo
        marginBottom: '2rem'
      }}
    >
      {/* Cyan Plate */}
      <motion.div variants={cyanLayer} style={{ ...maskStyle, backgroundColor: '#00FFFF', mixBlendMode: 'screen' }} />
      
      {/* Magenta Plate */}
      <motion.div variants={magentaLayer} style={{ ...maskStyle, backgroundColor: '#FF00FF', mixBlendMode: 'screen' }} />
      
      {/* Yellow Plate */}
      <motion.div variants={yellowLayer} style={{ ...maskStyle, backgroundColor: '#FFFF00', mixBlendMode: 'screen' }} />
      
      {/* Final White / Key Plate overlay to make it solid once registered */}
      <motion.div variants={whiteLayer} style={{ ...maskStyle, backgroundColor: '#FFFFFF' }} />
      
      {/* Scanning Laser Line (Print Head) */}
      <motion.div
        initial={{ left: '0%', opacity: 0 }}
        animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          width: '2px',
          height: '120%',
          backgroundColor: '#00FFFF',
          boxShadow: '0 0 15px #00FFFF, 0 0 30px #00FFFF',
          zIndex: 10
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
