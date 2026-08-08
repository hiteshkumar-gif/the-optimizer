import mockDataRaw from '@/data/mockData.json';
import { MockData, Student, DayTask, SubmissionData } from './types';
import { getStoredStudent, getStoredSubmissions, getStoredDaySubmission } from './storage';
import { getChallengeByDay } from './challengesData';

export const getMockData = (): MockData => {
  const base = mockDataRaw as unknown as MockData;
  if (typeof window !== 'undefined') {
    const student = getStoredStudent();
    const submissions = getStoredSubmissions();
    return {
      ...base,
      student,
      submissions,
    };
  }
  return base;
};

export const getStudentData = (overrideState?: 'normal' | 'new' | 'missed' | 'empty'): Student => {
  if (typeof window !== 'undefined' && (!overrideState || overrideState === 'normal')) {
    return getStoredStudent();
  }

  const base = mockDataRaw.student;
  
  if (overrideState === 'new') {
    return {
      ...base,
      name: 'Developer',
      currentStreak: 0,
      bestStreak: 0,
      daysCompleted: 0,
      daysRemaining: 60,
      completionPercentage: 0,
      xp: 0,
      rank: 298,
      topPercentage: 'Top 99%',
      currentDay: 0,
    };
  }

  if (overrideState === 'missed') {
    return {
      ...base,
      name: 'Developer',
      currentStreak: 0,
      bestStreak: 11,
      streakProtected: false,
    };
  }

  if (overrideState === 'empty') {
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
      currentDay: 0,
    };
  }

  return base as Student;
};

export const getDayTask = (dayId: string | number): DayTask => {
  return getChallengeByDay(dayId);
};

export const getSubmissionData = (dayId: string | number): SubmissionData => {
  if (typeof window !== 'undefined') {
    return getStoredDaySubmission(dayId);
  }
  const dayStr = String(dayId);
  const found = mockDataRaw.submissions[dayStr as keyof typeof mockDataRaw.submissions];
  if (found) {
    return found as SubmissionData;
  }
  return {
    githubUrl: '',
    linkedinUrl: '',
    githubSubmitted: false,
    linkedinSubmitted: false,
    status: 'missing'
  };
};
