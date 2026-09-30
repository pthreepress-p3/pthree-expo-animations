import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXPO_DATA } from '../../../data/expoData';
import { Calculator } from 'lucide-react';

export default function TvQuotation() {
  const job = EXPO_DATA.job;
  const [typedText, setTypedText] = useState("");
  const fullText = "CALCULATING.JOB.COSTING.MODULE.SYNC... SUCCESS";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="expo-panel"
      initial={{ opacity: 0, rotateY: 90, z: -200 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, type: "spring" }}
      style={{ width: '80%', borderTop: `4px solid ${EXPO_DATA.brand.colors.yellow}`, position: 'relative', overflow: 'hidden' }}
    >
      <motion.div 
        style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `linear-gradient(45deg, transparent, ${EXPO_DATA.brand.colors.yellow}11, transparent)`, zIndex: 0 }}
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Calculator size={40} color={EXPO_DATA.brand.colors.yellow} />
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Quotation</h2>
          </div>
          <div style={{ padding: '8px 16px', background: 'rgba(255, 242, 0, 0.2)', color: EXPO_DATA.brand.colors.yellow, borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div style={{ width: '8px', height: '8px', borderRadius: '50%', background: EXPO_DATA.brand.colors.yellow }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            Estimate Approved
          </div>
        </div>

        <div style={{ fontFamily: 'monospace', color: EXPO_DATA.brand.colors.yellow, marginBottom: '30px', fontSize: '0.9rem', minHeight: '1.2rem' }}>
          {'>'} {typedText}
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>_</motion.span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.2rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { label: 'Customer', value: job.customer },
            { label: 'Material Cost', value: "₹45,200.00" },
            { label: 'Print Cost', value: "₹18,500.00" },
            { label: 'Finishing Cost', value: "₹8,300.00" },
            { label: 'Margin', value: "18%" },
            { label: 'Total Value', value: "₹84,960.00" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>{item.label}</div>
              <div style={{ fontWeight: 600 }}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
