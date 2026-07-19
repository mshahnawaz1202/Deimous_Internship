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
      <div className="flex items-center justify-between mb-4 px-1">
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Today's Log
        </h2>
        {todayEntries.length > 0 && (
          <span
            className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full select-none"
            style={{
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              border: '1px solid var(--border)',
            }}
          >
            {todayEntries.length} session{todayEntries.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {todayEntries.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            flex flex-col items-center justify-center
            py-14 rounded-2xl text-center gap-3
          "
          style={{
            background: 'var(--surface)',
            border: '1.5px dashed var(--border)',
            boxShadow: '0 4px 12px var(--shadow)',
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BookOpen
              size={32}
              style={{ color: 'var(--text-faint)' }}
              aria-hidden="true"
            />
          </motion.div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
              No sessions logged today
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
              Start a sprint above to trace your history here
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="relative ml-2 sm:ml-4 pl-6 sm:pl-8">
          {/* Vertical connecting timeline line */}
          <div
            className="absolute top-5 bottom-5 left-0 w-[1.5px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, var(--primary), var(--border-2) 70%, transparent)',
            }}
          />
          <ul className="flex flex-col gap-3" aria-label="Session history">
            <AnimatePresence initial={false}>
              {todayEntries.map((entry, index) => (
                <LogRow key={entry.id} entry={entry} index={index} />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </motion.section>
  );
}
