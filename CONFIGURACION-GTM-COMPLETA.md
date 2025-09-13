# 🏷️ Configuración Completa de Google Tag Manager - Constructora Elite Sur

## ✅ **Estado Actual de la Configuración**

### **Google Tag Manager Activo:**
- **ID del Contenedor**: `GTM-P869V9VW`
- **Pasarela de etiquetas**: ✅ Activa (Cloudflare)
- **Dominio**: `constructoraelitsur.cl`
- **Envío de datos**: A través del dominio propio

## 🎯 **Eventos Configurados en el Sitio Web**

El sitio web está configurado para enviar estos eventos a `dataLayer`:

### **1. Navegación Interna**
```javascript
dataLayer.push({
    'event': 'navegacion_interna',
    'seccion': '#inicio', // o la sección visitada
    'page_title': 'Constructora Elite Sur - inicio',
    'event_category': 'Navegación',
    'event_label': '#inicio'
});
```

### **2. Formularios de Contacto**
```javascript
dataLayer.push({
    'event': 'formulario_contacto',
    'event_category': 'Formulario',
    'event_label': 'Contacto',
    'value': 1
});
```

### **3. Clicks en WhatsApp**
```javascript
dataLayer.push({
    'event': 'click_whatsapp',
    'event_category': 'Contacto',
    'event_label': 'WhatsApp',
    'value': 1
});
```

### **4. Calculadora de Presupuestos**
```javascript
dataLayer.push({
    'event': 'calculadora_presupuesto',
    'event_category': 'Herramienta',
    'event_label': 'Calculadora',
    'value': 1
});
```

## 🛠️ **Configuración Recomendada en GTM**

### **Paso 1: Configurar Google Analytics 4**

1. **Ve a Google Tag Manager**: https://tagmanager.google.com/
2. **Selecciona tu contenedor**: `GTM-P869V9VW`
3. **Ve a "Etiquetas"** → **"Nueva"**
4. **Configura la etiqueta**:
   - **Tipo**: Google Analytics: GA4 Configuration
   - **ID de medición**: Tu ID de Google Analytics (G-XXXXXXXXXX)
   - **Activación**: All Pages

### **Paso 2: Configurar Eventos Personalizados**

#### **Evento: Navegación Interna**
1. **Nueva etiqueta** → **Google Analytics: GA4 Event**
2. **Configuración**:
   - **Etiqueta GA4**: [Selecciona tu etiqueta GA4]
   - **Nombre del evento**: `navegacion_interna`
   - **Parámetros**:
     - `seccion`: `{{DLV - seccion}}`
     - `page_title`: `{{DLV - page_title}}`
     - `event_category`: `{{DLV - event_category}}`
     - `event_label`: `{{DLV - event_label}}`
3. **Activación**: Personalizada
   - **Nombre**: `navegacion_interna`
   - **Condición**: `{{Event}}` equals `navegacion_interna`

#### **Evento: Formulario de Contacto**
1. **Nueva etiqueta** → **Google Analytics: GA4 Event**
2. **Configuración**:
   - **Nombre del evento**: `formulario_contacto`
   - **Parámetros**:
     - `event_category`: `{{DLV - event_category}}`
     - `event_label`: `{{DLV - event_label}}`
     - `value`: `{{DLV - value}}`
3. **Activación**: Personalizada
   - **Condición**: `{{Event}}` equals `formulario_contacto`

#### **Evento: Click WhatsApp**
1. **Nueva etiqueta** → **Google Analytics: GA4 Event**
2. **Configuración**:
   - **Nombre del evento**: `click_whatsapp`
   - **Parámetros**:
     - `event_category`: `{{DLV - event_category}}`
     - `event_label`: `{{DLV - event_label}}`
     - `value`: `{{DLV - value}}`
3. **Activación**: Personalizada
   - **Condición**: `{{Event}}` equals `click_whatsapp`

#### **Evento: Calculadora de Presupuestos**
1. **Nueva etiqueta** → **Google Analytics: GA4 Event**
2. **Configuración**:
   - **Nombre del evento**: `calculadora_presupuesto`
   - **Parámetros**:
     - `event_category`: `{{DLV - event_category}}`
     - `event_label`: `{{DLV - event_label}}`
     - `value`: `{{DLV - value}}`
3. **Activación**: Personalizada
   - **Condición**: `{{Event}}` equals `calculadora_presupuesto`

### **Paso 3: Crear Variables de DataLayer**

1. **Ve a "Variables"** → **"Nueva"**
2. **Crea estas variables**:

#### **Variable: DLV - seccion**
- **Tipo**: Variable de capa de datos
- **Nombre de la variable de capa de datos**: `seccion`

#### **Variable: DLV - page_title**
- **Tipo**: Variable de capa de datos
- **Nombre de la variable de capa de datos**: `page_title`

#### **Variable: DLV - event_category**
- **Tipo**: Variable de capa de datos
- **Nombre de la variable de capa de datos**: `event_category`

#### **Variable: DLV - event_label**
- **Tipo**: Variable de capa de datos
- **Nombre de la variable de capa de datos**: `event_label`

#### **Variable: DLV - value**
- **Tipo**: Variable de capa de datos
- **Nombre de la variable de capa de datos**: `value`

