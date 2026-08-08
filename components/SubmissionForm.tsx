'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/lib/AuthContext';

interface SubmissionFormProps {
  dayId?: string | number;
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
  dayId = '12',
  initialGithubUrl,
  initialLinkedinUrl,
  onSubmissionUpdate,
}) => {
  const { user, getDaySubmission, saveSubmission } = useAuth();

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const [githubVerified, setGithubVerified] = useState(false);
  const [linkedinVerified, setLinkedinVerified] = useState(false);

  const [githubError, setGithubError] = useState<string | null>(null);
  const [linkedinError, setLinkedinError] = useState<string | null>(null);

  const [isCompleted, setIsCompleted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>('Pending Review');

  useEffect(() => {
    const stored = getDaySubmission(dayId);
    const gh = stored.githubUrl || initialGithubUrl || '';
    const li = stored.linkedinUrl || initialLinkedinUrl || '';

    setGithubUrl(gh);
    setLinkedinUrl(li);

    const isGhValid = gh.includes('github.com');
    const isLiValid = li.includes('linkedin.com');

    setGithubVerified(isGhValid);
    setLinkedinVerified(isLiValid);

    if (stored.status === 'completed' || (isGhValid && isLiValid && stored.githubSubmitted)) {
      setIsCompleted(true);
      setSubmissionStatus('Submitted — Saved to Streak Timeline');
    }
  }, [dayId, initialGithubUrl, initialLinkedinUrl, user]);

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

    // Save to user database record
    saveSubmission(dayId, {
      githubUrl: url,
      githubSubmitted: true,
      status: linkedinVerified ? 'completed' : 'pending_review',
    });

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

    // Save to user database record
    saveSubmission(dayId, {
      linkedinUrl: url,
      linkedinSubmitted: true,
      status: githubVerified ? 'completed' : 'pending_review',
    });

    return true;
  };

  const handleVerifyGithub = () => {
    validateGithub(githubUrl);
  };

  const handleVerifyLinkedin = () => {
    validateLinkedin(linkedinUrl);
  };

  const handleCompleteDay = async () => {
    const isGhValid = validateGithub(githubUrl);
    const isLiValid = validateLinkedin(linkedinUrl);

    if (isGhValid && isLiValid) {
      setIsCompleted(true);
      setSubmissionStatus('Submitted — Saved to Streak Timeline');

      await saveSubmission(dayId, {
        githubUrl,
        linkedinUrl,
        githubSubmitted: true,
        linkedinSubmitted: true,
        status: 'completed',
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8F2D0', '#D8C7A1', '#F5F3EE'],
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
      <div className="hardware-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-bold text-[#F5F3EE] tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B8F2D0]" />
            Submit Your Proof of Work
          </h3>
          <span className="text-xs text-[#D8C7A1] font-mono">
            Required: GitHub + LinkedIn
          </span>
        </div>

        <p className="text-xs text-[#9BA3AA] mb-4 leading-relaxed">
          Submit your public GitHub repository URL and LinkedIn proof-of-work post to verify Day {dayId} completion and update your daily streak in your database record.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GitHub Submission Input Card */}
          <div className="p-4 rounded-xl bg-[#151A1F] border border-[#242A30] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
                <Github className="w-4 h-4 text-[#F5F3EE]" />
                GitHub Repository
              </label>
              {githubVerified && (
                <span className="text-[10px] uppercase font-mono font-bold text-[#B8F2D0] px-2 py-0.5 rounded bg-[#B8F2D0]/10 border border-[#B8F2D0]/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Submitted
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-mono transition-all"
            />

            {githubError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {githubError}
              </p>
            )}

            <button
              onClick={handleVerifyGithub}
              className="w-full py-2 px-3 rounded-lg bg-[#101418] hover:bg-[#242A30] text-xs text-[#F5F3EE] font-mono font-semibold border border-[#242A30] transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Save GitHub Link →</span>
            </button>
          </div>

          {/* LinkedIn Submission Input Card */}
          <div className="p-4 rounded-xl bg-[#151A1F] border border-[#242A30] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#B8F2D0]" />
                LinkedIn Post
              </label>
              {linkedinVerified && (
                <span className="text-[10px] uppercase font-mono font-bold text-[#B8F2D0] px-2 py-0.5 rounded bg-[#B8F2D0]/10 border border-[#B8F2D0]/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Submitted
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-mono transition-all"
            />

            {linkedinError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {linkedinError}
              </p>
            )}

            <button
              onClick={handleVerifyLinkedin}
              className="w-full py-2 px-3 rounded-lg bg-[#101418] hover:bg-[#242A30] text-xs text-[#F5F3EE] font-mono font-semibold border border-[#242A30] transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Save LinkedIn Link →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submission Status Card */}
      <div className="hardware-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8F2D0] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8F2D0]">
              {isCompleted ? 'SUBMITTED & SAVED' : 'PENDING REVIEW'}
            </span>
          </div>
          <span className="text-xs text-[#9BA3AA] font-mono font-medium">Status Ledger</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center justify-between text-xs font-mono">
            <span className="text-[#9BA3AA]">GitHub Repository</span>
            <span className={githubVerified ? 'text-[#B8F2D0] font-bold' : 'text-[#9BA3AA]'}>
              {githubVerified ? '✓ Submitted' : 'Not Submitted'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center justify-between text-xs font-mono">
            <span className="text-[#9BA3AA]">LinkedIn Update</span>
            <span className={linkedinVerified ? 'text-[#B8F2D0] font-bold' : 'text-[#9BA3AA]'}>
              {linkedinVerified ? '✓ Submitted' : 'Not Submitted'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#9BA3AA] italic">
          {isCompleted
            ? 'Your proof of work has been recorded to your local developer streak timeline!'
            : 'Your submission is saved locally. Complete both proof links to finalize Day 12.'}
        </p>
      </div>

      {/* Day Completion Final Card */}
      <div className="hardware-card p-6 text-center space-y-4">
        {!isCompleted ? (
          <>
            <h4 className="text-xl font-bold text-[#F5F3EE] tracking-tight font-sans">Almost there.</h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A1F] border border-[#D8C7A1]/30 text-[#D8C7A1] text-xs font-mono">
              <span>{completedCount} / 2 submissions complete</span>
            </div>

            <div>
              <button
                onClick={handleCompleteDay}
                disabled={completedCount < 2}
                className={`w-full max-w-sm py-3.5 px-6 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 ${
                  completedCount === 2
                    ? 'bg-[#F5F3EE] text-[#080A0C] hover:bg-[#B8F2D0] hover:-translate-y-0.5 cursor-pointer shadow-sm'
                    : 'bg-[#151A1F] text-[#9BA3AA] border border-[#242A30] cursor-not-allowed'
                }`}
              >
                <span>Submit Day 12 & Update Streak →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-2 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#B8F2D0]/10 border border-[#B8F2D0]/30 text-[#B8F2D0] flex items-center justify-center text-xl">
              ✓
            </div>
            <h4 className="text-2xl font-black text-[#B8F2D0] tracking-tight font-mono">
              DAY 12 SUBMITTED!
            </h4>
            <p className="text-xs sm:text-sm text-[#9BA3AA] max-w-md mx-auto">
              Outstanding work! Your proof of work is saved to localStorage. Your streak is now 12 days active.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
