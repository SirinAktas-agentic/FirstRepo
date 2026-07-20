@echo off
title Mine'nin Yaz Ajandasi
cd /d "%~dp0"

echo ============================================
echo  Mine'nin Yaz Ajandasi baslatiliyor...
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo HATA: Node.js bulunamadi.
  echo https://nodejs.org adresinden "LTS" surumunu indirip kurun,
  echo sonra bu dosyaya tekrar cift tiklayin.
  echo.
  pause
  exit /b 1
)

echo Uygulama basladiktan sonra tarayicinizda su adres acilacak:
echo.
echo     http://localhost:8080
echo.
echo Bu pencereyi KAPATMAYIN - uygulama acikken acik kalmali.
echo Durdurmak icin bu pencerede Ctrl+C'ye basin.
echo.

REM Tarayiciyi birkac saniye sonra otomatik ac
start "" /b cmd /c "timeout /t 3 >nul & start http://localhost:8080"

node scripts\serve.js

echo.
echo Sunucu durdu.
pause
