import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Inner row — same max-width as <main> */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        style={{ maxWidth: '960px' }}
      >
        {/* ── Brand ───────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Pulsing accent dot */}
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: 'var(--primary)' }}
            aria-hidden="true"
          />
          <span
            className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase select-none"
            style={{ color: 'var(--text)' }}
          >
            Study Sprint
          </span>
        </div>

        {/* ── Theme Toggle ─────────────────────────── */}
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
