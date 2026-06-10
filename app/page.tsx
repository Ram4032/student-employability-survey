"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { LandingView } from '../components/LandingView';
import { IntroView } from '../components/IntroView';
import { SurveyView } from '../components/SurveyView';
import { LoadingView } from '../components/LoadingView';
import { ReportView } from '../components/ReportView';
import { ThankYouView } from '../components/ThankYouView';

import { surveyData } from './data/questions';
import { calculateScore, ScoreResult } from './lib/scoring';
import { saveResponseToDatabase } from './lib/supabaseClient';

type Step = 'landing' | 'intro' | 'survey' | 'loading' | 'results' | 'thankyou';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  // Load drafted answers from local storage on mount
  useEffect(() => {
    const drafted = localStorage.getItem("survey_draft");
    if (drafted) {
      try {
        setAnswers(JSON.parse(drafted));
      } catch (e) {
        console.error("Error parsing drafted answers", e);
      }
    }
  }, []);

  const handleSaveProgress = (newAnswers: Record<string, string | number>) => {
    setAnswers(newAnswers);
    localStorage.setItem("survey_draft", JSON.stringify(newAnswers));
  };

  const handleCompleteSurvey = (finalAnswers: Record<string, string | number>) => {
    setAnswers(finalAnswers);
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    const result = calculateScore(answers);
    setScoreResult(result);
    setStep('results');
  };

  const handleSubmitData = async () => {
    if (!scoreResult) return;
    
    // Create final payload
    const payload = {
      score: scoreResult.totalScore,
      category: scoreResult.category,
      ...answers
    };

    // Save to DB
    await saveResponseToDatabase(payload);
    
    // Clear draft and show thank you
    localStorage.removeItem("survey_draft");
    setStep('thankyou');
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-blue-500/30">
      <main className="w-full min-h-screen flex items-center justify-center relative">
        
        {/* Global animated background elements */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full relative z-10">
          <AnimatePresence mode="wait">
            {step === 'landing' && (
              <motion.div key="landing" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <LandingView onStart={() => setStep('intro')} />
              </motion.div>
            )}

            {step === 'intro' && (
              <motion.div key="intro" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <IntroView onContinue={() => setStep('survey')} />
              </motion.div>
            )}

            {step === 'survey' && (
              <motion.div key="survey" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <SurveyView 
                  sections={surveyData} 
                  initialAnswers={answers}
                  onSaveProgress={handleSaveProgress}
                  onComplete={handleCompleteSurvey} 
                />
              </motion.div>
            )}

            {step === 'loading' && (
              <motion.div key="loading" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <LoadingView onComplete={handleLoadingComplete} />
              </motion.div>
            )}

            {step === 'results' && scoreResult && (
              <motion.div key="results" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ReportView result={scoreResult} onContinue={handleSubmitData} />
              </motion.div>
            )}

            {step === 'thankyou' && (
              <motion.div key="thankyou" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ThankYouView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
