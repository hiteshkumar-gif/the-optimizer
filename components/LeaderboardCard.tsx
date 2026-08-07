'use client';

import React from 'react';
import { LeaderboardUser, Student } from '@/lib/types';
import { Sparkles, Zap, Award } from 'lucide-react';

interface LeaderboardCardProps {
  student: Student;
  leaderboard: LeaderboardUser[];
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ student, leaderboard }) => {
  return (
    <div className="hardware-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#B8F2D0]" />
          YOUR STANDING & LEADERBOARD
        </h3>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#151A1F] border border-[#B8F2D0]/30 text-[#B8F2D0] font-bold">
          {student.topPercentage || 'Top 8%'}
        </span>
      </div>

      {/* Main Big Rank & XP display */}
      <div className="flex items-center justify-between bg-[#151A1F] p-4 rounded-xl border border-[#242A30] mb-5">
        <div>
          <div className="text-[10px] font-mono font-bold text-[#9BA3AA] uppercase tracking-wider">CURRENT RANK</div>
          <div className="text-3xl font-black text-[#F5F3EE] font-sans flex items-baseline gap-1">
            <span className="text-[#B8F2D0]">#</span>
            <span>{student.rank || 1}</span>
            <span className="text-xs font-normal text-[#9BA3AA]">/ {student.totalParticipants || 300}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono font-bold text-[#9BA3AA] uppercase tracking-wider">TOTAL EXPERIENCE</div>
          <div className="text-xl font-bold text-[#D8C7A1] flex items-center justify-end gap-1 font-mono">
            <Zap className="w-4 h-4 fill-[#D8C7A1]" />
            <span>{(student.xp || 0).toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Mini Peer Comparison List */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-[#9BA3AA] uppercase tracking-wider mb-2">
          Peer Standing Cohort
        </div>
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              user.isCurrentUser
                ? 'bg-[#151A1F] border-[#B8F2D0]/50 shadow-sm'
                : 'bg-[#080A0C] border-[#242A30] hover:bg-[#101418]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 text-center font-mono font-bold text-xs ${user.isCurrentUser ? 'text-[#B8F2D0]' : 'text-[#9BA3AA]'}`}>
                #{user.rank}
              </span>

              {/* Avatar */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#242A30]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="text-xs font-bold text-[#F5F3EE] flex items-center gap-1.5">
                  <span>{user.name}</span>
                  {user.isCurrentUser && (
                    <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-[#B8F2D0] text-[#080A0C]">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-[#9BA3AA] font-mono">{user.handle}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#B8F2D0] font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
                {user.streak}d
              </span>
              <span className="font-mono font-bold text-[#D8C7A1]">{user.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
