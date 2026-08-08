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
import { Student, SubmissionData } from './types';

interface AuthContextType {
  user: User | { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  userProfile: Student | null;
  submissions: Record<string, SubmissionData>;
  loading: boolean;
  loginWithGoogle: () => Promise<Student>;
  loginWithCustomGoogleIdentity: (name: string, email: string) => Promise<Student>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<Student>) => Promise<Student>;
  saveSubmission: (
    dayId: string | number,
    submission: Partial<SubmissionData>
  ) => Promise<Record<string, SubmissionData>>;
  getDaySubmission: (dayId: string | number) => SubmissionData;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_PREFIX = 'abtalks_user_v2_';
const ACTIVE_SESSION_KEY = 'abtalks_active_session_uid';

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
    currentStreak: 0, // INITIAL STREAK STARTS AT 0 DAYS FOR NEW ACCOUNTS
    bestStreak: 0,
    totalDays: 60,
    daysCompleted: 0,
    daysRemaining: 60,
    completionPercentage: 0,
    streakProtected: false,
    track: 'Fullstack Web Development',
    createdAt: new Date().toISOString(),
    lastActiveDate: new Date().toISOString(),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null } | null>(null);
  const [userProfile, setUserProfile] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, SubmissionData>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize user data from local storage immediately, and from Firestore if configured
  const syncUserData = async (uid: string, name?: string | null, email?: string | null, avatar?: string | null): Promise<Student> => {
    let profile: Student | null = null;
    let userSubmissions: Record<string, SubmissionData> = {};

    const localProfileKey = `${USER_STORAGE_PREFIX}${uid}_profile`;
    const localSubKey = `${USER_STORAGE_PREFIX}${uid}_submissions`;

    // 1. Instantly read local storage per-user backup
    if (typeof window !== 'undefined') {
      const rawP = localStorage.getItem(localProfileKey);
      if (rawP) {
        try {
          profile = JSON.parse(rawP) as Student;
        } catch (e) {
          console.error('Error parsing local profile backup:', e);
        }
      }
      const rawS = localStorage.getItem(localSubKey);
      if (rawS) {
        try {
          userSubmissions = JSON.parse(rawS);
        } catch (e) {
          console.error('Error parsing local submissions backup:', e);
        }
      }
    }

    // 2. Read from Firestore ONLY if valid Firebase API key is configured
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

    // 3. If profile doesn't exist yet, create 0-day initial streak profile
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

    // 4. Save to local storage & Firestore (non-blocking)
    if (typeof window !== 'undefined') {
      localStorage.setItem(localProfileKey, JSON.stringify(profile));
      localStorage.setItem(ACTIVE_SESSION_KEY, uid);
    }

    if (isFirebaseConfigured()) {
      setDoc(doc(db, 'users', uid), profile, { merge: true }).catch((err) => {
        console.warn('Firestore async user write warning:', err);
      });
    }

    // 5. Read Firestore submissions if configured and missing locally
    if (isFirebaseConfigured() && Object.keys(userSubmissions).length === 0) {
      try {
        const subSnap = await getDoc(doc(db, 'submissions', uid));
        if (subSnap.exists()) {
          userSubmissions = subSnap.data() as Record<string, SubmissionData>;
          if (typeof window !== 'undefined') {
            localStorage.setItem(localSubKey, JSON.stringify(userSubmissions));
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
          const profileKey = `${USER_STORAGE_PREFIX}${activeUid}_profile`;
          const subKey = `${USER_STORAGE_PREFIX}${activeUid}_submissions`;
          const savedRaw = typeof window !== 'undefined' ? localStorage.getItem(profileKey) : null;
          if (savedRaw) {
            const savedProfile = JSON.parse(savedRaw) as Student;
            if (isSubscribed) {
              setUser({
                uid: savedProfile.uid || activeUid,
                displayName: savedProfile.name,
                email: savedProfile.email,
                photoURL: savedProfile.avatar,
              });
              setUserProfile(savedProfile);
              const subRaw = typeof window !== 'undefined' ? localStorage.getItem(subKey) : null;
              if (subRaw) {
                setSubmissions(JSON.parse(subRaw));
              }
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

    // Attach Firebase listener if Firebase is configured
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
      const newDaysCompleted = Math.max(userProfile.daysCompleted || 0, dayNum);
      const newStreak = Math.max(userProfile.currentStreak || 0, dayNum === 1 ? 1 : userProfile.currentStreak || 1);
      const newBest = Math.max(userProfile.bestStreak || 0, newStreak);
      const newXp = (userProfile.xp || 0) + 100;
      const newRank = Math.max(1, 300 - newDaysCompleted * 10);
      const topPct = newRank <= 30 ? 'Top 10%' : newRank <= 100 ? 'Top 30%' : 'Top 80%';

      await updateProfile({
        daysCompleted: newDaysCompleted,
        currentStreak: newStreak,
        bestStreak: newBest,
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
        githubUrl: '',
        linkedinUrl: '',
        githubSubmitted: false,
        linkedinSubmitted: false,
        status: 'missing',
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        submissions,
        loading,
        loginWithGoogle,
        loginWithCustomGoogleIdentity,
        logout,
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
