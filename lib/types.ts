export interface Student {
  name: string;
  handle: string;
  avatar: string;
  rank: number;
  totalParticipants: number;
  topPercentage: string;
  xp: number;
  currentStreak: number;
  bestStreak: number;
  totalDays: number;
  daysCompleted: number;
  daysRemaining: number;
  completionPercentage: number;
  streakProtected?: boolean;
}

export interface StreakDay {
  day: string;
  shortDate: string;
  status: 'completed' | 'today' | 'missed' | 'pending';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser: boolean;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: string;
}

export interface DayTask {
  id: number;
  title: string;
  subtitle: string;
  difficulty: string;
  estimatedTime: string;
  skills: string[];
  mission: string[];
  beforeYouStart: string;
  whatYoullLearn: string[];
  proTips: string[];
  resources: ResourceLink[];
}

export interface SubmissionData {
  githubUrl: string;
  linkedinUrl: string;
  githubSubmitted: boolean;
  linkedinSubmitted: boolean;
  status: 'pending_review' | 'completed' | 'missing';
}

export interface BugQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface StreakShieldTask {
  title: string;
  description: string;
  bugs: BugQuestion[];
}

export interface MockData {
  student: Student;
  streak: {
    week: StreakDay[];
  };
  achievements: Achievement[];
  leaderboard: LeaderboardUser[];
  days: Record<string, DayTask>;
  submissions: Record<string, SubmissionData>;
  streakShieldTask: StreakShieldTask;
}
