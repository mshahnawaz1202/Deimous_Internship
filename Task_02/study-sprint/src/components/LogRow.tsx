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
      className="
        flex items-center justify-between
        py-4 px-5 rounded-xl
      "
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Left — dot, title, meta */}
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="shrink-0 w-2 h-2 rounded-full"
          style={{
            background: isCompleted ? 'var(--success)' : 'var(--danger)',
          }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p
            className="font-semibold text-sm truncate"
            style={{ color: 'var(--text)' }}
          >
            {modeLabel}
          </p>
          <p
            className="text-xs mt-0.5"
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
        className="shrink-0 flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
        style={{
          background: isCompleted ? 'var(--success-subtle)' : 'var(--danger-subtle)',
          color: isCompleted ? 'var(--success)' : 'var(--danger)',
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
