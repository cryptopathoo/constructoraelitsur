# 📊 Configurar Google Analytics para Constructora Elite Sur

## 🎯 Objetivo
Configurar Google Analytics 4 para rastrear el comportamiento de los usuarios en el sitio web de Constructora Elite Sur.

## 📋 Pasos para Configurar

### **Paso 1: Crear Cuenta de Google Analytics**

1. **Ve a Google Analytics**: https://analytics.google.com/
2. **Inicia sesión** con tu cuenta de Google
3. **Haz clic en "Comenzar"**
4. **Selecciona "Medir"** → **"Web"**

### **Paso 2: Configurar la Propiedad**

**Información de la propiedad:**
- **Nombre de la propiedad**: `Constructora Elite Sur`
- **URL del sitio web**: `https://constructoraelitsur.cl`
- **Categoría**: `Construcción`
- **Zona horaria**: `Chile (GMT-3)`
- **Moneda**: `Peso Chileno (CLP)`

### **Paso 3: Crear Flujo de Datos**

1. **Haz clic en "Flujo de datos"**
2. **Selecciona "Web"**
3. **Configura**:
   - **URL del sitio web**: `https://constructoraelitsur.cl`
   - **Nombre del flujo**: `Constructora Elite Sur - Web`
   - **Medición mejorada**: ✅ Activada

### **Paso 4: Obtener tu ID de Medición**

1. **En la configuración de la propiedad**, busca **"ID de medición"**
2. **Tu ID será algo como**: `G-XXXXXXXXXX` (donde X son números y letras)
3. **Copia este ID** - lo necesitarás para el código

### **Paso 5: Configurar el Código en el Sitio**

Una vez que tengas tu ID de medición:

1. **Abre el archivo `index.html`**
2. **Busca la sección de Google Analytics** (línea 76-108)
3. **Descomenta las líneas del script** (quita `<!--` y `-->`)
4. **Reemplaza `TU_ID_AQUI`** con tu ID real

**Ejemplo:**
```html
<!-- Cambiar esto -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID_AQUI"></script>

<!-- Por esto (con tu ID real) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
```

### **Paso 6: Verificar la Instalación**

1. **Guarda el archivo `index.html`**
2. **Sube el archivo al servidor**
3. **Visita tu sitio web**
4. **Ve a Google Analytics** → **"Tiempo real"**
5. **Deberías ver actividad** si hay visitantes

## 🎯 Eventos Personalizados Configurados

El sitio ya está configurado para rastrear estos eventos:

### **Navegación Interna**
- **Evento**: `navegacion_interna`
- **Cuándo se activa**: Al hacer clic en enlaces del menú
- **Datos rastreados**: Sección visitada, página actual

### **Formularios de Contacto**
- **Evento**: `formulario_contacto`
- **Cuándo se activa**: Al enviar formularios
- **Datos rastreados**: Tipo de servicio, datos del cliente

### **Botones de WhatsApp**
- **Evento**: `click_whatsapp`
- **Cuándo se activa**: Al hacer clic en botones de WhatsApp
- **Datos rastreados**: Ubicación del botón, página actual

### **Calculadora de Presupuestos**
- **Evento**: `calculadora_presupuesto`
- **Cuándo se activa**: Al usar la calculadora
- **Datos rastreados**: Tipo de proyecto, valor estimado

## 📊 Métricas Importantes para Constructora

### **Objetivos (Goals) Recomendados**

1. **Contacto por Formulario**
   - **Tipo**: Destino
   - **URL**: `/contacto` o página de agradecimiento

2. **Contacto por WhatsApp**
   - **Tipo**: Evento
   - **Evento**: `click_whatsapp`

3. **Solicitud de Presupuesto**
   - **Tipo**: Evento
   - **Evento**: `calculadora_presupuesto`

4. **Descarga de Catálogo** (si tienes)
   - **Tipo**: Descarga de archivo

### **Audiencias Personalizadas**

1. **Visitantes Interesados en Construcción Residencial**
   - Usuarios que visitan `/construccion-residencial.html`

2. **Visitantes Interesados en Construcción Comercial**
   - Usuarios que visitan `/construccion-comercial.html`

3. **Visitantes de Alto Engagement**
   - Usuarios que visitan 3+ páginas

## 🔧 Configuraciones Avanzadas

### **Filtros Recomendados**

1. **Excluir tráfico interno**
   - Filtro para excluir tu IP

2. **Solo tráfico de Chile**
   - Filtro por país = Chile

3. **Excluir bots y spiders**
   - Filtro para excluir tráfico no humano

### **Enlaces Mejorados**

1. **Enlaces de campaña**
   - Para publicidad en redes sociales
   - Para email marketing

2. **Enlaces de referrer**
   - Para rastrear de dónde vienen los clientes

## 📱 Configuración para Móviles

El sitio ya está optimizado para móviles, pero puedes configurar:

1. **Audiencias móviles**
2. **Eventos específicos para móviles**
3. **Conversiones desde dispositivos móviles**

## 🚨 Solución de Problemas

### **El código no funciona**

1. **Verifica que el ID sea correcto**
2. **Asegúrate de que el script esté descomentado**
3. **Verifica que no haya errores de JavaScript en la consola**

### **No veo datos en tiempo real**

1. **Espera 24-48 horas** para ver datos completos
2. **Verifica que el sitio esté activo**
3. **Comprueba que no haya filtros que bloqueen el tráfico**

### **Datos incorrectos**

1. **Verifica la zona horaria**
2. **Revisa los filtros aplicados**
3. **Comprueba la configuración de la propiedad**

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola del navegador** (F12)
2. **Verifica en Google Analytics** → **"Tiempo real"**
3. **Usa Google Tag Assistant** para verificar la instalación

## ✅ Lista de Verificación

- [ ] Cuenta de Google Analytics creada
- [ ] Propiedad configurada correctamente
- [ ] ID de medición obtenido
- [ ] Código instalado en el sitio
- [ ] Script descomentado
- [ ] ID reemplazado en el código
- [ ] Verificación en tiempo real exitosa
- [ ] Objetivos configurados
- [ ] Audiencias personalizadas creadas

---

**¡Una vez completado, tendrás un seguimiento completo del comportamiento de tus clientes potenciales!** 🎉

