'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from './firebase';
import {
  Student,
  SubmissionData,
  CalendarDayItem,
  ChallengeDayStatus,
} from './types';
import {
  getChallengeByDay,
  DAY_0_TASK,
  ChallengeDefinition,
} from './challengesData';

interface AuthContextType {
  user: User | { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  userProfile: Student | null;
  submissions: Record<string, SubmissionData>;
  loading: boolean;
  currentDayNumber: number;
  calendarWeek: CalendarDayItem[];
  todayChallenge: ChallengeDefinition;
  loginWithGoogle: () => Promise<Student>;
  loginWithCustomGoogleIdentity: (name: string, email: string) => Promise<Student>;
  logout: () => Promise<void>;
  saveDay0Onboarding: (githubHandle: string, linkedinUrl: string, track: string) => Promise<Student>;
  updateProfile: (profile: Partial<Student>) => Promise<Student>;
  saveSubmission: (
    dayId: string | number,
    submission: Partial<SubmissionData>
  ) => Promise<Record<string, SubmissionData>>;
  getDaySubmission: (dayId: string | number) => SubmissionData;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_PREFIX = 'abtalks_user_v3_';
const ACTIVE_SESSION_KEY = 'abtalks_active_session_uid';

export const getTodayLocalDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseLocalDate = (dateStr: string): Date => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const calculateCurrentDayNumber = (userProfile: Student | null): number => {
  if (!userProfile) return 12;
  if (userProfile.currentDay === 0) return 0;
  if (!userProfile.programStartDate) return userProfile.currentDay || 12;

  const startDateStr = userProfile.programStartDate;
  const todayStr = getTodayLocalDateString();

  const startDate = parseLocalDate(startDateStr);
  const todayDate = parseLocalDate(todayStr);

  const diffTime = todayDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 0;
  return Math.min(60, diffDays + 1);
};

export const calculateStreakFromHistory = (
  submissions: Record<string, SubmissionData>,
  userProfile: Student | null
): { currentStreak: number; longestStreak: number } => {
  const currentDayNum = calculateCurrentDayNumber(userProfile);
  if (currentDayNum === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let runningStreak = 0;

  for (let d = 1; d <= currentDayNum; d++) {
    const sub = submissions[String(d)];
    if (sub && sub.status === 'completed') {
      runningStreak++;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else {
      if (d < currentDayNum) {
        runningStreak = 0;
      }
    }
  }

  const todaySub = submissions[String(currentDayNum)];
  const isTodayCompleted = todaySub && todaySub.status === 'completed';

  let checkDay = isTodayCompleted ? currentDayNum : currentDayNum - 1;

  while (checkDay >= 1) {
    const sub = submissions[String(checkDay)];
    if (sub && sub.status === 'completed') {
      currentStreak++;
      checkDay--;
    } else {
      break;
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
};

export const getCalendarWeekItems = (
  userProfile: Student | null,
  submissions: Record<string, SubmissionData>
): CalendarDayItem[] => {
  const todayStr = getTodayLocalDateString();
  const todayDate = parseLocalDate(todayStr);
  const currentDayNum = calculateCurrentDayNumber(userProfile);

  // Compute a fallback start date if not explicitly set
  let startDateStr = userProfile?.programStartDate;
  if (!startDateStr && currentDayNum > 0) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - (currentDayNum - 1));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    startDateStr = `${year}-${month}-${day}`;
  }

  const items: CalendarDayItem[] = [];

  for (let offset = -3; offset <= 3; offset++) {
    const targetDate = new Date(todayDate);
    targetDate.setDate(todayDate.getDate() + offset);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dayNum = String(targetDate.getDate()).padStart(2, '0');
    const fullDateStr = `${year}-${month}-${dayNum}`;

    const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'short' });
    const shortDate = offset === 0 ? 'Today' : targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    let programDayNumber = 0;
    if (startDateStr) {
      const startDate = parseLocalDate(startDateStr);
      const diffDays = Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0) {
        programDayNumber = Math.min(60, diffDays + 1);
      }
    }

    const isToday = offset === 0;
    const isFuture = targetDate.getTime() > todayDate.getTime();

    const sub = programDayNumber > 0 ? submissions[String(programDayNumber)] : undefined;
    const isCompleted = sub && sub.status === 'completed';

    let status: ChallengeDayStatus = 'UPCOMING';
    if (isCompleted) {
      status = 'COMPLETED';
    } else if (isToday) {
      status = 'TODAY';
    } else if (isFuture) {
      status = 'UPCOMING';
    } else {
      status = programDayNumber > 0 ? 'MISSED' : 'UPCOMING';
    }

    items.push({
      dayName,
      shortDate,
      fullDate: fullDateStr,
      dayNumber: programDayNumber,
      status,
      isFuture,
      isToday,
    });
  }

  return items;
};

const getStoredLocalProfile = (uid: string): Student | null => {
  if (typeof window === 'undefined') return null;
  const keys = [
    `${USER_STORAGE_PREFIX}${uid}_profile`,
    `abtalks_user_v2_${uid}_profile`,
    `abtalks_user_${uid}_profile`,
    `abtalks_user_profile`,
    `abtalks_student`,
  ];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.name) {
          return parsed;
        }
      } catch (e) {}
    }
  }
  return null;
};

