'use client';

import React, { useState } from 'react';
import { Github, Linkedin, CheckCircle2, AlertCircle, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionFormProps {
  initialGithubUrl?: string;
  initialLinkedinUrl?: string;
  onSubmissionUpdate?: (status: {
    githubUrl: string;
    linkedinUrl: string;
    githubVerified: boolean;
    linkedinVerified: boolean;
    isDayCompleted: boolean;
  }) => void;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  initialGithubUrl = 'https://github.com/hiteshkumar/day12-portfolio',
  initialLinkedinUrl = 'https://linkedin.com/posts/hiteshkumar-day12',
  onSubmissionUpdate,
}) => {
  const [githubUrl, setGithubUrl] = useState(initialGithubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(initialLinkedinUrl);

  const [githubVerified, setGithubVerified] = useState(true);
  const [linkedinVerified, setLinkedinVerified] = useState(true);

  const [githubError, setGithubError] = useState<string | null>(null);
  const [linkedinError, setLinkedinError] = useState<string | null>(null);

  const [isCompleted, setIsCompleted] = useState(false);

  const validateGithub = (url: string) => {
    if (!url || !url.trim()) {
      setGithubError('GitHub URL cannot be empty.');
      setGithubVerified(false);
      return false;
    }
    if (!url.includes('github.com')) {
      setGithubError('Invalid URL! Must be a valid github.com repository link.');
      setGithubVerified(false);
      return false;
    }
    setGithubError(null);
    setGithubVerified(true);
    return true;
  };

  const validateLinkedin = (url: string) => {
    if (!url || !url.trim()) {
      setLinkedinError('LinkedIn post URL cannot be empty.');
      setLinkedinVerified(false);
      return false;
    }
    if (!url.includes('linkedin.com')) {
      setLinkedinError('Invalid URL! Must be a valid linkedin.com post link.');
      setLinkedinVerified(false);
      return false;
    }
    setLinkedinError(null);
    setLinkedinVerified(true);
    return true;
  };

  const handleVerifyGithub = () => {
    validateGithub(githubUrl);
  };

  const handleVerifyLinkedin = () => {
    validateLinkedin(linkedinUrl);
  };

  const handleCompleteDay = () => {
    const isGhValid = validateGithub(githubUrl);
    const isLiValid = validateLinkedin(linkedinUrl);

    if (isGhValid && isLiValid) {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF5E00', '#FF9900', '#10B981', '#3B82F6', '#EC4899']
      });

      if (onSubmissionUpdate) {
        onSubmissionUpdate({
          githubUrl,
          linkedinUrl,
          githubVerified: true,
          linkedinVerified: true,
          isDayCompleted: true,
        });
      }
    }
  };

  const completedCount = (githubVerified ? 1 : 0) + (linkedinVerified ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Proof Submission Dual Cards Header */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            Submit Your Proof
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            Required: GitHub + LinkedIn
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GitHub Submission Input Card */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Github className="w-4 h-4 text-white" />
                GitHub Repository
              </label>
              {githubVerified && (
                <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>

            <input
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                setGithubError(null);
              }}
              placeholder="https://github.com/username/project"
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-all"
            />

            {githubError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {githubError}
              </p>
            )}

            <button
              onClick={handleVerifyGithub}
              className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold border border-zinc-700 transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Verify GitHub →</span>
            </button>
          </div>

          {/* LinkedIn Submission Input Card */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                LinkedIn Post
              </label>
              {linkedinVerified && (
                <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>

            <input
              type="text"
              value={linkedinUrl}
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
                setLinkedinError(null);
              }}
              placeholder="https://linkedin.com/posts/..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-all"
            />

            {linkedinError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {linkedinError}
              </p>
            )}

            <button
              onClick={handleVerifyLinkedin}
              className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold border border-zinc-700 transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Verify LinkedIn →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submission Status Card */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              {isCompleted ? 'VERIFIED & COMPLETED' : 'PENDING REVIEW'}
            </span>
          </div>
          <span className="text-xs text-zinc-400 font-mono font-medium">Status Check</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">GitHub</span>
            <span className={githubVerified ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
              {githubVerified ? '✓ Submitted' : 'Missing'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">LinkedIn</span>
            <span className={linkedinVerified ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
              {linkedinVerified ? '✓ Submitted' : 'Missing'}
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 italic">
          {isCompleted
            ? 'Your proof of work has been recorded to your developer streak timeline!'
            : 'Your work is being checked. Complete both proof links to finish Day 12.'}
        </p>
      </div>

      {/* Day Completion Final Card */}
      <div className="rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-orange-500/40 p-6 shadow-2xl text-center space-y-4">
        {!isCompleted ? (
          <>
            <h4 className="text-xl font-bold text-white tracking-tight">Almost there.</h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
              <span>{completedCount} / 2 submissions complete</span>
            </div>

            <div>
              <button
                onClick={handleCompleteDay}
                disabled={completedCount < 2}
                className={`w-full max-w-sm py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 ${
                  completedCount === 2
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-zinc-950 hover:from-orange-600 hover:to-amber-600 shadow-orange-950/50 cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                }`}
              >
                <span>Complete Day 12 →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-2 space-y-3 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl shadow-glow-emerald">
              ✓
            </div>
            <h4 className="text-2xl font-black text-white tracking-tight text-emerald-400">
              DAY 12 COMPLETED!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
              Outstanding work! You&apos;ve extended your streak to 12 days. Keep building consistency every single day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
