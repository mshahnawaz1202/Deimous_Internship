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
      whileHover={{
        y: -3,
        boxShadow: '0 12px 30px var(--shadow-md)',
        borderColor: 'rgba(99, 102, 241, 0.25)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors duration-300"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px var(--shadow)',
      }}
    >
      {/* Icon badge */}
      {icon && (
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{
            background: 'var(--primary-subtle)',
            color: 'var(--primary)',
            borderColor: 'var(--border)',
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="min-w-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <p
          className="text-lg sm:text-xl font-extrabold leading-tight truncate"
          style={{ color: 'var(--text)' }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}
