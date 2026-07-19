import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { LogEntry } from '../types';
import { formatDuration, formatTimeOfDay } from '../utils/helpers';
import { DURATIONS } from '../data/durations';

interface LogRowProps {
  entry: LogEntry;
  index: number;
}

/**
 * A single row in the Daily Log — shows mode label, time, duration, and status.
 */
export function LogRow({ entry, index }: LogRowProps) {
  const isCompleted = entry.status === 'completed';
  const modeLabel = DURATIONS.find(d => d.id === entry.mode)?.label ?? entry.title;

  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -1.5, borderColor: isCompleted ? 'rgba(52, 211, 153, 0.25)' : 'rgba(251, 113, 133, 0.25)' }}
      className="
        relative flex items-center justify-between
        py-3.5 px-5 rounded-2xl border
        transition-all duration-300
      "
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 2px 8px var(--shadow)',
      }}
    >
      {/* Timeline Bullet Node (responsive center alignment) */}
      <span
        className="timeline-dot"
        style={{
          '--dot-color': isCompleted ? 'var(--success)' : 'var(--danger)',
          '--dot-subtle': isCompleted ? 'var(--success-subtle)' : 'var(--danger-subtle)',
        } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* Left — title, meta */}
      <div className="flex items-center min-w-0">
        <div className="min-w-0">
          <p
            className="font-bold text-sm truncate"
            style={{ color: 'var(--text)' }}
          >
            {modeLabel}
          </p>
          <p
            className="text-xs font-medium mt-0.5"
            style={{ color: 'var(--text-muted)' }}
          >
            {formatTimeOfDay(new Date(entry.startTime))}
            {' · '}
            {formatDuration(entry.duration)}
          </p>
        </div>
      </div>

      {/* Right — status badge */}
      <div
        className="shrink-0 flex items-center gap-1 ml-3 px-2.5 py-1 rounded-lg text-xs font-bold capitalize select-none border"
        style={{
          background: isCompleted ? 'var(--success-subtle)' : 'var(--danger-subtle)',
          color: isCompleted ? 'var(--success)' : 'var(--danger)',
          borderColor: isCompleted ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 113, 133, 0.15)',
        }}
      >
        {isCompleted ? (
          <CheckCircle2 size={12} aria-hidden="true" />
        ) : (
          <XCircle size={12} aria-hidden="true" />
        )}
        {entry.status}
      </div>
    </motion.li>
  );
}
