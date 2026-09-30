import React, { useState, useEffect } from 'react';
import { useAttractTimeline } from '../hooks/useAttractTimeline';
import LogoReveal from '../components/LogoReveal';
import PainPointScene from '../components/PainPointScene';
import WorkflowScene from '../components/WorkflowScene';
import WhyPthreeScene from '../components/WhyPthreeScene';
import PlatformScene from '../components/PlatformScene';
import IntegrationsScene from '../components/IntegrationsScene';
import RoiCtaScene from '../components/RoiCtaScene';
import ExpoControls from '../components/ExpoControls';
import HalftoneBackground from '../components/HalftoneBackground';
import InkParticleField from '../components/InkParticleField';
import '../styles/expoAttract.css';

const ExpoAttract = () => {
  const { masterTimeline, togglePlay, seek } = useAttractTimeline();
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case 'm':
          setControlsVisible((v) => !v);
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'r':
          seek(0);
          break;
        case 'f':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        // ArrowKeys can be added for scene skipping
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seek]);

  return (
    <div className="expo-container">
      <HalftoneBackground />
      <InkParticleField />
      
      <LogoReveal tl={masterTimeline} />
      <PainPointScene tl={masterTimeline} />
      <WorkflowScene tl={masterTimeline} />
      <WhyPthreeScene tl={masterTimeline} />
      <PlatformScene tl={masterTimeline} />
      <IntegrationsScene tl={masterTimeline} />
      <RoiCtaScene tl={masterTimeline} />
      
      <ExpoControls isVisible={controlsVisible} />
    </div>
  );
};

export default ExpoAttract;
