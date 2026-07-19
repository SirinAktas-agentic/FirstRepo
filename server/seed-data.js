// İçerik tohum verisi (seed). Bu dosya YALNIZCA veritabanı ilk kez
// oluşturulurken (ilgili tablolar boşken) kullanılır. Veritabanı bir kez
// tohumlandıktan sonra içerik ve sırası SQLite'ta yaşar; buradaki dizileri
// sonradan değiştirmek MEVCUT veritabanını etkilemez.
//
// Kaynak: Koç Okulu Ortaokul, 5.'ten 6.'ya geçiş 2026-2027 yaz tatili resmi
// öneri dosyaları (tüm dersler + Rehberlik/RPD etkinlik listesi).

export const POINTS_PER_TASK = 5;
export const POINTS_PER_LEVEL = 30;
export const DEFAULT_SUMMER_LENGTH_DAYS = 56;

// Hafta içi ders sırası — ajanda üretiminde günlere dönüşümlü dağıtılır.
export const SUBJECT_ORDER = [
  'Türkçe',
  'Matematik',
  'Fen Bilimleri',
  'Sosyal Bilgiler',
  'İngilizce',
  'İspanyolca',
  'Din Kültürü ve Ahlak Bilgisi',
];

export const SUBJECT_TASKS = {
  Türkçe: [
    "Son Ada'nın Çocukları kitabından 20-25 dakika oku",
    'Zülfü Livaneli\'yi araştır: yazarın hayatı ve diğer eserleri hakkında not al',
    'Ekosistem ve besin zinciri kavramlarını araştır, öğrendiklerini yaz',
    'Sürdürülebilirlik nedir araştır, günlük hayattan 3 örnek bul',
    'Freiburg\'un "çevre başkenti" olma hikayesini araştır',
    "Türkiye'nin biyoçeşitliliği hakkında kısa bir araştırma yap",
    'Edvard Munch\'ın "Çığlık" tablosuna bak, kitapla bağlantısını düşün ve yaz',
    'Okuduğun bölümde anlamını bilmediğin kelimeleri ve deyimleri not al',
    'Kitaptaki bir karakteri fiziksel ve kişilik özellikleriyle betimle',
    'Olayların geçtiği yeri ve zaman dilimini belirleyip yaz',
    'Kitabın konusunu ve vermek istediği mesajı bir paragrafla özetle',
    'Seçtiğin ikinci kitaptan 20 dakika oku',
    'Seçtiğin üçüncü kitaptan 20 dakika oku',
    'Okuduğun kitaba göre bir kitap künyesi (yazar, yayınevi, konu) hazırla',
    'Kitaptan sevdiğin bir bölümü ailene sesli okuyarak anlat',
  ],
  Matematik: [
    '"Sayıların Korsanları" kitabından 15-20 dakika oku',
    'Kitaptan ilham alarak kendi korsan haritanı sayılarla süsleyip çiz',
    'Kesir, yüzde ve ondalık sayı temalı bir kart oyunu tasarla, kurallarını yaz',
    'Kesirlerle toplama çıkarma alıştırmaları çöz (10 soru)',
    'Ondalık sayılarla 4 işlem alıştırması çöz',
    'Market indirimi örnekleriyle yüzde hesaplama problemleri çöz',
    'Zihinden çarpım tablosu tekrarı yap (7, 8, 9\'lar)',
    'Alan ve çevre hesaplama problemleri çöz',
    'Oran orantı ile ilgili 5 problem çöz',
    'Sayı örüntülerini bul ve devam ettir (5 örüntü)',
    'Kesir - ondalık - yüzde dönüşümü alıştırmaları yap',
    'Asal sayıları 1-100 arasında bul ve listele',
  ],
  'Fen Bilimleri': [
    'BrainPOP: "Solar System" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Venus" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Mars" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Jupiter" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Saturn" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Neptune" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Mercury" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Light" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Reproductive System" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Asexual Reproduction" animasyonunu izle ve quiz çöz',
    'BrainPOP: "Sexual Reproduction" animasyonunu izle ve quiz çöz',
    'Deney/belgesel filmin için konu seç ve araştırmaya başla (canlı çeşitliliği ya da ilgini çeken bir bilimsel konu)',
    '3 dakikayı geçmeyen deney/belgesel filmini aileninle birlikte çek',
    'Fen kitap listesinden (Enerji / Ormanlar / Sürdürülebilir Kalkınma / Gezegenimi Seviyorum) birini oku',
    'Okuduğun kitaptan yola çıkarak bir farkındalık posteri tasarla',
    'National Geographic Kids sitesinden bir fen bilimleri oyunu oyna',
    "NASA Kids' Club sitesinde uzayla ilgili bir video izle",
    'Sanal bir bilim müzesi gez (Air and Space, Science Museum, Museo Galileo...)',
  ],
  'Sosyal Bilgiler': [
    '"Bay Peabody ve Meraklı Sherman: Zamanda Yolculuk" filmini izle',
    '"Gezegenimiz" belgeselini izle',
    '"Anadolu Medeniyetleri" belgeselini izle (TRT Belgesel)',
    '"Şehirlerin Hikâyesi" belgeselini izle (TRT Belgesel)',
    '"Türkiye\'nin Millî Parkları" belgeselini izle (TRT Belgesel)',
    '"Bilim ve Teknoloji Tarihi" belgeselini izle (TRT Belgesel)',
    'Bir müze gez (gerçek ya da sanal): Etnografya, Arkeoloji, Rahmi Koç, Topkapı, Göbeklitepe, Efes...',
    'Gezdiğin yerlerle ilgili anı ve notlarını bir seyahatname defterine yaz',
    'Ziyaret ettiğin bir yerin tarihini araştır, en dikkat çekici 3 özelliğini not et',
    'Gezi fotoğraflarından küçük bir albüm oluştur',
    'Atlasından gitmek istediğin şehir/ülkeleri bul, bir harita bulma oyunu tasarla',
    'Yaşadığın şehrin tarihi eserlerini ya da mahallenin geçmişini araştır, bir poster hazırla',
    'Aile büyüklerinle geçmiş yaşam deneyimleri üzerine kısa bir röportaj yap',
    'Küçük ölçekte bir hayır işi/bağış organizasyonu planla',
    'Çevre temizliği ya da geri dönüşüm çalışmasına katıl',
  ],
  İngilizce: [
    '"Fing" kitabından 20 dakika oku (keyfini çıkararak, acele etmeden)',
    'Okuduğun "Fing" bölümünü 3 cümleyle İngilizce özetle',
    'myON mitoloji kitaplarından birini seç ve okumaya başla (Pandora, Cupid, Persephone, Hercules, Atalanta, Hades)',
    '10 yeni İngilizce kelime öğren ve cümle içinde kullan',
    'Günlük rutinini İngilizce cümlelerle anlat (I wake up at...)',
    'Present Simple ile 5 cümle kur',
    'Evdeki eşyaların İngilizce isimlerini yazan bir liste hazırla',
    'Bir İngilizce diyalog yaz (mağazada alışveriş gibi)',
    'Sevdiğin hobini İngilizce olarak tanıt (My hobby is...)',
    'Ailene İngilizce kendini tanıt (isim, yaş, sevdiği şeyler)',
    'İngilizce basit bir bulmaca ya da kelime oyunu çöz',
    'İngilizce bir şarkı dinle, anladığın kelimeleri not et',
  ],
  İspanyolca: [
    '"Abuelita Anita y El Balón" kitabından bir bölüm oku',
    'Okurken karşılaştığın yeni kelimeleri not al (ficha de vocabulario için)',
    'Ficha de vocabulario doldur: kelime + karşılığı + resim + örnek cümle',
    '"Abuelita Anita y la cuerda amarilla" kitabını tekrar oku',
    '"¡A la playa!" kitabını tekrar oku',
    'Öğrendiğin İspanyolca kelimelerle küçük bir kelime kartı seti oluştur',
    'İspanyolca sayıları 1-20 tekrar et',
    'İspanyolca renkleri ve haftanın günlerini tekrar et',
    'Ailene İspanyolca birkaç kelimeyle kendini tanıt',
    'Ficha de vocabulario formunu gözden geçir, eksik kelimeleri tamamla',
  ],
  'Din Kültürü ve Ahlak Bilgisi': [
    'Nezaket ve saygı temalı bir hikaye ya da makale oku, öğrendiklerini not al',
    'Empati konulu kısa bir film ya da belgesel izle, düşüncelerini yaz',
    'Ailenle "selamlaşma ve iletişim" üzerine bir sohbet et, notlarını al',
    'Anne-babana ya da bir büyüğüne minnettarlığını gösteren bir şey yap, anlat',
    'Aile bağlarını güçlendiren bir anını yazıya dök',
    'Hoşgörü temalı bir şiir oku ya da yaz',
    'Yardımlaşma ile ilgili bir örnek olayı yazıya dök',
    'Bir gün boyunca minnettar olduğun 3 şeyi listele',
    'Toplumda birlik ve beraberlik için neler yapılabilir, düşün ve yaz',
    'Paylaşmanın önemini anlatan kısa bir hikaye yaz',
    'Sabır gösterdiğin bir anını anlat',
    'İnsana değer vermekle ilgili bir dergi/şiir oku, sevdiğin bölümü not al',
  ],
};

