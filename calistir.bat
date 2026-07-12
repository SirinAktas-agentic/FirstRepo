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
echo Kurulum tamamlandi. Uygulama baslatiliyor...
echo Birazdan bir QR kod gorunecek. Telefonuna "Expo Go" uygulamasini
echo indirip o QR kodu okutabilirsin.
echo.

call npm start

pause
