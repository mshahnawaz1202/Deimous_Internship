import { motion } from 'framer-motion';
import { Clock, Flame, Zap } from 'lucide-react';
import { StatBadge } from './StatBadge';
import type { LogEntry } from '../types';
import { calculateStreak, calculateTodayTotal } from '../utils/helpers';

interface StatisticsProps {
  logEntries: LogEntry[];
}

export function Statistics({ logEntries }: StatisticsProps) {
  const today = new Date().toDateString();

  const todayCompleted = logEntries.filter(
    e =>
      new Date(e.startTime).toDateString() === today &&
      e.status === 'completed',
  );

  const todayTotal  = calculateTodayTotal(logEntries);
  const streak      = calculateStreak(logEntries);
  const sprintCount = todayCompleted.length;
  const targetSprints = 4;
  const progressPercent = Math.min(100, Math.round((sprintCount / targetSprints) * 100));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      aria-label="Productivity statistics"
      className="flex flex-col gap-3"
    >
      {/* Heading */}
      <h2
        className="text-xs font-semibold uppercase tracking-widest px-1"
        style={{ color: 'var(--text-muted)' }}
      >
        Today's Stats
      </h2>

      {/* Target Progress Card */}
      <div
        className="rounded-2xl p-4.5 flex items-center justify-between relative overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 18px var(--shadow)',
        }}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
            Daily Goal
          </span>
          <span className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>
            {sprintCount >= targetSprints ? 'Goal Reached! 🚀' : `${sprintCount} of ${targetSprints} Sprints`}
          </span>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {progressPercent}% completed
          </span>
        </div>

        {/* Circular progress SVG */}
        <div className="relative w-12 h-12 shrink-0 flex items-center justify-center select-none">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="19"
              stroke="var(--border)"
              strokeWidth="3.5"
              fill="transparent"
            />
            {/* Active circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="19"
              stroke="url(#stats-gradient)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 19}
              initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 19 * (1 - progressPercent / 100) }}
              transition={{ duration: 1, ease: 'easeOut' }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="stats-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-[10px] font-extrabold" style={{ color: 'var(--text)' }}>
            {progressPercent}%
          </span>
        </div>
      </div>

      <StatBadge
        label="Focus Time"
        value={todayTotal}
        icon={<Clock size={16} />}
      />
      <StatBadge
        label="Streak"
        value={streak > 0 ? `${streak} day${streak !== 1 ? 's' : ''}` : '0 days'}
        icon={<Flame size={16} />}
      />
      <StatBadge
        label="Sprints"
        value={String(sprintCount)}
        icon={<Zap size={16} />}
      />
    </motion.section>
  );
}
