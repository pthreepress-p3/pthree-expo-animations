import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpoSyncContext = createContext(null);

export const useExpoSync = () => useContext(ExpoSyncContext);

export function ExpoSyncProvider({ children, isMaster }) {
  const [channel, setChannel] = useState(null);
  const [syncState, setSyncState] = useState({
    scene: 'intro',
    workflowStage: null,
    isPlaying: true,
    progress: 0,
    timestamp: Date.now()
  });

  useEffect(() => {
    const bc = new BroadcastChannel('pthree-expo-sync');
    setChannel(bc);

    if (!isMaster) {
      bc.onmessage = (event) => {
        if (event.data.type === 'SYNC_STATE') {
          setSyncState(event.data.payload);
        }
      };

      // Initial request for state
      bc.postMessage({ type: 'REQUEST_STATE' });

      // Robust TV Sync: Heartbeat checker.
      // If TV hasn't received a message from Master in 1 second, it re-requests state.
      const heartbeat = setInterval(() => {
        bc.postMessage({ type: 'REQUEST_STATE' });
      }, 1000);

      return () => {
        clearInterval(heartbeat);
        bc.close();
      };
    }

    return () => bc.close();
  }, [isMaster]);

  return (
    <ExpoSyncContext.Provider value={{ isMaster, syncState, setSyncState, channel }}>
      {children}
    </ExpoSyncContext.Provider>
  );
}
