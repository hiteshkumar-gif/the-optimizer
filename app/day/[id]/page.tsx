'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDayTask, getSubmissionData } from '@/lib/data';
import { SubmissionForm } from '@/components/SubmissionForm';
import {
  ArrowLeft,
  Clock,
  Code2,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function DayWorkspacePage() {
  const params = useParams();
  const dayId = params?.id ? String(params.id) : '12';
  const task = getDayTask(dayId);
  const initialSub = getSubmissionData(dayId);

  const [openAccordion, setOpenAccordion] = useState<string | null>('mission');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pt-6 pb-24 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* 20. HEADER */}
        {/* ========================================================================= */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-orange-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              DAY {task.id}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {task.id} / 60
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
            {task.title}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300">
            {task.subtitle}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 21. TASK DETAILS CARD */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl">
          {/* Metadata Badges (Difficulty, Time, Skills) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 mb-6 text-center">
            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">DIFFICULTY</div>
              <div className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5">{task.difficulty}</div>
            </div>

            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">TIME</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-orange-400 shrink-0" />
                <span>{task.estimatedTime}</span>
              </div>
            </div>

            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">SKILLS</div>
              <div className="text-[10px] sm:text-sm font-mono font-bold text-cyan-400 mt-0.5 truncate">
                {task.skills.join(' • ')}
              </div>
            </div>
          </div>

          {/* Today's Mission Checklist */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Today&apos;s Mission
            </h3>
            <div className="space-y-2">
              {task.mission.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-200"
                >
                  <div className="w-5 h-5 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 22. EXPANDABLE LEARNING ACCORDIONS */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800/80 shadow-xl overflow-hidden">
          {/* Before You Start */}
          <div>
            <button
              onClick={() => toggleAccordion('before')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between hover:bg-zinc-850 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Before You Start
              </span>
              {openAccordion === 'before' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>
            {openAccordion === 'before' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-zinc-300 leading-relaxed bg-zinc-950/40">
                {task.beforeYouStart}
              </div>
            )}
          </div>

          {/* What You'll Learn */}
          <div>
            <button
              onClick={() => toggleAccordion('learn')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between hover:bg-zinc-850 transition-colors"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                What You&apos;ll Learn
              </span>
              {openAccordion === 'learn' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>
            {openAccordion === 'learn' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-zinc-300 space-y-2 bg-zinc-950/40">
                <ul className="list-disc list-inside space-y-1">
                  {task.whatYoullLearn.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pro Tips */}
          <div>
            <button
              onClick={() => toggleAccordion('tips')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between hover:bg-zinc-850 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Pro Tips
              </span>
              {openAccordion === 'tips' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>
            {openAccordion === 'tips' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-zinc-300 space-y-2 bg-zinc-950/40">
                {task.proTips.map((tip, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">💡</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources */}
          <div>
            <button
              onClick={() => toggleAccordion('resources')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between hover:bg-zinc-850 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-orange-400" />
                Resources
              </span>
              {openAccordion === 'resources' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>
            {openAccordion === 'resources' && (
              <div className="p-4 sm:p-5 pt-0 text-xs space-y-2 bg-zinc-950/40">
                {task.resources.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-200 font-medium">{res.title}</span>
                    <span className="text-[10px] uppercase font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10">
                      {res.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 23, 24, 25. SUBMISSION FORM & COMPLETION */}
        {/* ========================================================================= */}
        <SubmissionForm
          initialGithubUrl={initialSub.githubUrl}
          initialLinkedinUrl={initialSub.linkedinUrl}
        />
      </div>
    </div>
  );
}
