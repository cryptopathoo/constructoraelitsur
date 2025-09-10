# 📧 Instrucciones para Configurar el Formulario de Contacto

## 🚀 Configuración Rápida

### 1. **Configurar tu Email**
1. Abre el archivo `config.php`
2. En la línea 8, cambia `tu-email@constructoraelitsur.cl` por tu email real
3. Guarda el archivo

### 2. **Subir Archivos al Servidor**
Necesitas subir estos archivos a tu servidor web:
- ✅ `index.html` (ya tienes)
- ✅ `styles.css` (ya tienes)
- ✅ `contact-form.php` (nuevo)
- ✅ `config.php` (nuevo)

### 3. **Verificar que PHP Funcione**
- Tu servidor debe tener PHP habilitado
- La mayoría de servidores web lo tienen por defecto

## 📋 Archivos Creados

### `contact-form.php`
- Procesa el formulario de contacto
- Envía emails con los datos del cliente
- Incluye validación y seguridad

### `config.php`
- Configuración centralizada
- Fácil de modificar
- Incluye funciones de seguridad

## 🔧 Configuración Avanzada

### Cambiar el Email de Destino
```php
// En config.php, línea 8:
'to_email' => 'tu-email-real@gmail.com', // ⬅️ Cambia aquí
```

### Cambiar el Email de Origen
```php
// En config.php, línea 11:
'from_email' => 'contacto@constructoraelitsur.cl', // ⬅️ Cambia aquí
```

## 📧 Cómo Funciona

1. **Cliente llena el formulario** → Datos se envían a `contact-form.php`
2. **PHP valida los datos** → Verifica que todo esté correcto
3. **Se envía email** → Recibes el mensaje en tu email configurado
4. **Cliente recibe confirmación** → Ve mensaje de éxito o error

## 🎨 Características del Email

El email que recibirás incluye:
- ✅ Nombre completo del cliente
- ✅ Email de contacto
- ✅ Teléfono (si lo proporciona)
- ✅ Servicio de interés
- ✅ Mensaje completo
- ✅ Fecha y hora del envío
- ✅ Diseño profesional con colores de la empresa

## 🛡️ Seguridad Incluida

- ✅ Validación de datos
- ✅ Limpieza de inputs
- ✅ Protección contra inyección
- ✅ Validación de email
- ✅ Campos requeridos

## 🔍 Solución de Problemas

### El formulario no envía emails
1. Verifica que PHP esté habilitado en tu servidor
2. Confirma que el email en `config.php` sea correcto
3. Revisa que los archivos estén en la misma carpeta

### No recibes los emails
1. Revisa tu carpeta de spam
2. Verifica que el email esté bien escrito
3. Contacta a tu proveedor de hosting

### Error 500
1. Verifica que PHP esté habilitado
2. Revisa los permisos de los archivos
3. Confirma que no haya errores de sintaxis

## 📞 Soporte

Si tienes problemas:
1. Verifica que todos los archivos estén subidos
2. Confirma que el email esté configurado correctamente
3. Revisa que tu servidor tenga PHP habilitado

## 🎯 Próximos Pasos

1. **Configura tu email** en `config.php`
2. **Sube los archivos** a tu servidor
3. **Prueba el formulario** enviando un mensaje de prueba
4. **Verifica** que recibas el email

¡Listo! Ahora recibirás todos los mensajes de tus clientes directamente en tu email. 📧✨
