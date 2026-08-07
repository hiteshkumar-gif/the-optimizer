'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { StreakDay } from '@/lib/types';

interface ActivityChartProps {
  week: StreakDay[];
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ week }) => {
  const [activeHover, setActiveHover] = useState<StreakDay | null>(null);

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-400" />
          WEEKLY ACTIVITY
        </h3>
        <span className="text-xs text-zinc-400 font-mono">
          6/7 Tasks Shipped This Week
        </span>
      </div>

      {/* 7 Day Visual Dot Column Activity */}
      <div className="grid grid-cols-7 gap-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 mb-3">
        {week.map((item) => {
          const isDone = item.status === 'completed';
          const isToday = item.status === 'today';

          return (
            <div
              key={item.day}
              onMouseEnter={() => setActiveHover(item)}
              onMouseLeave={() => setActiveHover(null)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              {/* Activity Bar Pillar */}
              <div className="relative w-full h-24 bg-zinc-900 rounded-lg flex items-end justify-center p-1 border border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${
                    isDone
                      ? 'h-full bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-glow-emerald'
                      : isToday
                      ? 'h-1/2 bg-gradient-to-t from-orange-600 to-amber-400 animate-pulse'
                      : 'h-1 bg-zinc-800'
                  }`}
                />
              </div>

              {/* Day Label */}
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Hover Tooltip Banner */}
      <div className="min-h-[32px] px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs flex items-center justify-between text-zinc-400">
        {activeHover ? (
          <>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <strong>{activeHover.day} ({activeHover.shortDate})</strong>: {activeHover.status === 'completed' ? 'Coding Challenge Completed + GitHub Proof Verified' : 'Today\'s Task Pending'}
            </span>
            <span className="text-emerald-400 font-mono font-semibold">+100 XP</span>
          </>
        ) : (
          <span className="text-zinc-500 italic">Hover over any day pillar to view detailed submission proof stats.</span>
        )}
      </div>
    </div>
  );
};
