// SQLite veri katmanı. Node'un yerleşik `node:sqlite` modülünü kullanır —
// hiçbir native bağımlılık/derleme yoktur. Tüm içerik ve kullanıcı durumu
// tek bir .db dosyasında yaşar; dosyayı taşımak veriyi taşır.

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import {
  SUBJECT_ORDER, SUBJECT_TASKS, WEEKEND_ACTIVITIES, READING_LIST, BOOK_STATUS_LABELS,
  TASK_MOTIVATION_MESSAGES, LEVEL_UP_MESSAGES, HAIR_COLOR_OPTIONS, HAIR_STYLE_OPTIONS,
  LEVEL_TITLES, POINTS_PER_TASK, POINTS_PER_LEVEL, DEFAULT_SUMMER_LENGTH_DAYS,
  DEFAULT_CHILD_NAME, DEFAULT_HAIR_COLOR, DEFAULT_HAIR_STYLE,
} from './seed-data.js';
import {
  addDays, compareISO, computeLevelInfo, datesInRange, generateScheduleRows,
  levelTitle, startOfWeekMonday, todayISO,
} from './logic.js';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS subjects (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS subject_tasks (
  id INTEGER PRIMARY KEY, subject_id INTEGER NOT NULL REFERENCES subjects(id),
  title TEXT NOT NULL, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS weekend_activities (
  id INTEGER PRIMARY KEY, category TEXT NOT NULL, title TEXT NOT NULL, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS reading_books (
  id TEXT PRIMARY KEY, subject TEXT NOT NULL, title TEXT NOT NULL, author TEXT NOT NULL,
  status TEXT NOT NULL, note TEXT, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS motivation_messages (
  id INTEGER PRIMARY KEY, kind TEXT NOT NULL, message TEXT NOT NULL, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS hair_colors (
  id INTEGER PRIMARY KEY, label TEXT NOT NULL, value TEXT NOT NULL, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS hair_styles (
  id INTEGER PRIMARY KEY, label TEXT NOT NULL, value TEXT NOT NULL, sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  child_name TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL,
  points_per_task INTEGER NOT NULL, points_per_level INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS avatar (
  id INTEGER PRIMARY KEY CHECK (id = 1), hair_color TEXT NOT NULL, hair_style TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS agenda_tasks (
  id TEXT PRIMARY KEY, date TEXT NOT NULL, original_date TEXT NOT NULL,
  subject TEXT NOT NULL, title TEXT NOT NULL, kind TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0, completed_at TEXT,
  rolled_over INTEGER NOT NULL DEFAULT 0, seq INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_agenda_date ON agenda_tasks(date);
CREATE TABLE IF NOT EXISTS book_read (
  book_id TEXT PRIMARY KEY REFERENCES reading_books(id), read INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT);
`;

export function openDatabase(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec(SCHEMA);
  seedIfEmpty(db);
  return db;
}

function getMeta(db, key) {
  const row = db.prepare('SELECT value FROM app_meta WHERE key = ?').get(key);
  return row ? row.value : null;
}
function setMeta(db, key, value) {
  db.prepare('INSERT INTO app_meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, value);
}

function contentFromDb(db) {
  const subjectOrder = db.prepare('SELECT name FROM subjects ORDER BY sort_order').all().map((r) => r.name);
  const subjectTasks = {};
  const taskStmt = db.prepare(
    'SELECT t.title FROM subject_tasks t JOIN subjects s ON s.id = t.subject_id WHERE s.name = ? ORDER BY t.sort_order',
  );
  for (const name of subjectOrder) {
    subjectTasks[name] = taskStmt.all(name).map((r) => r.title);
  }
  const weekendActivities = db
    .prepare('SELECT category, title FROM weekend_activities ORDER BY sort_order')
    .all();
  return { subjectOrder, subjectTasks, weekendActivities };
}

function insertScheduleRows(db, rows) {
  const stmt = db.prepare(
    `INSERT INTO agenda_tasks (id, date, original_date, subject, title, kind, completed, completed_at, rolled_over, seq)
     VALUES (?, ?, ?, ?, ?, ?, 0, NULL, 0, ?)`,
  );
  for (const r of rows) {
    stmt.run(r.id, r.date, r.original_date, r.subject, r.title, r.kind, r.seq);
  }
}

function seedIfEmpty(db) {
  const count = db.prepare('SELECT COUNT(*) AS c FROM subjects').get().c;
  if (count > 0) return;

  const tx = db.prepare('SELECT 1'); // no-op to keep linter calm
  db.exec('BEGIN');
  try {
    // Dersler + ödevler
    const subjStmt = db.prepare('INSERT INTO subjects (name, sort_order) VALUES (?, ?)');
    const taskStmt = db.prepare('INSERT INTO subject_tasks (subject_id, title, sort_order) VALUES (?, ?, ?)');
    SUBJECT_ORDER.forEach((name, i) => {
      const info = subjStmt.run(name, i);
      const subjectId = Number(info.lastInsertRowid);
      (SUBJECT_TASKS[name] || []).forEach((title, j) => taskStmt.run(subjectId, title, j));
    });

    // Hafta sonu etkinlikleri
    const actStmt = db.prepare('INSERT INTO weekend_activities (category, title, sort_order) VALUES (?, ?, ?)');
    WEEKEND_ACTIVITIES.forEach((a, i) => actStmt.run(a.category, a.title, i));

    // Okuma listesi + okundu durumları
    const bookStmt = db.prepare(
      'INSERT INTO reading_books (id, subject, title, author, status, note, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    );
    const readStmt = db.prepare('INSERT INTO book_read (book_id, read) VALUES (?, 0)');
    READING_LIST.forEach((b, i) => {
      bookStmt.run(b.id, b.subject, b.title, b.author, b.status, b.note ?? null, i);
      readStmt.run(b.id);
    });

    // Motivasyon mesajları
    const msgStmt = db.prepare('INSERT INTO motivation_messages (kind, message, sort_order) VALUES (?, ?, ?)');
    TASK_MOTIVATION_MESSAGES.forEach((m, i) => msgStmt.run('task', m, i));
    LEVEL_UP_MESSAGES.forEach((m, i) => msgStmt.run('levelup', m, i));

    // Avatar seçenekleri
    const hcStmt = db.prepare('INSERT INTO hair_colors (label, value, sort_order) VALUES (?, ?, ?)');
    HAIR_COLOR_OPTIONS.forEach((o, i) => hcStmt.run(o.label, o.value, i));
    const hsStmt = db.prepare('INSERT INTO hair_styles (label, value, sort_order) VALUES (?, ?, ?)');
    HAIR_STYLE_OPTIONS.forEach((o, i) => hsStmt.run(o.label, o.value, i));

    // Ayarlar + avatar (varsayılan)
    const start = todayISO();
    const end = addDays(start, DEFAULT_SUMMER_LENGTH_DAYS);
    db.prepare(
      'INSERT INTO settings (id, child_name, start_date, end_date, points_per_task, points_per_level) VALUES (1, ?, ?, ?, ?, ?)',
    ).run(DEFAULT_CHILD_NAME, start, end, POINTS_PER_TASK, POINTS_PER_LEVEL);
    db.prepare('INSERT INTO avatar (id, hair_color, hair_style) VALUES (1, ?, ?)').run(
      DEFAULT_HAIR_COLOR, DEFAULT_HAIR_STYLE,
    );

    // İlk ajandayı üret
    const content = contentFromDb(db);
    const { rows } = generateScheduleRows(start, end, content, 0);
    insertScheduleRows(db, rows);
    setMeta(db, 'lastRolloverDate', start);

    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  void tx;
}

function getSettings(db) {
  const r = db.prepare('SELECT * FROM settings WHERE id = 1').get();
  return {
    childName: r.child_name,
    startDate: r.start_date,
    endDate: r.end_date,
    pointsPerTask: r.points_per_task,
    pointsPerLevel: r.points_per_level,
  };
}

function getAvatar(db) {
  const r = db.prepare('SELECT hair_color, hair_style FROM avatar WHERE id = 1').get();
  return { hairColor: r.hair_color, hairStyle: r.hair_style };
}

function getGamification(db) {
  const settings = getSettings(db);
  const completedCount = db.prepare('SELECT COUNT(*) AS c FROM agenda_tasks WHERE completed = 1').get().c;
  const totalPoints = completedCount * settings.pointsPerTask;
  const info = computeLevelInfo(totalPoints, settings.pointsPerLevel);
  return {
    completedCount,
    totalPoints,
    level: info.level,
    progress: info.progress,
    pointsToNext: info.pointsToNext,
    levelTitle: levelTitle(info.level, LEVEL_TITLES),
  };
}

function regenerateSchedule(db, settings) {
  db.exec('DELETE FROM agenda_tasks');
  const content = contentFromDb(db);
  const { rows } = generateScheduleRows(settings.startDate, settings.endDate, content, 0);
  insertScheduleRows(db, rows);
  setMeta(db, 'lastRolloverDate', todayISO());
}

// Bugünden önceki tamamlanmamış görevleri ileri günlere taşır (telafi).
// Gerekirse ajandayı uzatır. Bir işlem içinde çalışır, değişirse true döner.
export function ensureRollover(db) {
  const today = todayISO();
  if (getMeta(db, 'lastRolloverDate') === today) return false;

  let settings = getSettings(db);
  const toMove = db
    .prepare('SELECT id FROM agenda_tasks WHERE completed = 0 AND date < ? ORDER BY seq')
    .all(today)
    .map((r) => r.id);

  db.exec('BEGIN');
  try {
    if (toMove.length > 0) {
      let futureDates = datesInRange(today, settings.endDate).filter((d) => compareISO(d, today) >= 0);
      let maxSeq = db.prepare('SELECT COALESCE(MAX(seq), -1) AS m FROM agenda_tasks').get().m;
      const content = contentFromDb(db);

      let guard = 0;
      while (futureDates.length * 2 < toMove.length && guard < 12) {
        const rangeStart = addDays(settings.endDate, 1);
        const rangeEnd = addDays(settings.endDate, 7);
        const { rows, nextSeq } = generateScheduleRows(rangeStart, rangeEnd, content, maxSeq + 1);
        insertScheduleRows(db, rows);
        maxSeq = nextSeq - 1;
        settings = { ...settings, endDate: rangeEnd };
        db.prepare('UPDATE settings SET end_date = ? WHERE id = 1').run(rangeEnd);
        futureDates = datesInRange(today, settings.endDate).filter((d) => compareISO(d, today) >= 0);
        guard += 1;
      }

      futureDates.sort(compareISO);
      const upd = db.prepare('UPDATE agenda_tasks SET date = ?, rolled_over = 1 WHERE id = ?');
      toMove.forEach((id, index) => {
        const target = futureDates[index % futureDates.length];
        upd.run(target, id);
      });
    }
    setMeta(db, 'lastRolloverDate', today);
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return true;
}

function getAgenda(db) {
  return db
    .prepare('SELECT id, date, original_date, subject, title, kind, completed, rolled_over FROM agenda_tasks ORDER BY seq')
    .all()
    .map((r) => ({
      id: r.id,
      date: r.date,
      originalDate: r.original_date,
      subject: r.subject,
      title: r.title,
      kind: r.kind,
      completed: !!r.completed,
      rolledOver: !!r.rolled_over,
    }));
}

function getReading(db) {
  return db
    .prepare(
      `SELECT b.id, b.subject, b.title, b.author, b.status, b.note, COALESCE(r.read, 0) AS read
       FROM reading_books b LEFT JOIN book_read r ON r.book_id = b.id
       ORDER BY b.sort_order`,
    )
    .all()
    .map((r) => ({
      id: r.id,
      subject: r.subject,
      title: r.title,
      author: r.author,
      status: r.status,
      statusLabel: BOOK_STATUS_LABELS[r.status] || r.status,
      note: r.note,
      read: !!r.read,
    }));
}

function getWeeks(db) {
  const dates = db.prepare('SELECT DISTINCT date FROM agenda_tasks').all().map((r) => r.date);
  const starts = new Set(dates.map((d) => startOfWeekMonday(d)));
  return Array.from(starts).sort(compareISO);
}

export function getState(db) {
  ensureRollover(db);
  const settings = getSettings(db);
  return {
    settings,
    avatar: getAvatar(db),
    today: todayISO(),
    gamification: getGamification(db),
    weeks: getWeeks(db),
    agenda: getAgenda(db),
    reading: getReading(db),
    meta: {
      hairColors: HAIR_COLOR_OPTIONS,
      hairStyles: HAIR_STYLE_OPTIONS,
      levelTitles: LEVEL_TITLES,
      bookStatusLabels: BOOK_STATUS_LABELS,
      pointsPerTask: settings.pointsPerTask,
      pointsPerLevel: settings.pointsPerLevel,
    },
  };
}

function randomMessage(db, kind) {
  const rows = db.prepare('SELECT message FROM motivation_messages WHERE kind = ? ORDER BY sort_order').all(kind);
  if (rows.length === 0) return '';
  return rows[Math.floor(Math.random() * rows.length)].message;
}

export function toggleTask(db, id) {
  const task = db.prepare('SELECT * FROM agenda_tasks WHERE id = ?').get(id);
  if (!task) return { error: 'not_found' };

  const settings = getSettings(db);
  const prevLevel = getGamification(db).level;
  const completed = task.completed ? 0 : 1;
  db.prepare('UPDATE agenda_tasks SET completed = ?, completed_at = ? WHERE id = ?').run(
    completed, completed ? new Date().toISOString() : null, id,
  );

  const gamification = getGamification(db);
  let motivation = null;
  if (completed) {
    const leveledUp = gamification.level > prevLevel;
    motivation = {
      message: randomMessage(db, leveledUp ? 'levelup' : 'task'),
      leveledUp,
      newLevel: leveledUp ? gamification.level : null,
    };
  }
  void settings;
  return {
    task: {
      id, completed: !!completed,
    },
    gamification,
    motivation,
  };
}

export function toggleBook(db, id) {
  const book = db.prepare('SELECT id FROM reading_books WHERE id = ?').get(id);
  if (!book) return { error: 'not_found' };
  const cur = db.prepare('SELECT read FROM book_read WHERE book_id = ?').get(id);
  const read = cur && cur.read ? 0 : 1;
  db.prepare('INSERT INTO book_read (book_id, read) VALUES (?, ?) ON CONFLICT(book_id) DO UPDATE SET read = excluded.read')
    .run(id, read);
  return { bookId: id, read: !!read };
}

export function setAvatar(db, hairColor, hairStyle) {
  const validColor = db.prepare('SELECT 1 FROM hair_colors WHERE value = ?').get(hairColor);
  const validStyle = db.prepare('SELECT 1 FROM hair_styles WHERE value = ?').get(hairStyle);
  if (!validColor || !validStyle) return { error: 'invalid' };
  db.prepare('UPDATE avatar SET hair_color = ?, hair_style = ? WHERE id = 1').run(hairColor, hairStyle);
  return { avatar: getAvatar(db) };
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function setSettings(db, childName, startDate, endDate) {
  if (!childName || !childName.trim()) return { error: 'name_required' };
  if (!DATE_RE.test(startDate) || !DATE_RE.test(endDate)) return { error: 'bad_date' };
  if (compareISO(startDate, endDate) >= 0) return { error: 'bad_range' };

  db.exec('BEGIN');
  try {
    db.prepare('UPDATE settings SET child_name = ?, start_date = ?, end_date = ? WHERE id = 1').run(
      childName.trim(), startDate, endDate,
    );
    regenerateSchedule(db, { startDate, endDate });
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return { ok: true };
}

export function resetProgress(db) {
  const settings = getSettings(db);
  db.exec('BEGIN');
  try {
    regenerateSchedule(db, settings);
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return { ok: true };
}
