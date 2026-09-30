import React from 'react';

const ExpoControls = ({ isVisible }) => {
  return (
    <div className={`controls-overlay ${!isVisible ? 'hidden' : ''}`}>
      <div style={{fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-cyan)'}}>PTHREE EXPO CONTROLS</div>
      <div>[Space] Play/Pause</div>
      <div>[R] Restart (Seek 0)</div>
      <div>[F] Toggle Fullscreen</div>
      <div>[M] Show/Hide this menu</div>
      <div style={{marginTop: '8px', color: 'var(--color-text-muted)'}}>
        Auto-loop duration: 110s
      </div>
    </div>
  );
};

export default ExpoControls;
