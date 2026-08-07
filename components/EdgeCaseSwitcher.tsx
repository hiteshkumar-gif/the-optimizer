'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

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
        <div className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-4 shadow-2xl w-72 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>JUDGE INSPECTOR & EDGE CASES</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800"
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
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-orange-500/20 border-orange-500 text-white font-semibold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-850'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>{opt.label}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-normal mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-orange-500/40 text-orange-400 text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Test Edge Cases</span>
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
        </button>
      )}
    </div>
  );
};
