'use client';

import React from 'react';
import { Flame, Check, HelpCircle, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
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
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-orange-500/30 p-5 sm:p-6 shadow-xl shadow-orange-950/20">
      {/* Background Subtle Flame Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            STREAK STATUS
          </span>
          {isShieldProtected && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Shielded
            </span>
          )}
        </div>

        {/* Emergency Streak Shield Button */}
        <button
          onClick={onOpenShield}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-medium transition-all group active:scale-95"
        >
          <ShieldAlert className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Streak Shield</span>
          <span className="sm:hidden">Shield</span>
        </button>
      </div>

      {/* Hero Streak Flame & Counter */}
      <div className="flex items-center gap-4 sm:gap-6 mb-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-950/60 shrink-0">
          <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.5] fill-amber-300/30 animate-pulse-flame" />
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
              {student.currentStreak ?? 0}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-orange-400 uppercase tracking-tight">
              DAY STREAK
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-medium">
            {(student.currentStreak ?? 0) > 0
              ? "You're on fire. Keep showing up!"
              : "Complete Day 1 to begin your streak. Restart today!"}
          </p>
        </div>
      </div>

      {/* Mon-Sun Day Status Checklist Grid */}
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
                    ? 'bg-orange-500/20 border-orange-500/60 text-white shadow-md shadow-orange-950/40 ring-1 ring-orange-500/50'
                    : isCompleted
                    ? 'bg-zinc-800/80 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.day}
                </span>

                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : isToday ? (
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-zinc-950 font-black animate-pulse">
                      ?
                    </div>
                  ) : (
                    <HelpCircle className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Message */}
      <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>Complete today&apos;s task before 2:00 AM to keep your streak alive.</span>
        </span>
        <span className="font-mono text-[11px] text-amber-400/90 font-medium">🌙 Late Night Protection Active</span>
      </div>
    </div>
  );
};
