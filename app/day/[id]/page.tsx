'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDayTask, getSubmissionData } from '@/lib/data';
import { SubmissionForm } from '@/components/SubmissionForm';
import {
  ArrowLeft,
  Clock,
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
    <div className="w-full bg-[#080A0C] text-[#F5F3EE] min-h-screen pt-6 pb-24 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* HEADER */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#9BA3AA] hover:text-[#F5F3EE] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20">
              DAY {task.id}
            </span>
            <span className="text-xs text-[#D8C7A1] font-mono">
              {task.id} / 60
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F3EE] tracking-tight leading-tight mb-2 font-sans">
            {task.title}
          </h1>
          <p className="text-sm sm:text-base text-[#9BA3AA] font-normal">
            {task.subtitle}
          </p>
        </div>

        {/* TASK DETAILS CARD */}
        <div className="hardware-card p-5 sm:p-6">
          {/* Metadata Badges (Difficulty, Time, Skills) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl bg-[#151A1F] border border-[#242A30] mb-6 text-center">
            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#9BA3AA] uppercase tracking-wider">DIFFICULTY</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#D8C7A1] mt-0.5">{task.difficulty}</div>
            </div>

            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#9BA3AA] uppercase tracking-wider">TIME</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#F5F3EE] mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-[#B8F2D0] shrink-0" />
                <span>{task.estimatedTime}</span>
              </div>
            </div>

            <div className="p-1">
              <div className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#9BA3AA] uppercase tracking-wider">SKILLS</div>
              <div className="text-[10px] sm:text-sm font-mono font-bold text-[#B8F2D0] mt-0.5 truncate">
                {task.skills.join(' • ')}
              </div>
            </div>
          </div>

          {/* Today's Mission Checklist */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#F5F3EE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8F2D0]" />
              Today&apos;s Mission
            </h3>
            <div className="space-y-2">
              {task.mission.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#151A1F] border border-[#242A30] text-xs text-[#9BA3AA]"
                >
                  <div className="w-5 h-5 rounded-md bg-[#101418] border border-[#B8F2D0]/30 text-[#B8F2D0] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed text-[#F5F3EE] font-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EXPANDABLE LEARNING ACCORDIONS */}
        <div className="hardware-card divide-y divide-[#242A30] overflow-hidden">
          {/* Before You Start */}
          <div>
            <button
              onClick={() => toggleAccordion('before')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#F5F3EE] flex items-center justify-between hover:bg-[#151A1F] transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B8F2D0]" />
                Before You Start
              </span>
              {openAccordion === 'before' ? <ChevronUp className="w-4 h-4 text-[#9BA3AA]" /> : <ChevronDown className="w-4 h-4 text-[#9BA3AA]" />}
            </button>
            {openAccordion === 'before' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-[#9BA3AA] leading-relaxed bg-[#080A0C]/40">
                {task.beforeYouStart}
              </div>
            )}
          </div>

          {/* What You'll Learn */}
          <div>
            <button
              onClick={() => toggleAccordion('learn')}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#F5F3EE] flex items-center justify-between hover:bg-[#151A1F] transition-colors"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B8F2D0]" />
                What You&apos;ll Learn
              </span>
              {openAccordion === 'learn' ? <ChevronUp className="w-4 h-4 text-[#9BA3AA]" /> : <ChevronDown className="w-4 h-4 text-[#9BA3AA]" />}
            </button>
            {openAccordion === 'learn' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-[#9BA3AA] space-y-2 bg-[#080A0C]/40">
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
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#F5F3EE] flex items-center justify-between hover:bg-[#151A1F] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#D8C7A1]" />
                Pro Tips
              </span>
              {openAccordion === 'tips' ? <ChevronUp className="w-4 h-4 text-[#9BA3AA]" /> : <ChevronDown className="w-4 h-4 text-[#9BA3AA]" />}
            </button>
            {openAccordion === 'tips' && (
              <div className="p-4 sm:p-5 pt-0 text-xs text-[#9BA3AA] space-y-2 bg-[#080A0C]/40">
                {task.proTips.map((tip, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#151A1F] border border-[#242A30] flex items-start gap-2">
                    <span className="text-[#D8C7A1] font-bold">💡</span>
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
              className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#F5F3EE] flex items-center justify-between hover:bg-[#151A1F] transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#B8F2D0]" />
                Resources
              </span>
              {openAccordion === 'resources' ? <ChevronUp className="w-4 h-4 text-[#9BA3AA]" /> : <ChevronDown className="w-4 h-4 text-[#9BA3AA]" />}
            </button>
            {openAccordion === 'resources' && (
              <div className="p-4 sm:p-5 pt-0 text-xs space-y-2 bg-[#080A0C]/40">
                {task.resources.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#151A1F] border border-[#242A30]">
                    <span className="text-[#F5F3EE] font-medium">{res.title}</span>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#B8F2D0] px-2 py-0.5 rounded bg-[#101418]">
                      {res.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SUBMISSION FORM */}
        <SubmissionForm
          initialGithubUrl={initialSub.githubUrl}
          initialLinkedinUrl={initialSub.linkedinUrl}
        />
      </div>
    </div>
  );
}
