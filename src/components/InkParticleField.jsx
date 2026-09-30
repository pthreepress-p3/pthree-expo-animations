import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InkParticleField = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Generate particles
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'ink-particle';
      const color = ['var(--color-cyan)', 'var(--color-magenta)', 'var(--color-yellow)'][Math.floor(Math.random() * 3)];
      
      Object.assign(p.style, {
        position: 'absolute',
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        backgroundColor: color,
        borderRadius: '50%',
        opacity: Math.random() * 0.5 + 0.1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: 'blur(1px)',
        zIndex: 2,
      });
      
      containerRef.current.appendChild(p);
      particles.push(p);
      
      // Animate randomly
      gsap.to(p, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 50 - 25}`,
        opacity: 0,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        ease: 'none',
      });
    }
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);
  
  return <div ref={containerRef} style={{position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none'}} />;
};

export default InkParticleField;
