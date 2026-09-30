import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';

const LogoReveal = ({ tl }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene1.start;
      const duration = expoData.timings.scene1.end - sceneStart;
      
      const st = gsap.timeline();
      
      st.call(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(e => console.log('Video play error:', e));
        }
      }, [], 0);
      
      gsap.set(containerRef.current, { opacity: 0 });
      
      st.to(containerRef.current, { opacity: 1, duration: 0.5 }, 0)
        .to(containerRef.current, { opacity: 0, duration: 1.5 }, duration - 1.5);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene logo-reveal-scene" style={{zIndex: 10, background: '#0B0E14'}}>
      <video 
        ref={videoRef}
        src="/intro-video.mp4" 
        muted 
        playsInline
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
      />
    </div>
  );
};

export default LogoReveal;
