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
      className="flex gap-1 p-1 rounded-xl"
      style={{ background: 'var(--surface-2)' }}
    >
      {DURATIONS.map(d => {
        const isActive = selected === d.id;
        return (
          <motion.button
            key={d.id}
            whileHover={!disabled && !isActive ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => !disabled && onSelect(d.id)}
            disabled={disabled}
            aria-pressed={isActive}
            className="
              flex-1 py-2 px-3 sm:px-4 rounded-lg
              text-xs sm:text-sm font-semibold
              transition-colors duration-200
            "
            style={{
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'var(--primary-fg)' : 'var(--text-muted)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.55 : 1,
              fontFamily: 'inherit',
            }}
          >
            {d.label}
            <span
              className="block text-[10px] font-normal mt-0.5 opacity-75"
              aria-label={`${d.minutes} minutes`}
            >
              {d.minutes}m
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
