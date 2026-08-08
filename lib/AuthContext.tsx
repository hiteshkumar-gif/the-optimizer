'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';
import { Student, SubmissionData } from './types';

interface AuthContextType {
  user: User | null;
  userProfile: Student | null;
  submissions: Record<string, SubmissionData>;
  loading: boolean;
  loginWithGoogle: () => Promise<Student>;
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

const getInitialSubmissions = (): Record<string, SubmissionData> => ({});

const createNewUserProfile = (firebaseUser: User): Student => {
  const displayName = firebaseUser.displayName || 'Developer';
  const handle = `@${displayName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  return {
    uid: firebaseUser.uid,
    name: displayName,
    email: firebaseUser.email || '',
    handle: handle,
    avatar:
      firebaseUser.photoURL ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rank: 300,
    totalParticipants: 300,
    topPercentage: 'Top 100%',
    xp: 0,
    currentStreak: 0, // NEW USER STREAK STARTS AT 0 DAYS
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
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, SubmissionData>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to load user profile & submissions from Firestore (with per-user localStorage backup)
  const syncUserData = async (firebaseUser: User): Promise<Student> => {
    let profile: Student | null = null;
    let userSubmissions: Record<string, SubmissionData> = {};

    const profileDocRef = doc(db, 'users', firebaseUser.uid);
    const subDocRef = doc(db, 'submissions', firebaseUser.uid);

    try {
      // 1. Try reading user document from Firestore
      const snap = await getDoc(profileDocRef);
      if (snap.exists()) {
        profile = snap.data() as Student;
        // Update last active date & sync photo/name if changed
        profile = {
          ...profile,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || profile.name,
          email: firebaseUser.email || profile.email,
          avatar: firebaseUser.photoURL || profile.avatar,
          lastActiveDate: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('Firestore read user failed, checking local store backup:', err);
    }

    // If no Firestore profile exists yet, check local user store or create brand new 0-day profile
    if (!profile) {
      const localKey = `${USER_STORAGE_PREFIX}${firebaseUser.uid}_profile`;
      const localRaw = typeof window !== 'undefined' ? localStorage.getItem(localKey) : null;
      if (localRaw) {
        try {
          profile = JSON.parse(localRaw) as Student;
        } catch (e) {
          console.error('Error parsing local profile backup:', e);
        }
      }
    }

    if (!profile) {
      // First time login! Create 0-day profile automatically
      profile = createNewUserProfile(firebaseUser);
    }

    // Save profile to Firestore & local store backup
    try {
      await setDoc(profileDocRef, profile, { merge: true });
    } catch (err) {
      console.warn('Firestore write user warning:', err);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `${USER_STORAGE_PREFIX}${firebaseUser.uid}_profile`,
        JSON.stringify(profile)
      );
    }

    // 2. Fetch user's submissions
    try {
      const subSnap = await getDoc(subDocRef);
      if (subSnap.exists()) {
        userSubmissions = subSnap.data() as Record<string, SubmissionData>;
      }
    } catch (err) {
      console.warn('Firestore read submissions failed:', err);
    }

    if (Object.keys(userSubmissions).length === 0 && typeof window !== 'undefined') {
      const subKey = `${USER_STORAGE_PREFIX}${firebaseUser.uid}_submissions`;
      const subRaw = localStorage.getItem(subKey);
      if (subRaw) {
        try {
          userSubmissions = JSON.parse(subRaw);
        } catch (e) {
          console.error('Error parsing local submissions backup:', e);
        }
      }
    }

    setUserProfile(profile);
    setSubmissions(userSubmissions);
    return profile;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserData(currentUser);
      } else {
        setUserProfile(null);
        setSubmissions({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<Student> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      const profile = await syncUserData(result.user);
      setLoading(false);
      return profile;
    } catch (error) {
      setLoading(false);
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setSubmissions({});
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
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

    // Save to Firestore & local store backup
    try {
      await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
    } catch (err) {
      console.warn('Firestore update profile warning:', err);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `${USER_STORAGE_PREFIX}${user.uid}_profile`,
        JSON.stringify(updated)
      );
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

    // Save submissions to Firestore & local store
    try {
      await setDoc(doc(db, 'submissions', user.uid), updatedSubmissions, { merge: true });
    } catch (err) {
      console.warn('Firestore save submission warning:', err);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `${USER_STORAGE_PREFIX}${user.uid}_submissions`,
        JSON.stringify(updatedSubmissions)
      );
    }

    // If day is completed, update streak & progress
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
