import React from 'react';
import { useExpoSync } from '../context/ExpoSyncContext';

import ProjectorIntro from '../components/projector/ProjectorIntro';
import ProjectorChallenge from '../components/projector/ProjectorChallenge';
import ProjectorConnection from '../components/projector/ProjectorConnection';
import ProjectorWorkflow from '../components/projector/ProjectorWorkflow';
import ProjectorDashboard from '../components/projector/ProjectorDashboard';
import ProjectorClosing from '../components/projector/ProjectorClosing';

const ProjectorView = () => {
  const { syncState } = useExpoSync();

  if (!syncState || !syncState.timestamp) {
    return <div className="presentation-container">Waiting for connection...</div>;
  }

  const renderScene = () => {
    switch (syncState.scene) {
      case 'intro': return <ProjectorIntro />;
      case 'challenge': return <ProjectorChallenge />;
      case 'connect': return <ProjectorConnection />;
      case 'workflow': return <ProjectorWorkflow />;
      case 'dashboard': return <ProjectorDashboard />;
      case 'closing': return <ProjectorClosing />;
      default: return <ProjectorIntro />;
    }
  };

  return (
    <div className="presentation-container projector-mode" style={{ backgroundColor: '#020617', color: 'white', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {renderScene()}
    </div>
  );
};

export default ProjectorView;
