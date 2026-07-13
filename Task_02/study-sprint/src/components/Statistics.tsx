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
