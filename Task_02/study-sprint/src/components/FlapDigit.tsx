import { AnimatePresence, motion } from 'framer-motion';

interface FlapDigitProps {
  char: string;
}

/**
 * Single split-flap digit tile with rotateX flip animation.
 */
export function FlapDigit({ char }: FlapDigitProps) {
  return (
    <div
      className="relative"
      style={{ perspective: '800px' }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={char}
          initial={{ rotateX: -85, opacity: 0 }}
          animate={{ rotateX: 0,   opacity: 1 }}
          exit={{    rotateX:  85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          style={{
            transformOrigin: 'center center',
            background: 'var(--digit-bg)',
            color: 'var(--digit-text)',
            boxShadow: '0 12px 28px var(--digit-shadow), inset 0 2px 4px rgba(255,255,255,0.08), 0 0 0 1px var(--digit-line)',
          }}
          className="
            relative
            w-20 h-[104px]
            sm:w-24 sm:h-[128px]
            rounded-xl
            flex items-center justify-center
            font-mono text-6xl sm:text-7xl font-bold
            select-none
          "
        >
          {char}

          {/* Split-flap centre line */}
          <span
            className="absolute inset-x-0 top-1/2 pointer-events-none"
            style={{
              height: '1px',
              background: 'var(--digit-line)',
              transform: 'translateY(-50%)',
              boxShadow: '0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          />

          {/* Left hinge notch */}
          <span
            className="absolute left-0 top-1/2 w-1.5 h-3 rounded-r-sm pointer-events-none -translate-y-1/2"
            style={{ background: 'var(--digit-line)' }}
          />

          {/* Right hinge notch */}
          <span
            className="absolute right-0 top-1/2 w-1.5 h-3 rounded-l-sm pointer-events-none -translate-y-1/2"
            style={{ background: 'var(--digit-line)' }}
          />

          {/* Top-half gloss sheen */}
          <span
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
