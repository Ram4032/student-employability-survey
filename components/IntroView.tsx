import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface IntroViewProps {
  onContinue: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onContinue }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-8 md:p-12 rounded-2xl w-full space-y-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Before We Begin</h2>
          <p className="text-zinc-400">Important information about your participation.</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200">Completely Anonymous</h3>
              <p className="text-sm text-zinc-400 mt-1">
                No personally identifiable information will be collected. Your identity remains protected.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <GraduationCapIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200">Academic Research</h3>
              <p className="text-sm text-zinc-400 mt-1">
                Responses are used solely for an undergraduate research study on student employability.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200">Estimated Time: 3 Minutes</h3>
              <p className="text-sm text-zinc-400 mt-1">
                The assessment consists of simple multiple choice and scale questions.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button 
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-white/10 border border-white/20 rounded-full hover:bg-white/20"
          >
            I Understand, Continue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Simple helper icon just for this file
function GraduationCapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a2 2 0 0 1-.002 2.152l-8.526 10.155a2 2 0 0 1-3.084.001L1.282 13.08a2 2 0 0 1 .002-2.152L9.81 2.772a2 2 0 0 1 3.084 0l8.526 8.15z" />
      <path d="M12 22v-6" />
    </svg>
  );
}
