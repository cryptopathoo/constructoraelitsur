# 🚀 Comandos para Subir Archivos a GitHub

## 📋 **Preparación**

### **1. Inicializar repositorio (si es nuevo):**
```bash
git init
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### **2. Verificar estado actual:**
```bash
git status
```

## 📁 **Agregar Archivos Específicos**

### **Archivos Principales:**
```bash
git add index.html
git add construccion-residencial.html
git add construccion-comercial.html
git add construccion-industrial.html
git add .htaccess
git add web.config
git add _redirects
git add 404.html
git add contact-form.php
git add config.php
git add styles.css
git add script.js
git add manifest.json
git add sw.js
git add LOGO\ SIN\ FONDO.png
git add logo-texto.png
git add logo-texto.svg
git add hero-desktop.jpg
git add robots.txt
git add sitemap.xml
git add CNAME
```

### **Documentación:**
```bash
git add CONFIGURACION-GTM-COMPLETA.md
git add CONFIGURAR-GOOGLE-ANALYTICS.md
git add MEJORAS-IMPLEMENTADAS.md
git add OPTIMIZACIONES-RENDIMIENTO.md
git add INSTRUCCIONES-FORMULARIO.md
git add check-http-status.html
```

### **Carpeta de Imágenes:**
```bash
git add images/
```

## 🔄 **Subir Todo de Una Vez (Recomendado)**

### **Opción A: Subir todos los archivos:**
```bash
git add .
git commit -m "Actualización completa del sitio web - Constructora Elite Sur

✅ Mejoras implementadas:
- Botón flotante de WhatsApp
- Navegación corregida y funcional
- Google Tag Manager configurado
- Códigos de estado HTTP optimizados
- PWA funcional
- Formularios mejorados
- SEO optimizado
- Páginas de servicios creadas

📊 Nuevas funcionalidades:
- Eventos personalizados para GTM
- Verificador de códigos HTTP
- Documentación técnica completa
- Configuración de servidor optimizada"
git push origin main
```

### **Opción B: Subir archivos específicos:**
```bash
# Archivos críticos
git add index.html construccion-*.html .htaccess web.config _redirects 404.html contact-form.php config.php styles.css script.js manifest.json sw.js robots.txt sitemap.xml CNAME

# Documentación
git add *.md check-http-status.html

# Recursos
git add *.png *.jpg *.svg

# Carpeta de imágenes
git add images/

# Commit y push
git commit -m "Actualización del sitio web - Constructora Elite Sur"
git push origin main
```

## 🔧 **Si hay conflictos:**

### **Forzar actualización:**
```bash
git add .
git commit -m "Actualización forzada - Constructora Elite Sur"
git push -f origin main
```

### **Sincronizar con remoto:**
```bash
git pull origin main
git push origin main
```

## 📝 **Verificar que se subieron correctamente:**

### **Ver archivos en GitHub:**
1. Ve a tu repositorio en GitHub
2. Verifica que aparezcan todos los archivos
3. Confirma que `index.html` tenga los cambios

### **Verificar en el sitio web:**
1. Visita tu sitio web
2. Prueba la navegación
3. Verifica que el botón de WhatsApp funcione
4. Revisa que no haya errores en la consola

## 🚨 **Archivos Críticos que NO deben faltar:**

- ✅ `index.html` (archivo principal)
- ✅ `.htaccess` (configuración servidor)
- ✅ `contact-form.php` (formularios)
- ✅ `config.php` (configuración email)
- ✅ `images/` (todas las imágenes)
- ✅ `manifest.json` (PWA)
- ✅ `sw.js` (Service Worker)

## 💡 **Consejos:**

1. **Siempre haz backup** antes de subir
2. **Verifica que el sitio funcione** después de subir
3. **Revisa los logs del servidor** si hay problemas
4. **Mantén la documentación actualizada**

---

**¡Después de subir estos archivos, tu sitio web estará completamente actualizado con todas las mejoras implementadas!** 🎉
