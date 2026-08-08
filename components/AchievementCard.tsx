'use client';

import React from 'react';
import { Achievement, Student } from '@/lib/types';
import { Lock, Award } from 'lucide-react';

interface AchievementSectionProps {
  achievements: Achievement[];
  student?: Student;
}

export const AchievementSection: React.FC<AchievementSectionProps> = ({ achievements, student }) => {
  const daysCompleted = student?.daysCompleted || 0;
  const bestStreak = student?.bestStreak || student?.currentStreak || 0;

  const dynamicAchievements = achievements.map((ach) => {
    let unlocked = false;
    let unlockedAt: string | null = null;

    if (ach.id === 'ach_1') {
      unlocked = daysCompleted >= 1;
      if (unlocked) unlockedAt = 'Day 1';
    } else if (ach.id === 'ach_2') {
      unlocked = bestStreak >= 7;
      if (unlocked) unlockedAt = 'Day 7';
    } else if (ach.id === 'ach_3') {
      unlocked = bestStreak >= 10;
      if (unlocked) unlockedAt = 'Day 10';
    } else if (ach.id === 'ach_4') {
      unlocked = bestStreak >= 30;
      if (unlocked) unlockedAt = 'Day 30';
    } else if (ach.id === 'ach_5') {
      unlocked = daysCompleted >= 60;
      if (unlocked) unlockedAt = 'Day 60';
    } else {
      unlocked = ach.unlocked;
      unlockedAt = ach.unlockedAt;
    }

    return {
      ...ach,
      unlocked,
      unlockedAt,
    };
  });

  const unlockedCount = dynamicAchievements.filter((a) => a.unlocked).length;

  return (
    <div className="hardware-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D8C7A1]" />
          ACHIEVEMENTS & BADGES
        </h3>
        <span className="text-[11px] text-[#D8C7A1] font-mono">
          {unlockedCount} / {dynamicAchievements.length} UNLOCKED
        </span>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
        {dynamicAchievements.map((ach) => (
          <div
            key={ach.id}
            className={`flex-none w-56 snap-start p-4 rounded-xl border transition-all ${
              ach.unlocked
                ? 'bg-[#151A1F] border-[#D8C7A1]/40 shadow-sm'
                : 'bg-[#080A0C] border-[#242A30] opacity-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl p-2 rounded-xl bg-[#101418] border border-[#242A30] inline-block">
                {ach.icon}
              </span>
              {ach.unlocked ? (
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#B8F2D0]/10 text-[#B8F2D0] border border-[#B8F2D0]/20">
                  Unlocked
                </span>
              ) : (
                <div className="p-1.5 rounded-lg bg-[#101418] border border-[#242A30] text-[#9BA3AA]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <h4 className="text-xs font-bold text-[#F5F3EE] mb-1">{ach.title}</h4>
            <p className="text-[11px] text-[#9BA3AA] line-clamp-2 leading-relaxed mb-2">
              {ach.description}
            </p>

            {ach.unlockedAt && ach.unlocked && (
              <span className="text-[10px] text-[#D8C7A1] font-mono font-medium">
                Achieved on {ach.unlockedAt}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
