import React from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';
import { Link, Zap, Cloud, Smartphone, Mail, FileText } from 'lucide-react';

export default function TvIntegrations() {
  const integrations = [
    { icon: FileText, label: "Tally", color: "#ec008c" },
    { icon: Smartphone, label: "WhatsApp", color: "#25D366" },
    { icon: Mail, label: "Email", color: "#00aeef" },
    { icon: Cloud, label: "e-Way Bill", color: "#f59e0b" },
    { icon: Zap, label: "e-Invoice", color: "#8b5cf6" },
  ];

  return (
    <motion.div 
      className="scene-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        background: `radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.9), #020617)`
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h2 style={{ fontSize: '4rem', fontWeight: 800, color: EXPO_DATA.brand.colors.cyan, marginBottom: '20px' }}>
          Seamless Integrations
        </h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8' }}>
          Connect your workflow with essential tools
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {integrations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.15, type: 'spring' }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${item.color}44`,
                borderRadius: '24px',
                padding: '40px',
                width: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: `0 10px 40px ${item.color}22`
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '100px', height: '100px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <Icon size={50} color={item.color} />
              </motion.div>
              <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>
                {item.label}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Dynamic connector lines */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '800px', height: '800px',
          transform: 'translate(-50%, -50%)',
          border: '2px dashed rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: -1
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
