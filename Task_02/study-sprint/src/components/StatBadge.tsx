import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface StatBadgeProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function StatBadge({ label, value, icon }: StatBadgeProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 10px 28px var(--shadow-md)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex items-center gap-4 px-5 py-4 rounded-xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px var(--shadow)',
      }}
    >
      {/* Icon badge */}
      {icon && (
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'var(--primary-subtle)',
            color: 'var(--primary)',
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="min-w-0">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-0.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <p
          className="text-xl font-bold leading-tight truncate"
          style={{ color: 'var(--text)' }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}
