'use client';

import React, { useState } from 'react';
import { Sparkles, Github, Linkedin, Code2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface OnboardingCardProps {
  onCompleted?: () => void;
}

export const OnboardingCard: React.FC<OnboardingCardProps> = ({ onCompleted }) => {
  const { userProfile, saveDay0Onboarding } = useAuth();

  const [github, setGithub] = useState(userProfile?.githubHandle || '');
  const [linkedin, setLinkedin] = useState(userProfile?.linkedinUrl || '');
  const [track, setTrack] = useState(userProfile?.track || 'Fullstack Web Development');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveDay0Onboarding(github, linkedin, track);
      setIsSubmitting(false);
      if (onCompleted) {
        onCompleted();
      }
    } catch (err) {
      console.error('Onboarding save error:', err);
      setIsSubmitting(false);
    }
  };

  const tracks = [
    { id: 'Fullstack Web Development', label: 'Fullstack Web Development', icon: '🚀', desc: 'React, Next.js & Tailwind CSS' },
    { id: 'Mobile App Engineering', label: 'Mobile App Engineering', icon: '📱', desc: 'React Native & Cross-Platform UI' },
    { id: 'Data Structures & Algorithms', label: 'Data Structures & Algorithms', icon: '⚡', desc: 'Competitive Coding & Problem Solving' },
  ];

  return (
    <div className="hardware-card p-6 sm:p-8 space-y-6 animate-fadeIn relative overflow-hidden">
      {/* Background Soft Atmospheric Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#B8F2D0]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#151A1F] border border-[#B8F2D0]/30 flex items-center justify-center text-[#B8F2D0] shrink-0">
          <Sparkles className="w-6 h-6 text-[#B8F2D0]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20">
              DAY 0 ONBOARDING
            </span>
            <span className="text-xs font-mono text-[#D8C7A1]">
              PROFILE SETUP & TRAJECTORY INIT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F5F3EE] tracking-tight font-sans mt-1">
            Initialize Your 60-Day Challenge Profile
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#151A1F] border border-[#242A30] space-y-2 text-xs text-[#9BA3AA]">
        <div className="flex items-center gap-2 font-bold text-[#F5F3EE]">
          <ShieldCheck className="w-4 h-4 text-[#B8F2D0]" />
          Why GitHub & LinkedIn Connection is Required
        </div>
        <p className="leading-relaxed font-normal">
          Connect your GitHub and LinkedIn profiles to enable profile-based daily challenges, proof-of-work submission verification, and streak tracking. Your progress will be recorded directly to your unique developer ledger.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* GitHub Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
            <Github className="w-4 h-4 text-[#B8F2D0]" />
            GitHub Handle / Profile
          </label>
          <input
            type="text"
            required
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="e.g. octocat or https://github.com/username"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-mono transition-all"
          />
        </div>

        {/* LinkedIn Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#B8F2D0]" />
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            required
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-mono transition-all"
          />
        </div>

        {/* Challenge Track Selection */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F3EE] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#D8C7A1]" />
            Select Your 60-Day Challenge Track
          </label>
          <div className="space-y-2">
            {tracks.map((t) => {
              const isSelected = track === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTrack(t.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#151A1F] border-[#B8F2D0]/50 text-[#F5F3EE] font-semibold'
                      : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA] hover:bg-[#151A1F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{t.icon}</span>
                    <div>
                      <div className="font-bold text-[#F5F3EE]">{t.label}</div>
                      <div className="text-[10px] text-[#9BA3AA] font-mono">{t.desc}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#B8F2D0]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Complete Day 0 CTA */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[#F5F3EE] hover:bg-[#B8F2D0] text-[#080A0C] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            <span>Complete Day 0 Onboarding & Start Day 1 →</span>
            <ArrowRight className="w-4 h-4 text-[#080A0C]" />
          </button>
        </div>
      </form>
    </div>
  );
};
