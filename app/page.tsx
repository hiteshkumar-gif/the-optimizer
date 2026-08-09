'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Github,
  Linkedin,
  Sparkles,
  Star,
} from 'lucide-react';
import { DemoLoginModal } from '@/components/DemoLoginModal';
import { useAuth } from '@/lib/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { user, userProfile, currentDayNumber, submissions } = useAuth();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const activeDayNum = userProfile ? currentDayNumber : 0;
  const completedCount = Object.values(submissions || {}).filter(
    (s) => s.status === 'completed' || (s.githubSubmitted && s.linkedinSubmitted)
  ).length;
  const totalCommits = completedCount * 10;

  const handleStartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsOnboardingOpen(true);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full bg-[#080A0C] text-[#F5F3EE] overflow-hidden">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        {/* Subtle Atmospheric Background Radial Overlay */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8F2D0]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Small Mint Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101418] border border-[#B8F2D0]/25 text-[#B8F2D0] text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
          <span>60-DAY DEVELOPER CHALLENGE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F5F3EE] mb-6 max-w-4xl mx-auto leading-[1.08] font-sans">
          Stop Planning.{' '}
          <span className="text-[#B8F2D0]">
            Start Shipping.
          </span>
        </h1>

        {/* Thin Champagne Divider */}
        <div className="w-16 h-0.5 bg-[#D8C7A1]/30 mx-auto mb-6" />

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[#9BA3AA] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Build your developer streak one day at a time. Complete daily coding challenges, publish your proof of work to GitHub & LinkedIn, and become the developer recruiters hire.
        </p>

        {/* 4 Core Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-[#9BA3AA] max-w-xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#F5F3EE]">⚡ 60 Days</span>
          <span className="px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#F5F3EE]">💻 Daily Tasks</span>
          <span className="px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#F5F3EE]">🐙 GitHub Commit</span>
          <span className="px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#F5F3EE]">💼 LinkedIn Proof</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={handleStartClick}
            className="w-full sm:w-auto py-4 px-8 rounded-xl bg-[#F5F3EE] hover:bg-[#B8F2D0] text-[#080A0C] font-bold text-sm tracking-wide uppercase font-mono shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span>Start the Challenge</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#080A0C]" />
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto py-4 px-8 rounded-xl bg-[#101418] hover:bg-[#151A1F] border border-[#242A30] text-[#F5F3EE] font-mono text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            Framework Details
          </a>
        </div>

        {/* Signature Momentum Trajectory Visual: 01 → 12 → 30 → 60 */}
        <div className="max-w-3xl mx-auto p-5 sm:p-6 hardware-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#9BA3AA] uppercase tracking-wider mb-5 px-1">
            <span>MOMENTUM TRAJECTORY</span>
            <span className="text-[#B8F2D0]">60 DAYS • PUBLIC PROOF</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 relative z-10">
            <div className="p-2 sm:p-4 rounded-xl bg-[#151A1F] border border-[#242A30] text-center">
              <span className="text-[9px] sm:text-[11px] uppercase font-mono font-bold text-[#9BA3AA] block mb-0.5">Day 01</span>
              <span className="text-xs sm:text-xl font-black text-[#F5F3EE] block font-mono">START</span>
              <span className="text-[9px] sm:text-[10px] text-[#B8F2D0] font-mono block truncate">Commit ✓</span>
            </div>

            <div className="p-2 sm:p-4 rounded-xl bg-[#151A1F] border border-[#B8F2D0]/50 text-center shadow-sm">
              <span className="text-[9px] sm:text-[11px] uppercase font-mono font-bold text-[#B8F2D0] block mb-0.5">Day 12</span>
              <span className="text-xs sm:text-xl font-black text-[#F5F3EE] block font-mono">ACTIVE</span>
              <span className="text-[9px] sm:text-[10px] text-[#B8F2D0] font-mono font-bold block truncate">12d Streak ⚡</span>
            </div>

            <div className="p-2 sm:p-4 rounded-xl bg-[#151A1F] border border-[#D8C7A1]/30 text-center">
              <span className="text-[9px] sm:text-[11px] uppercase font-mono font-bold text-[#D8C7A1] block mb-0.5">Day 30</span>
              <span className="text-xs sm:text-xl font-black text-[#F5F3EE] block font-mono">HALFWAY</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8C7A1] font-mono block truncate">30 Days 🚀</span>
            </div>

            <div className="p-2 sm:p-4 rounded-xl bg-[#151A1F] border border-[#242A30] text-center opacity-70">
              <span className="text-[9px] sm:text-[11px] uppercase font-mono font-bold text-[#9BA3AA] block mb-0.5">Day 60</span>
              <span className="text-xs sm:text-xl font-black text-[#F5F3EE] block font-mono">FINISH</span>
              <span className="text-[9px] sm:text-[10px] text-[#9BA3AA] font-mono block truncate">Mastery 🏆</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUST / SOCIAL PROOF STATS */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 bg-[#101418]/60 border-y border-[#242A30]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="hardware-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#F5F3EE] mb-1 font-sans">10K+</div>
              <div className="text-xs uppercase font-mono font-bold text-[#9BA3AA] tracking-wider">Students</div>
            </div>

            <div className="hardware-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#B8F2D0] mb-1 font-sans">60</div>
              <div className="text-xs uppercase font-mono font-bold text-[#9BA3AA] tracking-wider">Days</div>
            </div>

            <div className="hardware-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#D8C7A1] mb-1 font-sans">1M+</div>
              <div className="text-xs uppercase font-mono font-bold text-[#9BA3AA] tracking-wider">Lines of Code</div>
            </div>

            <div className="hardware-card p-5 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#F5F3EE] mb-1 font-sans">95%</div>
              <div className="text-xs uppercase font-mono font-bold text-[#9BA3AA] tracking-wider">Consistency</div>
            </div>
          </div>

          {/* Editorial Testimonial Quote */}
          <div className="max-w-2xl mx-auto hardware-card p-6 sm:p-8 text-center relative">
            <div className="flex justify-center gap-1 text-[#D8C7A1] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D8C7A1]" />
              ))}
            </div>
            <blockquote className="text-base sm:text-lg text-[#F5F3EE] font-normal italic mb-4 leading-relaxed">
              &ldquo;The hardest part wasn&apos;t coding. It was showing up every day. ABTalks turned my sporadic effort into a non-negotiable daily streak.&rdquo;
            </blockquote>
            <div className="text-xs font-mono font-bold text-[#B8F2D0]">Rohan Mehta — Tier-1 Engineering Student</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HOW IT WORKS */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8F2D0] px-3 py-1 rounded bg-[#101418] border border-[#B8F2D0]/20">
            SIMPLE 3-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight mt-4">
            How ABTalks Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="hardware-card p-6 relative hover:border-[#B8F2D0]/40 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-[#151A1F] border border-[#242A30] text-[#B8F2D0] flex items-center justify-center text-sm font-mono font-bold mb-6">
              01
            </div>
            <h3 className="text-lg font-bold text-[#F5F3EE] mb-2 group-hover:text-[#B8F2D0] transition-colors">
              Pick Your Challenge
            </h3>
            <p className="text-xs text-[#9BA3AA] leading-relaxed">
              Choose your targeted learning track from Fullstack Web, Mobile App Dev, or Data Structures & Algorithms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="hardware-card p-6 relative hover:border-[#D8C7A1]/40 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-[#151A1F] border border-[#242A30] text-[#D8C7A1] flex items-center justify-center text-sm font-mono font-bold mb-6">
              02
            </div>
            <h3 className="text-lg font-bold text-[#F5F3EE] mb-2 group-hover:text-[#D8C7A1] transition-colors">
              Ship Every Day
            </h3>
            <p className="text-xs text-[#9BA3AA] leading-relaxed">
              Complete your structured daily coding task in 30 to 45 minutes with clear specifications and resources.
            </p>
          </div>

          {/* Step 3 */}
          <div className="hardware-card p-6 relative hover:border-[#B8F2D0]/40 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-[#151A1F] border border-[#242A30] text-[#B8F2D0] flex items-center justify-center text-sm font-mono font-bold mb-6">
              03
            </div>
            <h3 className="text-lg font-bold text-[#F5F3EE] mb-2 group-hover:text-[#B8F2D0] transition-colors">
              Prove Your Progress
            </h3>
            <p className="text-xs text-[#9BA3AA] leading-relaxed">
              Submit your GitHub repository commit + LinkedIn update to keep your streak momentum alive and unlock badges.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 60 DAY JOURNEY TIMELINE */}
      {/* ========================================================================= */}
      <section id="journey" className="py-20 px-4 sm:px-6 bg-[#101418]/40 border-y border-[#242A30]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D8C7A1] px-3 py-1 rounded bg-[#101418] border border-[#D8C7A1]/20">
              MILESTONE ROADMAP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight mt-4">
              The 60-Day Transformation
            </h2>
            <p className="text-xs text-[#9BA3AA] mt-2">
              Consistency becomes effortless as your streak momentum grows.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:w-0.5 before:bg-[#242A30]">
            {/* Node 1 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-mono font-bold text-[#B8F2D0] uppercase">DAY 01</span>
                <h4 className="text-base font-bold text-[#F5F3EE]">START YOUR JOURNEY</h4>
                <p className="text-xs text-[#9BA3AA]">Set up your local environment & ship your first commit.</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-[#B8F2D0] border-4 border-[#080A0C]" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>

            {/* Node 12 / Active Day */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 hidden sm:block" />
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-[#B8F2D0] border-4 border-[#080A0C] animate-pulse" />
              <div className="sm:w-1/2 sm:pl-8 text-left">
                <span className="text-xs font-mono font-bold text-[#B8F2D0] uppercase">
                  DAY {activeDayNum > 0 ? activeDayNum : 1} (YOU ARE HERE)
                </span>
                <h4 className="text-base font-bold text-[#F5F3EE]">BUILD MOMENTUM</h4>
                <p className="text-xs text-[#9BA3AA]">Coding daily is now becoming a permanent muscle memory.</p>
              </div>
            </div>

            {/* Node 30 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-mono font-bold text-[#D8C7A1] uppercase">DAY 30 (HALFWAY)</span>
                <h4 className="text-base font-bold text-[#F5F3EE]">HALFWAY MILESTONE 🚀</h4>
                <p className="text-xs text-[#9BA3AA]">30 complete projects shipped to GitHub. Halfway to mastery!</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 rounded-full bg-[#D8C7A1] border-4 border-[#080A0C]" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>

            {/* Node 45 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 hidden sm:block" />
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-[#B8F2D0] border-4 border-[#080A0C]" />
              <div className="sm:w-1/2 sm:pl-8 text-left">
                <span className="text-xs font-mono font-bold text-[#B8F2D0] uppercase">DAY 45</span>
                <h4 className="text-base font-bold text-[#F5F3EE]">UNSTOPPABLE STREAK</h4>
                <p className="text-xs text-[#9BA3AA]">Advanced fullstack architectures & production APIs.</p>
              </div>
            </div>

            {/* Node 60 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-mono font-bold text-[#D8C7A1] uppercase">DAY 60</span>
                <h4 className="text-base font-bold text-[#F5F3EE]">FINISH STRONG 🏆</h4>
                <p className="text-xs text-[#9BA3AA]">Graduate as a top 5% verified consistent developer.</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 rounded-full bg-[#D8C7A1] border-4 border-[#080A0C]" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROOF OF WORK — HEATMAP */}
      {/* ========================================================================= */}
      <section id="proof" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8F2D0] px-3 py-1 rounded bg-[#101418] border border-[#B8F2D0]/20">
          PROOF OF WORK
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight mt-4 mb-4">
          Your future GitHub profile starts today.
        </h2>
        <p className="text-xs text-[#9BA3AA] max-w-xl mx-auto mb-10">
          Transform empty grid blocks into a dense wall of daily commits that recruiters love.
        </p>

        {/* Heat Map Grid */}
        <div className="hardware-card p-6">
          <div className="flex items-center justify-between text-xs text-[#9BA3AA] mb-4 font-mono">
            <span>60 Days Activity Graph</span>
            <span className="text-[#B8F2D0] font-bold">{totalCommits} Total Commits</span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
            {[...Array(60)].map((_, i) => {
              const dayNum = i + 1;
              const sub = submissions[String(dayNum)];
              const isCompleted = Boolean(sub?.status === 'completed' || (sub?.githubSubmitted && sub?.linkedinSubmitted));
              const isToday = activeDayNum > 0 && dayNum === activeDayNum;

              return (
                <div
                  key={i}
                  className={`h-6 sm:h-8 rounded transition-all flex items-center justify-center text-[10px] font-mono font-bold ${
                    isCompleted
                      ? 'bg-[#B8F2D0] text-[#080A0C]'
                      : isToday
                      ? 'bg-[#151A1F] border border-[#B8F2D0] text-[#B8F2D0] animate-pulse'
                      : 'bg-[#151A1F] border border-[#242A30] text-[#9BA3AA]/40'
                  }`}
                  title={`Day ${dayNum}${isCompleted ? ' — Completed' : isToday ? ' — Today' : ' — Pending'}`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CTA & FOOTER */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 bg-[#101418] border-t border-[#242A30] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F3EE] tracking-tight leading-tight">
            60 days from now, you&apos;ll wish you started today.
          </h2>
          <p className="text-xs sm:text-sm text-[#9BA3AA]">
            Join thousands of college developers building consistency, shipping daily projects, and standing out.
          </p>

          <div>
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-[#F5F3EE] hover:bg-[#B8F2D0] text-[#080A0C] font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
            >
              <span>Start My 60-Day Journey →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-[#242A30] text-xs text-[#9BA3AA] bg-[#080A0C]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#151A1F] border border-[#242A30] flex items-center justify-center text-[#B8F2D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
            </div>
            <span className="font-bold text-[#F5F3EE]">ABTalks</span>
            <span className="text-[#9BA3AA]">— 60-Day Coding Challenge</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <Link href="/" className="hover:text-[#F5F3EE] transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-[#F5F3EE] transition-colors">Dashboard</Link>
            <Link href="/day/12" className="hover:text-[#F5F3EE] transition-colors">Workspace</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F3EE] transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F3EE] transition-colors flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Absolute bottom subtle credit */}
        <div className="mt-8 pt-6 border-t border-[#242A30] text-center">
          <p className="text-[11px] font-medium tracking-wide text-[#9BA3AA]">
            Voted by <span className="text-[#D8C7A1] font-semibold">Hitesh Kumar</span>
          </p>
        </div>
      </footer>

      {/* Demo Onboarding Modal */}
      <DemoLoginModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onLoginSuccess={() => router.push('/dashboard')}
      />
    </div>
  );
}