// Hafta sonu etkinlik havuzu — kategori sırası: Rehberlik, Bilişim, Görsel
// Sanatlar, Müzik, Beden Eğitimi (mevcut uygulamadaki birleştirme sırasıyla).
const REHBERLIK = [
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
].map((title) => ({ category: 'Rehberlik', title }));

const BILISIM = [
  { category: 'Bilişim Teknolojileri ve Yazılım', title: 'Scratch\'te "Getting Started" eğitimini tamamla' },
  { category: 'Bilişim Teknolojileri ve Yazılım', title: "Google'ın Interland oyununu oyna (dijital vatandaşlık)" },
  { category: 'Bilişim Teknolojileri ve Yazılım', title: 'Code.org\'da "Frozen" ile kodlamaya giriş dersini tamamla' },
  { category: 'Bilişim Teknolojileri ve Yazılım', title: 'Scratch\'te öğrendiklerinle kendi kısa oyununu/animasyonunu tasarla' },
  { category: 'Bilişim Teknolojileri ve Yazılım', title: "Interland'de başka bir bölüm daha oyna" },
];

const GORSEL_SANATLAR = [
  { category: 'Görsel Sanatlar', title: 'Bir sergi ya da müze gez (gerçek ya da sanal)' },
  { category: 'Görsel Sanatlar', title: 'Denk gelirsen bir sanat atölyesi/workshopa katıl' },
  { category: 'Görsel Sanatlar', title: 'Gördüğün bir sanat eserini incele, sana ne hissettirdiğini yaz' },
  { category: 'Görsel Sanatlar', title: 'Bulunduğun bölgedeki bir ören yerini ziyaret et' },
];

