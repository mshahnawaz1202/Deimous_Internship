import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { LogRow } from './LogRow';
import type { LogEntry } from '../types';

interface DailyLogProps {
  logEntries: LogEntry[];
}

/**
 * Today's session log list with animated entries and an empty state.
 */
export function DailyLog({ logEntries }: DailyLogProps) {
  const today = new Date().toDateString();

  const todayEntries = [...logEntries]
    .filter(e => new Date(e.startTime).toDateString() === today)
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      aria-label="Daily session log"
    >
      {/* Heading row */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Today's Log
        </h2>
        {todayEntries.length > 0 && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
            }}
          >
            {todayEntries.length} session{todayEntries.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {todayEntries.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            flex flex-col items-center justify-center
            py-14 rounded-xl text-center gap-3
          "
          style={{
            background: 'var(--surface)',
            border: '1px dashed var(--border)',
          }}
        >
          <BookOpen
            size={28}
            style={{ color: 'var(--text-faint)' }}
            aria-hidden="true"
          />
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            No sessions yet
          </p>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            Start a sprint to see your progress here
          </p>
        </motion.div>
      ) : (
        <ul className="flex flex-col gap-2" aria-label="Session history">
          <AnimatePresence initial={false}>
            {todayEntries.map((entry, index) => (
              <LogRow key={entry.id} entry={entry} index={index} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.section>
  );
}
