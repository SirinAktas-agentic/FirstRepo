'use strict';
// Saf mantık: tarih işlemleri, ajanda üretimi, telafi (rollover), seviye hesabı.
// Kalıcılığa dokunmaz; store.js tarafından kullanılır.

(function () {
  const DAY_NAMES_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const MONTH_NAMES_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  function toISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }
  function parseISODate(iso) {
    const p = iso.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function addDays(iso, days) {
    const d = parseISODate(iso);
    d.setDate(d.getDate() + days);
    return toISODate(d);
  }
  function isWeekendDate(iso) {
    const day = parseISODate(iso).getDay();
    return day === 0 || day === 6;
  }
  function dayNameTR(iso) { return DAY_NAMES_TR[parseISODate(iso).getDay()]; }
  function formatDisplayDate(iso) {
    const d = parseISODate(iso);
    return d.getDate() + ' ' + MONTH_NAMES_TR[d.getMonth()];
  }
  function startOfWeekMonday(iso) {
    const day = parseISODate(iso).getDay();
    return addDays(iso, day === 0 ? -6 : 1 - day);
  }
  function todayISO() { return toISODate(new Date()); }
  function compareISO(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
  function weekDatesFrom(ws) { return Array.from({ length: 7 }, (_, i) => addDays(ws, i)); }
  function weekRangeLabel(ws) { return formatDisplayDate(ws) + ' - ' + formatDisplayDate(addDays(ws, 6)); }
  function datesInRange(start, end) {
    const out = [];
    let c = start;
    while (compareISO(c, end) <= 0) { out.push(c); c = addDays(c, 1); }
    return out;
  }

  function computeLevelInfo(totalPoints, pointsPerLevel) {
    const level = Math.floor(totalPoints / pointsPerLevel) + 1;
    const progress = totalPoints % pointsPerLevel;
    return { level: level, progress: progress, pointsToNext: pointsPerLevel - progress };
  }
  function levelTitle(level, titles) {
    return titles[Math.min(level - 1, titles.length - 1)];
  }

  function shuffle(items) {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function createCycler(items) {
    let queue = [];
    return function () {
      if (queue.length === 0) queue = shuffle(items);
      return queue.shift();
    };
  }
  function epochDays(iso) { return Math.floor(parseISODate(iso).getTime() / 86400000); }

  let idSeq = 0;
  function makeTaskId(date) {
    idSeq += 1;
    return 't_' + date + '_' + idSeq + '_' + Math.random().toString(36).slice(2, 7);
  }

  // startSeq: küresel görev sırasını korumak için ilk seq değeri.
  function generateScheduleRows(startDate, endDate, content, startSeq) {
    const rows = [];
    const subjectCyclers = {};
    content.subjectOrder.forEach(function (s) { subjectCyclers[s] = createCycler(content.subjectTasks[s]); });
    const activityCycler = createCycler(content.weekendActivities);

    let cursor = startDate;
    let seq = startSeq || 0;

    while (compareISO(cursor, endDate) <= 0) {
      if (isWeekendDate(cursor)) {
        for (let i = 0; i < 3; i++) {
          const a = activityCycler();
          rows.push({ id: makeTaskId(cursor), date: cursor, originalDate: cursor, subject: a.category, title: a.title, kind: 'activity', completed: false, rolledOver: false, seq: seq++ });
        }
      } else {
        const wi = epochDays(cursor) % content.subjectOrder.length;
        for (let o = 0; o < 3; o++) {
          const subject = content.subjectOrder[(wi + o) % content.subjectOrder.length];
          rows.push({ id: makeTaskId(cursor), date: cursor, originalDate: cursor, subject: subject, title: subjectCyclers[subject](), kind: 'homework', completed: false, rolledOver: false, seq: seq++ });
        }
      }
      cursor = addDays(cursor, 1);
    }
    return { rows: rows, nextSeq: seq };
  }

  window.Logic = {
    toISODate: toISODate, parseISODate: parseISODate, addDays: addDays,
    isWeekendDate: isWeekendDate, dayNameTR: dayNameTR, formatDisplayDate: formatDisplayDate,
    startOfWeekMonday: startOfWeekMonday, todayISO: todayISO, compareISO: compareISO,
    weekDatesFrom: weekDatesFrom, weekRangeLabel: weekRangeLabel, datesInRange: datesInRange,
    computeLevelInfo: computeLevelInfo, levelTitle: levelTitle,
    generateScheduleRows: generateScheduleRows,
  };
})();
