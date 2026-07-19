import { motion } from 'framer-motion';
import { DURATIONS } from '../data/durations';
import type { TimerMode } from '../types';

interface DurationSelectorProps {
  selected: TimerMode;
  onSelect: (mode: TimerMode) => void;
  disabled?: boolean;
}

/**
 * Pill-style tab row for selecting the sprint duration mode.
 */
export function DurationSelector({
  selected,
  onSelect,
  disabled = false,
}: DurationSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Select sprint duration"
      className="flex gap-1.5 p-1 rounded-xl relative"
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
      }}
    >
      {DURATIONS.map(d => {
        const isActive = selected === d.id;
        return (
          <button
            key={d.id}
            onClick={() => !disabled && onSelect(d.id)}
            disabled={disabled}
            aria-pressed={isActive}
            className="
              relative flex-1 py-2 px-3 sm:px-4 rounded-lg
              text-xs sm:text-sm font-bold
              transition-colors duration-250 select-none
              flex flex-col items-center justify-center
            "
            style={{
              color: isActive ? 'var(--primary-fg)' : 'var(--text-muted)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.45 : 1,
              fontFamily: 'inherit',
            }}
          >
            {/* Sliding background pill */}
            {isActive && (
              <motion.div
                layoutId="activeDurationPill"
                className="absolute inset-0 rounded-lg shadow-[0_2px_8px_rgba(99,102,241,0.2)] dark:shadow-[0_2px_12px_rgba(139,92,246,0.25)]"
                style={{
                  background: 'var(--primary-gradient)',
                  zIndex: 0,
                }}
                transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              />
            )}

            {/* Label and Subtext positioned relatively above background pill */}
            <span className="relative z-10">{d.label}</span>
            <span
              className="relative z-10 block text-[9px] sm:text-[10px] font-medium mt-0.5 opacity-80"
              aria-label={`${d.minutes} minutes`}
            >
              {d.minutes}m
            </span>
          </button>
        );
      })}
    </div>
  );
}
