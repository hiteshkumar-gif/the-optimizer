'use client';

import React from 'react';
import { Achievement } from '@/lib/types';
import { Lock, Trophy } from 'lucide-react';

interface AchievementSectionProps {
  achievements: Achievement[];
}

export const AchievementSection: React.FC<AchievementSectionProps> = ({ achievements }) => {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          ACHIEVEMENTS & BADGES
        </h3>
        <span className="text-xs text-zinc-500 font-mono">
          {achievements.filter((a) => a.unlocked).length} / {achievements.length} Unlocked
        </span>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`flex-none w-56 snap-start p-4 rounded-xl border transition-all ${
              ach.unlocked
                ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-amber-500/40 shadow-lg shadow-amber-950/20'
                : 'bg-zinc-950/50 border-zinc-800/80 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl p-2 rounded-xl bg-zinc-800/60 border border-zinc-700/60 inline-block">
                {ach.icon}
              </span>
              {ach.unlocked ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Unlocked
                </span>
              ) : (
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <h4 className="text-sm font-bold text-white mb-0.5">{ach.title}</h4>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2">
              {ach.description}
            </p>

            {ach.unlockedAt && (
              <span className="text-[10px] text-amber-400/90 font-mono font-medium">
                Achieved on {ach.unlockedAt}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
