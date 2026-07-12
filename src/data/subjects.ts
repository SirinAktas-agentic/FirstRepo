// 6. sınıf müfredatına uygun, günde 30 dakikada bitecek ödev/çalışma önerileri.
// Her ders için bir havuz var; ajanda üretilirken bu havuzlardan sırayla seçilir.

export interface SubjectTask {
  title: string;
}

export const SUBJECT_ORDER = [
  'Türkçe',
  'Matematik',
  'Fen Bilimleri',
  'Sosyal Bilgiler',
  'İngilizce',
  'Din Kültürü ve Ahlak Bilgisi',
] as const;

export type SubjectName = (typeof SUBJECT_ORDER)[number];

export const SUBJECT_TASKS: Record<SubjectName, SubjectTask[]> = {
  Türkçe: [
    { title: '10 sayfa kitap oku ve okuduklarını 5 cümleyle özetle' },
    { title: 'Günlük yaz: bugün seni en çok ne mutlu etti?' },
    { title: '5 yeni kelime öğren, anlamlarını ve birer cümle kurarak defterine yaz' },
    { title: 'Bir masalın kahramanını değiştirip yeni bir son yaz' },
    { title: 'Noktalama işaretleri çalışma sayfası çöz' },
    { title: 'Sevdiğin bir şarkının sözlerindeki mecaz anlamlı ifadeleri bul' },
    { title: 'Ailenle bir sohbet et, konuştuklarınızı diyalog şeklinde yaz' },
    { title: 'Bir gazete/dergi haberini oku, ana fikrini bul ve yaz' },
    { title: 'Eş anlamlı ve zıt anlamlı 10 kelime listesi hazırla' },
    { title: 'Kısa bir şiir yaz, istersen resimle süsle' },
    { title: 'Bir film ya da dizi bölümünü izleyip özetini anlat, kaydet' },
    { title: 'Atasözü ve deyimlerden 5 tanesini örnek cümlelerle defterine yaz' },
    { title: 'Bir mektup yaz: yaz tatilinde en sevdiğin anını anlat' },
    { title: 'Okuduğun bir kitaptan sevdiğin karakteri betimleyen bir paragraf yaz' },
    { title: 'Sesli okuma çalışması yap, kendi sesini kaydedip dinle' },
    { title: 'Bir haber başlığı uydur ve o habere uygun kısa bir metin yaz' },
  ],
  Matematik: [
    { title: 'Kesirlerle toplama çıkarma alıştırmaları çöz (10 soru)' },
    { title: 'Zihinden çarpım tablosu tekrarı yap (7, 8, 9\'lar)' },
    { title: 'Ondalık sayılarla 4 işlem alıştırması çöz' },
    { title: 'Oran orantı ile ilgili 5 problem çöz' },
    { title: 'Alan ve çevre hesaplama problemleri çöz' },
    { title: 'Tam sayılarla toplama çıkarma alıştırması yap' },
    { title: 'Veri toplama: evdeki eşyaları say, basit bir sütun grafiği çiz' },
    { title: 'Kesir - ondalık - yüzde dönüşümü alıştırmaları yap' },
    { title: 'Cebirsel ifadelerle ilgili basit sorular çöz' },
    { title: 'Geometrik şekillerin açılarını ölçüp not al' },
    { title: 'Zihinden hızlı toplama-çıkarma oyunu oyna (kronometreyle)' },
    { title: 'Sayı örüntülerini bul ve devam ettir (5 örüntü)' },
    { title: 'Market alışverişi senaryosu kur, bütçe hesabı yap' },
    { title: 'Simetri çalışması: bir şekli ayna simetrisiyle tamamla' },
    { title: 'Asal sayıları 1-100 arasında bul ve listele' },
    { title: 'Saat problemleri çöz: geçen süre hesaplamaları yap' },
  ],
  'Fen Bilimleri': [
    { title: 'Güneş sistemindeki gezegenleri sırasıyla çiz ve isimlerini yaz' },
    { title: 'Evde basit bir deney yap (ör. yoğunluk, karışım) ve gözlemlerini not al' },
    { title: 'Vücudumuzdaki bir sistemi (sindirim, dolaşım vb.) araştırıp özetle' },
    { title: 'Bahçede/parkta 5 farklı bitki ya da böcek gözlemle, defterine çiz' },
    { title: 'Maddenin hâlleri hakkında kısa bir bilgi kartı hazırla' },
    { title: 'Işığın yansımasıyla ilgili basit bir deney yap (ayna ile)' },
    { title: 'Geri dönüşüm için evde ayrıştırma çalışması yap, listele' },
    { title: 'Kuvvet ve hareketle ilgili günlük hayattan 3 örnek yaz' },
    { title: 'Hava durumu gözlemi yap, bir haftalık sıcaklık grafiği tut' },
    { title: 'Elektrik devresiyle ilgili bir çizim yap ve nasıl çalıştığını anlat' },
    { title: 'Sağlıklı beslenme piramidi hazırla' },
    { title: 'Bir hayvanın yaşam alanını araştır, kısa bir bilgi kartı yap' },
    { title: 'Ay\'ın evrelerini gözlemleyip birkaç gün not tut' },
    { title: 'Ses ile ilgili basit bir deney yap (titreşim gözlemi)' },
    { title: 'Doğal afetlerden birini seç, nedenlerini ve korunma yollarını araştır' },
  ],
  'Sosyal Bilgiler': [
    { title: 'Yaşadığın ilin haritasını çiz, önemli yerlerini işaretle' },
    { title: 'Türkiye\'nin komşu ülkelerini haritada göster ve listele' },
    { title: 'Bir tarihi kahramanı araştır, kısa bir sunum hazırla' },
    { title: 'Aile ağacını (soy ağacını) çiz' },
    { title: 'Yaşadığın şehrin tarihi bir yerini araştır' },
    { title: 'İnsan hakları ile ilgili bildiğin 3 hakkı yaz ve örnekle' },
    { title: 'Türkiye\'nin ihraç ettiği 5 ürünü araştır ve listele' },
    { title: 'Bir gazete haberini oku, vatandaşlık açısından değerlendir' },
    { title: 'Milli bayramlardan birini seç, önemini anlatan bir yazı yaz' },
    { title: 'Doğal kaynakları koruma yolları hakkında bir afiş tasarla' },
    { title: 'Farklı kültürlerden bir gelenek araştır, ailenle paylaş' },
    { title: 'Yerel yönetim (belediye) ne iş yapar, araştırıp not al' },
    { title: 'Bir müzeyi sanal olarak gez (veya fotoğraflarına bak), izlenimlerini yaz' },
    { title: 'İpek Yolu üzerindeki şehirlerden birini araştır' },
    { title: 'Kendi bütçeni planla: bir haftalık harçlığını nasıl kullanırsın?' },
  ],
  İngilizce: [
    { title: '10 yeni İngilizce kelime öğren ve cümle içinde kullan' },
    { title: 'İngilizce bir şarkı dinle, anladığın kelimeleri not et' },
    { title: 'Günlük rutinini İngilizce cümlelerle anlat (I wake up at...)' },
    { title: 'İngilizce kısa bir çizgi film izle, 3 cümleyle özetle' },
    { title: 'Present Simple ile 5 cümle kur' },
    { title: 'Evdeki eşyaların İngilizce isimlerini yazan bir liste hazırla' },
    { title: 'Renkler ve sayılarla ilgili İngilizce tekrar yap' },
    { title: 'Bir İngilizce diyalog yaz (mağazada alışveriş gibi)' },
    { title: 'Hava durumunu İngilizce anlatan cümleler kur' },
    { title: 'Sevdiğin hobini İngilizce olarak tanıt (My hobby is...)' },
    { title: 'İngilizce basit bir bulmaca ya da kelime oyunu çöz' },
    { title: 'Ailene İngilizce kendini tanıt (isim, yaş, sevdiği şeyler)' },
    { title: 'Yön tarifi kalıplarını öğren (turn left, go straight vb.)' },
    { title: 'Bir hikaye kitabını İngilizce resimlerine bakarak anlamaya çalış' },
  ],
  'Din Kültürü ve Ahlak Bilgisi': [
    { title: 'Yardımlaşma ile ilgili bir örnek olayı yazıya dök' },
    { title: 'Sevdiğin bir değeri (dürüstlük, saygı vb.) örneklerle anlat' },
    { title: 'Ailenle güzel bir söz veya kıssa üzerine sohbet et, notlarını al' },
    { title: 'Doğaya ve hayvanlara iyilik yaptığın bir anını yaz' },
    { title: 'Bir gün boyunca minnettar olduğun 3 şeyi listele' },
    { title: 'Hoşgörü kavramını kendi cümlelerinle açıkla, bir örnek ver' },
    { title: 'Toplumda birlik ve beraberlik için neler yapılabilir, düşün ve yaz' },
    { title: 'Aile büyüklerinle geçmişten bir öğüt paylaşımı yap, not et' },
    { title: 'Paylaşmanın önemini anlatan kısa bir hikaye yaz' },
    { title: 'Sabır gösterdiğin bir anını anlat' },
  ],
};

export function nextSubjectsForWeekdayIndex(weekdayIndex: number): SubjectName[] {
  const start = weekdayIndex % SUBJECT_ORDER.length;
  return [0, 1, 2].map((offset) => SUBJECT_ORDER[(start + offset) % SUBJECT_ORDER.length]);
}
