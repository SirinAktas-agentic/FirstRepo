# Mine'nin Yaz Ajandası — mimari ve kurallar

Bu proje, **tamamen statik, sunucusuz/veritabanısız bir PWA'dır** (v3).
Önceki sürümler geri dönüş dalı olarak saklıdır:

- `restore/v1.0-expo-inmemory` — Expo/React Native sürümü
- `restore/v2.0-sqlite-server` — Node + SQLite sunucu sürümü

## Yığın (stack)

- **Uygulama:** `docs/` altında derleme gerektirmeyen düz HTML/CSS/JS.
  Build adımı, bağımlılık, sunucu ve veritabanı YOKTUR.
- **Kalıcılık:** Tüm kullanıcı durumu (ajanda, tikler, puan, avatar, okuma
  işaretleri) cihazın kendi deposunda — `localStorage` (`docs/store.js`).
- **PWA:** `manifest.webmanifest` + `sw.js` (çevrimdışı çalışma) + iPhone
  "Ana Ekrana Ekle" meta etiketleri. iPhone/iPad'de uygulama gibi çalışır.
- **Yayın:** GitHub Pages (main dalı, `/docs` klasörü) ya da herhangi bir
  statik dosya sunucusu. Yerelde: `npm start` (scripts/serve.js).

## Önemli veri kuralı (kullanıcı isteği)

**Veri, sıra ve yapı kullanıcı açıkça istemedikçe DEĞİŞTİRİLMEZ.** İçerik
(dersler, ödevler, etkinlikler, okuma listesi) `docs/data.js`'te yaşar ama
yalnızca cihazde kayıtlı veri YOKKEN ajanda üretmek için kullanılır; üretilen
ajanda ve tüm durum localStorage'da sabitlenir. Uygulama ne kadar
geliştirilirse geliştirilsin:

- `docs/data.js`'i değiştirmek mevcut kullanıcıların verisini/sırasını
  DEĞİŞTİRMEZ (yeniden üretim yalnızca kullanıcı Ayarlar'dan isterse olur).
- localStorage şemasını bozacak değişiklik yapma; gerekiyorsa geriye dönük
  uyumlu taşıma (migration) kodu yaz, mevcut veriyi silme.
- `sw.js` içindeki `CACHE_VERSION` her yayınla birlikte artırılmalı, yoksa
  kullanıcılar eski sürümü görmeye devam eder.

## Çalıştırma

```
npm start          # yerel: http://localhost:8080 (docs/ klasörünü sunar)
```

Yayın için: GitHub → Settings → Pages → "Deploy from a branch" → `main` +
`/docs` seçilir; uygulama `https://<kullanıcı>.github.io/FirstRepo/` adresinde
yayınlanır. iPhone/iPad'de Safari ile açıp **Paylaş → Ana Ekrana Ekle**.
