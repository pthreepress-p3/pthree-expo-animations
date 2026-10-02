import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launcher from './components/Launcher';
import ExpoAttract from './pages/ExpoAttract';
import TvView from './pages/TvView';
import ExperienceScene from './components/ExperienceScene';
import { ExpoSyncProvider } from './context/ExpoSyncContext';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launcher />} />
        
        {/* Projector shows the new GSAP Attract Loop as Master */}
        <Route 
          path="/projector" 
          element={
            <ExpoSyncProvider isMaster={true}>
              <ExpoAttract />
            </ExpoSyncProvider>
          } 
        />

        {/* Mirror shows the exact same GSAP Attract Loop but acts as a Slave (syncs to Master) */}
        <Route 
          path="/mirror" 
          element={
            <ExpoSyncProvider isMaster={false}>
              <ExpoAttract />
            </ExpoSyncProvider>
          } 
        />
        
        {/* TV shows the Dashboard/UI screens reacting as Slave */}
        <Route 
          path="/tv" 
          element={
            <ExpoSyncProvider isMaster={false}>
              <TvView />
            </ExpoSyncProvider>
          } 
        />
        
        {/* Standalone Experience PTHREE page */}
        <Route path="/experience" element={<ExperienceScene isStandalone={true} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
