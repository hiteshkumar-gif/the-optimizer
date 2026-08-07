'use client';

import React from 'react';
import { Student } from '@/lib/types';
import { Target, CheckCircle2, Sparkles, Award } from 'lucide-react';

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
    <div className="hardware-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#9BA3AA] flex items-center gap-2">
          <Target className="w-4 h-4 text-[#B8F2D0]" />
          OVERALL PROGRESS METER
        </h3>
        <span className="text-[11px] font-mono font-bold text-[#D8C7A1] bg-[#151A1F] px-2.5 py-1 rounded-md border border-[#D8C7A1]/20">
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
              className="stroke-[#242A30]"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Mint Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-[#B8F2D0] transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-[#F5F3EE] leading-none font-sans">
              {percentage}%
            </span>
            <span className="text-[10px] uppercase font-mono font-bold text-[#9BA3AA] mt-1">
              COMPLETED
            </span>
          </div>
        </div>

        {/* Big Number Headline */}
        <div className="flex-1 text-center sm:text-left">
          <div className="text-3xl font-black text-[#F5F3EE] tracking-tight font-sans">
            {student.daysCompleted} <span className="text-[#9BA3AA] font-normal text-xl">/ {student.totalDays}</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#B8F2D0] tracking-wider mt-1">
            DAYS COMPLETED
          </div>
          <p className="text-xs text-[#9BA3AA] mt-2 leading-relaxed font-normal">
            Every daily task builds your permanent proof of work. Keep pushing forward!
          </p>
        </div>
      </div>

      {/* 4-Cell Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[#242A30]">
        <div className="p-2.5 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#B8F2D0]/10 text-[#B8F2D0]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#9BA3AA]">Days completed</div>
            <div className="text-xs font-mono font-bold text-[#F5F3EE]">{student.daysCompleted}</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#D8C7A1]/10 text-[#D8C7A1]">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#9BA3AA]">Days remaining</div>
            <div className="text-xs font-mono font-bold text-[#F5F3EE]">{student.daysRemaining}</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#B8F2D0]/10 text-[#B8F2D0]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#9BA3AA]">Current streak</div>
            <div className="text-xs font-mono font-bold text-[#F5F3EE]">{student.currentStreak} days</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#D8C7A1]/10 text-[#D8C7A1]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#9BA3AA]">Best streak</div>
            <div className="text-xs font-mono font-bold text-[#F5F3EE]">{student.bestStreak} days</div>
          </div>
        </div>
      </div>
    </div>
  );
};
