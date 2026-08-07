'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, X, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
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
        colors: ['#B8F2D0', '#D8C7A1', '#F5F3EE']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A0C]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg hardware-card p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9BA3AA] hover:text-[#F5F3EE] p-1.5 rounded-lg hover:bg-[#151A1F] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Shield Icon Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center justify-center text-[#B8F2D0]">
            {isCompleted ? (
              <ShieldCheck className="w-7 h-7 text-[#B8F2D0]" />
            ) : (
              <ShieldAlert className="w-7 h-7 text-[#D8C7A1] animate-pulse" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20">
                INNOVATION FEATURE
              </span>
              <span className="text-xs text-[#9BA3AA] font-mono">5-Min Emergency Protocol</span>
            </div>
            <h3 className="text-xl font-bold text-[#F5F3EE] tracking-tight flex items-center gap-2 mt-0.5">
              ⚡ STREAK SHIELD
            </h3>
          </div>
        </div>

        {!isCompleted ? (
          <div>
            <p className="text-sm text-[#9BA3AA] mb-4 leading-relaxed">
              {task.description}
            </p>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#9BA3AA] mb-2">
              <span>Bug Fix {currentStep + 1} of {task.bugs.length}</span>
              <span className="text-[#B8F2D0] font-bold">{Math.round(((currentStep + 1) / task.bugs.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-[#080A0C] rounded-full overflow-hidden mb-6 border border-[#242A30]">
              <div
                className="h-full bg-[#B8F2D0] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / task.bugs.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-[#151A1F] p-4 rounded-xl border border-[#242A30] mb-4">
              <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">
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
                          ? 'bg-[#101418] border border-[#B8F2D0]/50 text-[#B8F2D0]'
                          : 'bg-[#080A0C] border border-[#242A30] text-[#9BA3AA] hover:bg-[#101418] hover:text-[#F5F3EE]'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#B8F2D0] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs mb-4 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action CTA */}
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-xl bg-[#F5F3EE] text-[#080A0C] hover:bg-[#B8F2D0] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span>{currentStep === task.bugs.length - 1 ? 'Save My Streak →' : 'Next Bug Fix →'}</span>
              <Zap className="w-4 h-4 text-[#080A0C]" />
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-[#B8F2D0]/10 border border-[#B8F2D0]/30 text-[#B8F2D0] mb-2">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-black text-[#F5F3EE] font-mono">STREAK SHIELD ACTIVATED!</h4>
            <p className="text-sm text-[#9BA3AA] max-w-sm mx-auto leading-relaxed">
              Awesome work! You solved all 3 quick-win debugging tasks. Your <strong className="text-[#D8C7A1]">12-Day Streak is protected</strong> for today.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-[#151A1F] hover:bg-[#242A30] text-[#F5F3EE] font-mono font-bold text-xs uppercase tracking-wider transition-all border border-[#242A30]"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
