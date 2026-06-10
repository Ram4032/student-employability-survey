import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface LoadingViewProps {
  onComplete: () => void;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ onComplete }) => {
  const steps = [
    "Analyzing Academic Profile...",
    "Evaluating Experience...",
    "Assessing Career Development...",
    "Reviewing Industry Exposure...",
    "Generating Final Insights..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 3 seconds total / 5 steps = 600ms per step
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Wait a bit before completing
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-md text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-zinc-800 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          Analyzing Career Readiness...
        </h2>

        <div className="space-y-4 text-left">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              {index < currentStep ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </motion.div>
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border border-zinc-700" />
              )}
              <span className={`text-sm ${
                index < currentStep ? 'text-zinc-300' : 
                index === currentStep ? 'text-blue-400 font-medium' : 
                'text-zinc-600'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};
