import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';
import { useExpoSync } from '../../context/ExpoSyncContext';
import { 
  ClipboardList, Scissors, Printer, PackageSearch, UserCheck, Receipt,
  CheckCircle2, Loader2, PlayCircle, Flag
} from "lucide-react";

const getStageIcon = (id) => {
  switch (id) {
    case 'job-card': return ClipboardList;
    case 'reel-cutting': return Scissors;
    case 'press': return Printer;
    case 'post-press': return PackageSearch;
    case 'review': return UserCheck;
    case 'accounts': return Receipt;
    default: return ClipboardList;
  }
};

const getStageDesc = (id) => {
  switch (id) {
    case 'job-card': return "Create Job Card";
    case 'reel-cutting': return "Material cut";
    case 'press': return "Printing active";
    case 'post-press': return "Finishing active";
    case 'review': return "Manager review";
    case 'accounts': return "Invoice generated";
    default: return "";
  }
};

export default function ProjectorWorkflow() {
  const { syncState } = useExpoSync();
  const stages = EXPO_DATA.workflowStages;
  
  // Calculate current progress
  const currentStageIndex = stages.findIndex(s => s.id === syncState.workflowStage);
  
  // Create a combined sequence of steps for the timeline (start -> stage 1 -> line 1 -> stage 2 -> ... -> complete)
  // For simplicity based on the provided code, we'll index everything based on currentStageIndex.
  
  return (
    <motion.div 
      className="scene-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '100px', left: 0, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '10px' }}>Production Workflow</h1>
        <h2 style={{ fontSize: '2rem', color: '#94a3b8', fontWeight: 400 }}>Automated tracking at every step.</h2>
      </div>

      {/* Camera Panning Container */}
      <motion.div
        style={{ 
          display: "flex", 
          alignItems: "center", 
          position: "absolute",
          top: '50%',
          transform: 'translateY(-50%)',
          paddingLeft: '100px',
          transformStyle: 'preserve-3d'
        }}
        // Move the camera left based on active stage to keep it centered
        animate={{ x: `calc(35vw - ${currentStageIndex * 330}px)` }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      >
        
        {/* START NODE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "40px", opacity: currentStageIndex === 0 ? 1 : 0.5 }}>
          <motion.div animate={{ scale: currentStageIndex === 0 ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <div style={{ padding: "15px", borderRadius: "50%", backgroundColor: EXPO_DATA.brand.colors.cyan, color: "#000", boxShadow: `0 0 20px ${EXPO_DATA.brand.colors.cyan}` }}>
              <PlayCircle size={32} />
            </div>
          </motion.div>
          <div style={{ marginTop: "10px", fontWeight: 700, color: EXPO_DATA.brand.colors.cyan, fontSize: "1.2rem" }}>START</div>
        </div>

        {stages.map((step, index) => {
          const Icon = getStageIcon(step.id);
          const isUp = index % 2 === 0;
          const isLast = index === stages.length - 1;
          
          const isRunning = currentStageIndex === index;
          const isCompleted = currentStageIndex > index;
          
          return (
            <div key={step.id} style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 10 }}>
              
              {/* THE BOX */}
              <div 
                style={{ 
                  position: "relative",
                  width: "250px", 
                  backgroundColor: isCompleted ? "rgba(255,255,255,0.05)" : isRunning ? "rgba(15, 23, 42, 0.9)" : "transparent",
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : isRunning ? `1px solid ${EXPO_DATA.brand.colors.cyan}` : '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: isRunning ? `0 30px 60px rgba(0, 174, 239, 0.4)` : "none",
                  transform: `translateY(${isUp ? "-80px" : "80px"}) scale(${isRunning ? 1.15 : 1}) translateZ(${isRunning ? '50px' : '0px'})`,
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: isRunning ? 50 : 10,
                  opacity: isRunning ? 1 : 0.6
                }}
              >
                {/* Animated Border SVG Overlay */}
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", borderRadius: "16px" }}>
                  <rect 
                    x="0" y="0" width="100%" height="100%" rx="16" 
                    fill="none" 
                    stroke={isCompleted ? "#10B981" : isRunning ? EXPO_DATA.brand.colors.cyan : "transparent"} 
                    strokeWidth="4"
                    strokeDasharray={isRunning ? "800" : "0"}
                    strokeDashoffset={isRunning ? "800" : "0"}
                    style={{
                      transition: isRunning ? "stroke-dashoffset 2.5s linear" : "none",
                      strokeDashoffset: isRunning ? 0 : 800,
                    }}
                  />
                </svg>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ 
                    padding: "12px", borderRadius: "12px", 
                    backgroundColor: isCompleted ? "rgba(16, 185, 129, 0.2)" : isRunning ? "rgba(0, 174, 239, 0.2)" : "rgba(148, 163, 184, 0.1)",
                    color: isCompleted ? "#10B981" : isRunning ? EXPO_DATA.brand.colors.cyan : "#94a3b8",
                    transition: "all 0.5s ease"
                  }}>
                    <Icon size={32} />
                  </div>
                  
                  {/* Status Text & Loader */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    {isRunning && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Loader2 size={20} color={EXPO_DATA.brand.colors.cyan} />
                        </motion.div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: EXPO_DATA.brand.colors.cyan }}>Running</span>
                      </div>
                    )}
                    {isCompleted && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle2 size={20} color="#10B981" />
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#10B981" }}>Completed</span>
                      </div>
                    )}
                    {!isRunning && !isCompleted && (
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8" }}>Waiting...</span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: isCompleted || isRunning ? "#fff" : "#94a3b8", marginBottom: "8px" }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "1rem", color: "#94a3b8" }}>
                  {getStageDesc(step.id)}
                </div>
              </div>

              {/* THE CONNECTING LINE (No Arrowhead) */}
              {!isLast && (
                <div style={{ width: "80px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg 
                    width="80px" height="160px" 
                    viewBox="0 0 80 160" 
                    fill="none" 
                    style={{ 
                      overflow: "visible", 
                      position: "absolute",
                      top: isUp ? "0px" : "-160px" 
                    }}
                  >
                    <defs>
                      <linearGradient id="cmykGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={EXPO_DATA.brand.colors.cyan} />
                        <stop offset="50%" stopColor={EXPO_DATA.brand.colors.magenta} />
                        <stop offset="100%" stopColor={EXPO_DATA.brand.colors.yellow} />
                      </linearGradient>
                    </defs>

                    {/* Faded background track */}
                    <path 
                      d={isUp ? "M 0 0 C 40 0, 40 160, 80 160" : "M 0 160 C 40 160, 40 0, 80 0"} 
                      stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6"
                    />
                    
                    {/* Animated Colored Line */}
                    <motion.path 
                      d={isUp ? "M 0 0 C 40 0, 40 160, 80 160" : "M 0 160 C 40 160, 40 0, 80 0"} 
                      stroke="url(#cmykGrad)" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isCompleted ? 1 : 0 }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* COMPLETE NODE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "40px" }}>
          <motion.div animate={{ scale: currentStageIndex >= stages.length - 1 ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <div style={{ padding: "15px", borderRadius: "50%", backgroundColor: currentStageIndex >= stages.length - 1 ? "#10B981" : "rgba(255,255,255,0.1)", color: currentStageIndex >= stages.length - 1 ? "#fff" : "#94a3b8", transition: "all 0.5s ease" }}>
              <Flag size={32} />
            </div>
          </motion.div>
          <div style={{ marginTop: "10px", fontWeight: 700, color: currentStageIndex >= stages.length - 1 ? "#10B981" : "#94a3b8", fontSize: "1.2rem", transition: "all 0.5s ease" }}>
            COMPLETE
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
