'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LayoutDashboard, Home, Code2 } from 'lucide-react';

interface NavbarProps {
  streakCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ streakCount = 12 }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const isLandingPage = pathname === '/';

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
          {isLandingPage ? (
            <>
              <Link
                href="/dashboard"
                className="text-xs font-semibold text-[#9BA3AA] hover:text-[#F5F3EE] px-3 py-2 rounded-lg hover:bg-[#151A1F] transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-[#F5F3EE] text-[#080A0C] font-bold text-xs hover:bg-[#B8F2D0] hover:-translate-y-0.5 transition-all shadow-sm active:scale-95"
              >
                <span>Start Challenge →</span>
              </Link>
            </>
          ) : (
            <>
              {/* Late Night Ambient Indicator */}
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#9BA3AA] bg-[#101418] border border-[#242A30] px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8F2D0] animate-pulse" />
                <span>Late Night Protocol</span>
              </span>

              {/* Streak Counter Badge */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101418] border border-[#B8F2D0]/30 text-[#B8F2D0] text-xs font-mono font-bold hover:border-[#B8F2D0]/60 transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8F2D0]" />
                <span>{streakCount} DAY STREAK</span>
              </Link>

              {/* Profile Badge */}
              <Link href="/dashboard" className="flex items-center gap-2 pl-1 group">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#242A30] group-hover:ring-[#B8F2D0]/50 transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Hitesh Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
