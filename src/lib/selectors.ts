import { AgendaTask, AppState, WeekPlan } from '../types';
import { weekDatesFrom } from './dateUtils';

export function tasksForDate(state: AppState, date: string): AgendaTask[] {
  return Object.values(state.tasks)
    .filter((task) => task.date === date)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function tasksForWeek(state: AppState, week: WeekPlan): AgendaTask[] {
  const dates = new Set(weekDatesFrom(week.weekStart));
  return Object.values(state.tasks).filter((task) => dates.has(task.date));
}

export function weekStats(state: AppState, week: WeekPlan): { total: number; completed: number } {
  const tasks = tasksForWeek(state, week);
  return { total: tasks.length, completed: tasks.filter((t) => t.completed).length };
}

export function dayStats(state: AppState, date: string): { total: number; completed: number } {
  const tasks = tasksForDate(state, date);
  return { total: tasks.length, completed: tasks.filter((t) => t.completed).length };
}
