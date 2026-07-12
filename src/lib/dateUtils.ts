const DAY_NAMES_TR = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
];

const MONTH_NAMES_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function isWeekendDate(iso: string): boolean {
  const day = parseISODate(iso).getDay();
  return day === 0 || day === 6;
}

export function dayNameTR(iso: string): string {
  return DAY_NAMES_TR[parseISODate(iso).getDay()];
}

export function formatDisplayDate(iso: string): string {
  const date = parseISODate(iso);
  return `${date.getDate()} ${MONTH_NAMES_TR[date.getMonth()]}`;
}

export function formatDisplayDateLong(iso: string): string {
  return `${dayNameTR(iso)}, ${formatDisplayDate(iso)}`;
}

// Monday of the week containing `iso`.
export function startOfWeekMonday(iso: string): string {
  const date = parseISODate(iso);
  const day = date.getDay(); // 0=Sun..6=Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  return addDays(iso, diffToMonday);
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function compareISO(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function weekDatesFrom(weekStart: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function weekRangeLabel(weekStart: string): string {
  const sunday = addDays(weekStart, 6);
  return `${formatDisplayDate(weekStart)} - ${formatDisplayDate(sunday)}`;
}
