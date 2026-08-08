'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LayoutDashboard, Home, Code2, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface NavbarProps {
  streakCount?: number;
  onOpenOnboarding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  streakCount,
  onOpenOnboarding,
}) => {
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    window.location.href = '/';
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const isLandingPage = pathname === '/';
  const displayStreak = streakCount !== undefined ? streakCount : (userProfile?.currentStreak ?? 0);
  const studentName = userProfile?.name || user?.displayName || 'Developer';
  const studentEmail = userProfile?.email || user?.email || 'authenticated@google.com';
  const avatarUrl =
    userProfile?.avatar ||
    user?.photoURL ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080A0C]/90 border-b border-[#242A30] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#151A1F] border border-[#242A30] shadow-sm group-hover:border-[#B8F2D0]/40 transition-all flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.png"
              alt="ABTalks Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-[#F5F3EE] font-sans">
                AB<span className="text-[#B8F2D0]">Talks</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#D8C7A1]/10 text-[#D8C7A1] border border-[#D8C7A1]/20">
                60D
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium tracking-wide">
          {isLandingPage ? (
            <>
              <a
                href="#how-it-works"
                className="px-3.5 py-2 rounded-lg text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F] transition-all"
              >
                Framework
              </a>
              <a
                href="#journey"
                className="px-3.5 py-2 rounded-lg text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F] transition-all"
              >
                Trajectory
              </a>
              <a
                href="#proof"
                className="px-3.5 py-2 rounded-lg text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F] transition-all"
              >
                Proof Ledger
              </a>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isActive('/')
                    ? 'bg-[#151A1F] text-[#F5F3EE] font-semibold border border-[#242A30]'
                    : 'text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isActive('/dashboard')
                    ? 'bg-[#151A1F] text-[#F5F3EE] font-semibold border border-[#242A30]'
                    : 'text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <Link
                href="/day/12"
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isActive('/day/12')
                    ? 'bg-[#151A1F] text-[#F5F3EE] font-semibold border border-[#242A30]'
                    : 'text-[#9BA3AA] hover:text-[#F5F3EE] hover:bg-[#151A1F]'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Day 12 Workspace
              </Link>
            </>
          )}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2.5">
          {!user ? (
            <>
              <button
                onClick={() => (onOpenOnboarding ? onOpenOnboarding() : (window.location.href = '/dashboard'))}
                className="text-xs font-semibold text-[#9BA3AA] hover:text-[#F5F3EE] px-3 py-2 rounded-lg hover:bg-[#151A1F] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => (onOpenOnboarding ? onOpenOnboarding() : (window.location.href = '/dashboard'))}
                className="px-4 py-2 rounded-xl bg-[#F5F3EE] text-[#080A0C] font-bold text-xs hover:bg-[#B8F2D0] hover:-translate-y-0.5 transition-all shadow-sm active:scale-95"
              >
                <span>Start Challenge →</span>
              </button>
            </>
          ) : (
            <>
              {/* Streak Counter Badge */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101418] border border-[#B8F2D0]/30 text-[#B8F2D0] text-xs font-mono font-bold hover:border-[#B8F2D0]/60 transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
                <span>{displayStreak} DAY STREAK</span>
              </Link>

              {/* Profile Dropdown Trigger */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 pl-1 group focus:outline-none"
                  aria-label="Student Profile Menu"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#242A30] group-hover:ring-[#B8F2D0]/50 transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl}
                      alt={studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#9BA3AA] group-hover:text-[#F5F3EE] transition-colors" />
                </button>

                {/* Profile Popup Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 hardware-card-elevated p-3 shadow-2xl z-50 animate-fadeIn space-y-3 font-sans">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#242A30]">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#242A30] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatarUrl} alt={studentName} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-[#F5F3EE] truncate">{studentName}</div>
                        <div className="text-[10px] text-[#9BA3AA] font-mono truncate">{studentEmail}</div>
                      </div>
                    </div>

                    <div className="px-2 py-1 bg-[#101418] rounded-lg border border-[#242A30] text-[11px] font-mono text-[#D8C7A1]">
                      Track: {userProfile?.track || 'Fullstack Web Development'}
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-red-400 hover:bg-[#101418] transition-colors font-mono text-[11px]"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

