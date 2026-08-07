'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, X, CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { StreakShieldTask } from '@/lib/types';
import confetti from 'canvas-confetti';

interface StreakShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: StreakShieldTask;
  onShieldActivated: () => void;
}

export const StreakShieldModal: React.FC<StreakShieldModalProps> = ({
  isOpen,
  onClose,
  task,
  onShieldActivated,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentBug = task.bugs[currentStep];

  const handleSelectOption = (optionIdx: number) => {
    setErrorMsg(null);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = optionIdx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentStep] === undefined) {
      setErrorMsg('Please select an answer to proceed.');
      return;
    }

    if (selectedAnswers[currentStep] !== currentBug.correctIndex) {
      setErrorMsg('Incorrect answer! Check your JavaScript logic and try again.');
      return;
    }

    if (currentStep < task.bugs.length - 1) {
      setCurrentStep(currentStep + 1);
      setErrorMsg(null);
    } else {
      // Completed all 3 questions!
      setIsCompleted(true);
      onShieldActivated();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5E00', '#FF9900', '#10B981', '#3B82F6']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-orange-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Shield Icon Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            {isCompleted ? (
              <ShieldCheck className="w-7 h-7 text-emerald-400 animate-bounce" />
            ) : (
              <ShieldAlert className="w-7 h-7 text-orange-500 animate-pulse" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                INNOVATION FEATURE
              </span>
              <span className="text-xs text-zinc-400">5-Min Emergency Task</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              🔥 STREAK SHIELD
            </h3>
          </div>
        </div>

        {!isCompleted ? (
          <div>
            <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
              {task.description}
            </p>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span>Bug Fix {currentStep + 1} of {task.bugs.length}</span>
              <span className="text-orange-400 font-semibold">{Math.round(((currentStep + 1) / task.bugs.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / task.bugs.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-4">
              <h4 className="text-sm font-semibold text-white mb-3">
                {currentBug.question}
              </h4>

              <div className="space-y-2">
                {currentBug.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-orange-500/20 border border-orange-500/50 text-orange-200'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action CTA */}
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{currentStep === task.bugs.length - 1 ? 'Save My Streak →' : 'Next Bug Fix →'}</span>
              <Zap className="w-4 h-4 fill-white" />
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-black text-white">STREAK SHIELD ACTIVATED!</h4>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Awesome work! You solved all 3 quick-win debugging tasks. Your <strong className="text-amber-400">12-Day Streak is protected</strong> for today.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
