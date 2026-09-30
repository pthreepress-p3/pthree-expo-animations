const fs = require('fs');
const path = '/Users/pradyumnap/Desktop/pthree-tv-attract/src/components/LogoReveal.jsx';

const newContent = `import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { expoData } from '../data/expoAttractData';

const LogoReveal = ({ tl }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene1.start;
      const duration = expoData.timings.scene1.end - sceneStart;
      
      const st = gsap.timeline();
      
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.logo-image', { scale: 0, opacity: 0 });
      gsap.set('.tagline1', { y: 20, opacity: 0 });
      gsap.set('.tagline2', { y: 20, opacity: 0 });
      gsap.set('.flash', { opacity: 0 });
      
      st.to(containerRef.current, { opacity: 1, duration: 0.5 }, 0)
        // Data streams animating is handled by framer-motion, we just fade in the logo and flash
        .to('.flash', { opacity: 1, duration: 0.2 }, 3.8)
        .to('.flash', { opacity: 0, duration: 0.8 }, 4.0)
        .to('.logo-image', { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, 3.8)
        .to('.tagline1', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 4.5)
        .to('.tagline2', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 5)
        
        .to(containerRef.current, { opacity: 0, duration: 1.5 }, duration - 1.5);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  // Create random data streams
  const streams = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    color: ['#00FFFF', '#FF00FF', '#FFFF00', '#FFFFFF'][Math.floor(Math.random() * 4)],
    top: \`\${Math.random() * 100}%\`,
    height: \`\${Math.random() * 4 + 1}px\`,
    delay: Math.random() * 2,
    duration: Math.random() * 1.5 + 1
  }));

  return (
    <div ref={containerRef} className="scene logo-reveal-scene" style={{zIndex: 10, background: '#000', overflow: 'hidden'}}>
      
      {/* Data Streams */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {streams.map((s) => (
          <motion.div
            key={s.id}
            initial={{ left: '-100%', width: '0%', opacity: 0 }}
            animate={{ left: '50%', width: '10%', opacity: [0, 1, 0] }}
            transition={{ duration: s.duration, delay: s.delay, ease: 'power4.inOut', repeat: 1, repeatDelay: 0.5 }}
            style={{
              position: 'absolute',
              top: s.top,
              height: s.height,
              backgroundColor: s.color,
              boxShadow: \`0 0 10px \${s.color}\`,
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      {/* Central Flash */}
      <div className="flash" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100vw', height: '100vh', background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 50%)',
        pointerEvents: 'none', zIndex: 15
      }} />

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}>
        
        {/* Logo Image */}
        <div className="logo-image" style={{ marginBottom: '2rem' }}>
           <img src="/pthree white.png" alt="PTHREE" style={{ width: "450px" }} />
        </div>

        {/* Taglines */}
        <h2 className="tagline1" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', letterSpacing: '4px', marginBottom: '1rem', textShadow: '0 0 15px rgba(0,255,255,0.5)' }}>
          {expoData.scene1.tagline1}
        </h2>
        <div className="tagline2" style={{ fontSize: '1.2rem', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {expoData.scene1.tagline2}
        </div>
        
      </div>
    </div>
  );
};

export default LogoReveal;
\`;

fs.writeFileSync(path, newContent);
