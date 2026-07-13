import { useCallback, useState } from 'react';
import { DailyLog } from './components/DailyLog';
import { Header } from './components/Header';
import { Statistics } from './components/Statistics';
import { TimerCard } from './components/TimerCard';
import { ThemeProvider } from './context/ThemeContext';
import { DURATIONS } from './data/durations';
import { useTimer } from './hooks/useTimer';
import type { LogEntry } from './types';
import { generateId } from './utils/helpers';

function AppContent() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const timer = useTimer({ onComplete: useCallback(() => {}, []) });

  const handleStart = useCallback(() => {
    setSessionStartTime(new Date());
    timer.start();
  }, [timer]);

  const addEntry = useCallback(
    (status: LogEntry['status']) => {
      const duration = DURATIONS.find(d => d.id === timer.selectedMode);
      const entry: LogEntry = {
        id: generateId(),
        title: duration?.label ?? 'Sprint',
        mode: timer.selectedMode,
        startTime: sessionStartTime ?? new Date(),
        duration: duration?.minutes ?? 25,
        status,
      };
      setLogEntries(prev => [entry, ...prev]);
      timer.reset();
    },
    [timer, sessionStartTime],
  );

  const handleSave    = useCallback(() => addEntry('completed'), [addEntry]);
  const handleDiscard = useCallback(() => addEntry('skipped'),   [addEntry]);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Subtle radial glow in the background */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, var(--primary-subtle) 0%, transparent 70%)',
        }}
      />

      <Header />

      <main
        className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6"
        style={{ maxWidth: '960px', paddingTop: '3.5rem', paddingBottom: '3rem' }}
      >
        {/* ── Timer + Stats row ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Timer Card — 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <TimerCard
              secondsLeft={timer.secondsLeft}
              timerState={timer.timerState}
              selectedMode={timer.selectedMode}
              onSelectMode={timer.selectMode}
              onStart={handleStart}
              onPause={timer.pause}
              onResume={timer.resume}
              onReset={timer.reset}
              onSave={handleSave}
              onDiscard={handleDiscard}
            />
          </div>

          {/* Statistics — 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <Statistics logEntries={logEntries} />
          </div>
        </div>

        {/* ── Daily Log — full width ─────────────── */}
        <DailyLog logEntries={logEntries} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
