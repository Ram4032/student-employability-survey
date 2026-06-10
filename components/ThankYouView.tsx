import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export const ThankYouView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Could You Get Hired Today?',
        text: 'Take this 3-minute employability assessment to get your personalized career readiness score!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-xl text-center shadow-2xl border border-zinc-800"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-4 rounded-full">
            <span className="text-4xl">🎉</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Thank You!
        </h1>
        
        <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
          Your anonymous responses have been successfully recorded and will contribute to academic research on student employability and career readiness.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Assessment
          </button>
          
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-medium transition-colors border border-zinc-700"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-500">
            Conducted by:<br/>
            <span className="text-zinc-400 font-medium mt-1 inline-block">Computer Science & Statistics Student</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
