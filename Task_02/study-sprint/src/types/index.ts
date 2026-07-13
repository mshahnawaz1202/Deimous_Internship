export type TimerMode = 'sprint' | 'deep' | 'break';
export type TimerState = 'idle' | 'running' | 'paused' | 'completed';
export type LogStatus = 'completed' | 'skipped';

export interface Duration {
  id: TimerMode;
  label: string;
  minutes: number;
}

export interface LogEntry {
  id: string;
  title: string;
  mode: TimerMode;
  startTime: Date;
  duration: number; // in minutes
  status: LogStatus;
}
