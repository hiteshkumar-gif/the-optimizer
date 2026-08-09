'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { StreakDay } from '@/lib/types';

interface ActivityChartProps {
  week: StreakDay[];
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ week }) => {
  const [activeHover, setActiveHover] = useState<StreakDay | null>(null);

  const completedInWeek = week.filter((item) => String(item.status).toLowerCase() === 'completed').length;

  return (
    <div className="hardware-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#B8F2D0]" />
          WEEKLY ACTIVITY LEDGER
        </h3>
        <span className="text-[11px] text-[#B8F2D0] font-mono font-bold">
          {completedInWeek}/7 Tasks Shipped This Week
        </span>
      </div>

      {/* 7 Day Visual Pillar Grid */}
      <div className="grid grid-cols-7 gap-2 bg-[#151A1F] p-4 rounded-xl border border-[#242A30] mb-3">
        {week.map((item, idx) => {
          const statusLower = String(item.status || '').toLowerCase();
          const isDone = statusLower === 'completed';
          const isToday = statusLower === 'today';

          const labelDay = 'dayName' in item ? (item as any).dayName : item.day;

          return (
            <div
              key={labelDay || idx}
              onMouseEnter={() => setActiveHover(item)}
              onMouseLeave={() => setActiveHover(null)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              {/* Activity Bar Pillar */}
              <div className="relative w-full h-24 bg-[#080A0C] rounded-lg flex items-end justify-center p-1 border border-[#242A30] group-hover:border-[#B8F2D0]/50 transition-colors">
                <div
                  className={`w-full rounded-md transition-all duration-500 ${
                    isDone
                      ? 'h-full bg-[#B8F2D0]'
                      : isToday
                      ? 'h-1/2 bg-[#D8C7A1] animate-pulse'
                      : 'h-1 bg-[#242A30]'
                  }`}
                />
              </div>

              {/* Day Label */}
              <span className="text-[10px] font-mono font-bold text-[#9BA3AA] uppercase tracking-wider group-hover:text-[#F5F3EE] transition-colors">
                {labelDay}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Hover Tooltip Banner */}
      <div className="min-h-[32px] px-3 py-1.5 rounded-lg bg-[#151A1F] border border-[#242A30] text-xs font-mono flex items-center justify-between text-[#9BA3AA]">
        {activeHover ? (
          <>
            <span className="flex items-center gap-1.5 text-[#F5F3EE]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B8F2D0]" />
              <strong>{'dayName' in activeHover ? (activeHover as any).dayName : activeHover.day} ({activeHover.shortDate})</strong>: {String(activeHover.status).toLowerCase() === 'completed' ? 'Coding Challenge Completed + GitHub Proof Verified' : 'Today\'s Task Pending'}
            </span>
            <span className="text-[#B8F2D0] font-bold">+100 XP</span>
          </>
        ) : (
          <span className="text-[#9BA3AA]/60 italic">Hover over any day pillar to view detailed submission proof stats.</span>
        )}
      </div>
    </div>
  );
};
