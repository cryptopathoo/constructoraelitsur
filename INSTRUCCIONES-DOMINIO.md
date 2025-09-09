# 🌐 INSTRUCCIONES PARA AGREGAR DOMINIO

## 🚀 OPCIÓN RECOMENDADA: GitHub Pages (GRATIS)

### PASO 1: Crear cuenta en GitHub
1. Ve a [github.com](https://github.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### PASO 2: Crear repositorio
1. Haz clic en "New repository"
2. Nombre: `constructora-sd-website`
3. Descripción: `Sitio web de Constructora S&D`
4. Marca "Public"
5. Haz clic en "Create repository"

### PASO 3: Subir archivos
1. Haz clic en "uploading an existing file"
2. Arrastra todos los archivos del proyecto
3. Mensaje de commit: "Initial commit - Constructora S&D website"
4. Haz clic en "Commit changes"

### PASO 4: Activar GitHub Pages
1. Ve a Settings del repositorio
2. Scroll hasta "Pages" en el menú lateral
3. En "Source" selecciona "Deploy from a branch"
4. Selecciona "main" branch
5. Haz clic en "Save"

### PASO 5: Configurar dominio personalizado
1. En la sección "Pages", agrega tu dominio en "Custom domain"
2. Marca "Enforce HTTPS"
3. GitHub creará un archivo CNAME automáticamente

## 🔧 CONFIGURACIÓN DNS

### En tu proveedor de dominio (NIC Chile, etc.):
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

## 💰 OPCIÓN ALTERNATIVA: Hosting Chileno

### Proveedores recomendados:
- **Netsolutions Chile:** $8.000 CLP/mes
- **Hosting.cl:** $6.000 CLP/mes
- **Hosting.cl:** $5.000 CLP/mes

### Incluye:
- ✅ Dominio .cl
- ✅ SSL certificado
- ✅ Email corporativo
- ✅ Soporte en español

## 📧 CONFIGURACIÓN DE EMAIL

### Emails sugeridos:
- info@constructorasd.cl
- contacto@constructorasd.cl
- ventas@constructorasd.cl
- admin@constructorasd.cl

## 📊 GOOGLE ANALYTICS

### Configuración:
1. Ve a [analytics.google.com](https://analytics.google.com)
2. Crea una cuenta
3. Obtén tu "Measurement ID"
4. Reemplaza "GA_MEASUREMENT_ID" en index.html

## 🔍 GOOGLE SEARCH CONSOLE

### Configuración:
1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad (constructorasd.cl)
3. Verifica la propiedad
4. Envía tu sitemap.xml

## ⚡ DEPLOY RÁPIDO

### Usar el script automático:
1. Ejecuta `deploy.bat`
2. Se creará carpeta "deploy" con todos los archivos
3. Sube esta carpeta a tu hosting

## 🆘 SOPORTE

### Si necesitas ayuda:
- Email: info@constructorasd.cl
- Teléfono: +56 9 1234 5678

### Tiempo de propagación DNS:
- ⏱️ 24-48 horas para propagación completa
- ⏱️ 2-4 horas para cambios menores

## ✅ CHECKLIST FINAL

- [ ] Dominio registrado
- [ ] Hosting configurado
- [ ] DNS configurado
- [ ] SSL activado
- [ ] Google Analytics configurado
- [ ] Google Search Console configurado
- [ ] Email corporativo configurado
- [ ] Sitio web funcionando
- [ ] Redes sociales configuradas
