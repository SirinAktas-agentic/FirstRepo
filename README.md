# Mine'nin Yaz Ajandası

6. sınıfa geçen Mine için yaz tatili boyunca ödev ve etkinlikleri takip eden,
oyunlaştırılmış bir uygulama. **Tamamen statiktir**: sunucu ve veritabanı
gerekmez, tüm veriler telefonun/bilgisayarın kendi deposunda saklanır.
iPhone/iPad'de **"Ana Ekrana Ekle"** ile gerçek bir uygulama gibi (kendi
ikonuyla, tam ekran, internetsiz bile) çalışır.

## iPhone / iPad'e kurulum (App Store'suz, ücretsiz)

1. GitHub'da **Settings → Pages** bölümünden yayını bir kez etkinleştir:
   "Deploy from a branch" → Branch: `main`, Folder: `/docs` → Save.
2. Birkaç dakika sonra uygulama şu adreste yayında olur:
   `https://<github-kullanıcı-adın>.github.io/FirstRepo/`
3. iPhone/iPad'de **Safari** ile bu adresi aç.
4. **Paylaş** düğmesi (kare + yukarı ok) → **Ana Ekrana Ekle** → Ekle.

Artık ana ekranda "Mine Ajanda" ikonu var; dokununca tam ekran, uygulama gibi
açılır ve ilk açılıştan sonra **internet olmadan da çalışır**. Tüm ilerleme
(tikler, puanlar, avatar) cihazın kendi deposunda tutulur.

> **.ipa hakkında not:** Apple, imzasız .ipa dosyalarının iPhone'a
> kurulmasına izin vermez; imzalama için ücretli Apple Developer hesabı
> (99 USD/yıl) gerekir. Bu yüzden bu proje, Apple hesabı gerektirmeyen
> PWA (ana ekran uygulaması) yolunu kullanır. Developer hesabı edinilirse
> .ipa üreten bir GitHub Actions hattı eklenebilir.

## Özellikler

- **Ajanda:** Hafta içi her gün 3 farklı dersten 30'ar dakikalık ödev, hafta
  sonu her gün 3 etkinlik. İçerik okulun resmi 5.'ten 6.'ya geçiş yaz tatili
  öneri dosyalarından türetilmiştir (7 ders + Rehberlik, Bilişim, Görsel
  Sanatlar, Müzik, Beden Eğitimi etkinlikleri).
- **Okuma Listesi:** Tüm derslerin önerilen kitapları; zorunlu/seçmeli/serbest
  etiketleriyle, okundu/okunmadı işaretlemeli.
- **Puan & seviye:** Her tamamlanan görev 5 puan; 30 puanda seviye atlama.
- **Avatar:** Saç rengi/stili özelleştirilebilen avatar; her tamamlamada
  motivasyon mesajı, seviye atlamada özel kutlama.
- **Otomatik telafi:** O gün bitmeyen görevler sonraki günlere taşınır.
- **Yedekleme:** Ayarlar sekmesinden verileri dosya olarak indirip başka
  cihazda geri yükleyebilirsin.

## Bilgisayarda çalıştırma

Node.js kuruluysa: `npm start` → `http://localhost:8080`
(Windows'ta `calistir.bat`'a çift tıklamak da aynı işi yapar.)

Uygulama statik olduğu için aslında herhangi bir statik dosya sunucusu da
yeterlidir; `docs/` klasörünü herhangi bir hosting'e koyman yeterli.

## Veriler nerede?

- İçerik (ders/ödev/etkinlik/kitap listeleri): `docs/data.js` — yalnızca ilk
  açılışta ajanda üretmek için kullanılır.
- Kullanıcı durumu (ajanda, tikler, puan, avatar): cihazın tarayıcı deposunda
  (localStorage). Uygulamayı güncellemek bu veriyi bozmaz.
- Yedek almak/taşımak için: Ayarlar → "Verileri İndir (yedek)" /
  "Yedekten Geri Yükle".

## Proje yapısı

```
docs/
  index.html          Uygulama kabuğu + PWA meta etiketleri
  styles.css          Stiller (mor temalı, mobil öncelikli)
  data.js             İçerik (ilk kurulum tohum verisi)
  logic.js            Tarih, ajanda üretimi, telafi, seviye hesabı
  store.js            localStorage kalıcılık katmanı
  app.js              Arayüz (4 sekme, avatar, etkileşimler)
  sw.js               Service worker (çevrimdışı çalışma)
  manifest.webmanifest, icons/   PWA kimliği ve ikonlar
scripts/serve.js      Yerel çalıştırma için minik statik sunucu
```

## Önceki sürümler (geri dönüş noktaları)

- `restore/v1.0-expo-inmemory` — Expo/React Native sürümü
- `restore/v2.0-sqlite-server` — Node + SQLite sunucu sürümü

`git checkout <dal-adı>` ile istenen sürüme dönülebilir.
