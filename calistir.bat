@echo off
title Mine'nin Yaz Ajandasi - Kuruluyor
cd /d "%~dp0"

echo ============================================
echo  Mine'nin Yaz Ajandasi hazirlaniyor
echo  Bu islem birkac dakika surebilir, lutfen
echo  pencereyi kapatmadan bekleyin.
echo ============================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo HATA: npm bulunamadi.
  echo Once Node.js kurmaniz gerekiyor: https://nodejs.org adresinden
  echo "LTS" surumunu indirip kurun, sonra bu dosyaya tekrar cift tiklayin.
  echo.
  pause
  exit /b 1
)

call npm install
if errorlevel 1 (
  echo.
  echo HATA: Kurulum sirasinda bir sorun olustu. Yukaridaki mesajlari
  echo kontrol edin ya da bu ekrani Claude'a gonderin.
  echo.
  pause
  exit /b 1
)

echo.
echo Kurulum tamamlandi. Uygulama tarayicida baslatiliyor...
echo Birazdan bilgisayarinizin tarayicisinda (Chrome/Edge) otomatik
echo olarak bir sekme acilacak. Acilmazsa http://localhost:8081
echo adresini tarayiciya elle yazabilirsiniz.
echo.
echo Bu pencereyi KAPATMAYIN - uygulama acikken bu pencere de acik
echo kalmali. Uygulamayi kapatmak icin bu pencerede Ctrl+C'ye basin.
echo.

call npx expo start --web

pause
