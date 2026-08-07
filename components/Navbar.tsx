'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Trophy, LayoutDashboard, Home, Code2 } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-950/40 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-white font-sans">
                AB<span className="text-orange-500">Talks</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                60D
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {isLandingPage ? (
            <>
              <a
                href="#how-it-works"
                className="px-3.5 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#journey"
                className="px-3.5 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors"
              >
                60-Day Roadmap
              </a>
              <a
                href="#proof"
                className="px-3.5 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors"
              >
                Proof Grid
              </a>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive('/')
                    ? 'bg-zinc-800/80 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive('/dashboard')
                    ? 'bg-zinc-800/80 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/day/12"
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive('/day/12')
                    ? 'bg-zinc-800/80 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Day 12 Task
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
                className="text-xs font-bold text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                Student Log In
              </Link>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-extrabold text-xs shadow-md shadow-orange-950/40 transition-all flex items-center gap-1 active:scale-95"
              >
                <span>Start Challenge</span>
              </Link>
            </>
          ) : (
            <>
              {/* Late Night Ambient Indicator */}
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>🌙 Late Night Session</span>
              </span>

              {/* Streak Counter Badge */}
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:border-amber-500/60 transition-all hover:scale-105"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse-flame" />
                <span>{streakCount} DAY STREAK</span>
              </Link>

              {/* Profile Badge */}
              <Link href="/dashboard" className="flex items-center gap-2 pl-1 group">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-orange-500/40 group-hover:ring-orange-500 transition-all">
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
