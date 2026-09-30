import { useState, useEffect, useCallback, useRef } from 'react';
import { EXPO_DATA } from '../data/expoData';
import { useExpoSync } from '../context/ExpoSyncContext';

export function useExpoTimeline() {
  const { isMaster, syncState, setSyncState, channel } = useExpoSync();
  const stateRef = useRef(syncState);
  
  const lastUpdateRef = useRef(performance.now());
  const requestRef = useRef();

  useEffect(() => {
    stateRef.current = syncState;
  }, [syncState]);

  const broadcastState = useCallback((newState) => {
    if (isMaster && channel) {
      const payload = { ...newState, timestamp: Date.now() };
      setSyncState(payload);
      channel.postMessage({ type: 'SYNC_STATE', payload });
    }
  }, [isMaster, channel, setSyncState]);

  useEffect(() => {
    if (!channel || !isMaster) return;
    const handleMessage = (e) => {
      if (e.data.type === 'REQUEST_STATE') {
        broadcastState(stateRef.current);
      }
    };
    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, [channel, isMaster, broadcastState]);

  useEffect(() => {
    if (!isMaster) return;

    const updateLoop = (time) => {
      const currentState = stateRef.current;
      const deltaTime = time - lastUpdateRef.current;
      lastUpdateRef.current = time;

      if (!currentState.isPlaying) {
        requestRef.current = requestAnimationFrame(updateLoop);
        return;
      }

      // Calculate explicitly
      const t = EXPO_DATA.timings;
      const workflowTotal = EXPO_DATA.workflowStages.reduce((acc, stage) => acc + stage.duration, 0) * 1000;
      const totalCycleTime = (t.intro + t.challenge + t.connect + t.dashboard + t.closing) * 1000 + workflowTotal;

      const progressIncrement = deltaTime / totalCycleTime;
      let newProgress = currentState.progress + progressIncrement;

      if (newProgress >= 1) newProgress = 0;

      const nextState = getNextSceneState(newProgress, currentState, totalCycleTime, workflowTotal);
      
      const needsBroadcast = 
        nextState.scene !== currentState.scene || 
        nextState.workflowStage !== currentState.workflowStage ||
        (time % 250 < 16); 

      if (needsBroadcast) {
        broadcastState(nextState);
      } else {
        setSyncState(nextState);
      }

      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isMaster, broadcastState, setSyncState]);

  const getNextSceneState = (progress, currentState, totalCycleTime, workflowTotal) => {
    let nextScene = currentState.scene;
    let nextStage = currentState.workflowStage;

    const t = EXPO_DATA.timings;
    const timeInMs = progress * totalCycleTime;

    const introEnd = t.intro * 1000;
    const challengeEnd = introEnd + (t.challenge * 1000);
    const connectEnd = challengeEnd + (t.connect * 1000);
    const workflowEnd = connectEnd + workflowTotal;
    const dashboardEnd = workflowEnd + (t.dashboard * 1000);

    if (timeInMs < introEnd) {
      nextScene = 'intro'; nextStage = null;
    } else if (timeInMs < challengeEnd) {
      nextScene = 'challenge'; nextStage = null;
    } else if (timeInMs < connectEnd) {
      nextScene = 'connect'; nextStage = null;
    } else if (timeInMs < workflowEnd) {
      nextScene = 'workflow';
      
      let elapsedInWorkflow = timeInMs - connectEnd;
      let accumulated = 0;
      for (const stage of EXPO_DATA.workflowStages) {
        accumulated += stage.duration * 1000;
        if (elapsedInWorkflow < accumulated) {
          nextStage = stage.id;
          break;
        }
      }
    } else if (timeInMs < dashboardEnd) {
      nextScene = 'dashboard'; nextStage = null;
    } else {
      nextScene = 'closing'; nextStage = null;
    }

    return {
      ...currentState,
      progress,
      scene: nextScene,
      workflowStage: nextStage
    };
  };

  const togglePlay = useCallback(() => {
    if (isMaster) broadcastState({ ...stateRef.current, isPlaying: !stateRef.current.isPlaying });
  }, [isMaster, broadcastState]);

  const restart = useCallback(() => {
    if (isMaster) broadcastState({ ...stateRef.current, progress: 0, scene: 'intro', workflowStage: null, isPlaying: true });
  }, [isMaster, broadcastState]);

  const next = useCallback(() => {
    if (!isMaster) return;
    broadcastState({ ...stateRef.current, progress: 0.99 });
  }, [isMaster, broadcastState]);

  const prev = useCallback(() => {
    if (!isMaster) return;
    broadcastState({ ...stateRef.current, progress: 0 });
  }, [isMaster, broadcastState]);

  return { syncState, togglePlay, restart, next, prev };
}
