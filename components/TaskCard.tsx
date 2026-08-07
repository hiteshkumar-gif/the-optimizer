'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Code2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { DayTask } from '@/lib/types';

interface TaskCardProps {
  task: DayTask;
  isCompleted?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isCompleted = false }) => {
  return (
    <div className="hardware-card p-5 sm:p-6 hover:border-[#B8F2D0]/40 transition-all group">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#B8F2D0]" />
          TODAY&apos;S CHALLENGE
        </span>
        <span className="text-xs font-mono font-bold text-[#D8C7A1] px-2.5 py-0.5 rounded bg-[#151A1F] border border-[#242A30]">
          Day {task.id}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F3EE] tracking-tight mb-1 group-hover:text-[#B8F2D0] transition-colors">
        {task.title}
      </h3>
      <p className="text-xs sm:text-sm text-[#9BA3AA] mb-4 line-clamp-2 leading-relaxed font-normal">
        {task.subtitle}
      </p>

      {/* Meta Specs */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-[#9BA3AA] mb-5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#151A1F] border border-[#242A30] text-[#9BA3AA]">
          <Clock className="w-3.5 h-3.5 text-[#D8C7A1]" />
          <span className="font-mono text-[11px]">{task.estimatedTime} estimated</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#151A1F] border border-[#242A30]">
          <Code2 className="w-3.5 h-3.5 text-[#B8F2D0]" />
          <span className="font-mono text-[11px] text-[#F5F3EE]">{task.skills.join(' • ')}</span>
        </div>
      </div>

      {/* Progress Bar / Completed Badge */}
      <div className="mb-5 pt-3 border-t border-[#242A30]">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#9BA3AA] font-mono text-[11px]">Status</span>
          <span className={`font-mono text-[11px] font-bold ${isCompleted ? 'text-[#B8F2D0]' : 'text-[#D8C7A1]'}`}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <div className="w-full h-2 bg-[#080A0C] rounded-full overflow-hidden border border-[#242A30]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? 'bg-[#B8F2D0]'
                : 'bg-[#B8F2D0]/60'
            }`}
            style={{ width: isCompleted ? '100%' : '50%' }}
          />
        </div>
      </div>

      {/* Primary Action Button */}
      <Link
        href={`/day/${task.id}`}
        className={`w-full py-3 px-4 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
          isCompleted
            ? 'bg-[#151A1F] hover:bg-[#242A30] text-[#B8F2D0] border border-[#B8F2D0]/30'
            : 'bg-[#F5F3EE] text-[#080A0C] hover:bg-[#B8F2D0] hover:-translate-y-0.5'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-[#B8F2D0]" />
            <span>Review Day {task.id} Task</span>
          </>
        ) : (
          <>
            <span>Continue Challenge →</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Link>
    </div>
  );
};
