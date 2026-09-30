import React from 'react';
import { useNavigate } from 'react-router-dom';

const Launcher = () => {
  const navigate = useNavigate();

  const launchDualScreen = () => {
    window.open('/projector', 'ProjectorWindow', 'width=1920,height=1080,left=0,top=0');
    setTimeout(() => {
      window.open('/tv', 'TvWindow', 'width=1920,height=1080,left=1920,top=0');
    }, 100);
  };

  const launchMirrorMode = () => {
    window.open('/projector', 'ProjectorWindow', 'width=1920,height=1080,left=0,top=0');
    setTimeout(() => {
      window.open('/mirror', 'MirrorWindow', 'width=1920,height=1080,left=1920,top=0');
    }, 100);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#020617', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>PTHREE Presentation Launcher</h1>
      <p style={{ color: '#ef4444', marginBottom: '30px' }}>* Ensure pop-ups are allowed in your browser for the dual-launch buttons to work.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <button 
          onClick={launchDualScreen}
          style={{ padding: '20px 40px', fontSize: '1.2rem', background: '#00aeef', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Launch Dual Screen (Projector + TV UI)
        </button>
        <button 
          onClick={launchMirrorMode}
          style={{ padding: '20px 40px', fontSize: '1.2rem', background: '#ec008c', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Mirror Mode (Main Projector on Both)
        </button>
      </div>
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <button onClick={() => window.open('/projector', '_blank')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #00aeef', color: '#00aeef', borderRadius: '8px', cursor: 'pointer' }}>
          Open Master Projector
        </button>
        <button onClick={() => window.open('/tv', '_blank')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #ec008c', color: '#ec008c', borderRadius: '8px', cursor: 'pointer' }}>
          Open Slave TV
        </button>
        <button onClick={() => window.open('/mirror', '_blank')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #fff200', color: '#fff200', borderRadius: '8px', cursor: 'pointer' }}>
          Open Slave Mirror
        </button>
      </div>
    </div>
  );
};

export default Launcher;