const MUZIK = [
  { category: 'Müzik', title: 'Ailenle birlikte bir müzikal film izle' },
  { category: 'Müzik', title: 'İzlediğin müzikal hakkında kısa bir araştırma yap (kim yazmış, ne zaman sahnelenmiş)' },
  { category: 'Müzik', title: 'Sevdiğin bir müzikalin şarkılarından birini dinle ve sözlerini incele' },
];

const BEDEN_EGITIMI = [
  { category: 'Beden Eğitimi ve Spor', title: 'Açık havada 30 dakika oyun oyna' },
  { category: 'Beden Eğitimi ve Spor', title: 'Bisiklete bin' },
  { category: 'Beden Eğitimi ve Spor', title: 'İp atla' },
  { category: 'Beden Eğitimi ve Spor', title: 'Top oyunu oyna (aile ya da arkadaşlarınla)' },
  { category: 'Beden Eğitimi ve Spor', title: 'Mümkünse yüzmeye git' },
  { category: 'Beden Eğitimi ve Spor', title: 'Ailenle beden eğitimi dersinde öğrendiğiniz bir hareketli oyunu oynayın' },
];

export const WEEKEND_ACTIVITIES = [
  ...REHBERLIK,
  ...BILISIM,
  ...GORSEL_SANATLAR,
  ...MUZIK,
  ...BEDEN_EGITIMI,
];

export const BOOK_STATUS_LABELS = {
  zorunlu: 'Zorunlu',
  secmeli: 'Seçmeli (en az 2)',
  serbest: 'Serbest Seçim',
  tekrar: 'Tekrar Okunacak',
  opsiyonel: 'Opsiyonel',
  'sec-bir': 'Listeden 1 Tanesi',
};

