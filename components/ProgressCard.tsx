'use client';

import React from 'react';
import { Student } from '@/lib/types';
import { Target, CheckCircle2, Flame, Award } from 'lucide-react';

interface ProgressCardProps {
  student: Student;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ student }) => {
  const totalDays = student.totalDays || 60;
  const daysCompleted = student.daysCompleted || 0;
  const percentage = Math.min(100, Math.round((daysCompleted / totalDays) * 100)) || 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-orange-500" />
          OVERALL PROGRESS
        </h3>
        <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
          60-DAY JOURNEY
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        {/* SVG Circular Progress Meter */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-orange-500 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-white leading-none font-sans">
              {percentage}%
            </span>
            <span className="text-[10px] uppercase font-bold text-zinc-400 mt-0.5">
              DONE
            </span>
          </div>
        </div>

        {/* Big Number Headline */}
        <div className="flex-1 text-center sm:text-left">
          <div className="text-3xl font-black text-white tracking-tight font-sans">
            {student.daysCompleted} <span className="text-zinc-500 font-medium text-xl">/ {student.totalDays}</span>
          </div>
          <div className="text-xs uppercase font-bold text-orange-400 tracking-wider mt-0.5">
            DAYS COMPLETED
          </div>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Every daily task builds your permanent proof of work. Keep pushing forward!
          </p>
        </div>
      </div>

      {/* 4-Cell Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-zinc-800/80">
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Days completed</div>
            <div className="text-sm font-bold text-white">{student.daysCompleted}</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Days remaining</div>
            <div className="text-sm font-bold text-white">{student.daysRemaining}</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Current streak</div>
            <div className="text-sm font-bold text-white">{student.currentStreak} days</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">Best streak</div>
            <div className="text-sm font-bold text-white">{student.bestStreak} days</div>
          </div>
        </div>
      </div>
    </div>
  );
};
