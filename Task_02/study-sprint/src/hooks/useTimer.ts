import { useCallback, useEffect, useRef, useState } from 'react';
import { DURATIONS } from '../data/durations';
import type { TimerMode, TimerState } from '../types';

interface UseTimerOptions {
  onComplete?: () => void;
}

export interface UseTimerReturn {
  secondsLeft: number;
  timerState: TimerState;
  selectedMode: TimerMode;
  selectMode: (mode: TimerMode) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer({ onComplete }: UseTimerOptions = {}): UseTimerReturn {
  const [selectedMode, setSelectedMode] = useState<TimerMode>('sprint');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref fresh without causing re-renders
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /** Shared tick logic used by start() and resume() */
  const startTicking = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setTimerState('completed');
          // Defer callback to avoid state update during render
          setTimeout(() => onCompleteRef.current?.(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const start = useCallback(() => {
    clearInterval_();
    setTimerState('running');
    startTicking();
  }, [clearInterval_, startTicking]);

  const pause = useCallback(() => {
    clearInterval_();
    setTimerState('paused');
  }, [clearInterval_]);

  const resume = useCallback(() => {
    setTimerState('running');
    startTicking();
  }, [startTicking]);

  const reset = useCallback(() => {
    clearInterval_();
    const duration = DURATIONS.find(d => d.id === selectedMode);
    setSecondsLeft((duration?.minutes ?? 25) * 60);
    setTimerState('idle');
  }, [clearInterval_, selectedMode]);

  const selectMode = useCallback(
    (mode: TimerMode) => {
      clearInterval_();
      setSelectedMode(mode);
      const duration = DURATIONS.find(d => d.id === mode);
      setSecondsLeft((duration?.minutes ?? 25) * 60);
      setTimerState('idle');
    },
    [clearInterval_],
  );

  // Cleanup on unmount
  useEffect(() => () => clearInterval_(), [clearInterval_]);

  return {
    secondsLeft,
    timerState,
    selectedMode,
    selectMode,
    start,
    pause,
    resume,
    reset,
  };
}
