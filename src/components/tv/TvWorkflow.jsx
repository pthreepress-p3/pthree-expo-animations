import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPO_DATA } from '../../data/expoData';
import { useExpoSync } from '../../context/ExpoSyncContext';

import TvEnquiry from './workflow/TvEnquiry';
import TvQuotation from './workflow/TvQuotation';
import TvDesign from './workflow/TvDesign';
import TvJobCard from './workflow/TvJobCard';
import TvReelCutting from './workflow/TvReelCutting';
import TvCTP from './workflow/TvCTP';
import TvPress from './workflow/TvPress';
import TvPostPress from './workflow/TvPostPress';
import TvReview from './workflow/TvReview';
import TvAccounts from './workflow/TvAccounts';

export default function TvWorkflow() {
  const { syncState } = useExpoSync();
  const stageId = syncState.workflowStage;

  const renderStage = () => {
    switch (stageId) {
      case 'enquiry': return <TvEnquiry key="enquiry" />;
      case 'quotation': return <TvQuotation key="quotation" />;
      case 'design': return <TvDesign key="design" />;
      case 'job-card': return <TvJobCard key="job-card" />;
      case 'reel-cutting': return <TvReelCutting key="reel-cutting" />;
      case 'ctp': return <TvCTP key="ctp" />;
      case 'press': return <TvPress key="press" />;
      case 'post-press': return <TvPostPress key="post-press" />;
      case 'review': return <TvReview key="review" />;
      case 'accounts': return <TvAccounts key="accounts" />;
      default: return null;
    }
  };

  return (
    <div className="scene-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
}
