'use client';

import React, { useState, useEffect } from 'react';
import { getMockData } from '@/lib/data';
import { StreakCard } from '@/components/StreakCard';
import { TaskCard } from '@/components/TaskCard';
import { ProgressCard } from '@/components/ProgressCard';
import { AchievementSection } from '@/components/AchievementCard';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { ActivityChart } from '@/components/ActivityChart';
import { StreakShieldModal } from '@/components/StreakShieldModal';
import { DemoLoginModal } from '@/components/DemoLoginModal';
import { EdgeCaseSwitcher, EdgeCaseMode } from '@/components/EdgeCaseSwitcher';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { Student, StreakDay } from '@/lib/types';

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const [edgeMode, setEdgeMode] = useState<EdgeCaseMode>('normal');
  const [isShieldOpen, setIsShieldOpen] = useState(false);
  const [isShieldProtected, setIsShieldProtected] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setIsOnboardingOpen(true);
    }
  }, [loading, user]);

  const mockData = getMockData();

  // Determine actual active student object based on authenticated profile or edgeMode inspector
  const getActiveStudent = (): Student => {
    if (edgeMode === 'new') {
      return {
        ...(userProfile || mockData.student),
        currentStreak: 0,
        bestStreak: 0,
        daysCompleted: 0,
        daysRemaining: 60,
        completionPercentage: 0,
        xp: 0,
        rank: 300,
        topPercentage: 'Top 100%',
      };
    }
    if (edgeMode === 'missed') {
      return {
        ...(userProfile || mockData.student),
        currentStreak: 0,
        bestStreak: Math.max(userProfile?.bestStreak || 0, 11),
        streakProtected: false,
      };
    }
    if (edgeMode === 'empty') {
      return {
        name: 'Developer',
        handle: '@developer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rank: 300,
        totalParticipants: 300,
        topPercentage: 'Top 100%',
        xp: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalDays: 60,
        daysCompleted: 0,
        daysRemaining: 60,
        completionPercentage: 0,
      };
    }
    if (userProfile) {
      return userProfile;
    }
    return mockData.student;
  };

  const student = getActiveStudent();
  const todayTask = mockData.days['12'];

  // Dynamically compute week streak grid status based on student streak
  const dynamicWeekStreak: StreakDay[] = mockData.streak.week.map((item, idx) => {
    if (student.currentStreak === 0) {
      return { ...item, status: idx === 6 ? 'today' : 'pending' };
    }
    if (student.currentStreak >= 12) {
      return { ...item, status: idx === 6 ? 'today' : 'completed' };
    }
    const daysCompletedInWeek = Math.min(student.currentStreak, 6);
    if (idx < daysCompletedInWeek) {
      return { ...item, status: 'completed' };
    }
    return { ...item, status: idx === 6 ? 'today' : 'pending' };
  });

  const firstName = student.name ? student.name.split(' ')[0] : 'Developer';

  if (loading) {
    return (
      <div className="w-full bg-[#080A0C] text-[#F5F3EE] min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-mono text-[#B8F2D0]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Restoring Google session & database record...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#080A0C] text-[#F5F3EE] min-h-screen pt-6 pb-24 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* DASHBOARD GREETING HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242A30] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F3EE] flex items-center gap-2 font-sans">
              Good morning, {firstName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#9BA3AA] font-normal mt-1">
              Day {student.daysCompleted > 0 ? student.daysCompleted : 1} of your 60-day developer trajectory
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#101418] border border-[#242A30] text-[#D8C7A1]">
              Cohort 2026
            </span>
          </div>
        </div>

        {/* First Login 0-Day Banner for New Users */}
        {student.currentStreak === 0 && edgeMode === 'normal' && (
          <div className="p-4 rounded-xl bg-[#101418] border border-[#D8C7A1]/40 text-[#D8C7A1] text-xs flex items-center gap-3 font-mono">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#D8C7A1]" />
            <div>
              <strong className="block font-bold text-[#F5F3EE]">0 DAY STREAK INITIALIZED</strong>
              Welcome! Your Google user account is connected. Submit your first activity on Day 12 to start your streak.
            </div>
          </div>
        )}

        {/* Edge Case Banners if active */}
        {edgeMode === 'new' && (
          <div className="p-4 rounded-xl bg-[#101418] border border-[#D8C7A1]/40 text-[#D8C7A1] text-xs flex items-center gap-3 font-mono">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#D8C7A1]" />
            <div>
              <strong className="block font-bold text-[#F5F3EE]">0 DAY STREAK (INSPECTOR PREVIEW)</strong>
              Previewing 0-day initial streak state without modifying your database record.
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
              weekStreak={dynamicWeekStreak}
              onOpenShield={() => setIsShieldOpen(true)}
              isShieldProtected={isShieldProtected}
            />

            {/* TODAY'S TASK CARD */}
            <TaskCard task={todayTask} isCompleted={(student.daysCompleted ?? 0) >= 12} />

            {/* WEEKLY ACTIVITY CHART */}
            <ActivityChart week={dynamicWeekStreak} />
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

      {/* GOOGLE AUTHENTICATION MODAL */}
      <DemoLoginModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onLoginSuccess={() => setIsOnboardingOpen(false)}
      />

      {/* EDGE CASE JUDGE SWITCHER */}
      <EdgeCaseSwitcher currentMode={edgeMode} onModeChange={setEdgeMode} />
    </div>
  );
}
