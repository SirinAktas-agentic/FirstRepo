import { AgendaTask, AppSettings, WeekPlan } from '../types';
import { addDays, compareISO } from './dateUtils';
import { generateSchedule } from './scheduleGenerator';

export interface RolloverResult {
  tasks: Record<string, AgendaTask>;
  weeks: WeekPlan[];
  settings: AppSettings;
  changed: boolean;
}

function datesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  let cursor = start;
  while (compareISO(cursor, end) <= 0) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function mergeWeeks(a: WeekPlan[], b: WeekPlan[]): WeekPlan[] {
  const seen = new Set(a.map((w) => w.weekStart));
  const merged = [...a];
  for (const week of b) {
    if (!seen.has(week.weekStart)) {
      merged.push(week);
      seen.add(week.weekStart);
    }
  }
  return merged.sort((x, y) => compareISO(x.weekStart, y.weekStart));
}

// O gün ya da o haftası tamamen geçmiş olup tamamlanmamış görevleri bulur,
// bunları önümüzdeki günlere (gerekirse yeni haftalar üreterek) dağıtır.
export function applyRollover(
  tasks: Record<string, AgendaTask>,
  weeks: WeekPlan[],
  settings: AppSettings,
  todayStr: string,
): RolloverResult {
  // O günü geçmiş (bugünden önceki) her gün, tamamlanmadıysa "kaçırılmış" sayılır.
  const isDayElapsed = (date: string) => compareISO(date, todayStr) < 0;

  const toMove = Object.values(tasks).filter((task) => !task.completed && isDayElapsed(task.date));

  if (toMove.length === 0) {
    return { tasks, weeks, settings, changed: false };
  }

  const nextTasks: Record<string, AgendaTask> = { ...tasks };
  let nextWeeks = weeks;
  let nextSettings = settings;

  let futureDates = datesInRange(todayStr, nextSettings.endDate).filter(
    (d) => compareISO(d, todayStr) >= 0,
  );

  let guard = 0;
  while (futureDates.length * 2 < toMove.length && guard < 12) {
    const rangeStart = addDays(nextSettings.endDate, 1);
    const rangeEnd = addDays(nextSettings.endDate, 7);
    const extension = generateSchedule(rangeStart, rangeEnd);
    Object.assign(nextTasks, extension.tasks);
    nextWeeks = mergeWeeks(nextWeeks, extension.weeks);
    nextSettings = { ...nextSettings, endDate: rangeEnd };
    futureDates = datesInRange(todayStr, nextSettings.endDate).filter((d) => compareISO(d, todayStr) >= 0);
    guard += 1;
  }

  futureDates.sort(compareISO);

  toMove.forEach((task, index) => {
    const targetDate = futureDates[index % futureDates.length];
    nextTasks[task.id] = { ...task, date: targetDate, rolledOver: true };
  });

  return { tasks: nextTasks, weeks: nextWeeks, settings: nextSettings, changed: true };
}
