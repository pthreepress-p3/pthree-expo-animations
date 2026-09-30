import React from 'react';

const HalftoneBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.15,
      backgroundImage: `radial-gradient(var(--color-white) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      zIndex: 1,
      mixBlendMode: 'overlay',
    }} />
  );
};

export default HalftoneBackground;
