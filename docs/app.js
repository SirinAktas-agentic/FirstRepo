'use strict';

// ---- Küçük yardımcılar ----
const $ = (sel, root = document) => root.querySelector(sel);
const screen = $('#screen');
const tabbar = $('#tabbar');
const overlay = $('#overlay');
const L = window.Logic;

const SUBJECT_COLORS = {
  'Türkçe': '#DB2777', 'Matematik': '#2563EB', 'Fen Bilimleri': '#16A34A', 'Sosyal Bilgiler': '#D97706',
  'İngilizce': '#0EA5E9', 'İspanyolca': '#B45309', 'Din Kültürü ve Ahlak Bilgisi': '#7C3AED',
  'Bilişim Teknolojileri ve Yazılım': '#0891B2', 'Görsel Sanatlar': '#C026D3', 'Müzik': '#4338CA',
  'Beden Eğitimi ve Spor': '#65A30D', 'Rehberlik': '#F97316',
};
const STATUS_COLORS = { zorunlu: '#DC2626', secmeli: '#D97706', serbest: '#2563EB', tekrar: '#7C3AED', opsiyonel: '#6B7280', 'sec-bir': '#16A34A' };
const subjColor = (s) => SUBJECT_COLORS[s] || '#6B7280';

// ---- Durum ----
let state = null;
let currentTab = 'agenda';
const TABS = [
  { key: 'agenda', label: 'Ajanda', icon: '🗓️' },
  { key: 'reading', label: 'Okuma', icon: '📚' },
  { key: 'profile', label: 'Mine', icon: '⭐' },
  { key: 'settings', label: 'Ayarlar', icon: '⚙️' },
];

function refreshState() { state = window.Store.getState(); }

// ---- Avatar (SVG) ----
function avatarSVG(hairColor, hairStyle, level, size) {
  const acc = level >= 7 ? '👑' : level >= 5 ? '🕶️' : level >= 3 ? '🎀' : null;
  const sideHair = hairStyle === 'uzun'
    ? `<rect x="2" y="34" width="16" height="74" rx="8" fill="${hairColor}"/><rect x="102" y="34" width="16" height="74" rx="8" fill="${hairColor}"/>`
    : '';
  const ponytail = hairStyle === 'atkuyrugu'
    ? `<rect x="102" y="28" width="15" height="52" rx="7" fill="${hairColor}" transform="rotate(18 109 54)"/>` : '';
  const braid = hairStyle === 'orgu'
    ? `<rect x="12" y="44" width="12" height="60" rx="6" fill="${hairColor}" transform="rotate(8 18 74)"/>` : '';
  const accSvg = acc ? `<text x="86" y="18" font-size="30" text-anchor="middle">${acc}</text>` : '';
  return `<svg viewBox="-6 0 132 128" width="${size}" height="${size * 1.05}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar">
    ${sideHair}${ponytail}${braid}
    <ellipse cx="60" cy="38" rx="60" ry="40" fill="${hairColor}"/>
    <circle cx="60" cy="66" r="45" fill="#FFDBAC"/>
    <circle cx="46" cy="62" r="5.2" fill="#2D2D2D"/>
    <circle cx="74" cy="62" r="5.2" fill="#2D2D2D"/>
    <ellipse cx="40" cy="76" rx="7" ry="4.2" fill="#FFAFA3" opacity="0.7"/>
    <ellipse cx="80" cy="76" rx="7" ry="4.2" fill="#FFAFA3" opacity="0.7"/>
    <path d="M48 78 Q60 94 72 78 Z" fill="#B23A48"/>
    ${accSvg}
  </svg>`;
}

// ---- Tab bar ----
function renderTabbar() {
  tabbar.innerHTML = '';
  for (const t of TABS) {
    const b = document.createElement('button');
    b.className = 'tab' + (currentTab === t.key ? ' active' : '');
    b.innerHTML = `<span class="ico">${t.icon}</span><span class="lbl">${t.label}</span>`;
    b.addEventListener('click', () => { currentTab = t.key; render(); });
    tabbar.appendChild(b);
  }
}

