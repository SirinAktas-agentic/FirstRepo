import { ReadingBook } from '../types';

// Kaynak: Koç Okulu Ortaokul, 5.'ten 6.'ya geçiş 2026-2027 yaz tatili öneri
// dosyaları (Türkçe, İngilizce, Matematik, Fen Bilimleri, Sosyal Bilgiler,
// İspanyolca bölümleri).

export const READING_LIST: ReadingBook[] = [
  // Türkçe — (*) işaretli kitap zorunlu, ayrıca listeden en az 2 kitap daha okunmalı.
  {
    id: 'tr-1',
    subject: 'Türkçe',
    title: "Son Ada'nın Çocukları",
    author: 'Zülfü Livaneli',
    status: 'zorunlu',
    note: "Yol haritası var: yazarı tanı, ekosistem/besin zinciri/sürdürülebilirlik araştır, Freiburg belgeselini izle, ülkemizin biyoçeşitliliğini araştır, Munch'ın 'Çığlık' tablosuyla bağlantı kur.",
  },
  { id: 'tr-2', subject: 'Türkçe', title: 'Bir Genç Kızın Defteri 1', author: 'İpek Ongun', status: 'secmeli' },
  { id: 'tr-3', subject: 'Türkçe', title: 'Büyülü Çember', author: 'Susanna Tamaro', status: 'secmeli' },
  { id: 'tr-4', subject: 'Türkçe', title: 'Çalınan Kent', author: 'Gülsevin Kıral', status: 'secmeli' },
  { id: 'tr-5', subject: 'Türkçe', title: 'Çöp Plaza', author: 'Miyase Sertbarut', status: 'secmeli' },
  { id: 'tr-6', subject: 'Türkçe', title: "Distopya'ya Yolculuk", author: 'Şöhret Doğruyol Sağbaş', status: 'secmeli' },
  { id: 'tr-7', subject: 'Türkçe', title: 'Ustam, Ben ve Beyaz Fil', author: 'Elif Şafak', status: 'secmeli' },
  {
    id: 'tr-8',
    subject: 'Türkçe',
    title: 'Denizler Altında Yirmi Bin Fersah',
    author: 'Jules Verne',
    status: 'secmeli',
  },
  { id: 'tr-9', subject: 'Türkçe', title: 'Suda Kaybolmak', author: 'Vladimir Tumanov', status: 'secmeli' },
  { id: 'tr-10', subject: 'Türkçe', title: 'Bach Yürürken', author: 'Göknil Genç', status: 'secmeli' },
  { id: 'tr-11', subject: 'Türkçe', title: 'Masal Masal İçinde', author: 'Ahmet Ümit', status: 'secmeli' },
  { id: 'tr-12', subject: 'Türkçe', title: 'Şimşek Hırsızı', author: 'Rick Riordan', status: 'secmeli' },
  { id: 'tr-13', subject: 'Türkçe', title: 'Uçan Sınıf', author: 'Erich Kästner', status: 'secmeli' },
  {
    id: 'tr-14',
    subject: 'Türkçe',
    title: "Cumhuriyet'in İlk Sabahı",
    author: 'Şermin Yaşar & İlber Ortaylı',
    status: 'secmeli',
  },

  // İngilizce — Fing zorunlu, myON mitoloji serisi tamamen opsiyonel.
  { id: 'en-1', subject: 'İngilizce', title: 'Fing', author: 'David Walliams', status: 'zorunlu' },
  {
    id: 'en-2',
    subject: 'İngilizce',
    title: 'Keep a Lid on It, Pandora!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },
  {
    id: 'en-3',
    subject: 'İngilizce',
    title: 'Nice Shot, Cupid!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },
  {
    id: 'en-4',
    subject: 'İngilizce',
    title: 'Phone Home, Persephone!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },
  {
    id: 'en-5',
    subject: 'İngilizce',
    title: 'Get to Work, Hercules!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },
  {
    id: 'en-6',
    subject: 'İngilizce',
    title: 'Go for the Gold, Atalanta!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },
  {
    id: 'en-7',
    subject: 'İngilizce',
    title: 'Have a Hot Time, Hades!',
    author: 'Kate McMullan',
    status: 'opsiyonel',
    note: 'myON, mitoloji temalı.',
  },

  // Matematik — kitap + 2 ek etkinlikle birlikte bir paket.
  {
    id: 'mat-1',
    subject: 'Matematik',
    title: 'Sayıların Korsanları (Matematik Çılgını serisi)',
    author: 'Haz: Linda Bertola / Çizer: Agnese Baruzzi',
    status: 'zorunlu',
    note: 'Kesir/yüzde/ondalık sayı temalı. Kitap tek başına yeterli değil: sayılarla korsan çizimi + kart oyunu tasarımı etkinlikleriyle tamamlanmalı.',
  },

  // Fen Bilimleri — listeden 1 kitap seçilip poster çalışması yapılacak.
  { id: 'fen-1', subject: 'Fen Bilimleri', title: 'Enerji', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },
  { id: 'fen-2', subject: 'Fen Bilimleri', title: 'Ormanlar', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },
  {
    id: 'fen-3',
    subject: 'Fen Bilimleri',
    title: 'Sürdürülebilir Kalkınma',
    author: '—',
    status: 'sec-bir',
    note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).',
  },
  {
    id: 'fen-4',
    subject: 'Fen Bilimleri',
    title: 'Gezegenimi Seviyorum',
    author: '—',
    status: 'sec-bir',
    note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).',
  },

  // Sosyal Bilgiler — serbest seçim.
  { id: 'sos-1', subject: 'Sosyal Bilgiler', title: "Eski Anadolu'yu Tanıyalım", author: 'Haldun Hürel', status: 'serbest' },
  { id: 'sos-2', subject: 'Sosyal Bilgiler', title: 'Anadolu Efsaneleri', author: 'Bilgin Adalı', status: 'serbest' },
  {
    id: 'sos-3',
    subject: 'Sosyal Bilgiler',
    title: 'Çocuklar İçin Anadolu Uygarlıkları',
    author: 'Ahmet Ümit',
    status: 'serbest',
  },
  { id: 'sos-4', subject: 'Sosyal Bilgiler', title: 'Anadolu Masalları', author: 'Süleyman Bulut', status: 'serbest' },
  { id: 'sos-5', subject: 'Sosyal Bilgiler', title: 'Tarihten Öyküler', author: 'Adnan Özyalçıner', status: 'serbest' },
  {
    id: 'sos-6',
    subject: 'Sosyal Bilgiler',
    title: 'Temel Kavramlarla Tarih / Dünya Tarihine Damga Vuran Olaylar ve Kişiler',
    author: 'Orpheus Books',
    status: 'serbest',
  },

  // İspanyolca — Nivel 1 zorunlu kitap + tekrar okunacak iki kitap.
  {
    id: 'esp-1',
    subject: 'İspanyolca',
    title: 'Abuelita Anita y El Balón',
    author: 'Jane Cadwallader',
    status: 'zorunlu',
    note: "Okuduktan sonra 'ficha de vocabulario' doldurulacak: yeni kelimeler + İngilizce/Türkçe karşılığı + resim + örnek cümle. Form saklanmalı, eylülde kontrol edilecek.",
  },
  {
    id: 'esp-2',
    subject: 'İspanyolca',
    title: 'Abuelita Anita y la cuerda amarilla',
    author: 'Jane Cadwallader',
    status: 'tekrar',
  },
  { id: 'esp-3', subject: 'İspanyolca', title: '¡A la playa!', author: 'Dominique Guillemant', status: 'tekrar' },
];
