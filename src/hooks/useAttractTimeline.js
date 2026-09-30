import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import { useExpoSync } from '../context/ExpoSyncContext';

export const useAttractTimeline = () => {
  const masterTimeline = useRef(null);
  const { isMaster, setSyncState, channel } = useExpoSync() || {};
  const lastBroadcastRef = useRef(0);

  if (!masterTimeline.current) {
    masterTimeline.current = gsap.timeline({
      paused: false,
      onComplete: () => {
        console.log("Timeline finished, executing hard reload!");
        if (isMaster && channel) {
          channel.postMessage({ type: 'RELOAD' });
        }
        setTimeout(() => window.location.reload(), 100);
      }
    });
    // Force the timeline to be exactly totalDuration seconds long
    masterTimeline.current.set({}, {}, expoData.timings.totalDuration);
  }

  useEffect(() => {
    // If not master or no channel, we don't broadcast
    if (!masterTimeline.current || !isMaster || !channel) return;

    // We hook into GSAP's onUpdate to sync the TV screen UI
    masterTimeline.current.eventCallback('onUpdate', () => {
      const time = masterTimeline.current.time();
      const now = Date.now();
      
      let nextScene = 'intro';
      let nextStage = null;
      
      const t = expoData.timings;
      
      if (time >= t.scene1.start && time < t.scene2.start) {
        nextScene = 'intro';
      } else if (time >= t.scene2.start && time < t.scene3.start) {
        nextScene = 'challenge';
      } else if (time >= t.scene3.start && time < t.scene4.start) {
        nextScene = 'workflow';
        
        // In WorkflowScene.jsx, index changes every 12 seconds after an initial 4s delay.
        const workflowTime = time - t.scene3.start;
        let stageIndex = 0;
        if (workflowTime >= 4.0) {
           stageIndex = Math.floor((workflowTime - 4.0) / 12.0) + 1;
        }
        
        const tvStageMap = {
           0: 'enquiry', // Enquiry
           1: 'quotation', // Quotation
           2: 'design', // Design
           3: 'job-card', // Job Card
           4: 'reel-cutting', // Reel to Sheeter
           5: 'ctp', // CTP
           6: 'press', // Press
           7: 'post-press', // Post Press
           8: 'review', // Quality Check
           9: 'accounts' // Accounts
        };
        nextStage = tvStageMap[Math.min(stageIndex, 9)];
      } else if (time >= t.scene4.start && time < t.scene6.start) {
        // scene 4 & 5
        nextScene = 'dashboard';
      } else if (time >= t.scene6.start && time < t.scene7.start) {
        nextScene = 'integrations';
      } else if (time >= t.scene7.start) {
        nextScene = 'closing';
      }

      // Broadcast heartbeat every 250ms to keep TV in absolute perfect sync
      if (now - lastBroadcastRef.current > 250) {
        lastBroadcastRef.current = now;
        const payload = {
          scene: nextScene,
          workflowStage: nextStage,
          isPlaying: !masterTimeline.current.paused(),
          progress: masterTimeline.current.progress(),
          timestamp: now
        };
        setSyncState(payload);
        channel.postMessage({ type: 'SYNC_STATE', payload });
      }
    });

    // Handle incoming messages
    const handleMessage = (e) => {
      if (e.data.type === 'REQUEST_STATE' && isMaster) {
         lastBroadcastRef.current = 0; // force immediate broadcast on next tick
      }
      
      if (e.data.type === 'SYNC_STATE' && !isMaster) {
         // Slave mode: sync timeline progress to master
         if (masterTimeline.current) {
            // Only update if we are significantly out of sync to avoid jitter
            const currentProgress = masterTimeline.current.progress();
            const targetProgress = e.data.payload.progress;
            
            if (Math.abs(currentProgress - targetProgress) > 0.005) {
                masterTimeline.current.progress(targetProgress);
            }
            
            if (e.data.payload.isPlaying && masterTimeline.current.paused()) {
                masterTimeline.current.play();
            } else if (!e.data.payload.isPlaying && !masterTimeline.current.paused()) {
                masterTimeline.current.pause();
            }
         }
      }
      
      if (e.data.type === 'RELOAD' && !isMaster) {
         console.log("Master triggered reload, reloading slave...");
         window.location.reload();
      }
    };
    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      if (masterTimeline.current) {
        masterTimeline.current.eventCallback('onUpdate', null);
      }
    };
  }, [isMaster, channel, setSyncState]);

  useEffect(() => {
    return () => {
      if (masterTimeline.current) {
        masterTimeline.current.kill();
      }
    };
  }, []);

  const seek = (time) => {
    if (masterTimeline.current) {
      masterTimeline.current.seek(time);
    }
  };

  const pause = () => {
    if (masterTimeline.current) masterTimeline.current.pause();
  };

  const play = () => {
    if (masterTimeline.current) masterTimeline.current.play();
  };
  
  const togglePlay = () => {
    if (masterTimeline.current) {
      if (masterTimeline.current.paused()) {
        masterTimeline.current.play();
      } else {
        masterTimeline.current.pause();
      }
    }
  };

  return { masterTimeline, seek, pause, play, togglePlay };
};
