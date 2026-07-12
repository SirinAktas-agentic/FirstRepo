# Mine'nin Yaz Ajandası

6. sınıfa geçen Mine için yaz tatili boyunca ödev ve etkinlikleri takip eden, oyunlaştırılmış bir mobil uygulama (Expo / React Native + TypeScript).

## Özellikler

- **Ajanda:** Yaz başlangıcından bitişine kadar her hafta içi günde 3 farklı dersten 30'ar dakikalık ödev, her hafta sonu günü ise 3 eğlenceli etkinlik önerir. Dersler (Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, İngilizce, Din Kültürü ve Ahlak Bilgisi) günler arasında dönüşümlü olarak dağıtılır.
- **Tik atma ve puan:** Her tamamlanan ödev/etkinlik 5 puan kazandırır. 30 puanda Mine'nin karakteri seviye atlar.
- **Avatar & motivasyon:** Her tamamlamada avatar Mine'yi rastgele bir motivasyon mesajıyla kutlar; seviye atlayınca özel bir kutlama ekranı açılır. Avatarın görünümü (saç rengi, aksesuar) seviyeye göre değişir.
- **Otomatik telafi:** Bir günün ödev/etkinlikleri o gün bitmeden tamamlanmazsa, ertesi günlerde otomatik olarak "telafi" etiketiyle sonraki günlere eklenir; gerekirse ajanda otomatik olarak uzatılır.
- **Ayarlar:** Çocuğun adı, yazın başlangıç/bitiş tarihleri değiştirilebilir; ilerleme istenirse sıfırlanabilir.

## Çalıştırma

```bash
npm install
npm start        # Expo geliştirme sunucusunu başlatır
```

Açılan QR kodu telefonunda **Expo Go** uygulamasıyla okutarak (iOS/Android) uygulamayı canlı görebilirsin. Alternatif olarak:

```bash
npm run android  # Android emülatöründe çalıştırır
npm run ios      # iOS simülatöründe çalıştırır (yalnızca macOS)
```

## Proje yapısı

```
App.tsx                  Sekme navigasyonu ve genel yerleşim
src/types                Ortak veri tipleri
src/data                 Ders ödevi ve etkinlik içerik havuzları
src/lib                  Tarih yardımcıları, ajanda üretimi, telafi mantığı, puanlama, depolama
src/context/AppContext   Uygulama durumu (React Context), AsyncStorage ile kalıcı saklama
src/screens              Ajanda, Profil (avatar/seviye) ve Ayarlar ekranları
src/components           Avatar, görev satırı, gün kartı, ilerleme çubuğu, motivasyon kutlaması
```

Veriler cihazda `@react-native-async-storage/async-storage` ile saklanır; bir backend gerekmez.
