# Mine'nin Yaz Ajandası

6. sınıfa geçen Mine için yaz tatili boyunca ödev ve etkinlikleri takip eden,
oyunlaştırılmış bir web uygulaması. Tüm veriler **SQLite** veritabanında yaşar;
uygulama kendi bilgisayarında ya da taşıdığın herhangi bir sunucuda çalışır.

## Neden bu mimari?

- **Veritabanı (SQLite):** İçerik (dersler, ödevler, etkinlikler, okuma listesi)
  ve durum (tikler, puan, seviye, avatar) tek bir `data/mine.db` dosyasında
  tutulur. Uygulamayı geliştirmek için veriyi "derlemek" gerekmez; veri koda
  gömülü değildir.
- **Sıfır bağımlılık, sıfır derleme:** Sunucu yalnızca Node'un yerleşik
  `node:http` ve `node:sqlite` modüllerini kullanır. `npm install` hiçbir şey
  indirmez/derlemez. Tek gereksinim: **Node.js 22.5 veya üstü**.
- **Taşınabilir:** Klasörü (ve istersen `data/mine.db` dosyasını) herhangi bir
  sunucuya kopyala, `npm start` de; çalışır.

## Özellikler

- **Ajanda:** Hafta içi her gün 3 farklı dersten 30'ar dakikalık ödev, hafta
  sonu her gün 3 etkinlik. İçerik okulun resmi 5.'ten 6.'ya geçiş yaz tatili
  öneri dosyalarından türetilmiştir (Türkçe, Matematik, Fen, Sosyal, İngilizce,
  İspanyolca, Din Kültürü; hafta sonu: Rehberlik, Bilişim, Görsel Sanatlar,
  Müzik, Beden Eğitimi).
- **Okuma Listesi:** Tüm derslerin önerilen kitapları; zorunlu/seçmeli/serbest
  etiketleriyle, okundu/okunmadı işaretlemeli.
- **Puan & seviye:** Her tamamlanan görev 5 puan; 30 puanda seviye atlama.
- **Avatar:** Mine'yi temsil eden, saç rengi/stili özelleştirilebilen avatar;
  her tamamlamada motivasyon, seviye atlamada özel kutlama.
- **Otomatik telafi:** O gün bitmeyen görevler sonraki günlere taşınır.

## Çalıştırma

Node.js 22.5+ kurulu olmalı ([nodejs.org](https://nodejs.org) → LTS sürümü).

### Windows'ta kolay yol (terminal bilmeden)

1. Bu klasörü indir/aç.
2. İçindeki **`calistir.bat`** dosyasına çift tıkla.
3. Tarayıcın otomatik açılmazsa `http://localhost:8080` adresine git.

### Terminalden

```bash
npm start
```

Ardından tarayıcıdan `http://localhost:8080` adresini aç. Pencereyi kapatana
kadar (ya da Ctrl+C'ye basana kadar) sunucu çalışır.

### Ortam değişkenleri

| Değişken  | Varsayılan          | Açıklama                          |
| --------- | ------------------- | --------------------------------- |
| `PORT`    | `8080`              | Sunucunun dinleyeceği port        |
| `HOST`    | `0.0.0.0`           | Dinlenecek adres                  |
| `DB_PATH` | `data/mine.db`      | SQLite veritabanı dosyasının yolu |

Örnek: `PORT=3000 DB_PATH=/veri/mine.db npm start`

## Veriyi yedekleme / taşıma

Tüm veri `data/mine.db` dosyasındadır. Yedeklemek için bu dosyayı kopyalaman
yeterli; başka bir sunucuya taşımak için de dosyayı oraya kopyalayıp
`DB_PATH` ile göster.

## Proje yapısı

```
server/
  index.js       HTTP sunucusu + REST API + statik dosya servisi
  db.js          SQLite şeması, tohumlama, tüm veri işlemleri
  logic.js       Tarih yardımcıları, ajanda üretimi, telafi, seviye hesabı
  seed-data.js   İlk kurulumda veritabanına yazılan içerik (dersler, kitaplar…)
public/
  index.html     Uygulama kabuğu
  styles.css     Stiller (mor temalı, mobil öncelikli)
  app.js         Arayüz mantığı (4 sekme, avatar, etkileşimler)
data/
  mine.db        SQLite veritabanı (çalışma anında oluşur; git'e girmez)
```

## Önceki sürüm

Veritabanısız, Expo/React Native tabanlı ilk sürüm
`restore/v1.0-expo-inmemory` dalında saklıdır; `git checkout
restore/v1.0-expo-inmemory` ile o hale dönülebilir.
