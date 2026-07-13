import { AvatarConfig, HairStyle } from '../types';

export const HAIR_COLOR_OPTIONS: { label: string; value: string }[] = [
  { label: 'Kahverengi', value: '#7C4A25' },
  { label: 'Siyah', value: '#2B2B2B' },
  { label: 'Sarı', value: '#E8B84B' },
  { label: 'Kızıl', value: '#C2410C' },
  { label: 'Mor', value: '#9333EA' },
  { label: 'Pembe', value: '#DB2777' },
  { label: 'Mavi', value: '#0EA5E9' },
  { label: 'Yeşil', value: '#16A34A' },
];

export const HAIR_STYLE_OPTIONS: { label: string; value: HairStyle }[] = [
  { label: 'Kısa', value: 'kisa' },
  { label: 'Uzun', value: 'uzun' },
  { label: 'At Kuyruğu', value: 'atkuyrugu' },
  { label: 'Örgü', value: 'orgu' },
];

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  hairColor: HAIR_COLOR_OPTIONS[0].value,
  hairStyle: 'kisa',
};
