import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkCheck, RotateCcw, Save, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { DurationSelector } from './DurationSelector';
import { TimerBoard } from './TimerBoard';
import { DURATIONS } from '../data/durations';
import type { TimerMode, TimerState } from '../types';

interface TimerCardProps {
  secondsLeft: number;
  timerState: TimerState;
  selectedMode: TimerMode;
  onSelectMode: (mode: TimerMode) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

function getStatusMessage(state: TimerState, mode: TimerMode): string {
  const label = DURATIONS.find(d => d.id === mode)?.label ?? 'Sprint';
  switch (state) {
    case 'idle':      return 'Ready when you are';
    case 'running':   return 'In progress…';
    case 'paused':    return 'Paused — take a breath';
    case 'completed': return `${label} Complete! 🎉`;
  }
}

export function TimerCard({
  secondsLeft,
  timerState,
  selectedMode,
  onSelectMode,
  onStart,
  onPause,
  onResume,
  onReset,
  onSave,
  onDiscard,
}: TimerCardProps) {
  const duration    = DURATIONS.find(d => d.id === selectedMode)!;
  const statusMsg   = getStatusMessage(timerState, selectedMode);
  const isIdle      = timerState === 'idle';
  const isRunning   = timerState === 'running';
  const isPaused    = timerState === 'paused';
  const isCompleted = timerState === 'completed';
  const isBusy      = isRunning || isPaused;

  // Dynamic glow depending on state
  const glowShadow = isRunning
    ? '0 16px 48px rgba(99, 102, 241, 0.12), 0 0 24px rgba(99, 102, 241, 0.08), 0 8px 32px var(--shadow)'
    : isPaused
    ? '0 16px 48px rgba(251, 113, 133, 0.08), 0 0 24px rgba(251, 113, 133, 0.05), 0 8px 32px var(--shadow)'
    : isCompleted
    ? '0 16px 48px rgba(52, 211, 153, 0.18), 0 0 24px rgba(52, 211, 153, 0.12), 0 8px 32px var(--shadow)'
    : '0 8px 32px var(--shadow)';

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      aria-label="Study timer"
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: glowShadow,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* ── Coloured accent bar with sliding gradient ───────────────── */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: '4px' }}
      >
        <motion.div
          animate={isRunning ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: isCompleted
              ? 'var(--success)'
              : isPaused
              ? 'linear-gradient(90deg, var(--primary), var(--danger))'
              : 'linear-gradient(90deg, var(--primary), #EC4899, var(--primary))',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-7 px-6 sm:px-10 py-8">

        {/* ── Status pill ──────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={statusMsg}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y:  6 }}
            transition={{ duration: 0.2 }}
            className="px-4.5 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 select-none"
            style={{
              background: 'var(--surface-2)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              boxShadow: 'inset 0 1px 2px var(--shadow)',
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRunning ? 'animate-pulse' :
                isCompleted ? 'animate-bounce' :
                ''
              }`}
              style={{
                background: isRunning ? 'var(--primary)' :
                            isPaused ? 'var(--danger)' :
                            isCompleted ? 'var(--success)' :
                            'var(--text-faint)'
              }}
            />
            {statusMsg}
          </motion.div>
        </AnimatePresence>

        {/* ── Timer Display with inset well ────── */}
        <div
          className="w-full flex justify-center items-center py-10 sm:py-14 px-6 rounded-2xl relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.95), rgba(9, 10, 15, 0.98))',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Subtle grid pattern background overlay in the timer well */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          <div className="relative z-10">
            <TimerBoard secondsLeft={secondsLeft} />
          </div>
        </div>

        {/* ── Mode sub-label ───────────────────── */}
        <p className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-faint)' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{duration.label}</span>
          <span className="mx-2 opacity-40">·</span>
          {duration.minutes} minutes
        </p>

        {/* ── Duration Selector ────────────────── */}
        <div className="w-full">
          <DurationSelector
            selected={selectedMode}
            onSelect={onSelectMode}
            disabled={isBusy}
          />
        </div>

        {/* ── Action Buttons ───────────────────── */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              /* ── Completed state ── */
              <motion.div
                key="completed-actions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onSave}
                  className="flex-1"
                  aria-label="Save session to log"
                >
                  <Save size={15} aria-hidden="true" />
                  Save to Log
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={onDiscard}
                  className="flex-1"
                  aria-label="Discard session"
                >
                  <Trash2 size={15} aria-hidden="true" />
                  Discard
                </Button>
              </motion.div>
            ) : (
              /* ── Active state ── */
              <motion.div
                key="timer-actions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3 w-full"
              >
                {/* Primary CTA — grows to fill space */}
                <div className="flex-1">
                  {isIdle && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={onStart}
                      className="w-full"
                      aria-label={`Start ${duration.label} timer`}
                    >
                      <BookmarkCheck size={15} aria-hidden="true" />
                      Start {duration.label}
                    </Button>
                  )}
                  {isRunning && (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={onPause}
                      className="w-full"
                      aria-label="Pause timer"
                    >
                      Pause
                    </Button>
                  )}
                  {isPaused && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={onResume}
                      className="w-full"
                      aria-label="Resume timer"
                    >
                      Resume
                    </Button>
                  )}
                </div>

                {/* Reset — compact icon + label */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onReset}
                  aria-label="Reset timer"
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  Reset
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}
