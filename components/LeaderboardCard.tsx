'use client';

import React from 'react';
import { LeaderboardUser, Student } from '@/lib/types';
import { TrendingUp, Flame, Zap, Award } from 'lucide-react';

interface LeaderboardCardProps {
  student: Student;
  leaderboard: LeaderboardUser[];
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ student, leaderboard }) => {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-cyan-400" />
          YOUR STANDING
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
          {student.topPercentage || 'Top 8%'}
        </span>
      </div>

      {/* Main Big Rank & XP display */}
      <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-5">
        <div>
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">CURRENT RANK</div>
          <div className="text-3xl font-black text-white font-sans flex items-baseline gap-1">
            <span className="text-cyan-400">#</span>
            <span>{student.rank || 1}</span>
            <span className="text-xs font-normal text-zinc-400">/ {student.totalParticipants || 300}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">TOTAL EXPERIENCE</div>
          <div className="text-xl font-bold text-amber-400 flex items-center justify-end gap-1 font-mono">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span>{(student.xp || 0).toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Mini Peer Comparison List (#23, You #24, #25) */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          Peer Standing Cohort
        </div>
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              user.isCurrentUser
                ? 'bg-gradient-to-r from-orange-500/20 via-zinc-900 to-zinc-900 border-orange-500/50 shadow-md ring-1 ring-orange-500/30'
                : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-950'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 text-center font-bold text-sm ${user.isCurrentUser ? 'text-orange-400' : 'text-zinc-400'}`}>
                #{user.rank}
              </span>

              {/* Avatar */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{user.name}</span>
                  {user.isCurrentUser && (
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-orange-500 text-zinc-950">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">{user.handle}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-orange-400 font-medium">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                {user.streak}d
              </span>
              <span className="font-mono font-bold text-zinc-300">{user.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
