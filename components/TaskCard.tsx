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
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl hover:border-orange-500/40 transition-all group">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-orange-400" />
          TODAY&apos;S CHALLENGE
        </span>
        <span className="text-xs font-bold text-zinc-400 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
          Day {task.id}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-orange-400 transition-colors">
        {task.title}
      </h3>
      <p className="text-xs sm:text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
        {task.subtitle}
      </p>

      {/* Meta Specs (Time & Skills) */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 mb-5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{task.estimatedTime} estimated</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px]">{task.skills.join(' • ')}</span>
        </div>
      </div>

      {/* Progress Bar / Completed Badge */}
      <div className="mb-5 pt-3 border-t border-zinc-800/60">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-zinc-400 font-medium">Status</span>
          <span className={`font-semibold ${isCompleted ? 'text-emerald-400' : 'text-orange-400'}`}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? 'bg-emerald-500 shadow-glow-emerald'
                : 'bg-gradient-to-r from-orange-500 to-amber-400 w-1/2'
            }`}
            style={{ width: isCompleted ? '100%' : '50%' }}
          />
        </div>
      </div>

      {/* Primary Action Button */}
      <Link
        href={`/day/${task.id}`}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
          isCompleted
            ? 'bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-emerald-500/30'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 shadow-orange-950/40'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
