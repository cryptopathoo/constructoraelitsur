# 🚀 Guía de Despliegue - Constructora S&D

## 📋 Opciones de Hosting

### 🆓 OPCIÓN 1: GitHub Pages (GRATIS)

#### Ventajas:
- ✅ Completamente gratis
- ✅ SSL incluido
- ✅ Dominio personalizado
- ✅ Deploy automático
- ✅ CDN global

#### Pasos:
1. Crear cuenta en GitHub.com
2. Crear repositorio: `constructora-sd-website`
3. Subir archivos del proyecto
4. Activar GitHub Pages en Settings
5. Configurar dominio personalizado

#### Configuración DNS:
```
Tipo: A
Nombre: @
Valor: 185.199.108.153

Tipo: A  
Nombre: @
Valor: 185.199.109.153

Tipo: A
Nombre: @
Valor: 185.199.110.153

Tipo: A
Nombre: @
Valor: 185.199.111.153

Tipo: CNAME
Nombre: www
Valor: constructora-sd.github.io
```

### 💰 OPCIÓN 2: Netlify (GRATIS con limitaciones)

#### Ventajas:
- ✅ Deploy automático
- ✅ SSL incluido
- ✅ CDN global
- ✅ Formularios incluidos
- ✅ 100GB bandwidth/mes

#### Pasos:
1. Crear cuenta en netlify.com
2. Conectar con GitHub (recomendado)
3. Deploy automático
4. Configurar dominio personalizado

### 💰 OPCIÓN 3: Hosting Chileno (PAGO)

#### Proveedores recomendados:
- **Netsolutions Chile:** $8.000 CLP/mes
- **Hosting.cl:** $6.000 CLP/mes
- **Hosting.cl:** $5.000 CLP/mes

#### Incluye:
- ✅ Dominio .cl incluido
- ✅ SSL certificado
- ✅ Email corporativo
- ✅ Soporte en español
- ✅ Servidor en Chile

## 🔧 Configuración Técnica

### Archivos necesarios para subir:
```
/
├── index.html
├── movimiento-tierra.html
├── remodelacion-bano.html
├── styles.css
├── script.js
├── .htaccess
├── robots.txt
├── sitemap.xml
├── 404.html
├── logo 2,0.png
├── logo-texto.png
├── logo-texto.svg
└── images/
    └── (todas las imágenes)
```

### Configuración de email corporativo:
```
info@constructorasd.cl
contacto@constructorasd.cl
ventas@constructorasd.cl
```

## 📱 Configuración de Redes Sociales

### URLs sugeridas:
- Facebook: facebook.com/constructorasd
- Instagram: instagram.com/constructorasd
- LinkedIn: linkedin.com/company/constructorasd
- YouTube: youtube.com/@constructorasd

## 🔒 Seguridad y SSL

### Certificado SSL:
- ✅ Incluido en todas las opciones
- ✅ Renovación automática
- ✅ HTTPS obligatorio

### Headers de seguridad:
- ✅ Configurados en .htaccess
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection

## 📊 SEO y Analytics

### Google Analytics:
1. Crear cuenta en analytics.google.com
2. Obtener código de seguimiento
3. Agregar a index.html

### Google Search Console:
1. Verificar propiedad del dominio
2. Enviar sitemap.xml
3. Monitorear rendimiento

## 💡 Recomendación Final

### Para empezar (GRATIS):
**GitHub Pages** - Perfecto para comenzar, profesional y gratis

### Para empresa establecida (PAGO):
**Hosting chileno** - Mejor soporte local y velocidad en Chile

## 📞 Contacto para Ayuda

Si necesitas ayuda con la configuración:
- Email: info@constructorasd.cl
- Teléfono: +56 9 1234 5678
