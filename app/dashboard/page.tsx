'use client';

import React, { useState } from 'react';
import { getMockData, getStudentData } from '@/lib/data';
import { StreakCard } from '@/components/StreakCard';
import { TaskCard } from '@/components/TaskCard';
import { ProgressCard } from '@/components/ProgressCard';
import { AchievementSection } from '@/components/AchievementCard';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { ActivityChart } from '@/components/ActivityChart';
import { StreakShieldModal } from '@/components/StreakShieldModal';
import { EdgeCaseSwitcher, EdgeCaseMode } from '@/components/EdgeCaseSwitcher';
import { AlertCircle, Flame, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const mockData = getMockData();
  const [edgeMode, setEdgeMode] = useState<EdgeCaseMode>('normal');
  const [isShieldOpen, setIsShieldOpen] = useState(false);
  const [isShieldProtected, setIsShieldProtected] = useState(false);

  // Dynamic student data based on judge edge case selection
  const student = getStudentData(edgeMode === 'normal' ? undefined : edgeMode);
  const todayTask = mockData.days['12'];

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pt-6 pb-24 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* 12. DASHBOARD GREETING HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Good morning, {student.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
              Day {student.daysCompleted} of your 60-day coding journey
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
              Cohort 2026
            </span>
          </div>
        </div>

        {/* Edge Case Banners if active */}
        {edgeMode === 'new' && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
            <div>
              <strong className="block font-bold text-amber-200">0 DAY STREAK (NEW USER)</strong>
              You haven&apos;t started yet. Complete Day 1 to begin your streak.
            </div>
          </div>
        )}

        {edgeMode === 'missed' && (
          <div className="p-4 rounded-xl bg-orange-500/15 border border-orange-500/40 text-orange-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 shrink-0 text-orange-400 animate-bounce" />
              <div>
                <strong className="block font-bold text-orange-200">STREAK PAUSED</strong>
                You missed yesterday. Don&apos;t worry — your journey isn&apos;t over. Restart today or use Streak Shield!
              </div>
            </div>
            <button
              onClick={() => setIsShieldOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-zinc-950 font-bold text-xs shrink-0 hover:bg-orange-400 transition-colors"
            >
              Protect Streak
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN DASHBOARD GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Streak Hero & Today's Task) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 13. STREAK HERO CARD */}
            <StreakCard
              student={student}
              weekStreak={mockData.streak.week}
              onOpenShield={() => setIsShieldOpen(true)}
              isShieldProtected={isShieldProtected}
            />

            {/* 14. TODAY'S TASK CARD */}
            <TaskCard task={todayTask} />

            {/* 18. WEEKLY ACTIVITY CHART */}
            <ActivityChart week={mockData.streak.week} />
          </div>

          {/* Right Column (Overall Progress, Standing, Achievements) */}
          <div className="space-y-6">
            {/* 15. OVERALL PROGRESS */}
            <ProgressCard student={student} />

            {/* 17. STUDENT STANDING */}
            <LeaderboardCard student={student} leaderboard={mockData.leaderboard} />

            {/* 16. ACHIEVEMENTS */}
            <AchievementSection achievements={mockData.achievements} />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 19. STREAK SHIELD MODAL */}
      {/* ========================================================================= */}
      <StreakShieldModal
        isOpen={isShieldOpen}
        onClose={() => setIsShieldOpen(false)}
        task={mockData.streakShieldTask}
        onShieldActivated={() => setIsShieldProtected(true)}
      />

      {/* EDGE CASE JUDGE SWITCHER */}
      <EdgeCaseSwitcher currentMode={edgeMode} onModeChange={setEdgeMode} />
    </div>
  );
}
