<?php
// ========================================
// CONFIGURACIÓN DE EMAIL - CONSTRUCTORA ELITE SUR
// ========================================
// 
// INSTRUCCIONES:
// 1. Cambia el email en la línea 8 por tu email real
// 2. Guarda el archivo
// 3. Sube ambos archivos (contact-form.php y config.php) a tu servidor
// 4. Asegúrate de que tu servidor tenga PHP habilitado
//
// ========================================

// 📧 EMAIL DONDE RECIBIRÁS LOS MENSAJES
// Cambia este email por el tuyo real
$config = [
    'to_email' => 'ecomovd@gmail.com', // ⬅️ EMAIL CONFIGURADO
    
    // Email de origen (puede ser el mismo que el de arriba)
    'from_email' => 'noreply@constructoraelitsur.cl',
    
    // Asunto del email
    'subject_prefix' => 'Nuevo mensaje desde Constructora Elite Sur',
    
    // Configuración adicional
    'company_name' => 'Constructora Elite Sur',
    'website_url' => 'https://constructoraelitsur.cl'
];

// Función para obtener la configuración
function getConfig($key) {
    global $config;
    return isset($config[$key]) ? $config[$key] : '';
}

// Función para validar email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Función para limpiar datos
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
