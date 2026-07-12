export type TaskKind = 'homework' | 'activity';

export interface AgendaTask {
  id: string;
  date: string; // YYYY-MM-DD, currently scheduled day (may move via rollover)
  originalDate: string; // YYYY-MM-DD, first assigned day
  subject: string; // ders adı, ya da hafta sonu için 'Etkinlik'
  title: string;
  kind: TaskKind;
  completed: boolean;
  completedAt?: string; // ISO timestamp
  rolledOver: boolean;
}

export interface WeekPlan {
  weekStart: string; // Monday, YYYY-MM-DD
}

export interface AppSettings {
  childName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface GamificationState {
  totalPoints: number;
  completedCount: number;
}

export interface MotivationEvent {
  id: string;
  message: string;
  leveledUp: boolean;
  newLevel?: number;
}

export interface AppState {
  settings: AppSettings;
  tasks: Record<string, AgendaTask>;
  weeks: WeekPlan[];
  gamification: GamificationState;
  lastRolloverDate: string;
}

export const POINTS_PER_TASK = 5;
export const POINTS_PER_LEVEL = 30;
