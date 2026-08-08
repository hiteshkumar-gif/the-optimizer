import { Student, SubmissionData } from './types';
import mockDataRaw from '@/data/mockData.json';

const PROFILE_KEY = 'abtalks_demo_student_profile';
const SUBMISSIONS_KEY = 'abtalks_demo_student_submissions';
const AUTH_KEY = 'abtalks_demo_auth_status';

export interface DemoStudentProfile extends Student {
  email: string;
  track: string;
  createdAt: string;
  lastActiveDate: string;
}

export const getDefaultStudentProfile = (): DemoStudentProfile => {
  const base = mockDataRaw.student as Student;
  return {
    ...base,
    name: 'Developer',
    email: 'developer@example.com',
    track: 'Fullstack Web Development',
    createdAt: new Date().toISOString(),
    lastActiveDate: new Date().toISOString(),
  };
};

export const getStoredStudent = (): DemoStudentProfile => {
  if (typeof window === 'undefined') {
    return getDefaultStudentProfile();
  }
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return JSON.parse(raw) as DemoStudentProfile;
    }
  } catch (e) {
    console.error('Error reading student profile from localStorage:', e);
  }
  return getDefaultStudentProfile();
};

export const saveStoredStudent = (profile: Partial<DemoStudentProfile>): DemoStudentProfile => {
  const current = getStoredStudent();
  const updated: DemoStudentProfile = {
    ...current,
    ...profile,
    lastActiveDate: new Date().toISOString(),
  };

  // Recalculate derived fields
  if (profile.daysCompleted !== undefined || profile.totalDays !== undefined) {
    const completed = updated.daysCompleted || 0;
    const total = updated.totalDays || 60;
    updated.daysRemaining = Math.max(0, total - completed);
    updated.completionPercentage = Math.min(100, Math.round((completed / total) * 100));
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving student profile to localStorage:', e);
    }
  }

  return updated;
};

export const getStoredSubmissions = (): Record<string, SubmissionData> => {
  if (typeof window === 'undefined') {
    return mockDataRaw.submissions as unknown as Record<string, SubmissionData>;
  }
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (raw) {
      return JSON.parse(raw) as Record<string, SubmissionData>;
    }
  } catch (e) {
    console.error('Error reading submissions from localStorage:', e);
  }
  return mockDataRaw.submissions as unknown as Record<string, SubmissionData>;
};

export const getStoredDaySubmission = (dayId: string | number): SubmissionData => {
  const all = getStoredSubmissions();
  const dayStr = String(dayId);
  if (all[dayStr]) {
    return all[dayStr];
  }
  return {
    githubUrl: '',
    linkedinUrl: '',
    githubSubmitted: false,
    linkedinSubmitted: false,
    status: 'missing',
  };
};

export const saveDaySubmission = (
  dayId: string | number,
  submission: Partial<SubmissionData>
): Record<string, SubmissionData> => {
  const all = getStoredSubmissions();
  const dayStr = String(dayId);
  const current = all[dayStr] || {
    githubUrl: '',
    linkedinUrl: '',
    githubSubmitted: false,
    linkedinSubmitted: false,
    status: 'missing',
  };

  const updatedDay: SubmissionData = {
    ...current,
    ...submission,
  };

  all[dayStr] = updatedDay;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Error saving submission to localStorage:', e);
    }
  }

  return all;
};

export const isDemoLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const setDemoLoggedIn = (status: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, status ? 'true' : 'false');
};

export const resetDemoData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(AUTH_KEY);
};
