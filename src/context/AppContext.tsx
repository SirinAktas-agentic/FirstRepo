import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AgendaTask, AppSettings, AppState, AvatarConfig, MotivationEvent, POINTS_PER_TASK } from '../types';
import { generateSchedule } from '../lib/scheduleGenerator';
import { applyRollover } from '../lib/rollover';
import { loadState, saveState } from '../lib/storage';
import { computeLevelInfo } from '../lib/gamification';
import { addDays, todayISO } from '../lib/dateUtils';
import { LEVEL_UP_MESSAGES, TASK_MOTIVATION_MESSAGES } from '../data/motivation';
import { DEFAULT_AVATAR_CONFIG } from '../data/avatarOptions';

const DEFAULT_SUMMER_LENGTH_DAYS = 56;

function defaultSettings(): AppSettings {
  const start = todayISO();
  return { childName: 'Mine', startDate: start, endDate: addDays(start, DEFAULT_SUMMER_LENGTH_DAYS) };
}

function freshState(settings: AppSettings, avatar: AvatarConfig = DEFAULT_AVATAR_CONFIG): AppState {
  const { tasks, weeks } = generateSchedule(settings.startDate, settings.endDate);
  return {
    settings,
    tasks,
    weeks,
    gamification: { totalPoints: 0, completedCount: 0 },
    lastRolloverDate: todayISO(),
    avatar,
  };
}

interface AppContextValue {
  state: AppState;
  toggleTask: (id: string) => void;
  updateSettings: (settings: AppSettings) => void;
  updateAvatar: (avatar: AvatarConfig) => void;
  resetProgress: () => void;
  motivationEvent: MotivationEvent | null;
  clearMotivationEvent: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState | null>(null);
  const [motivationEvent, setMotivationEvent] = useState<MotivationEvent | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await loadState();
      const today = todayISO();
      const base = stored ?? freshState(defaultSettings());
      const rolled = applyRollover(base.tasks, base.weeks, base.settings, today);
      const initial: AppState = {
        ...base,
        tasks: rolled.tasks,
        weeks: rolled.weeks,
        settings: rolled.settings,
        lastRolloverDate: today,
        avatar: base.avatar ?? DEFAULT_AVATAR_CONFIG,
      };
      setState(initial);
      saveState(initial);
    })();
  }, []);

  useEffect(() => {
    if (state) {
      saveState(state);
    }
  }, [state]);

  const toggleTask = useCallback((id: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const task = prev.tasks[id];
      if (!task) return prev;

      const completed = !task.completed;
      const updatedTask: AgendaTask = {
        ...task,
        completed,
        completedAt: completed ? new Date().toISOString() : undefined,
      };

      const prevLevel = computeLevelInfo(prev.gamification.totalPoints).level;
      const pointsDelta = completed ? POINTS_PER_TASK : -POINTS_PER_TASK;
      const totalPoints = Math.max(0, prev.gamification.totalPoints + pointsDelta);
      const completedCount = Math.max(0, prev.gamification.completedCount + (completed ? 1 : -1));
      const newLevel = computeLevelInfo(totalPoints).level;

      if (completed) {
        const leveledUp = newLevel > prevLevel;
        const pool = leveledUp ? LEVEL_UP_MESSAGES : TASK_MOTIVATION_MESSAGES;
        const message = pool[Math.floor(Math.random() * pool.length)];
        setMotivationEvent({
          id: `${id}_${Date.now()}`,
          message,
          leveledUp,
          newLevel: leveledUp ? newLevel : undefined,
        });
      }

      return {
        ...prev,
        tasks: { ...prev.tasks, [id]: updatedTask },
        gamification: { totalPoints, completedCount },
      };
    });
  }, []);

  const updateSettings = useCallback((settings: AppSettings) => {
    setState((prev) => freshState(settings, prev?.avatar));
  }, []);

  const updateAvatar = useCallback((avatar: AvatarConfig) => {
    setState((prev) => (prev ? { ...prev, avatar } : prev));
  }, []);

  const resetProgress = useCallback(() => {
    setState((prev) => freshState(prev ? prev.settings : defaultSettings(), prev?.avatar));
  }, []);

  const clearMotivationEvent = useCallback(() => setMotivationEvent(null), []);

  if (!state) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Mine'nin ajandası hazırlanıyor...</Text>
      </View>
    );
  }

  const value: AppContextValue = {
    state,
    toggleTask,
    updateSettings,
    updateAvatar,
    resetProgress,
    motivationEvent,
    clearMotivationEvent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp, AppProvider içinde kullanılmalı');
  return ctx;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF7FF',
    gap: 12,
  },
  loadingText: {
    color: '#6B21A8',
    fontSize: 16,
  },
});
