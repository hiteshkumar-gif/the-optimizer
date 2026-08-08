'use client';

import React, { useState } from 'react';
import { Sparkles, X, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { Student } from '@/lib/types';

interface DemoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (profile: Student) => void;
}

export const DemoLoginModal: React.FC<DemoLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { loginWithGoogle } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const profile = await loginWithGoogle();
      setIsAuthenticating(false);
      if (onLoginSuccess) {
        onLoginSuccess(profile);
      }
      onClose();
    } catch (err: unknown) {
      setIsAuthenticating(false);
      const errorMessage =
        err instanceof Error ? err.message : 'Google Authentication failed. Please try again.';
      setAuthError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A0C]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md hardware-card p-5 sm:p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9BA3AA] hover:text-[#F5F3EE] p-1.5 rounded-lg hover:bg-[#151A1F] transition-colors"
          aria-label="Close"
          disabled={isAuthenticating}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#151A1F] border border-[#242A30] flex items-center justify-center text-[#B8F2D0]">
            <Sparkles className="w-5 h-5 text-[#B8F2D0]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#151A1F] text-[#B8F2D0] border border-[#B8F2D0]/20">
                GOOGLE AUTHENTICATION
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F3EE] tracking-tight font-sans mt-0.5">
              Sign In to ABTalks 60D
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#9BA3AA] mb-5 leading-relaxed">
          Log in with your Google account to initialize your personal 60-day developer trajectory, track your daily streak, and persist your proof of work to your unique database record.
        </p>

        {/* Error Alert */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-start gap-2.5 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div className="leading-normal">{authError}</div>
          </div>
        )}

        {/* Real Sign in with Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isAuthenticating}
          className={`w-full py-3.5 px-4 rounded-xl bg-[#151A1F] hover:bg-[#242A30] border border-[#242A30] hover:border-[#B8F2D0]/50 text-[#F5F3EE] font-mono text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-md active:scale-95 ${
            isAuthenticating ? 'opacity-70 cursor-wait' : 'cursor-pointer'
          }`}
        >
          {isAuthenticating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#B8F2D0]" />
              <span>Connecting to Google OAuth...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-4 pt-4 border-t border-[#242A30] text-center">
          <p className="text-[10px] text-[#9BA3AA] font-mono">
            Protected by Cloud Auth &bull; 0-Day Initial Streak Protocol
          </p>
        </div>
      </div>
    </div>
  );
};