export const READING_LIST = [
  { id: 'tr-1', subject: 'Türkçe', title: "Son Ada'nın Çocukları", author: 'Zülfü Livaneli', status: 'zorunlu', note: "Yol haritası var: yazarı tanı, ekosistem/besin zinciri/sürdürülebilirlik araştır, Freiburg belgeselini izle, ülkemizin biyoçeşitliliğini araştır, Munch'ın 'Çığlık' tablosuyla bağlantı kur." },
  { id: 'tr-2', subject: 'Türkçe', title: 'Bir Genç Kızın Defteri 1', author: 'İpek Ongun', status: 'secmeli', note: null },
  { id: 'tr-3', subject: 'Türkçe', title: 'Büyülü Çember', author: 'Susanna Tamaro', status: 'secmeli', note: null },
  { id: 'tr-4', subject: 'Türkçe', title: 'Çalınan Kent', author: 'Gülsevin Kıral', status: 'secmeli', note: null },
  { id: 'tr-5', subject: 'Türkçe', title: 'Çöp Plaza', author: 'Miyase Sertbarut', status: 'secmeli', note: null },
  { id: 'tr-6', subject: 'Türkçe', title: "Distopya'ya Yolculuk", author: 'Şöhret Doğruyol Sağbaş', status: 'secmeli', note: null },
  { id: 'tr-7', subject: 'Türkçe', title: 'Ustam, Ben ve Beyaz Fil', author: 'Elif Şafak', status: 'secmeli', note: null },
  { id: 'tr-8', subject: 'Türkçe', title: 'Denizler Altında Yirmi Bin Fersah', author: 'Jules Verne', status: 'secmeli', note: null },
  { id: 'tr-9', subject: 'Türkçe', title: 'Suda Kaybolmak', author: 'Vladimir Tumanov', status: 'secmeli', note: null },
  { id: 'tr-10', subject: 'Türkçe', title: 'Bach Yürürken', author: 'Göknil Genç', status: 'secmeli', note: null },
  { id: 'tr-11', subject: 'Türkçe', title: 'Masal Masal İçinde', author: 'Ahmet Ümit', status: 'secmeli', note: null },
  { id: 'tr-12', subject: 'Türkçe', title: 'Şimşek Hırsızı', author: 'Rick Riordan', status: 'secmeli', note: null },
  { id: 'tr-13', subject: 'Türkçe', title: 'Uçan Sınıf', author: 'Erich Kästner', status: 'secmeli', note: null },
  { id: 'tr-14', subject: 'Türkçe', title: "Cumhuriyet'in İlk Sabahı", author: 'Şermin Yaşar & İlber Ortaylı', status: 'secmeli', note: null },

  { id: 'en-1', subject: 'İngilizce', title: 'Fing', author: 'David Walliams', status: 'zorunlu', note: null },
  { id: 'en-2', subject: 'İngilizce', title: 'Keep a Lid on It, Pandora!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },
  { id: 'en-3', subject: 'İngilizce', title: 'Nice Shot, Cupid!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },
  { id: 'en-4', subject: 'İngilizce', title: 'Phone Home, Persephone!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },
  { id: 'en-5', subject: 'İngilizce', title: 'Get to Work, Hercules!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },
  { id: 'en-6', subject: 'İngilizce', title: 'Go for the Gold, Atalanta!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },
  { id: 'en-7', subject: 'İngilizce', title: 'Have a Hot Time, Hades!', author: 'Kate McMullan', status: 'opsiyonel', note: 'myON, mitoloji temalı.' },

  { id: 'mat-1', subject: 'Matematik', title: 'Sayıların Korsanları (Matematik Çılgını serisi)', author: 'Haz: Linda Bertola / Çizer: Agnese Baruzzi', status: 'zorunlu', note: 'Kesir/yüzde/ondalık sayı temalı. Kitap tek başına yeterli değil: sayılarla korsan çizimi + kart oyunu tasarımı etkinlikleriyle tamamlanmalı.' },

  { id: 'fen-1', subject: 'Fen Bilimleri', title: 'Enerji', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },
  { id: 'fen-2', subject: 'Fen Bilimleri', title: 'Ormanlar', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },
  { id: 'fen-3', subject: 'Fen Bilimleri', title: 'Sürdürülebilir Kalkınma', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },
  { id: 'fen-4', subject: 'Fen Bilimleri', title: 'Gezegenimi Seviyorum', author: '—', status: 'sec-bir', note: 'Kitap analizi + farkındalık posteri hazırlanacak (Padlet).' },

  { id: 'sos-1', subject: 'Sosyal Bilgiler', title: "Eski Anadolu'yu Tanıyalım", author: 'Haldun Hürel', status: 'serbest', note: null },
  { id: 'sos-2', subject: 'Sosyal Bilgiler', title: 'Anadolu Efsaneleri', author: 'Bilgin Adalı', status: 'serbest', note: null },
  { id: 'sos-3', subject: 'Sosyal Bilgiler', title: 'Çocuklar İçin Anadolu Uygarlıkları', author: 'Ahmet Ümit', status: 'serbest', note: null },
  { id: 'sos-4', subject: 'Sosyal Bilgiler', title: 'Anadolu Masalları', author: 'Süleyman Bulut', status: 'serbest', note: null },
  { id: 'sos-5', subject: 'Sosyal Bilgiler', title: 'Tarihten Öyküler', author: 'Adnan Özyalçıner', status: 'serbest', note: null },
  { id: 'sos-6', subject: 'Sosyal Bilgiler', title: 'Temel Kavramlarla Tarih / Dünya Tarihine Damga Vuran Olaylar ve Kişiler', author: 'Orpheus Books', status: 'serbest', note: null },

  { id: 'esp-1', subject: 'İspanyolca', title: 'Abuelita Anita y El Balón', author: 'Jane Cadwallader', status: 'zorunlu', note: "Okuduktan sonra 'ficha de vocabulario' doldurulacak: yeni kelimeler + İngilizce/Türkçe karşılığı + resim + örnek cümle. Form saklanmalı, eylülde kontrol edilecek." },
  { id: 'esp-2', subject: 'İspanyolca', title: 'Abuelita Anita y la cuerda amarilla', author: 'Jane Cadwallader', status: 'tekrar', note: null },
  { id: 'esp-3', subject: 'İspanyolca', title: '¡A la playa!', author: 'Dominique Guillemant', status: 'tekrar', note: null },
];

export const TASK_MOTIVATION_MESSAGES = [
  'Harikasın Mine! Bir görevi daha bitirdin! 🌟',
  'Süpersin! +5 puan senin oldu! 🎉',
  'Böyle devam et Mine, seni izlemek bile keyifli! 💪',
  'Bir adım daha attın, seviye atlamaya yaklaştın! 🚀',
  'Aferin Mine! Bugün de kendini geliştirdin. 🌈',
  'Muhteşemsin! Bu görev tam senlik oldu. ✨',
  'Vay canına, bunu da bitirdin! Gurur duyuyorum. 🏅',
  'Harika iş çıkardın, kendinle gurur duy! 🎈',
  'Bir tık daha yaklaştın hedefine! Devam! 🎯',
  'Sen bir çalışma kahramanısın Mine! 🦸',
];

export const LEVEL_UP_MESSAGES = [
  'SEVİYE ATLADIN! Mine artık daha güçlü! 🎉🎉🎉',
  'İnanılmazsın! Yeni bir seviyeye ulaştın! 🏆',
  'Tebrikler kahraman! Bir seviye daha senin oldu! 🌟',
  'Vay be! Bu seviyeyi de fethettin Mine! 🚀',
];

export const HAIR_COLOR_OPTIONS = [
  { label: 'Kahverengi', value: '#7C4A25' },
  { label: 'Siyah', value: '#2B2B2B' },
  { label: 'Sarı', value: '#E8B84B' },
  { label: 'Kızıl', value: '#C2410C' },
  { label: 'Mor', value: '#9333EA' },
  { label: 'Pembe', value: '#DB2777' },
  { label: 'Mavi', value: '#0EA5E9' },
  { label: 'Yeşil', value: '#16A34A' },
];

export const HAIR_STYLE_OPTIONS = [
  { label: 'Kısa', value: 'kisa' },
  { label: 'Uzun', value: 'uzun' },
  { label: 'At Kuyruğu', value: 'atkuyrugu' },
  { label: 'Örgü', value: 'orgu' },
];

export const LEVEL_TITLES = ['Çırak', 'Kaşif', 'Gezgin', 'Uzman', 'Şampiyon', 'Yıldız', 'Efsane'];

export const DEFAULT_CHILD_NAME = 'Mine';
export const DEFAULT_HAIR_COLOR = HAIR_COLOR_OPTIONS[0].value;
export const DEFAULT_HAIR_STYLE = 'kisa';
