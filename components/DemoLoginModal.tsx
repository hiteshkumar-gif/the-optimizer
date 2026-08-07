'use client';

import React, { useState } from 'react';
import { Sparkles, User, Mail, Code2, ArrowRight, ShieldCheck, X } from 'lucide-react';
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
  const [name, setName] = useState('Hitesh Kumar');
  const [email, setEmail] = useState('student@example.com');
  const [track, setTrack] = useState('Fullstack Web Development');
  const [presetMode, setPresetMode] = useState<'standard' | 'new'>('standard');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNew = presetMode === 'new';

    const newProfile: Partial<DemoStudentProfile> = {
      name: name.trim() || 'Hitesh Kumar',
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

        <p className="text-xs text-[#9BA3AA] mb-5 leading-relaxed">
          Set up your local student profile to initialize your daily streak and proof ledger. No production authentication required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="e.g. Hitesh Kumar"
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
              placeholder="e.g. student@example.com"
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
