// Kaynak: Koç Okulu Ortaokul 2026-2027 yaz tatili önerileri — Rehberlik ve
// Psikolojik Danışma (RPD) etkinlik listesi, Bilişim Teknolojileri ve Yazılım,
// Görsel Sanatlar, Müzik, Beden Eğitimi ve Spor bölümleri.

export interface WeekendActivity {
  subject: string;
  title: string;
}

const BILISIM: WeekendActivity[] = [
  { subject: 'Bilişim Teknolojileri ve Yazılım', title: "Scratch'te \"Getting Started\" eğitimini tamamla" },
  { subject: 'Bilişim Teknolojileri ve Yazılım', title: "Google'ın Interland oyununu oyna (dijital vatandaşlık)" },
  { subject: 'Bilişim Teknolojileri ve Yazılım', title: "Code.org'da \"Frozen\" ile kodlamaya giriş dersini tamamla" },
  { subject: 'Bilişim Teknolojileri ve Yazılım', title: 'Scratch\'te öğrendiklerinle kendi kısa oyununu/animasyonunu tasarla' },
  { subject: 'Bilişim Teknolojileri ve Yazılım', title: "Interland'de başka bir bölüm daha oyna" },
];

const GORSEL_SANATLAR: WeekendActivity[] = [
  { subject: 'Görsel Sanatlar', title: 'Bir sergi ya da müze gez (gerçek ya da sanal)' },
  { subject: 'Görsel Sanatlar', title: 'Denk gelirsen bir sanat atölyesi/workshopa katıl' },
  { subject: 'Görsel Sanatlar', title: 'Gördüğün bir sanat eserini incele, sana ne hissettirdiğini yaz' },
  { subject: 'Görsel Sanatlar', title: 'Bulunduğun bölgedeki bir ören yerini ziyaret et' },
];

const MUZIK: WeekendActivity[] = [
  { subject: 'Müzik', title: 'Ailenle birlikte bir müzikal film izle' },
  { subject: 'Müzik', title: "İzlediğin müzikal hakkında kısa bir araştırma yap (kim yazmış, ne zaman sahnelenmiş)" },
  { subject: 'Müzik', title: 'Sevdiğin bir müzikalin şarkılarından birini dinle ve sözlerini incele' },
];

const BEDEN_EGITIMI: WeekendActivity[] = [
  { subject: 'Beden Eğitimi ve Spor', title: 'Açık havada 30 dakika oyun oyna' },
  { subject: 'Beden Eğitimi ve Spor', title: 'Bisiklete bin' },
  { subject: 'Beden Eğitimi ve Spor', title: 'İp atla' },
  { subject: 'Beden Eğitimi ve Spor', title: 'Top oyunu oyna (aile ya da arkadaşlarınla)' },
  { subject: 'Beden Eğitimi ve Spor', title: 'Mümkünse yüzmeye git' },
  { subject: 'Beden Eğitimi ve Spor', title: 'Ailenle beden eğitimi dersinde öğrendiğiniz bir hareketli oyunu oynayın' },
];

// RPD (Rehberlik ve Psikolojik Danışma) — "Etkinliğini yap, işaretle!" listesi.
const REHBERLIK: WeekendActivity[] = [
  'Üç ağaç türü öğrenmek',
  'Müze ziyareti yapmak',
  'Bir bilim insanının hayatını araştırmak',
  'Origami yapmayı öğrenmek',
  'Sanat eserlerini araştırmak',
  'Tiyatro oyunu yazmak',
  'Kendine kostüm hazırlamak',
  'Ailenle birlikte yemek hazırlamak',
  'Ailenle kelime türetmece oynamak',
  'Ailenle sessiz sinema oynamak',
  'Hangi bitkinin hangi bölgede yetiştiğini araştırmak',
  'Birlikte bir ağaca çıkmak ve doğayı seyretmek',
  'Mevsim meyvelerinin çekirdeklerini toprağa ekmek',
  'Doğa yürüyüşü yapmak',
  'Bir fidan dikmek',
  'MapCrunch ya da Google Earth seyahati yapmak',
  'Yeni bir karakter çizip hikayesini oluşturmak',
  'Google Earth oyunları oynamak',
  'Otlardan düdük yapmayı öğrenmek',
  'Çamaşır katlamayı ve ütü yapmayı öğrenmek',
  'Üç farklı kuş ve balık türü öğrenmek',
  'Bir dünya haritası edinerek ülke bulma oyunu oynamak',
  'Bir tanıdığınızla röportaj yapmak',
  'Su ve enerji tasarrufu yöntemlerini öğrenmek',
  'Bir takı tasarlamak',
  'Kütüphaneye gitmek ve üye olmak',
  'Düğme ve sökük dikmeyi öğrenmek',
  'Size özel bir selamlaşma bulmak',
  'Aile büyüklerini ziyaret etmek',
  'Sokaktan topladığın taşları boyamak',
  'Pencereden bakıp gördüklerin hakkında konuşmak',
  'Satranç oynamak',
  'Bir makine veya cihazı sökerek parçalarını yerine takmak',
  'Uzaydaki gezegenlerle kendi galaksini oluşturmak',
  'Sesli kitap dinlemek',
  'Ailece maket yapmak',
  'Ailenle sıcak-soğuk oyunu oynamak',
  'Kendi şarkını bestelemek',
  'Bitirdiğin bir kitaba farklı bir son yazmak',
  'Balonla spor yapmak',
  'Denizde yaşayan canlı türlerini incelemek',
  'Market alışverişi için liste hazırlamak',
  'Dünya haritasını inceleyip gitmek istediğin yerleri listelemek',
  'Eski kumaşlardan resim yapmak',
  'Çılgınca dans etmek ve videoya çekmek',
  'Uçurtma yapıp uçurmak',
].map((title) => ({ subject: 'Rehberlik', title }));

export const WEEKEND_ACTIVITIES: WeekendActivity[] = [
  ...REHBERLIK,
  ...BILISIM,
  ...GORSEL_SANATLAR,
  ...MUZIK,
  ...BEDEN_EGITIMI,
];
