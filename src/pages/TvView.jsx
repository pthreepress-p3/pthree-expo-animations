import React, { useState, useEffect } from 'react';
import { useExpoSync } from '../context/ExpoSyncContext';

import TvIdleScreen from '../components/tv/TvIdleScreen';
import TvChallenge from '../components/tv/TvChallenge';
import TvConnected from '../components/tv/TvConnected';
import TvWorkflow from '../components/tv/TvWorkflow';
import TvDashboard from '../components/tv/TvDashboard';
import TvIntegrations from '../components/tv/TvIntegrations';
import TvClosing from '../components/tv/TvClosing';
import TvLostConnection from '../components/tv/TvLostConnection';

const TvView = () => {
  const { syncState } = useExpoSync();
  const [isLost, setIsLost] = useState(true);

  // Connection watchdog
  useEffect(() => {
    if (!syncState || !syncState.timestamp) {
      setIsLost(true);
      return;
    }
    
    setIsLost(false);
    
    // If we haven't received a heartbeat in 3 seconds, assume connection lost
    const timeout = setTimeout(() => {
      setIsLost(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [syncState]);

  // Handle 'f' key for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLost) {
    return (
      <div className="presentation-container tv-mode" style={{ backgroundColor: '#020617', color: 'white', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <TvLostConnection />
      </div>
    );
  }

  const renderScene = () => {
    switch (syncState.scene) {
      case 'intro': return <TvIdleScreen />;
      case 'challenge': return <TvChallenge />;
      case 'connect': return <TvConnected />;
      case 'workflow': return <TvWorkflow />;
      case 'dashboard': return <TvDashboard />;
      case 'integrations': return <TvIntegrations />;
      case 'closing': return <TvClosing />;
      default: return <TvIdleScreen />;
    }
  };

  return (
    <div className="presentation-container tv-mode" style={{ backgroundColor: '#020617', color: 'white', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {renderScene()}
    </div>
  );
};

export default TvView;