// ---- Ajanda ----
function renderAgenda() {
  const today = state.today;
  const tasksByDate = {};
  for (const t of state.agenda) (tasksByDate[t.date] ||= []).push(t);

  const wrap = document.createElement('div');
  const top = document.createElement('div');
  top.className = 'topbar';
  top.innerHTML = `<h1>${escapeHtml(state.settings.childName)}'nin Yaz Ajandası</h1>`;
  const goBtn = document.createElement('button');
  goBtn.className = 'pill-btn';
  goBtn.textContent = 'Bugüne git';
  goBtn.addEventListener('click', () => {
    const el = document.getElementById('day-' + today);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  top.appendChild(goBtn);
  wrap.appendChild(top);

  const list = document.createElement('div');
  list.className = 'list';

  for (const ws of state.weeks) {
    const dates = L.weekDatesFrom(ws);
    const weekTasks = dates.flatMap((d) => tasksByDate[d] || []);
    if (weekTasks.length === 0) continue;
    const wc = weekTasks.filter((t) => t.completed).length;

    const head = document.createElement('div');
    head.className = 'section-head';
    head.innerHTML = `<span class="st">${L.weekRangeLabel(ws)}</span><span class="sc">${wc}/${weekTasks.length}</span>`;
    list.appendChild(head);

    for (const date of dates) {
      const dts = tasksByDate[date];
      if (!dts || dts.length === 0) continue;
      list.appendChild(dayCard(date, dts, date === today));
    }
  }
  wrap.appendChild(list);
  screen.appendChild(wrap);
}

function dayCard(date, tasks, isToday) {
  const completed = tasks.filter((t) => t.completed).length;
  const allDone = completed === tasks.length;
  const card = document.createElement('div');
  card.className = 'daycard' + (isToday ? ' today' : '');
  card.id = 'day-' + date;

  const head = document.createElement('div');
  head.className = 'dhead';
  head.innerHTML = `<div><div class="dname">${L.dayNameTR(date)}${isToday ? ' · Bugün' : ''}</div><div class="ddate">${L.formatDisplayDate(date)}</div></div>`
    + `<div class="status-pill${allDone ? ' done' : ''}">${completed}/${tasks.length}${allDone ? ' 🎉' : ''}</div>`;
  card.appendChild(head);

  for (const t of tasks) card.appendChild(taskRow(t));
  return card;
}

function taskRow(t) {
  const color = subjColor(t.subject);
  const row = document.createElement('div');
  row.className = 'row';
  const boxStyle = t.completed ? `background:${color};border-color:${color}` : '';
  row.innerHTML =
    `<div class="checkbox${t.completed ? ' on' : ''}" style="${boxStyle}">${t.completed ? '✓' : ''}</div>`
    + `<div class="body"><div class="meta">`
    + `<span class="dot" style="background:${color}"></span>`
    + `<span class="subj" style="color:${color}">${escapeHtml(t.subject)}</span>`
    + (t.rolledOver ? `<span class="badge-telafi">telafi</span>` : '')
    + `<span class="dur">· 30 dk</span></div>`
    + `<div class="title${t.completed ? ' done' : ''}">${escapeHtml(t.title)}</div></div>`;
  row.addEventListener('click', () => onToggleTask(t));
  return row;
}

// ---- Okuma ----
function renderReading() {
  const totalRead = state.reading.filter((b) => b.read).length;
  const wrap = document.createElement('div');
  const top = document.createElement('div');
  top.className = 'topbar';
  top.innerHTML = `<h1>Yaz Tatili Okuma Listesi</h1><span class="pill">${totalRead}/${state.reading.length} okundu</span>`;
  wrap.appendChild(top);

  const list = document.createElement('div');
  list.className = 'list';
  const groups = [];
  const idx = {};
  for (const b of state.reading) {
    if (!(b.subject in idx)) { idx[b.subject] = groups.length; groups.push({ subject: b.subject, books: [] }); }
    groups[idx[b.subject]].books.push(b);
  }
  for (const g of groups) {
    const read = g.books.filter((b) => b.read).length;
    const head = document.createElement('div');
    head.className = 'section-head';
    head.innerHTML = `<span class="st">${escapeHtml(g.subject)}</span><span class="sc">${read}/${g.books.length}</span>`;
    list.appendChild(head);
    for (const b of g.books) list.appendChild(bookCard(b));
  }
  wrap.appendChild(list);
  screen.appendChild(wrap);
}

function bookCard(b) {
  const color = STATUS_COLORS[b.status] || '#6B7280';
  const card = document.createElement('div');
  card.className = 'bookcard';
  const boxStyle = b.read ? `background:${color};border-color:${color}` : '';
  card.innerHTML =
    `<div class="checkbox${b.read ? ' on' : ''}" style="${boxStyle}">${b.read ? '✓' : ''}</div>`
    + `<div class="body">`
    + `<span class="book-badge" style="background:${color}">${escapeHtml(b.statusLabel)}</span>`
    + `<div class="book-title${b.read ? ' done' : ''}">${escapeHtml(b.title)}</div>`
    + `<div class="book-author">${escapeHtml(b.author)}</div>`
    + (b.note ? `<div class="book-note">${escapeHtml(b.note)}</div>` : '')
    + `</div>`;
  card.addEventListener('click', () => onToggleBook(b));
  return card;
}

// ---- Mine (profil) ----
function renderProfile() {
  const g = state.gamification;
  const av = state.avatar;
  const pad = document.createElement('div');
  pad.className = 'content-pad';

  const avatarCard = document.createElement('div');
  avatarCard.className = 'card avatar-card';
  avatarCard.innerHTML =
    avatarSVG(av.hairColor, av.hairStyle, g.level, 140)
    + `<div class="name">${escapeHtml(state.settings.childName)}</div>`
    + `<div class="lvl">Seviye ${g.level} · ${escapeHtml(g.levelTitle)}</div>`
    + `<div class="progress-wrap"><div class="progress-track"><div class="progress-fill" style="width:${(g.progress / state.meta.pointsPerLevel) * 100}%"></div></div>`
    + `<div class="progress-text">${g.progress}/${state.meta.pointsPerLevel} puan · sonraki seviyeye ${g.pointsToNext} puan</div></div>`;
  pad.appendChild(avatarCard);

  const stats = document.createElement('div');
  stats.className = 'stats';
  stats.innerHTML =
    `<div class="stat"><div class="v">${g.totalPoints}</div><div class="l">Toplam Puan</div></div>`
    + `<div class="stat"><div class="v">${g.completedCount}</div><div class="l">Tamamlanan Görev</div></div>`
    + `<div class="stat"><div class="v">${g.level}</div><div class="l">Seviye</div></div>`;
  pad.appendChild(stats);

  const custom = document.createElement('div');
  custom.className = 'card';
  custom.innerHTML = '<h3>Avatarını Özelleştir</h3><div class="field-label">Saç Rengi</div>';
  const sw = document.createElement('div');
  sw.className = 'swatches';
  for (const c of state.meta.hairColors) {
    const b = document.createElement('button');
    b.className = 'swatch' + (c.value === av.hairColor ? ' sel' : '');
    b.style.background = c.value;
    b.title = c.label;
    b.setAttribute('aria-label', c.label);
    b.textContent = c.value === av.hairColor ? '✓' : '';
    b.addEventListener('click', () => onSetAvatar(c.value, av.hairStyle));
    sw.appendChild(b);
  }
  custom.appendChild(sw);
  const sl = document.createElement('div');
  sl.className = 'field-label';
  sl.textContent = 'Saç Stili';
  custom.appendChild(sl);
  const pills = document.createElement('div');
  pills.className = 'pills';
  for (const st of state.meta.hairStyles) {
    const b = document.createElement('button');
    b.className = 'spill' + (st.value === av.hairStyle ? ' sel' : '');
    b.textContent = st.label;
    b.addEventListener('click', () => onSetAvatar(av.hairColor, st.value));
    pills.appendChild(b);
  }
  custom.appendChild(pills);
  pad.appendChild(custom);

  const info = document.createElement('div');
  info.className = 'card';
  info.innerHTML = '<h3>Nasıl puan kazanılır?</h3>'
    + `<p class="info-text">Her tamamlanan ödev veya etkinlik ${state.meta.pointsPerTask} puan kazandırır.</p>`
    + `<p class="info-text">${state.meta.pointsPerLevel} puan toplayınca bir seviye atlanır ve avatar gelişir.</p>`
    + '<p class="info-text">Bir gün tamamlanmazsa, kalan ödev/etkinlikler otomatik olarak sonraki günlere eklenir.</p>';
  pad.appendChild(info);

  screen.appendChild(pad);
}

// ---- Ayarlar ----
function renderSettings() {
  const s = state.settings;
  const pad = document.createElement('div');
  pad.style.padding = '16px';
  pad.innerHTML =
    `<div class="field-label-top">Çocuğun adı</div><input class="input" id="set-name" value="${escapeAttr(s.childName)}" />`
    + `<div class="field-label-top">Yaz başlangıcı</div><input class="input" id="set-start" value="${escapeAttr(s.startDate)}" autocapitalize="off" placeholder="2026-07-19" />`
    + `<div class="field-label-top">Yaz bitişi</div><input class="input" id="set-end" value="${escapeAttr(s.endDate)}" autocapitalize="off" placeholder="2026-09-13" />`
    + `<button class="save-btn" id="set-save">Kaydet ve Ajandayı Oluştur</button>`
    + `<div class="divider"></div>`
    + `<div class="field-label-top">Yedekleme</div>`
    + `<p class="helper">Veriler bu cihazın kendi deposunda saklanır. Başka cihaza taşımak ya da güvence için yedek alabilirsin.</p>`
    + `<button class="secondary-btn" id="set-export">Verileri İndir (yedek)</button>`
    + `<button class="secondary-btn" id="set-import">Yedekten Geri Yükle</button>`
    + `<input type="file" id="set-import-file" accept="application/json,.json" style="display:none" />`
    + `<div class="divider"></div>`
    + `<div class="field-label-top">İlerleme</div>`
    + `<p class="helper">Tarihleri değiştirmeden sadece görev tiklerini sıfırlamak istersen bu butonu kullan. (Okuma listesi işaretlerin korunur.)</p>`
    + `<button class="danger-btn" id="set-reset">İlerlemeyi Sıfırla</button>`;
  screen.appendChild(pad);

  $('#set-save').addEventListener('click', onSaveSettings);
  $('#set-reset').addEventListener('click', onReset);
  $('#set-export').addEventListener('click', onExport);
  $('#set-import').addEventListener('click', () => $('#set-import-file').click());
  $('#set-import-file').addEventListener('change', onImportFile);
}

// ---- Etkileşimler ----
function onToggleTask(t) {
  const res = window.Store.toggleTask(t.id);
  if (res.error) return;
  refreshState();
  render();
  if (res.motivation) showMotivation(res.motivation);
}

function onToggleBook(b) {
  const res = window.Store.toggleBook(b.id);
  if (res.error) return;
  refreshState();
  render();
}

function onSetAvatar(hairColor, hairStyle) {
  const res = window.Store.setAvatar(hairColor, hairStyle);
  if (res.error) return;
  refreshState();
  render();
}

function onSaveSettings() {
  const childName = $('#set-name').value;
  const startDate = $('#set-start').value.trim();
  const endDate = $('#set-end').value.trim();
  if (!confirm('Tarih aralığını değiştirmek ajandayı sıfırdan oluşturur ve görev ilerlemesi sıfırlanır. Devam edilsin mi?')) return;
  const res = window.Store.setSettings(childName, startDate, endDate);
  if (res.error) {
    const msgs = { name_required: 'Lütfen bir isim gir.', bad_date: 'Tarihleri YYYY-AA-GG biçiminde gir (ör. 2026-07-19).', bad_range: 'Bitiş tarihi başlangıçtan sonra olmalı.' };
    alert(msgs[res.error] || 'Bir hata oluştu.');
    return;
  }
  refreshState();
  currentTab = 'agenda';
  render();
}

function onReset() {
  if (!confirm('Tüm görev tikleri ve puanlar silinecek. Emin misin?')) return;
  window.Store.resetProgress();
  refreshState();
  render();
}

function onExport() {
  const blob = new Blob([window.Store.exportJson()], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mine-yaz-ajandasi-yedek-' + state.today + '.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

function onImportFile(ev) {
  const file = ev.target.files && ev.target.files[0];
  ev.target.value = '';
  if (!file) return;
  if (!confirm('Yedek geri yüklenince buradaki mevcut veriler yedekle DEĞİŞTİRİLİR. Devam edilsin mi?')) return;
  const reader = new FileReader();
  reader.onload = () => {
    const res = window.Store.importJson(String(reader.result));
    if (res.error) { alert('Yedek dosyası okunamadı ya da geçersiz.'); return; }
    refreshState();
    currentTab = 'agenda';
    render();
    alert('Yedek geri yüklendi.');
  };
  reader.readAsText(file);
}

// ---- Motivasyon overlay ----
let motivationTimer = null;
function showMotivation(m) {
  const av = state.avatar;
  const lvl = state.gamification.level;
  overlay.innerHTML =
    `<div class="overlay-card${m.leveledUp ? ' levelup' : ''}">`
    + avatarSVG(av.hairColor, av.hairStyle, lvl, 90)
    + (m.leveledUp ? `<div class="lvup">Seviye ${m.newLevel}!</div>` : '')
    + `<div class="msg">${escapeHtml(m.message)}</div></div>`;
  overlay.classList.remove('hidden');
  overlay.onclick = dismissMotivation;
  clearTimeout(motivationTimer);
  motivationTimer = setTimeout(dismissMotivation, m.leveledUp ? 3200 : 2000);
}
function dismissMotivation() { overlay.classList.add('hidden'); overlay.innerHTML = ''; }

// ---- Render dispatcher ----
function render() {
  const prevScroll = screen.scrollTop;
  screen.innerHTML = '';
  if (currentTab === 'agenda') renderAgenda();
  else if (currentTab === 'reading') renderReading();
  else if (currentTab === 'profile') renderProfile();
  else if (currentTab === 'settings') renderSettings();
  renderTabbar();
  screen.scrollTop = prevScroll;
}

// ---- Güvenli metin ----
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

// ---- Başlat ----
refreshState();
render();

// PWA: çevrimdışı çalışma için service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
