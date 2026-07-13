import type { LogEntry } from '../types';

/** Formats seconds into MM:SS string */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Formats minutes into human-readable duration */
export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes} min`;
}

/** Formats a Date into "9:10 AM" style */
export function formatTimeOfDay(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** Generates a unique ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Calculates total focus time today from completed entries */
export function calculateTodayTotal(entries: LogEntry[]): string {
  const today = new Date().toDateString();
  const totalMinutes = entries
    .filter(e => new Date(e.startTime).toDateString() === today && e.status === 'completed')
    .reduce((acc, e) => acc + e.duration, 0);

  if (totalMinutes === 0) return '0 min';
  return formatDuration(totalMinutes);
}

/** Calculates the current consecutive streak (days with ≥1 completed session) */
export function calculateStreak(entries: LogEntry[]): number {
  if (entries.length === 0) return 0;

  const completedDays = new Set(
    entries
      .filter(e => e.status === 'completed')
      .map(e => new Date(e.startTime).toDateString()),
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (completedDays.has(d.toDateString())) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
