'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Code2, Sparkles } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Day 12', path: '/day/12', icon: Code2 },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080A0C]/95 backdrop-blur-xl border-t border-[#242A30] px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all ${
                isActive
                  ? 'text-[#F5F3EE] bg-[#151A1F] font-semibold border border-[#242A30]'
                  : 'text-[#9BA3AA] hover:text-[#F5F3EE]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8F2D0]' : 'text-[#9BA3AA]'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-[#B8F2D0] animate-pulse" />
                )}
              </div>
              <span className="text-[10px] tracking-wide font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
