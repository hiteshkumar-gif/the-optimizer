'use client';

import React, { useState } from 'react';
import { Sparkles, User, Mail, Code2, ArrowRight, X } from 'lucide-react';
import { saveStoredStudent, setDemoLoggedIn, DemoStudentProfile } from '@/lib/storage';

interface DemoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: DemoStudentProfile) => void;
}

export const DemoLoginModal: React.FC<DemoLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  // Empty initial fields so user can type their own name & email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Fullstack Web Development');
  const [presetMode, setPresetMode] = useState<'standard' | 'new'>('standard');

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    const isNew = presetMode === 'new';

    const googleProfile: Partial<DemoStudentProfile> = {
      name: name.trim() || 'Hitesh Kumar',
      email: email.trim() || 'hitesh.student@gmail.com',
      track: track || 'Fullstack Web Development',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      currentStreak: isNew ? 0 : 12,
      bestStreak: isNew ? 0 : 12,
      daysCompleted: isNew ? 0 : 12,
      totalDays: 60,
      daysRemaining: isNew ? 60 : 48,
      completionPercentage: isNew ? 0 : 20,
      xp: isNew ? 0 : 1240,
      rank: isNew ? 298 : 24,
      topPercentage: isNew ? 'Top 99%' : 'Top 8%',
    };

    const saved = saveStoredStudent(googleProfile);
    setDemoLoggedIn(true);
    onLoginSuccess(saved);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNew = presetMode === 'new';

    const newProfile: Partial<DemoStudentProfile> = {
      name: name.trim() || 'Student Developer',
      email: email.trim() || 'student@example.com',
      track: track || 'Fullstack Web Development',
      currentStreak: isNew ? 0 : 12,
      bestStreak: isNew ? 0 : 12,
      daysCompleted: isNew ? 0 : 12,
      totalDays: 60,
      daysRemaining: isNew ? 60 : 48,
      completionPercentage: isNew ? 0 : 20,
      xp: isNew ? 0 : 1240,
      rank: isNew ? 298 : 24,
      topPercentage: isNew ? 'Top 99%' : 'Top 8%',
    };

    const saved = saveStoredStudent(newProfile);
    setDemoLoggedIn(true);
    onLoginSuccess(saved);
    onClose();
  };

  const tracks = [
    { id: 'Fullstack Web Development', label: 'Fullstack Web Development', icon: '🚀', desc: 'React, Next.js & Tailwind CSS' },
    { id: 'Mobile App Engineering', label: 'Mobile App Engineering', icon: '📱', desc: 'React Native & Cross-Platform UI' },
    { id: 'Data Structures & Algorithms', label: 'Data Structures & Algorithms', icon: '⚡', desc: 'Competitive Coding & Problem Solving' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A0C]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md hardware-card p-5 sm:p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9BA3AA] hover:text-[#F5F3EE] p-1.5 rounded-lg hover:bg-[#151A1F] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center justify-center text-[#B8F2D0]">
            <Sparkles className="w-5 h-5 text-[#B8F2D0]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20">
                PROTOTYPE DEMO ACCOUNT
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F3EE] tracking-tight font-sans mt-0.5">
              Welcome to ABTalks 60D
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#9BA3AA] mb-4 leading-relaxed">
          Set up your student profile to initialize your daily streak and proof ledger. All data is saved locally to your device.
        </p>

        {/* Single-Click Sign in with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 rounded-xl bg-[#151A1F] hover:bg-[#242A30] border border-[#242A30] hover:border-[#B8F2D0]/40 text-[#F5F3EE] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google Account</span>
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#242A30]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono">
            <span className="bg-[#101418] px-2 text-[#9BA3AA]">or enter details manually</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#B8F2D0]" />
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name (e.g. Hitesh Kumar)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-sans transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#D8C7A1]" />
              Student Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (e.g. hitesh@gmail.com)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0C] border border-[#242A30] text-xs text-[#F5F3EE] placeholder-[#9BA3AA]/50 focus:outline-none focus:border-[#B8F2D0] font-sans transition-all"
            />
          </div>

          {/* Track Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#B8F2D0]" />
              Select Challenge Track
            </label>
            <div className="space-y-2">
              {tracks.map((t) => {
                const isSelected = track === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTrack(t.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-sans transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#151A1F] border-[#B8F2D0]/50 text-[#F5F3EE] font-semibold'
                        : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA] hover:bg-[#151A1F]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <div>
                        <div className="font-bold text-[#F5F3EE]">{t.label}</div>
                        <div className="text-[10px] text-[#9BA3AA]">{t.desc}</div>
                      </div>
                    </div>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#B8F2D0]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Streak Selection */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9BA3AA]">
              Initial State Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPresetMode('standard')}
                className={`p-2 rounded-xl border text-[11px] font-mono transition-all text-center ${
                  presetMode === 'standard'
                    ? 'bg-[#151A1F] border-[#B8F2D0]/50 text-[#B8F2D0] font-bold'
                    : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA]'
                }`}
              >
                12-Day Active Streak
              </button>
              <button
                type="button"
                onClick={() => setPresetMode('new')}
                className={`p-2 rounded-xl border text-[11px] font-mono transition-all text-center ${
                  presetMode === 'new'
                    ? 'bg-[#151A1F] border-[#D8C7A1]/50 text-[#D8C7A1] font-bold'
                    : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA]'
                }`}
              >
                0-Day New Student
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#F5F3EE] hover:bg-[#B8F2D0] text-[#080A0C] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span>Initialize Student Account →</span>
              <ArrowRight className="w-4 h-4 text-[#080A0C]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
