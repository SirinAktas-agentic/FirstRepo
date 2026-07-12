export type TaskKind = 'homework' | 'activity';

export interface AgendaTask {
  id: string;
  date: string; // YYYY-MM-DD, currently scheduled day (may move via rollover)
  originalDate: string; // YYYY-MM-DD, first assigned day
  subject: string; // ders adı, ya da hafta sonu etkinlikleri için ilgili bölüm (Rehberlik, Görsel Sanatlar, vb.)
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

export type HairStyle = 'kisa' | 'uzun' | 'atkuyrugu' | 'orgu';

export interface AvatarConfig {
  hairColor: string;
  hairStyle: HairStyle;
}

export type BookStatus = 'zorunlu' | 'secmeli' | 'serbest' | 'tekrar' | 'opsiyonel' | 'sec-bir';

export interface ReadingBook {
  id: string;
  subject: string;
  title: string;
  author: string;
  status: BookStatus;
  note?: string;
}

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  zorunlu: 'Zorunlu',
  secmeli: 'Seçmeli (en az 2)',
  serbest: 'Serbest Seçim',
  tekrar: 'Tekrar Okunacak',
  opsiyonel: 'Opsiyonel',
  'sec-bir': 'Listeden 1 Tanesi',
};

export interface AppState {
  settings: AppSettings;
  tasks: Record<string, AgendaTask>;
  weeks: WeekPlan[];
  gamification: GamificationState;
  lastRolloverDate: string;
  avatar: AvatarConfig;
  readBooks: Record<string, boolean>;
}

export const POINTS_PER_TASK = 5;
export const POINTS_PER_LEVEL = 30;
