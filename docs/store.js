'use strict';
// Kalıcılık katmanı: tüm kullanıcı durumu cihazın kendi deposunda
// (localStorage) tutulur — sunucu ve veritabanı gerekmez. Ajanda yalnızca ilk
// açılışta (ya da kullanıcı ayarlardan isteyince) üretilir; sonrasında sıra ve
// içerik cihazda sabit kalır. Uygulama güncellemeleri mevcut veriyi bozmaz.

(function () {
  const L = window.Logic;
  const D = window.DATA;
  const KEY = 'mine_yaz_ajandasi_v3';

  let state = null; // { settings, avatar, agenda, readBooks, lastRolloverDate }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* depo dolu/kapalıysa sessiz geç */ }
  }

  function contentFromData() {
    return {
      subjectOrder: D.SUBJECT_ORDER,
      subjectTasks: D.SUBJECT_TASKS,
      weekendActivities: D.WEEKEND_ACTIVITIES,
    };
  }

  function freshState(settings, avatar, readBooks) {
    const gen = L.generateScheduleRows(settings.startDate, settings.endDate, contentFromData(), 0);
    return {
      settings: settings,
      avatar: avatar || { hairColor: D.HAIR_COLOR_OPTIONS[0].value, hairStyle: 'kisa' },
      agenda: gen.rows,
      readBooks: readBooks || {},
      lastRolloverDate: L.todayISO(),
    };
  }

  function defaultSettings() {
    const start = L.todayISO();
    return {
      childName: D.DEFAULT_CHILD_NAME,
      startDate: start,
      endDate: L.addDays(start, D.DEFAULT_SUMMER_LENGTH_DAYS),
    };
  }

  // Bugünden önceki tamamlanmamış görevleri ileri günlere dağıt (telafi).
  function applyRollover() {
    const today = L.todayISO();
    if (state.lastRolloverDate === today) return;

    const toMove = state.agenda.filter(function (t) { return !t.completed && L.compareISO(t.date, today) < 0; });
    if (toMove.length > 0) {
      let futureDates = L.datesInRange(today, state.settings.endDate);
      let maxSeq = state.agenda.reduce(function (m, t) { return Math.max(m, t.seq); }, -1);

      let guard = 0;
      while (futureDates.length * 2 < toMove.length && guard < 12) {
        const rangeStart = L.addDays(state.settings.endDate, 1);
        const rangeEnd = L.addDays(state.settings.endDate, 7);
        const gen = L.generateScheduleRows(rangeStart, rangeEnd, contentFromData(), maxSeq + 1);
        state.agenda = state.agenda.concat(gen.rows);
        maxSeq = gen.nextSeq - 1;
        state.settings.endDate = rangeEnd;
        futureDates = L.datesInRange(today, state.settings.endDate);
        guard += 1;
      }

      futureDates.sort(L.compareISO);
      toMove.forEach(function (task, index) {
        task.date = futureDates[index % futureDates.length];
        task.rolledOver = true;
      });
    }
    state.lastRolloverDate = today;
    save();
  }

  function init() {
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(KEY)); } catch (e) { stored = null; }
    if (stored && stored.settings && Array.isArray(stored.agenda)) {
      state = stored;
    } else {
      state = freshState(defaultSettings());
    }
    applyRollover();
    save();
  }

  function gamification() {
    const completedCount = state.agenda.filter(function (t) { return t.completed; }).length;
    const totalPoints = completedCount * D.POINTS_PER_TASK;
    const info = L.computeLevelInfo(totalPoints, D.POINTS_PER_LEVEL);
    return {
      completedCount: completedCount,
      totalPoints: totalPoints,
      level: info.level,
      progress: info.progress,
      pointsToNext: info.pointsToNext,
      levelTitle: L.levelTitle(info.level, D.LEVEL_TITLES),
    };
  }

  function getState() {
    const weeks = [];
    const seen = {};
    state.agenda.forEach(function (t) {
      const ws = L.startOfWeekMonday(t.date);
      if (!seen[ws]) { seen[ws] = true; weeks.push(ws); }
    });
    weeks.sort(L.compareISO);

    const reading = D.READING_LIST.map(function (b) {
      return {
        id: b.id, subject: b.subject, title: b.title, author: b.author,
        status: b.status, statusLabel: D.BOOK_STATUS_LABELS[b.status] || b.status,
        note: b.note, read: !!state.readBooks[b.id],
      };
    });

    return {
      settings: state.settings,
      avatar: state.avatar,
      today: L.todayISO(),
      gamification: gamification(),
      weeks: weeks,
      agenda: state.agenda.slice().sort(function (a, b) { return a.seq - b.seq; }),
      reading: reading,
      meta: {
        hairColors: D.HAIR_COLOR_OPTIONS,
        hairStyles: D.HAIR_STYLE_OPTIONS,
        pointsPerTask: D.POINTS_PER_TASK,
        pointsPerLevel: D.POINTS_PER_LEVEL,
      },
    };
  }

  function randomOf(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function toggleTask(id) {
    const task = state.agenda.find(function (t) { return t.id === id; });
    if (!task) return { error: 'not_found' };
    const prevLevel = gamification().level;
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    save();

    const g = gamification();
    let motivation = null;
    if (task.completed) {
      const leveledUp = g.level > prevLevel;
      motivation = {
        message: randomOf(leveledUp ? D.LEVEL_UP_MESSAGES : D.TASK_MOTIVATION_MESSAGES),
        leveledUp: leveledUp,
        newLevel: leveledUp ? g.level : null,
      };
    }
    return { task: { id: id, completed: task.completed }, gamification: g, motivation: motivation };
  }

  function toggleBook(id) {
    const exists = D.READING_LIST.some(function (b) { return b.id === id; });
    if (!exists) return { error: 'not_found' };
    state.readBooks[id] = !state.readBooks[id];
    save();
    return { bookId: id, read: !!state.readBooks[id] };
  }

  function setAvatar(hairColor, hairStyle) {
    const okColor = D.HAIR_COLOR_OPTIONS.some(function (o) { return o.value === hairColor; });
    const okStyle = D.HAIR_STYLE_OPTIONS.some(function (o) { return o.value === hairStyle; });
    if (!okColor || !okStyle) return { error: 'invalid' };
    state.avatar = { hairColor: hairColor, hairStyle: hairStyle };
    save();
    return { avatar: state.avatar };
  }

  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  function setSettings(childName, startDate, endDate) {
    if (!childName || !childName.trim()) return { error: 'name_required' };
    if (!DATE_RE.test(startDate) || !DATE_RE.test(endDate)) return { error: 'bad_date' };
    if (L.compareISO(startDate, endDate) >= 0) return { error: 'bad_range' };
    state = freshState(
      { childName: childName.trim(), startDate: startDate, endDate: endDate },
      state.avatar,
      state.readBooks,
    );
    save();
    return { ok: true };
  }

  function resetProgress() {
    state = freshState(state.settings, state.avatar, state.readBooks);
    save();
    return { ok: true };
  }

  // Yedekleme: tüm durumu dosya olarak indir / geri yükle.
  function exportJson() {
    return JSON.stringify({ app: 'mine-yaz-ajandasi', version: 3, exportedAt: new Date().toISOString(), state: state }, null, 2);
  }
  function importJson(text) {
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { return { error: 'bad_json' }; }
    const s = parsed && parsed.state;
    if (!s || !s.settings || !Array.isArray(s.agenda)) return { error: 'bad_backup' };
    state = s;
    applyRollover();
    save();
    return { ok: true };
  }

  init();

  window.Store = {
    getState: getState, toggleTask: toggleTask, toggleBook: toggleBook,
    setAvatar: setAvatar, setSettings: setSettings, resetProgress: resetProgress,
    exportJson: exportJson, importJson: importJson,
  };
})();
