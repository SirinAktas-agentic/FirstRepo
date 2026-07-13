import { AgendaTask, WeekPlan } from '../types';
import { SUBJECT_ORDER, SUBJECT_TASKS, SubjectName, nextSubjectsForWeekdayIndex } from '../data/subjects';
import { WEEKEND_ACTIVITIES, WeekendActivity } from '../data/activities';
import { addDays, compareISO, isWeekendDate, parseISODate, startOfWeekMonday } from './dateUtils';

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCycler<T>(items: T[]): () => T {
  let queue: T[] = [];
  return () => {
    if (queue.length === 0) queue = shuffle(items);
    return queue.shift() as T;
  };
}

function epochDays(iso: string): number {
  return Math.floor(parseISODate(iso).getTime() / 86400000);
}

let idSeq = 0;
function makeTaskId(date: string): string {
  idSeq += 1;
  return `t_${date}_${idSeq}_${Math.random().toString(36).slice(2, 7)}`;
}

export function generateSchedule(
  startDate: string,
  endDate: string,
): { tasks: Record<string, AgendaTask>; weeks: WeekPlan[] } {
  const tasks: Record<string, AgendaTask> = {};
  const subjectCyclers = Object.fromEntries(
    SUBJECT_ORDER.map((subject) => [subject, createCycler(SUBJECT_TASKS[subject])]),
  ) as Record<SubjectName, () => { title: string }>;
  const activityCycler = createCycler<WeekendActivity>(WEEKEND_ACTIVITIES);

  const weekStarts = new Set<string>();
  let cursor = startDate;

  while (compareISO(cursor, endDate) <= 0) {
    weekStarts.add(startOfWeekMonday(cursor));

    if (isWeekendDate(cursor)) {
      for (let i = 0; i < 3; i++) {
        const activity = activityCycler();
        const id = makeTaskId(cursor);
        tasks[id] = {
          id,
          date: cursor,
          originalDate: cursor,
          subject: activity.subject,
          title: activity.title,
          kind: 'activity',
          completed: false,
          rolledOver: false,
        };
      }
    } else {
      const weekdayIndex = epochDays(cursor) % SUBJECT_ORDER.length;
      const subjects = nextSubjectsForWeekdayIndex(weekdayIndex);
      for (const subject of subjects) {
        const { title } = subjectCyclers[subject]();
        const id = makeTaskId(cursor);
        tasks[id] = {
          id,
          date: cursor,
          originalDate: cursor,
          subject,
          title,
          kind: 'homework',
          completed: false,
          rolledOver: false,
        };
      }
    }

    cursor = addDays(cursor, 1);
  }

  const weeks: WeekPlan[] = Array.from(weekStarts)
    .sort(compareISO)
    .map((weekStart) => ({ weekStart }));

  return { tasks, weeks };
}
