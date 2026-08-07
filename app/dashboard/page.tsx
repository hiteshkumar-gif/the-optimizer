'use client';

import React, { useState, useEffect } from 'react';
import { getMockData, getStudentData } from '@/lib/data';
import { StreakCard } from '@/components/StreakCard';
import { TaskCard } from '@/components/TaskCard';
import { ProgressCard } from '@/components/ProgressCard';
import { AchievementSection } from '@/components/AchievementCard';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { ActivityChart } from '@/components/ActivityChart';
import { StreakShieldModal } from '@/components/StreakShieldModal';
import { DemoLoginModal } from '@/components/DemoLoginModal';
import { EdgeCaseSwitcher, EdgeCaseMode } from '@/components/EdgeCaseSwitcher';
import { AlertCircle, Sparkles } from 'lucide-react';
import { isDemoLoggedIn } from '@/lib/storage';

export default function DashboardPage() {
  const [edgeMode, setEdgeMode] = useState<EdgeCaseMode>('normal');
  const [isShieldOpen, setIsShieldOpen] = useState(false);
  const [isShieldProtected, setIsShieldProtected] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isDemoLoggedIn() && typeof window !== 'undefined') {
      setIsOnboardingOpen(true);
    }
  }, []);

  const mockData = getMockData();
  const student = getStudentData(edgeMode === 'normal' ? undefined : edgeMode);
  const todayTask = mockData.days['12'];

  const handleLoginSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div key={refreshKey} className="w-full bg-[#080A0C] text-[#F5F3EE] min-h-screen pt-6 pb-24 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* DASHBOARD GREETING HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242A30] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F3EE] flex items-center gap-2">
              Good morning, {student.name ? student.name.split(' ')[0] : 'Hitesh'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#9BA3AA] font-normal mt-1">
              Day {student.daysCompleted ?? 12} of your 60-day developer trajectory
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#D8C7A1]">
              Cohort 2026
            </span>
          </div>
        </div>

        {/* Edge Case Banners if active */}
        {edgeMode === 'new' && (
          <div className="p-4 rounded-xl bg-[#101418] border border-[#D8C7A1]/40 text-[#D8C7A1] text-xs flex items-center gap-3 font-mono">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#D8C7A1]" />
            <div>
              <strong className="block font-bold text-[#F5F3EE]">0 DAY STREAK (NEW USER)</strong>
              You haven&apos;t started yet. Complete Day 1 to begin your streak.
            </div>
          </div>
        )}

        {edgeMode === 'missed' && (
          <div className="p-4 rounded-xl bg-[#101418] border border-[#B8F2D0]/40 text-[#B8F2D0] text-xs flex items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0 text-[#B8F2D0] animate-pulse" />
              <div>
                <strong className="block font-bold text-[#F5F3EE]">STREAK PAUSED</strong>
                You missed yesterday. Don&apos;t worry — your journey isn&apos;t over. Restart today or use Streak Shield!
              </div>
            </div>
            <button
              onClick={() => setIsShieldOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#B8F2D0] text-[#080A0C] font-bold text-xs shrink-0 hover:bg-[#F5F3EE] transition-colors"
            >
              Protect Streak
            </button>
          </div>
        )}

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Streak Hero & Today's Task & Activity) */}
          <div className="lg:col-span-2 space-y-6">
            {/* STREAK HERO CARD */}
            <StreakCard
              student={student}
              weekStreak={mockData.streak.week}
              onOpenShield={() => setIsShieldOpen(true)}
              isShieldProtected={isShieldProtected}
            />

            {/* TODAY'S TASK CARD */}
            <TaskCard task={todayTask} isCompleted={(student.daysCompleted ?? 0) >= 12} />

            {/* WEEKLY ACTIVITY CHART */}
            <ActivityChart week={mockData.streak.week} />
          </div>

          {/* Right Column (Overall Progress, Standing, Achievements) */}
          <div className="space-y-6">
            {/* OVERALL PROGRESS */}
            <ProgressCard student={student} />

            {/* STUDENT STANDING */}
            <LeaderboardCard student={student} leaderboard={mockData.leaderboard} />

            {/* ACHIEVEMENTS */}
            <AchievementSection achievements={mockData.achievements} />
          </div>
        </div>
      </div>

      {/* STREAK SHIELD MODAL */}
      <StreakShieldModal
        isOpen={isShieldOpen}
        onClose={() => setIsShieldOpen(false)}
        task={mockData.streakShieldTask}
        onShieldActivated={() => setIsShieldProtected(true)}
      />

      {/* DEMO ONBOARDING MODAL */}
      <DemoLoginModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* EDGE CASE JUDGE SWITCHER */}
      <EdgeCaseSwitcher currentMode={edgeMode} onModeChange={setEdgeMode} />
    </div>
  );
}
