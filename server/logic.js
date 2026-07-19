// Saf yardımcı fonksiyonlar: tarih işlemleri, seviye hesabı ve ajanda üretimi.
// Bu dosya veritabanına dokunmaz; içerik (dersler/etkinlikler) parametre olarak
// verilir, üretilen görev satırları döndürülür. Kalıcılık db.js'in işidir.

const DAY_NAMES_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const MONTH_NAMES_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso, days) {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function isWeekendDate(iso) {
  const day = parseISODate(iso).getDay();
  return day === 0 || day === 6;
}

export function dayNameTR(iso) {
  return DAY_NAMES_TR[parseISODate(iso).getDay()];
}

export function formatDisplayDate(iso) {
  const date = parseISODate(iso);
  return `${date.getDate()} ${MONTH_NAMES_TR[date.getMonth()]}`;
}

export function startOfWeekMonday(iso) {
  const date = parseISODate(iso);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  return addDays(iso, diffToMonday);
}

export function todayISO() {
  return toISODate(new Date());
}

export function compareISO(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function weekDatesFrom(weekStart) {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function weekRangeLabel(weekStart) {
  const sunday = addDays(weekStart, 6);
  return `${formatDisplayDate(weekStart)} - ${formatDisplayDate(sunday)}`;
}

// ---- Oyunlaştırma ----

export function computeLevelInfo(totalPoints, pointsPerLevel) {
  const level = Math.floor(totalPoints / pointsPerLevel) + 1;
  const progress = totalPoints % pointsPerLevel;
  return { level, progress, pointsToNext: pointsPerLevel - progress };
}

export function levelTitle(level, levelTitles) {
  const index = Math.min(level - 1, levelTitles.length - 1);
  return levelTitles[index];
}

// ---- Ajanda üretimi ----

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCycler(items) {
  let queue = [];
  return () => {
    if (queue.length === 0) queue = shuffle(items);
    return queue.shift();
  };
}

function epochDays(iso) {
  return Math.floor(parseISODate(iso).getTime() / 86400000);
}

function nextSubjectsForWeekdayIndex(weekdayIndex, subjectOrder) {
  const start = weekdayIndex % subjectOrder.length;
  return [0, 1, 2].map((offset) => subjectOrder[(start + offset) % subjectOrder.length]);
}

let idSeq = 0;
function makeTaskId(date) {
  idSeq += 1;
  return `t_${date}_${idSeq}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * content: {
 *   subjectOrder: string[],
 *   subjectTasks: { [subject]: string[] },   // ders başlığı dizisi
 *   weekendActivities: { category, title }[]
 * }
 * startSeq: bu üretimdeki ilk görevin seq değeri (küresel sıralamayı korumak için)
 * Döner: { rows: [...], weekStarts: string[], nextSeq }
 * rows: { id, date, original_date, subject, title, kind, seq }
 */
export function generateScheduleRows(startDate, endDate, content, startSeq = 0) {
  const rows = [];
  const subjectCyclers = Object.fromEntries(
    content.subjectOrder.map((subject) => [subject, createCycler(content.subjectTasks[subject])]),
  );
  const activityCycler = createCycler(content.weekendActivities);

  const weekStarts = new Set();
  let cursor = startDate;
  let seq = startSeq;

  while (compareISO(cursor, endDate) <= 0) {
    weekStarts.add(startOfWeekMonday(cursor));

    if (isWeekendDate(cursor)) {
      for (let i = 0; i < 3; i++) {
        const activity = activityCycler();
        rows.push({
          id: makeTaskId(cursor),
          date: cursor,
          original_date: cursor,
          subject: activity.category,
          title: activity.title,
          kind: 'activity',
          seq: seq++,
        });
      }
    } else {
      const weekdayIndex = epochDays(cursor) % content.subjectOrder.length;
      const subjects = nextSubjectsForWeekdayIndex(weekdayIndex, content.subjectOrder);
      for (const subject of subjects) {
        const title = subjectCyclers[subject]();
        rows.push({
          id: makeTaskId(cursor),
          date: cursor,
          original_date: cursor,
          subject,
          title,
          kind: 'homework',
          seq: seq++,
        });
      }
    }

    cursor = addDays(cursor, 1);
  }

  return { rows, weekStarts: Array.from(weekStarts).sort(compareISO), nextSeq: seq };
}

export function datesInRange(start, end) {
  const dates = [];
  let cursor = start;
  while (compareISO(cursor, end) <= 0) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}
