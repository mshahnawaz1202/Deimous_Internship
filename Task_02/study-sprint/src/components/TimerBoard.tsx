import { FlapDigit } from './FlapDigit';

interface TimerBoardProps {
  secondsLeft: number;
}

/**
 * Renders the countdown timer as four FlapDigit tiles (MM:SS).
 * Fully accessible with role="timer" and aria-live.
 */
export function TimerBoard({ secondsLeft }: TimerBoardProps) {
  const totalSeconds = Math.max(0, secondsLeft);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;

  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');

  const ariaLabel = `${m} minute${m !== 1 ? 's' : ''} and ${s} second${s !== 1 ? 's' : ''} remaining`;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
      className="flex items-center gap-2 sm:gap-3"
    >
      {/* Minutes */}
      <FlapDigit char={mm[0]} />
      <FlapDigit char={mm[1]} />

      {/* Colon separator */}
      <span
        className="font-mono text-5xl sm:text-6xl font-bold pb-1 select-none"
        style={{ color: 'var(--text-muted)' }}
        aria-hidden="true"
      >
        :
      </span>

      {/* Seconds */}
      <FlapDigit char={ss[0]} />
      <FlapDigit char={ss[1]} />
    </div>
  );
}
