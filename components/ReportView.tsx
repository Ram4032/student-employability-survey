import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { ScoreResult } from '../app/lib/scoring';

interface ReportViewProps {
  result: ScoreResult;
  onContinue: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ result, onContinue }) => {
  const { totalScore, category, strengths, improvements, recommendations } = result;

  // Determine color based on score
  const getScoreColor = () => {
    if (totalScore <= 40) return 'text-orange-400 border-orange-500/50 bg-orange-500/10 shadow-orange-500/20';
    if (totalScore <= 70) return 'text-blue-400 border-blue-500/50 bg-blue-500/10 shadow-blue-500/20';
    return 'text-green-400 border-green-500/50 bg-green-500/10 shadow-green-500/20';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-screen w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Your Career Readiness Report
        </h1>
        <p className="text-zinc-400">Based on your responses across all 6 assessment areas.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className={`col-span-1 md:col-span-3 lg:col-span-1 glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border shadow-[0_0_30px_rgba(0,0,0,0.1)] ${getScoreColor()}`}>
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="opacity-20"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={377} // 2 * pi * 60
                strokeDashoffset={377 - (377 * totalScore) / 100}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 377 - (377 * totalScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold">{totalScore}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mt-4 text-white uppercase tracking-wide">{category}</h3>
          <p className="text-sm mt-2 opacity-80 text-white">Overall Readiness Score</p>
        </div>

        {/* Details Cards */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Your Strengths</h3>
            </div>
            <ul className="space-y-3">
              {strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Areas to Improve</h3>
            </div>
            <ul className="space-y-3">
              {improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card rounded-2xl p-8 border border-zinc-800 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Lightbulb className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Personalized Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="text-3xl font-bold text-zinc-800 mb-2">0{i + 1}</div>
              <p className="text-zinc-300 text-sm leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-12">
        <button
          onClick={onContinue}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-black transition-all duration-200 bg-white border border-transparent rounded-full hover:bg-zinc-200 shadow-lg shadow-white/10"
        >
          Submit & Finish
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </motion.div>
  );
};
