'use client';

import React from 'react';
import { Check, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { Student, StreakDay } from '@/lib/types';

interface StreakCardProps {
  student: Student;
  weekStreak: StreakDay[];
  onOpenShield: () => void;
  isShieldProtected?: boolean;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  student,
  weekStreak,
  onOpenShield,
  isShieldProtected = false,
}) => {
  const currentStreak = student.currentStreak ?? 0;

  return (
    <div className="relative overflow-hidden hardware-card p-5 sm:p-6">
      {/* Background Soft Mint Atmospheric Glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#B8F2D0]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#151A1F] border border-[#B8F2D0]/30 text-[#B8F2D0] text-[11px] font-mono font-bold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
            MOMENTUM STATUS
          </span>
          {isShieldProtected && (
            <span className="px-2.5 py-1 rounded-full bg-[#B8F2D0]/10 border border-[#B8F2D0]/30 text-[#B8F2D0] text-[11px] font-mono font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Shielded
            </span>
          )}
        </div>

        {/* Emergency Streak Shield Button */}
        <button
          onClick={onOpenShield}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-[#151A1F] hover:bg-[#242A30] border border-[#D8C7A1]/30 text-[#D8C7A1] font-medium transition-all group active:scale-95 shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-[#D8C7A1] group-hover:scale-105 transition-transform" />
          <span className="hidden sm:inline font-mono text-[11px]">Streak Shield</span>
          <span className="sm:hidden font-mono text-[11px]">Shield</span>
        </button>
      </div>

      {/* Hero Streak Arc & Counter */}
      <div className="flex items-center gap-5 sm:gap-6 mb-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#151A1F] border border-[#242A30] flex items-center justify-center shrink-0 shadow-inner">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#242A30]"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#B8F2D0]"
              strokeDasharray={`${Math.min(currentStreak * 8, 100)}, 100`}
              strokeWidth="2.8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm sm:text-base font-mono font-extrabold text-[#D8C7A1]">
              ⚡
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight font-sans">
              {currentStreak}
            </span>
            <span className="text-base sm:text-lg font-mono font-bold text-[#B8F2D0] uppercase tracking-wider">
              DAY STREAK
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#9BA3AA] mt-1 font-medium">
            {currentStreak > 0
              ? "Consistency active. Continue your momentum."
              : "Complete Day 1 to initialize streak."}
          </p>
        </div>
      </div>

      {/* Mon-Sun Day Status Grid */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekStreak.map((item) => {
            const isCompleted = item.status === 'completed';
            const isToday = item.status === 'today';

            return (
              <div
                key={item.day}
                className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                  isToday
                    ? 'bg-[#151A1F] border-[#B8F2D0]/60 text-[#F5F3EE] shadow-sm'
                    : isCompleted
                    ? 'bg-[#101418] border-[#B8F2D0]/30 text-[#B8F2D0]'
                    : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA]/60'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  {item.day}
                </span>

                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-[#B8F2D0]/20 flex items-center justify-center text-[#B8F2D0]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : isToday ? (
                    <div className="w-5 h-5 rounded-full bg-[#B8F2D0] flex items-center justify-center text-[#080A0C] font-black animate-pulse">
                      ?
                    </div>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#242A30]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Message */}
      <div className="pt-3 border-t border-[#242A30] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-[#9BA3AA]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8F2D0] animate-pulse" />
          <span>Submit before 2:00 AM protocol deadline.</span>
        </span>
        <span className="font-mono text-[11px] text-[#D8C7A1] font-medium">🌙 Late Night Protocol Active</span>
      </div>
    </div>
  );
};
