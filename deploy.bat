@echo off
echo ========================================
echo    DEPLOY CONSTRUCTORA S&D
echo ========================================
echo.

echo [1/4] Preparando archivos...
if not exist "deploy" mkdir deploy

echo [2/4] Copiando archivos principales...
copy "index.html" "deploy\"
copy "movimiento-tierra.html" "deploy\"
copy "remodelacion-bano.html" "deploy\"
copy "styles.css" "deploy\"
copy "script.js" "deploy\"
copy ".htaccess" "deploy\"
copy "robots.txt" "deploy\"
copy "sitemap.xml" "deploy\"
copy "404.html" "deploy\"
copy "CNAME" "deploy\"
copy "_redirects" "deploy\"

echo [3/4] Copiando logos...
copy "logo 2,0.png" "deploy\"
copy "logo-texto.png" "deploy\"
copy "logo-texto.svg" "deploy\"

echo [4/4] Copiando carpeta de imágenes...
if not exist "deploy\images" mkdir "deploy\images"
xcopy "images\*" "deploy\images\" /E /I /Y

echo.
echo ========================================
echo    DEPLOY COMPLETADO
echo ========================================
echo.
echo Archivos listos en la carpeta 'deploy'
echo Sube esta carpeta a tu hosting
echo.
echo Opciones de hosting:
echo - GitHub Pages: Sube a repositorio
echo - Netlify: Arrastra carpeta deploy
echo - Hosting tradicional: Sube via FTP
echo.
pause
