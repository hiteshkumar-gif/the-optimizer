import mockDataRaw from '@/data/mockData.json';
import { MockData, Student, DayTask, SubmissionData } from './types';
import { getStoredStudent, getStoredSubmissions, getStoredDaySubmission } from './storage';

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
      rank: 150,
      totalParticipants: 300,
      topPercentage: 'Top 50%',
      xp: 100,
      currentStreak: 1,
      bestStreak: 1,
      totalDays: 60,
      daysCompleted: 1,
      daysRemaining: 59,
      completionPercentage: 2,
    };
  }

  return base as Student;
};

export const getDayTask = (dayId: string | number): DayTask => {
  const dayStr = String(dayId);
  const found = mockDataRaw.days[dayStr as keyof typeof mockDataRaw.days];
  if (found) {
    return found as DayTask;
  }
  // Fallback for any other day parameter
  return {
    id: Number(dayId) || 12,
    title: `Day ${dayId}: Advanced Fullstack Development`,
    subtitle: 'Ship production-ready features every single day.',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    skills: ['React', 'TypeScript', 'Tailwind'],
    mission: [
      'Understand requirements and system architecture',
      'Implement responsive UI components',
      'Validate form inputs and interactive states',
      'Test across mobile (390px) and desktop viewports',
      'Submit GitHub repository and LinkedIn proof of work'
    ],
    beforeYouStart: 'Review component composition patterns and CSS responsive utility classes.',
    whatYoullLearn: [
      'Modular architecture design',
      'State management best practices',
      'Accessible UI component patterns'
    ],
    proTips: [
      'Focus on mobile responsiveness first before desktop layout enhancements.',
      'Check edge cases such as empty input states or loading indicators.'
    ],
    resources: [
      { title: 'Frontend Architecture Guide', url: '#', type: 'Documentation' },
      { title: 'Responsive Mobile UI Best Practices', url: '#', type: 'Guide' }
    ]
  };
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
