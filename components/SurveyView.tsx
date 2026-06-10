import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Question, Section } from '../app/data/questions';

interface SurveyViewProps {
  sections: Section[];
  initialAnswers: Record<string, string | number>;
  onComplete: (answers: Record<string, string | number>) => void;
  onSaveProgress: (answers: Record<string, string | number>) => void;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ sections, initialAnswers, onComplete, onSaveProgress }) => {
  const allQuestions = sections.flatMap(s => s.questions);
  const totalQuestions = allQuestions.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>(initialAnswers);
  const [direction, setDirection] = useState(1);

  const currentQuestion = allQuestions[currentIndex];
  const currentSection = sections.find(s => s.questions.some(q => q.id === currentQuestion.id));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (answers[currentQuestion.id] !== undefined) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        handlePrev();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        // Quick select for Likert scale or first 5 options
        const idx = parseInt(e.key) - 1;
        if (currentQuestion.options[idx]) {
          handleSelect(currentQuestion.options[idx].value);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers, currentQuestion]);

  const handleSelect = (value: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    onSaveProgress(newAnswers);
    
    // Auto-advance after short delay
    setTimeout(() => {
      handleNext(newAnswers);
    }, 400);
  };

  const handleNext = (currentAnswers = answers) => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(currentAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const progress = ((currentIndex) / totalQuestions) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0
      };
    },
    center: {
      z: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        z: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-3xl mx-auto px-4 py-8">
      
      {/* Top Header & Progress */}
      <div className="w-full mb-12 space-y-4 pt-4">
        <div className="flex justify-between items-end">
          <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
            {currentSection?.title}
          </p>
          <p className="text-xs text-zinc-500 font-medium">
            {currentIndex + 1} / {totalQuestions}
          </p>
        </div>
        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="w-full glass-card p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl"
          >
            <h2 className="text-2xl md:text-4xl font-semibold mb-8 leading-tight text-white">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-lg">{option.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 group-hover:border-zinc-500'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-between items-center w-full">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
            currentIndex === 0 
              ? 'text-zinc-600 cursor-not-allowed opacity-50' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={() => handleNext()}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
            !isAnswered 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
          }`}
        >
          {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-center mt-6 mb-2">
         <p className="text-xs text-zinc-600">Press <span className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400">1-5</span> to select, <span className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400">Enter</span> for next</p>
      </div>
    </div>
  );
};
