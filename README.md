# Mine'nin Yaz Ajandası

6. sınıfa geçen Mine için yaz tatili boyunca ödev ve etkinlikleri takip eden, oyunlaştırılmış bir mobil uygulama (Expo / React Native + TypeScript).

## Özellikler

- **Ajanda:** Yaz başlangıcından bitişine kadar her hafta içi günde 3 farklı dersten 30'ar dakikalık ödev, her hafta sonu günü ise 3 eğlenceli etkinlik önerir. Hafta içi dersler (Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, İngilizce, İspanyolca, Din Kültürü ve Ahlak Bilgisi) günler arasında dönüşümlü dağıtılır; hafta sonu etkinlikleri Rehberlik, Bilişim Teknolojileri, Görsel Sanatlar, Müzik ve Beden Eğitimi bölümlerinden gelir. İçerik, okulun resmi 5.'ten 6.'ya geçiş yaz tatili öneri dokümanlarından türetilmiştir.
- **Okuma Listesi:** Okulun önerdiği tüm kitaplar (Türkçe, İngilizce, Matematik, Fen Bilimleri, Sosyal Bilgiler, İspanyolca) derse göre gruplanmış halde; zorunlu/seçmeli/serbest etiketiyle ve okundu/okunmadı işaretlenebilen bir liste olarak sunulur.
- **Tik atma ve puan:** Her tamamlanan ödev/etkinlik 5 puan kazandırır. 30 puanda Mine'nin karakteri seviye atlar.
- **Avatar & motivasyon:** Her tamamlamada avatar Mine'yi rastgele bir motivasyon mesajıyla kutlar; seviye atlayınca özel bir kutlama ekranı açılır. Mine, saç rengini ve saç stilini "Mine" sekmesinden kendi seçebilir; seviyeye göre aksesuar (kurdele/gözlük/taç) otomatik eklenir.
- **Otomatik telafi:** Bir günün ödev/etkinlikleri o gün bitmeden tamamlanmazsa, ertesi günlerde otomatik olarak "telafi" etiketiyle sonraki günlere eklenir; gerekirse ajanda otomatik olarak uzatılır.
- **Ayarlar:** Çocuğun adı, yazın başlangıç/bitiş tarihleri değiştirilebilir; ilerleme istenirse sıfırlanabilir.

## Çalıştırma

Uygulama en sorunsuz şekilde **bilgisayarın tarayıcısında** çalışır (mobil cihazda Expo Go sürüm uyumluluğu sorunlarıyla uğraşmamak için önerilen yol budur).

### Windows'ta kolay yol (terminal bilmeden)

1. Bu klasörü indirip aç.
2. İçindeki **`calistir.bat`** dosyasına çift tıkla.
3. Node.js kurulu değilse ekrandaki uyarıyı takip ederek [nodejs.org](https://nodejs.org)'dan LTS sürümünü kur, sonra dosyaya tekrar çift tıkla.
4. Kurulum bitince tarayıcında otomatik olarak bir sekme açılacak (açılmazsa `http://localhost:8081` adresine git). Pencereyi kapatmadığın sürece uygulama açık kalır.

### Terminalden manuel çalıştırma

```bash
npm install
npm run web       # Tarayıcıda açar (http://localhost:8081)
```

Mobil cihazda Expo Go ile denemek istersen (mağazadaki Expo Go sürümüyle projenin Expo SDK sürümü eşleşmelidir):

```bash
npm start         # QR kod ile Expo Go üzerinden çalıştırır
npm run android   # Android emülatöründe çalıştırır
npm run ios       # iOS simülatöründe çalıştırır (yalnızca macOS)
```

## Proje yapısı

```
App.tsx                  Sekme navigasyonu ve genel yerleşim
src/types                Ortak veri tipleri
src/data                 Ders ödevi, etkinlik ve okuma listesi içerik havuzları
src/lib                  Tarih yardımcıları, ajanda üretimi, telafi mantığı, puanlama, depolama
src/context/AppContext   Uygulama durumu (React Context), AsyncStorage ile kalıcı saklama
src/screens              Ajanda, Okuma Listesi, Profil (avatar/seviye) ve Ayarlar ekranları
src/components           Avatar, görev satırı, gün kartı, ilerleme çubuğu, motivasyon kutlaması
```

Veriler cihazda `@react-native-async-storage/async-storage` ile saklanır; bir backend gerekmez.