### **Paso 4: Crear Activadores Personalizados**

1. **Ve a "Activadores"** → **"Nuevo"**
2. **Crea estos activadores**:

#### **Activador: navegacion_interna**
- **Tipo**: Activador personalizado
- **Nombre**: `navegacion_interna`
- **Condición**: `{{Event}}` equals `navegacion_interna`

#### **Activador: formulario_contacto**
- **Tipo**: Activador personalizado
- **Nombre**: `formulario_contacto`
- **Condición**: `{{Event}}` equals `formulario_contacto`

#### **Activador: click_whatsapp**
- **Tipo**: Activador personalizado
- **Nombre**: `click_whatsapp`
- **Condición**: `{{Event}}` equals `click_whatsapp`

#### **Activador: calculadora_presupuesto**
- **Tipo**: Activador personalizado
- **Nombre**: `calculadora_presupuesto`
- **Condición**: `{{Event}}` equals `calculadora_presupuesto`

## 🎯 **Objetivos Recomendados en Google Analytics**

### **1. Conversión: Formulario de Contacto**
- **Tipo**: Evento
- **Evento**: `formulario_contacto`
- **Valor**: 1

### **2. Conversión: Click WhatsApp**
- **Tipo**: Evento
- **Evento**: `click_whatsapp`
- **Valor**: 1

### **3. Conversión: Calculadora de Presupuestos**
- **Tipo**: Evento
- **Evento**: `calculadora_presupuesto`
- **Valor**: 1

### **4. Engagement: Navegación Interna**
- **Tipo**: Evento
- **Evento**: `navegacion_interna`
- **Valor**: 1

## 📊 **Audiencias Personalizadas Recomendadas**

### **1. Visitantes Interesados en Construcción Residencial**
- **Condición**: Páginas vistas que contienen `/construccion-residencial`

### **2. Visitantes Interesados en Construcción Comercial**
- **Condición**: Páginas vistas que contienen `/construccion-comercial`

### **3. Visitantes de Alto Engagement**
- **Condición**: 3+ páginas vistas O tiempo en sitio > 2 minutos

### **4. Clientes Potenciales (Conversiones)**
- **Condición**: Evento `formulario_contacto` O `click_whatsapp` O `calculadora_presupuesto`

## 🔧 **Verificación de la Configuración**

### **1. Usar Google Tag Assistant**
1. **Instala la extensión**: Google Tag Assistant Legacy
2. **Visita tu sitio**: `constructoraelitsur.cl`
3. **Verifica que aparezcan**:
   - Google Tag Manager
   - Google Analytics (si está configurado)

### **2. Usar la Vista de Depuración de GTM**
1. **En GTM**, haz clic en **"Vista previa"**
2. **Abre tu sitio** en una nueva pestaña
3. **Verifica que los eventos aparezcan** en la vista de depuración

### **3. Verificar en Google Analytics**
1. **Ve a Google Analytics** → **"Tiempo real"**
2. **Navega por tu sitio**
3. **Verifica que aparezcan**:
   - Páginas vistas
   - Eventos personalizados

## 📱 **Configuración Adicional Recomendada**

### **1. Facebook Pixel (si usas Facebook Ads)**
```javascript
dataLayer.push({
    'event': 'pixel_ready',
    'facebook_pixel_id': 'TU_PIXEL_ID'
});
```

### **2. Google Ads Conversion Tracking**
```javascript
dataLayer.push({
    'event': 'conversion',
    'conversion_id': 'TU_CONVERSION_ID',
    'conversion_label': 'TU_CONVERSION_LABEL'
});
```

### **3. Hotjar (para análisis de comportamiento)**
```javascript
dataLayer.push({
    'event': 'hotjar_ready',
    'hotjar_id': 'TU_HOTJAR_ID'
});
```

## 🚨 **Solución de Problemas**

### **Los eventos no aparecen en GTM**
1. **Verifica que `dataLayer` esté definido**
2. **Revisa la consola del navegador** para errores
3. **Usa la vista de depuración** de GTM

### **Los eventos no llegan a Google Analytics**
1. **Verifica que Google Analytics esté configurado** en GTM
2. **Comprueba que las etiquetas estén publicadas**
3. **Espera 24-48 horas** para ver datos completos

### **Datos duplicados**
1. **Asegúrate de no tener** Google Analytics directo en el código
2. **Verifica que solo GTM** esté enviando datos
3. **Revisa la configuración** de filtros en Google Analytics

## ✅ **Lista de Verificación Final**

- [ ] Google Tag Manager configurado (`GTM-P869V9VW`)
- [ ] Pasarela de etiquetas activa
- [ ] Google Analytics configurado en GTM
- [ ] Eventos personalizados configurados
- [ ] Variables de DataLayer creadas
- [ ] Activadores personalizados creados
- [ ] Etiquetas publicadas
- [ ] Verificación en tiempo real exitosa
- [ ] Objetivos configurados en Google Analytics
- [ ] Audiencias personalizadas creadas

---

**¡Tu configuración de GTM está optimizada y lista para rastrear todas las interacciones importantes de tus clientes potenciales!** 🎉
