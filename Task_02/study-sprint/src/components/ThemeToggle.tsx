import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Theme toggle button — switches between light and dark mode
 * with an animated icon transition.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="
        flex items-center gap-2
        px-3 py-2 rounded-xl
        text-sm font-semibold
        cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      "
      style={{
        background: 'var(--surface-2)',
        color: 'var(--text-muted)',
        border: '1px solid var(--border)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="dark"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate:  60, scale: 0.6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex items-center gap-1.5"
          >
            <Moon size={14} aria-hidden="true" />
            Dark
          </motion.span>
        ) : (
          <motion.span
            key="light"
            initial={{ opacity: 0, rotate:  60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate: -60, scale: 0.6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex items-center gap-1.5"
          >
            <Sun size={14} aria-hidden="true" />
            Light
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
