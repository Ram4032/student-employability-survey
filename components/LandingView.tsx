import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  const features = [
    "Academic Profile", "Internships", "Certifications", 
    "Communication Skills", "Leadership", "Industry Exposure", "Career Readiness"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full max-w-4xl mx-auto"
    >
      <div className="glass-card p-8 md:p-12 rounded-2xl w-full text-center space-y-8 relative overflow-hidden shadow-2xl">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex justify-center">
          <div className="bg-blue-500/10 p-4 rounded-full">
            <GraduationCap className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Could You Get <span className="text-gradient">Hired</span> Today?
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Most students focus on grades. Employers evaluate much more.
          </p>
        </div>

        <p className="text-zinc-300 max-w-2xl mx-auto">
          This 3-minute assessment explores the factors that influence employability, including:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left relative z-10">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center space-x-2 text-sm text-zinc-300 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-500 pb-4">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Anonymous</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Mobile Friendly</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> No Sign Up</span>
        </div>

        <div className="relative z-10">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-xs text-zinc-600 mt-8 max-w-lg mx-auto">
          Created as part of an undergraduate research study. All responses are anonymous and used solely for research purposes.
        </p>
      </div>
    </motion.div>
  );
};
