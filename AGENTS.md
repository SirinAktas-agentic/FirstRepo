# Mine'nin Yaz Ajandası — mimari ve kurallar

Bu proje, veritabanı tabanlı bir web uygulamasıdır. (Önceki Expo/React Native
sürümü `restore/v1.0-expo-inmemory` dalında saklıdır.)

## Yığın (stack)

- **Sunucu:** Yalnızca Node.js yerleşik modülleri — `node:http` (sunucu) ve
  `node:sqlite` (veritabanı). **Harici çalışma bağımlılığı yoktur**, native
  derleme yoktur. Gereken tek şey Node **>= 22.5**.
- **Veritabanı:** Tek bir SQLite dosyası (`data/mine.db`). Tüm içerik ve
  kullanıcı durumu buradadır; dosyayı taşımak veriyi taşır.
- **Arayüz:** `public/` altında derleme gerektirmeyen düz HTML/CSS/JS
  (`index.html`, `styles.css`, `app.js`). Build adımı yoktur.

## Önemli veri kuralı (kullanıcı isteği)

**Veri, sıra ve yapı SQLite'ta yaşar ve kullanıcı açıkça istemedikçe
DEĞİŞTİRİLMEZ.** İçerik (dersler, ödevler, etkinlikler, okuma listesi) yalnızca
veritabanı ilk kez oluşturulurken `server/seed-data.js`'ten tohumlanır. Uygulama
ne kadar geliştirilirse geliştirilsin:

- Mevcut bir `data/mine.db` varken tohumlama tekrar çalışmaz (tablolar boş
  değilse atlanır); yani sıralama ve içerik korunur.
- Yeni özellikler eklerken var olan tabloların sıra sütunlarını (`sort_order`,
  `seq`) ve satır sırasını bozacak şekilde davranma.
- Şema değişikliği gerekiyorsa geriye dönük uyumlu, katıcı (additive) migration
  yaz; mevcut kullanıcı verisini silme.

## Çalıştırma

```
npm start          # sunucuyu başlatır → http://localhost:8080
```

Taşınabilirlik: klasörü (ve istenirse `data/mine.db` dosyasını) herhangi bir
Node 22.5+ sunucuya kopyala, `npm start` ile çalışır. `PORT` ve `DB_PATH`
ortam değişkenleriyle özelleştirilebilir.
