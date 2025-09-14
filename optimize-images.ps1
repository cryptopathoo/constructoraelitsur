# Script para optimizar imágenes a WebP
# Requiere ImageMagick instalado

Write-Host "Iniciando optimización de imágenes..." -ForegroundColor Green

# Lista de imágenes a optimizar
$images = @(
    "hero-desktop.jpg",
    "hero-mobile.jpg", 
    "hero1.jpg",
    "hero2.jpg",
    "hero3.jpg",
    "proyecto1.jpg",
    "proyecto2.jpg",
    "proyecto3.jpg",
    "finalizado1.jpg",
    "finalizado2.jpg",
    "finalizado3.jpg",
    "remodelacion-bano.jpg",
    "fondo-hero.jpg"
)

foreach ($image in $images) {
    if (Test-Path $image) {
        $webpName = $image -replace '\.(jpg|jpeg|png)$', '.webp'
        Write-Host "Convirtiendo $image a $webpName..." -ForegroundColor Yellow
        
        # Usar magick si está disponible
        if (Get-Command magick -ErrorAction SilentlyContinue) {
            magick $image -quality 85 -resize "1920x1080>" $webpName
        } else {
            Write-Host "ImageMagick no está instalado. Creando archivos placeholder..." -ForegroundColor Red
            # Crear archivo placeholder
            Copy-Item $image $webpName
        }
    }
}

Write-Host "Optimización completada!" -ForegroundColor Green

