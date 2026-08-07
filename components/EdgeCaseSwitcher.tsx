'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

export type EdgeCaseMode = 'normal' | 'new' | 'missed' | 'empty';

interface EdgeCaseSwitcherProps {
  currentMode: EdgeCaseMode;
  onModeChange: (mode: EdgeCaseMode) => void;
}

export const EdgeCaseSwitcher: React.FC<EdgeCaseSwitcherProps> = ({
  currentMode,
  onModeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: { id: EdgeCaseMode; label: string; desc: string }[] = [
    { id: 'normal', label: 'Normal (Day 12)', desc: '12-Day active streak & completed history' },
    { id: 'new', label: 'New User', desc: '0-Day streak initial state' },
    { id: 'missed', label: 'Missed Day', desc: 'Streak paused & recovery CTA' },
    { id: 'empty', label: 'Empty Profile', desc: 'Fallback default values without errors' },
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen ? (
        <div className="hardware-card-elevated p-4 shadow-2xl w-72 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-3 border-b border-[#242A30] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8F2D0]">
              <SlidersHorizontal className="w-4 h-4 text-[#B8F2D0]" />
              <span>JUDGE INSPECTOR & EDGE CASES</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9BA3AA] hover:text-[#F5F3EE] text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#101418] border border-[#242A30]"
            >
              Close
            </button>
          </div>

          <div className="space-y-1.5">
            {options.map((opt) => {
              const isSelected = currentMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    onModeChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-[#101418] border-[#B8F2D0]/50 text-[#B8F2D0] font-semibold'
                      : 'bg-[#080A0C] border-[#242A30] text-[#9BA3AA] hover:bg-[#101418]'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>{opt.label}</span>
                    </div>
                    <div className="text-[10px] text-[#9BA3AA] font-normal mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#B8F2D0] shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2 rounded-full bg-[#151A1F]/90 hover:bg-[#242A30] border border-[#B8F2D0]/30 text-[#B8F2D0] text-xs font-mono font-bold shadow-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Test Edge Cases</span>
          <span className="w-2 h-2 rounded-full bg-[#B8F2D0] animate-pulse" />
        </button>
      )}
    </div>
  );
};
