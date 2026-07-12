import { POINTS_PER_LEVEL } from '../types';

export interface LevelInfo {
  level: number;
  progress: number; // bu seviye içindeki puan (0..POINTS_PER_LEVEL-1)
  pointsToNext: number;
}

export function computeLevelInfo(totalPoints: number): LevelInfo {
  const level = Math.floor(totalPoints / POINTS_PER_LEVEL) + 1;
  const progress = totalPoints % POINTS_PER_LEVEL;
  return { level, progress, pointsToNext: POINTS_PER_LEVEL - progress };
}

export const LEVEL_TITLES = ['Çırak', 'Kaşif', 'Gezgin', 'Uzman', 'Şampiyon', 'Yıldız', 'Efsane'];

export function levelTitle(level: number): string {
  const index = Math.min(level - 1, LEVEL_TITLES.length - 1);
  return LEVEL_TITLES[index];
}