const getStoredLocalSubmissions = (uid: string): Record<string, SubmissionData> => {
  if (typeof window === 'undefined') return {};
  const keys = [
    `${USER_STORAGE_PREFIX}${uid}_submissions`,
    `abtalks_user_v2_${uid}_submissions`,
    `abtalks_user_${uid}_submissions`,
    `abtalks_submissions`,
  ];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {}
    }
  }
  return {};
};

const createNewUserProfile = (uid: string, name: string, email: string, avatar?: string): Student => {
  const displayName = name.trim() || 'Developer';
  const cleanEmail = email.trim() || 'developer@gmail.com';
  const handle = `@${displayName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  return {
    uid,
    name: displayName,
    email: cleanEmail,
    handle: handle,
    avatar:
      avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rank: 300,
    totalParticipants: 300,
    topPercentage: 'Top 100%',
    xp: 0,
    currentStreak: 0,
    bestStreak: 0,
    longestStreak: 0,
    totalDays: 60,
    daysCompleted: 0,
    daysRemaining: 60,
    completionPercentage: 0,
    streakProtected: false,
    track: 'Fullstack Web Development',
    createdAt: new Date().toISOString(),
    programStartDate: undefined,
    currentDay: 0,
    githubHandle: '',
    linkedinUrl: '',
    lastActiveDate: new Date().toISOString(),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null } | null>(null);
  const [userProfile, setUserProfile] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, SubmissionData>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const syncUserData = async (uid: string, name?: string | null, email?: string | null, avatar?: string | null): Promise<Student> => {
    let profile: Student | null = getStoredLocalProfile(uid);
    let userSubmissions: Record<string, SubmissionData> = getStoredLocalSubmissions(uid);

    if (isFirebaseConfigured()) {
      try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          const remoteProfile = snap.data() as Student;
          profile = {
            ...remoteProfile,
            uid,
            name: name || remoteProfile.name,
            email: email || remoteProfile.email,
            avatar: avatar || remoteProfile.avatar,
            lastActiveDate: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.warn('Firestore user fetch skipped/failed:', err);
      }
    }

    if (!profile) {
      profile = createNewUserProfile(uid, name || 'Developer', email || '', avatar || undefined);
    } else {
      profile = {
        ...profile,
        uid,
        name: name || profile.name,
        email: email || profile.email,
        avatar: avatar || profile.avatar,
        lastActiveDate: new Date().toISOString(),
      };
    }

    const currentDayNum = calculateCurrentDayNumber(profile);
    const { currentStreak, longestStreak } = calculateStreakFromHistory(userSubmissions, profile);

    profile = {
      ...profile,
      currentDay: currentDayNum,
      currentStreak,
      bestStreak: Math.max(profile.bestStreak || 0, longestStreak),
      longestStreak,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${USER_STORAGE_PREFIX}${uid}_profile`, JSON.stringify(profile));
      localStorage.setItem(ACTIVE_SESSION_KEY, uid);
    }

    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'users', uid), profile, { merge: true }).catch((err) => {
        console.warn('Firestore async user write warning:', err);
      });
    }

    if (isFirebaseConfigured() && Object.keys(userSubmissions).length === 0) {
      try {
        const subSnap = await getDoc(doc(db, 'submissions', uid));
        if (subSnap.exists()) {
          userSubmissions = subSnap.data() as Record<string, SubmissionData>;
          if (typeof window !== 'undefined') {
            localStorage.setItem(`${USER_STORAGE_PREFIX}${uid}_submissions`, JSON.stringify(userSubmissions));
          }
        }
      } catch (err) {
        console.warn('Firestore submissions fetch warning:', err);
      }
    }

    setUserProfile(profile);
    setSubmissions(userSubmissions);
    return profile;
  };

  useEffect(() => {
    let isSubscribed = true;

    const restoreSession = async () => {
      try {
        const activeUid = typeof window !== 'undefined' ? localStorage.getItem(ACTIVE_SESSION_KEY) : null;
        if (activeUid) {
          const savedProfile = getStoredLocalProfile(activeUid);
          const savedSub = getStoredLocalSubmissions(activeUid);

          if (savedProfile) {
            const currentDayNum = calculateCurrentDayNumber(savedProfile);
            const { currentStreak, longestStreak } = calculateStreakFromHistory(savedSub, savedProfile);

            const syncedProfile = {
              ...savedProfile,
              currentDay: currentDayNum,
              currentStreak,
              longestStreak,
            };

            if (isSubscribed) {
              setUser({
                uid: syncedProfile.uid || activeUid,
                displayName: syncedProfile.name,
                email: syncedProfile.email,
                photoURL: syncedProfile.avatar,
              });
              setUserProfile(syncedProfile);
              setSubmissions(savedSub);
            }
          }
        }
      } catch (err) {
        console.error('Session restore error:', err);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    let unsubscribe: () => void = () => {};
    if (isFirebaseConfigured()) {
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (!isSubscribed) return;
        if (currentUser) {
          setUser(currentUser);
          await syncUserData(currentUser.uid, currentUser.displayName, currentUser.email, currentUser.photoURL);
        }
        if (isSubscribed) {
          setLoading(false);
        }
      });
    }

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async (): Promise<Student> => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        throw new Error('Firebase API key is not configured.');
      }
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      const profile = await syncUserData(
        result.user.uid,
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const loginWithCustomGoogleIdentity = async (name: string, email: string): Promise<Student> => {
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();
      const uid = `google_id_${typeof window !== 'undefined' ? btoa(cleanEmail).replace(/=/g, '') : cleanEmail}`;

      const customUser = {
        uid,
        displayName: cleanName,
        email: cleanEmail,
        photoURL: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      };

      setUser(customUser);
      const profile = await syncUserData(uid, cleanName, cleanEmail);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured()) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.warn('Firebase signout warning:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACTIVE_SESSION_KEY);
      }
      setUser(null);
      setUserProfile(null);
      setSubmissions({});
      setLoading(false);
    }
  };

  const saveDay0Onboarding = async (githubHandle: string, linkedinUrl: string, track: string): Promise<Student> => {
    if (!user || !userProfile) {
      throw new Error('User must be logged in to complete onboarding.');
    }

    const todayStr = getTodayLocalDateString();
    const updated: Student = {
      ...userProfile,
      githubHandle: githubHandle.trim().replace(/^@/, ''),
      linkedinUrl: linkedinUrl.trim(),
      track: track || userProfile.track || 'Fullstack Web Development',
      programStartDate: todayStr,
      currentDay: 1,
      lastActiveDate: new Date().toISOString(),
    };

    return updateProfile(updated);
  };

  const updateProfile = async (partialProfile: Partial<Student>): Promise<Student> => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to update profile.');
    }

    const updated: Student = {
      ...userProfile,
      ...partialProfile,
      lastActiveDate: new Date().toISOString(),
    };

    if (partialProfile.daysCompleted !== undefined || partialProfile.totalDays !== undefined) {
      const completed = updated.daysCompleted || 0;
      const total = updated.totalDays || 60;
      updated.daysRemaining = Math.max(0, total - completed);
      updated.completionPercentage = Math.min(100, Math.round((completed / total) * 100));
    }

    const { currentStreak, longestStreak } = calculateStreakFromHistory(submissions, updated);
    updated.currentStreak = currentStreak;
    updated.bestStreak = Math.max(updated.bestStreak || 0, longestStreak);
    updated.longestStreak = longestStreak;

    setUserProfile(updated);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${USER_STORAGE_PREFIX}${user.uid}_profile`, JSON.stringify(updated));
    }

    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'users', user.uid), updated, { merge: true }).catch((err) => {
        console.warn('Firestore profile update warning:', err);
      });
    }

    return updated;
  };

  const saveSubmission = async (
    dayId: string | number,
    submission: Partial<SubmissionData>
  ): Promise<Record<string, SubmissionData>> => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to save submissions.');
    }

    const dayStr = String(dayId);
    const existing = submissions[dayStr] || {
      githubUrl: '',
      linkedinUrl: '',
      githubSubmitted: false,
      linkedinSubmitted: false,
      status: 'missing',
    };

    const updatedDay: SubmissionData = {
      ...existing,
      ...submission,
      userId: user.uid,
      challengeId: dayStr,
      dayNumber: Number(dayId) || 0,
      challengeDate: getTodayLocalDateString(),
      completedAt: new Date().toISOString(),
    };

    const updatedSubmissions = {
      ...submissions,
      [dayStr]: updatedDay,
    };

    setSubmissions(updatedSubmissions);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${USER_STORAGE_PREFIX}${user.uid}_submissions`, JSON.stringify(updatedSubmissions));
    }

    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'submissions', user.uid), updatedSubmissions, { merge: true }).catch((err) => {
        console.warn('Firestore submission save warning:', err);
      });
    }

    if (updatedDay.status === 'completed' || (updatedDay.githubSubmitted && updatedDay.linkedinSubmitted)) {
      const dayNum = Number(dayId) || 1;
      const completedCount = Object.values(updatedSubmissions).filter(s => s.status === 'completed' || (s.githubSubmitted && s.linkedinSubmitted)).length;

      const newDaysCompleted = Math.max(userProfile.daysCompleted || 0, completedCount);
      const newXp = (userProfile.xp || 0) + 100;
      const newRank = Math.max(1, 300 - newDaysCompleted * 10);
      const topPct = newRank <= 30 ? 'Top 10%' : newRank <= 100 ? 'Top 30%' : 'Top 80%';

      await updateProfile({
        daysCompleted: newDaysCompleted,
        xp: newXp,
        rank: newRank,
        topPercentage: topPct,
        lastSubmissionDate: new Date().toISOString(),
      });
    }

    return updatedSubmissions;
  };

  const getDaySubmission = (dayId: string | number): SubmissionData => {
    const dayStr = String(dayId);
    return (
      submissions[dayStr] || {
        githubUrl: userProfile?.githubHandle ? `https://github.com/${userProfile.githubHandle}/day${dayId}-challenge` : '',
        linkedinUrl: userProfile?.linkedinUrl || '',
        githubSubmitted: false,
        linkedinSubmitted: false,
        status: 'missing',
      }
    );
  };

  const currentDayNumber = calculateCurrentDayNumber(userProfile);
  const calendarWeek = getCalendarWeekItems(userProfile, submissions);
  const todayChallenge = getChallengeByDay(currentDayNumber);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        submissions,
        loading,
        currentDayNumber,
        calendarWeek,
        todayChallenge,
        loginWithGoogle,
        loginWithCustomGoogleIdentity,
        logout,
        saveDay0Onboarding,
        updateProfile,
        saveSubmission,
        getDaySubmission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
