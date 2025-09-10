<?php
// Incluir configuración
require_once 'config.php';

// Obtener configuración
$to_email = getConfig('to_email');
$from_email = getConfig('from_email');
$subject_prefix = getConfig('subject_prefix');
$company_name = getConfig('company_name');

// Verificar que el formulario fue enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener y limpiar los datos del formulario
    $nombre = isset($_POST['nombre']) ? cleanInput($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
    $telefono = isset($_POST['telefono']) ? cleanInput($_POST['telefono']) : '';
    $servicio = isset($_POST['servicio']) ? cleanInput($_POST['servicio']) : '';
    $mensaje = isset($_POST['mensaje']) ? cleanInput($_POST['mensaje']) : '';
    
    // Validaciones básicas
    $errors = [];
    
    if (empty($nombre)) {
        $errors[] = "El nombre es requerido";
    }
    
    if (empty($email) || !isValidEmail($email)) {
        $errors[] = "El email es requerido y debe ser válido";
    }
    
    if (empty($servicio)) {
        $errors[] = "Debe seleccionar un servicio";
    }
    
    if (empty($mensaje)) {
        $errors[] = "El mensaje es requerido";
    }
    
    // Si no hay errores, procesar el envío
    if (empty($errors)) {
        
        // Crear el contenido del email
        $email_content = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background: #007BFF; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #007BFF; }
                .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #007BFF; }
                .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>🏗️ Nuevo Mensaje de Cliente</h2>
                <p>Constructora Elite Sur - Formulario de Contacto</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Nombre Completo:</div>
                    <div class='value'>" . htmlspecialchars($nombre) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📧 Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📞 Teléfono:</div>
                    <div class='value'>" . htmlspecialchars($telefono) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>🔧 Servicio de Interés:</div>
                    <div class='value'>" . htmlspecialchars($servicio) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>💬 Mensaje:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($mensaje)) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📅 Fecha y Hora:</div>
                    <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este mensaje fue enviado desde el formulario de contacto de Constructora Elite Sur</p>
                <p>Para responder, simplemente responde a este email</p>
            </div>
        </body>
        </html>
        ";
        
        // Configurar headers del email
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $from_email,
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        // Enviar el email
        $mail_sent = mail($to_email, $subject_prefix . " - " . $nombre, $email_content, implode("\r\n", $headers));
        
        if ($mail_sent) {
            // Respuesta de éxito
            $response = [
                'success' => true,
                'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
            ];
        } else {
            // Error al enviar email
            $response = [
                'success' => false,
                'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.'
            ];
        }
        
    } else {
        // Hay errores de validación
        $response = [
            'success' => false,
            'message' => 'Por favor, corrige los siguientes errores: ' . implode(', ', $errors)
        ];
    }
    
    // Devolver respuesta en JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    
} else {
    // Si no es POST, redirigir al inicio
    header('Location: index.html');
    exit;
}
?>
