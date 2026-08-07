'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Code2,
  Github,
  Linkedin,
  CheckCircle2,
  Trophy,
  Sparkles,
  Zap,
  Star,
  Terminal,
  Layers,
  BarChart3,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-zinc-950 text-white overflow-hidden">
      {/* ========================================================================= */}
      {/* 6. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-glow">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse-flame" />
          <span>60-DAY DEVELOPER CHALLENGE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.08] font-sans">
          Stop Planning.{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Start Shipping.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-6 font-normal leading-relaxed">
          Build your developer streak one day at a time. Complete daily coding challenges, publish your proof of work to GitHub & LinkedIn, and become the developer recruiters hire.
        </p>

        {/* 4 Core Pillars Badge Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-zinc-400 max-w-xl mx-auto mb-8">
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">⚡ 60 Days</span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">💻 Daily Tasks</span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">🐙 GitHub Commit</span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">💼 LinkedIn Proof</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto py-4 px-8 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-extrabold text-base shadow-xl shadow-orange-950/60 transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span>Start the Challenge</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto py-4 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            See How It Works
          </a>
        </div>

        {/* Visual representation: Day 1 → Day 12 → Day 30 → Day 60 */}
        <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-4 px-2">
            <span>STREAK EVOLUTION</span>
            <span className="text-orange-400 font-mono">60 DAYS • PUBLIC PROOF</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-emerald-500/30 text-center">
              <span className="text-xs uppercase font-extrabold text-emerald-400 block mb-1">Day 01</span>
              <span className="text-lg sm:text-2xl font-black text-white block">START</span>
              <span className="text-[10px] text-zinc-400 font-mono">Commit ✓</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-orange-500/20 border border-orange-500/60 text-center shadow-lg shadow-orange-950/40 ring-1 ring-orange-500/50">
              <span className="text-xs uppercase font-extrabold text-orange-400 block mb-1">Day 12</span>
              <span className="text-lg sm:text-2xl font-black text-white block">MOMENTUM</span>
              <span className="text-[10px] text-orange-300 font-mono font-bold">Streak 🔥</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-amber-500/30 text-center opacity-80">
              <span className="text-xs uppercase font-extrabold text-amber-400 block mb-1">Day 30</span>
              <span className="text-lg sm:text-2xl font-black text-white block">HALFWAY</span>
              <span className="text-[10px] text-zinc-400 font-mono">Milestone 🚀</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-cyan-500/30 text-center opacity-60">
              <span className="text-xs uppercase font-extrabold text-cyan-400 block mb-1">Day 60</span>
              <span className="text-lg sm:text-2xl font-black text-white block">FINISH</span>
              <span className="text-[10px] text-zinc-400 font-mono">Trophy 🏆</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRUST / SOCIAL PROOF */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 bg-zinc-900/50 border-y border-zinc-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-orange-400 mb-1 font-sans">10K+</div>
              <div className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Students</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1 font-sans">60</div>
              <div className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Days</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1 font-sans">1M+</div>
              <div className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Lines of Code</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1 font-sans">95%</div>
              <div className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Completion Motivation</div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center relative">
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl text-zinc-200 font-medium italic mb-4 leading-relaxed">
              &ldquo;The hardest part wasn&apos;t coding. It was showing up every day. ABTalks turned my sporadic effort into a non-negotiable daily streak.&rdquo;
            </blockquote>
            <div className="text-xs font-bold text-orange-400">Rohan Mehta — Tier-1 Engineering Student</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HOW IT WORKS */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20">
            SIMPLE 3-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            How ABTalks Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xl font-black mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
              Pick Your Challenge
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Choose your targeted learning track from Fullstack Web, Mobile App Dev, or Data Structures & Algorithms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl font-black mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              Ship Every Day
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Complete your structured daily coding task in 30 to 45 minutes with clear specifications and resources.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl font-black mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Prove Your Progress
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Submit your GitHub repository commit + LinkedIn update to keep your fire streak alive and unlock badges.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. 60 DAY JOURNEY TIMELINE */}
      {/* ========================================================================= */}
      <section id="journey" className="py-20 px-4 sm:px-6 bg-zinc-900/40 border-y border-zinc-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              MILESTONE ROADMAP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              The 60-Day Transformation
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Consistency becomes effortless as your streak momentum grows.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:w-0.5 before:bg-zinc-800">
            {/* Node 1 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-extrabold text-orange-400 font-mono uppercase">DAY 01</span>
                <h4 className="text-lg font-bold text-white">START YOUR JOURNEY</h4>
                <p className="text-xs text-zinc-400">Set up your local environment & ship your first commit.</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-zinc-950 flex items-center justify-center text-zinc-950 text-xs font-black" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>

            {/* Node 12 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 hidden sm:block" />
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-zinc-950 flex items-center justify-center text-zinc-950 text-xs font-black animate-pulse" />
              <div className="sm:w-1/2 sm:pl-8 text-left">
                <span className="text-xs font-extrabold text-orange-400 font-mono uppercase">DAY 12 (YOU ARE HERE)</span>
                <h4 className="text-lg font-bold text-white">BUILD MOMENTUM</h4>
                <p className="text-xs text-zinc-400">Coding daily is now becoming a permanent muscle memory.</p>
              </div>
            </div>

            {/* Node 30 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-extrabold text-amber-400 font-mono uppercase">DAY 30 (HALFWAY)</span>
                <h4 className="text-lg font-bold text-white">HALFWAY MILESTONE 🚀</h4>
                <p className="text-xs text-zinc-400">30 complete projects shipped to GitHub. Halfway to mastery!</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 border-4 border-zinc-950 flex items-center justify-center text-zinc-950 text-xs font-black shadow-glow" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>

            {/* Node 45 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 hidden sm:block" />
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border-4 border-zinc-950 flex items-center justify-center text-zinc-950 text-xs font-black" />
              <div className="sm:w-1/2 sm:pl-8 text-left">
                <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase">DAY 45</span>
                <h4 className="text-lg font-bold text-white">UNSTOPPABLE STREAK</h4>
                <p className="text-xs text-zinc-400">Advanced fullstack architectures & production APIs.</p>
              </div>
            </div>

            {/* Node 60 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-14 sm:pl-0">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-extrabold text-emerald-400 font-mono uppercase">DAY 60</span>
                <h4 className="text-lg font-bold text-white">FINISH STRONG 🏆</h4>
                <p className="text-xs text-zinc-400">Graduate as a top 5% verified consistent developer.</p>
              </div>
              <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-7 h-7 rounded-full bg-emerald-400 border-4 border-zinc-950 flex items-center justify-center text-zinc-950 text-xs font-black shadow-glow-emerald" />
              <div className="sm:w-1/2 sm:pl-8 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. MOTIVATION SECTION — MOCK GITHUB GRID */}
      {/* ========================================================================= */}
      <section id="proof" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
          PROOF OF WORK
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-4">
          Your future GitHub profile starts today.
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-10">
          Transform empty grid blocks into a dense green wall of daily commits that recruiters love.
        </p>

        {/* Heat Map Grid */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-mono">
            <span>60 Days Activity Graph</span>
            <span className="text-emerald-400 font-bold">120 Total Commits</span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
            {[...Array(60)].map((_, i) => {
              const isCompleted = i < 12;
              const isToday = i === 11;
              return (
                <div
                  key={i}
                  className={`h-6 sm:h-8 rounded transition-all flex items-center justify-center text-[10px] font-bold ${
                    isToday
                      ? 'bg-orange-500 text-zinc-950 shadow-glow animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-700'
                  }`}
                  title={`Day ${i + 1}`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL CTA & FOOTER */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-zinc-800/80 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            60 days from now, you&apos;ll wish you started today.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300">
            Join thousands of college developers building consistency, shipping daily projects, and standing out.
          </p>

          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-extrabold text-base shadow-2xl shadow-orange-950/60 transition-all active:scale-95"
            >
              <span>Start My 60-Day Journey →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-zinc-800/80 text-xs text-zinc-400 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-zinc-950 font-black">
              <Flame className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            </div>
            <span className="font-bold text-white">ABTalks</span>
            <span className="text-zinc-500">— 60-Day Coding Challenge</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/day/12" className="hover:text-white transition-colors">Challenge</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
