// Variables globales
let chatbotOpen = false;
let chatbotMessages = [];
let savedCalculations = JSON.parse(localStorage.getItem('savedCalculations')) || [];

// Configuración de rendimiento
const DEBOUNCE_DELAY = 300;
const THROTTLE_DELAY = 100;

// Funciones de optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación móvil
    initMobileNavigation();
    
    // Inicializar scroll suave
    initSmoothScroll();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar chatbot
    initChatbot();
    
    // Inicializar header scroll
    initHeaderScroll();
    
    // Inicializar lazy loading
    initLazyLoading();
    
    // Diagnóstico de enlaces
    diagnoseLinks();
    
    // Inicializar enlaces del footer específicamente
    initFooterLinks();
});


// Inicializar navegación móvil
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        const footerLinks = document.querySelectorAll('.footer-link');
        const allMenuLinks = [...navLinks, ...footerLinks];
        
        allMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Inicializar scroll suave
function initSmoothScroll() {
    console.log('🔧 Inicializando scroll suave...');
    
    // Función para manejar el scroll suave
    function handleSmoothScroll(e, targetId) {
        e.preventDefault();
        console.log('🎯 Navegando a:', targetId);
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 120;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            console.log('📍 Posición objetivo:', targetPosition);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar URL sin recargar la página
            history.pushState(null, null, targetId);
        } else {
            console.error('❌ Sección no encontrada:', targetId);
        }
    }
    
    // Función para manejar enlaces entre páginas
    function handleCrossPageNavigation(e, href) {
        console.log('🌐 Navegando a otra página:', href);
        // Permitir navegación normal
        window.location.href = href;
    }
    
    // Aplicar a todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('📋 Enlaces de navegación encontrados:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`🔗 Enlace ${index + 1}:`, href);
        
        link.addEventListener('click', function(e) {
            if (href && href.startsWith('#')) {
                handleSmoothScroll(e, href);
            } else if (href && href.includes('.html')) {
                handleCrossPageNavigation(e, href);
            }
        });
    });
    
    // Aplicar a todos los enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-link');
    console.log('📋 Enlaces del footer encontrados:', footerLinks.length);
    
    footerLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`🔗 Footer enlace ${index + 1}:`, href);
        
        link.addEventListener('click', function(e) {
            if (href && href.startsWith('#')) {
                handleSmoothScroll(e, href);
            } else if (href && href.includes('.html')) {
                handleCrossPageNavigation(e, href);
            }
        });
    });
    
    // Aplicar a cualquier enlace con ancla en la página
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log('📋 Todos los enlaces con ancla:', allAnchorLinks.length);
    
    allAnchorLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`🔗 Ancla ${index + 1}:`, href);
        
        // Solo agregar listener si no lo tiene ya
        if (!link.hasAttribute('data-smooth-scroll')) {
            link.setAttribute('data-smooth-scroll', 'true');
            link.addEventListener('click', function(e) {
                handleSmoothScroll(e, href);
            });
        }
    });
    
    console.log('✅ Scroll suave inicializado correctamente');
}

// Inicializar formulario de contacto
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const formObject = {};
            
            // Convertir FormData a objeto
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Simular envío del formulario
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            this.reset();
        });
    }
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Evento para cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Inicializar animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .vision, .mission');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para validar teléfono
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Agregar validación en tiempo real al formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
});

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }
    
    // Validar email
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Ingresa un email válido';
    }
    
    // Validar teléfono
    if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Ingresa un teléfono válido';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 5px;
    `;
    
    field.style.borderColor = '#e74c3c';
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
}

// Función para hacer scroll al inicio
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll to top
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 100px;
        width: 50px;
        height: 50px;
        background: #4a7c59;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
});

// ==================== WHATSAPP FUNCTIONS ====================

// Función para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '56948088573';
    const message = '¡Hola! Me interesa conocer más sobre los servicios de Constructora Elite Sur.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('📱 Abriendo WhatsApp...');
    window.open(whatsappUrl, '_blank');
}

// ==================== CHATBOT FUNCTIONS (DEPRECATED) ====================

// Inicializar chatbot
function initChatbot() {
    console.log('🤖 Inicializando chatbot...');
    
    // Verificar que el chatbot existe
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    
    if (!chatbotToggle) {
        console.error('❌ Chatbot toggle not found');
        return;
    }
    
    if (!chatbotWindow) {
        console.error('❌ Chatbot window not found');
        return;
    }
    
    console.log('✅ Chatbot elements found');
    
    // Mensajes predefinidos del bot
    chatbotMessages = [
        {
            keywords: ['hola', 'hi', 'hello', 'buenos días', 'buenas tardes', 'buenas noches'],
            response: '¡Hola! 👋 Bienvenido a Constructora S&D. ¿En qué puedo ayudarte hoy?\n\n🛠️ Puedo ayudarte con:\n• Cálculos de materiales\n• Información de servicios\n• Presupuestos\n• Contacto\n\nEscribe "calculadora" para ver las herramientas disponibles.'
        },
        {
            keywords: ['calculadora', 'calcular', 'herramientas', 'materiales'],
            response: '🛠️ **CALCULADORA DE MATERIALES S&D**\n\nEscribe el número de la herramienta que necesitas:\n\n1️⃣ **Radier** - Cemento, arena, gravilla\n2️⃣ **Losa** - Hormigón y refuerzos\n3️⃣ **Muros** - Bloques, cemento, arena\n4️⃣ **Pintura** - Metros cuadrados y capas\n5️⃣ **Cerámica** - Baldosas y adhesivos\n6️⃣ **Techo** - Tejas y materiales\n7️⃣ **Piso flotante** - Tablas y materiales\n8️⃣ **Presupuesto general** - Múltiples materiales\n9️⃣ **Mano de obra** - Costos y tiempos\n🔟 **Aislamiento térmico** - Materiales aislantes\n\nEjemplo: "1" para calcular radier'
        },
        {
            keywords: ['1', 'radier', 'contrapiso'],
            response: '🏗️ **CALCULADORA DE RADIER**\n\nPara calcular los materiales necesarios, necesito que me digas:\n\n📏 **¿Cuántos metros cuadrados (m²) tiene tu radier?**\n\nEjemplo: "50 m2" o "50 metros cuadrados"\n\n📊 **Materiales que calcularemos:**\n• Sacos de cemento (25kg cada uno)\n• Metros cúbicos de arena\n• Metros cúbicos de gravilla\n• Agua necesaria\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['2', 'losa', 'hormigón'],
            response: '🏢 **CALCULADORA DE LOSA**\n\nPara calcular los materiales de la losa, necesito:\n\n📏 **¿Cuántos metros cuadrados (m²)?**\n📐 **¿Qué espesor en centímetros?** (ej: 15cm)\n\nEjemplo: "100 m2 15cm" o "100 metros cuadrados 15 centímetros"\n\n📊 **Materiales que calcularemos:**\n• Metros cúbicos de hormigón\n• Acero de refuerzo\n• Encofrado\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['3', 'muros', 'bloques'],
            response: '🧱 **CALCULADORA DE MUROS**\n\nPara calcular los materiales del muro, necesito:\n\n📏 **¿Cuántos metros cuadrados (m²) de muro?**\n📐 **¿Qué tipo de bloque?** (15cm, 20cm, 30cm)\n\nEjemplo: "80 m2 20cm" o "80 metros cuadrados bloque 20"\n\n📊 **Materiales que calcularemos:**\n• Cantidad de bloques\n• Sacos de cemento (25kg cada uno)\n• Metros cúbicos de arena\n• Mortero necesario\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['4', 'pintura'],
            response: '🎨 **CALCULADORA DE PINTURA**\n\nPara calcular la pintura necesaria:\n\n📏 **¿Cuántos metros cuadrados (m²) a pintar?**\n🎨 **¿Cuántas capas?** (1, 2 o 3)\n\nEjemplo: "120 m2 2 capas" o "120 metros cuadrados 2 capas"\n\n📊 **Materiales que calcularemos:**\n• Litros de pintura\n• Cantidad de rodillos\n• Brochas necesarias\n• Cinta de enmascarar\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['5', 'cerámica', 'baldosas'],
            response: '🔲 **CALCULADORA DE CERÁMICA**\n\nPara calcular las baldosas necesarias:\n\n📏 **¿Cuántos metros cuadrados (m²)?**\n📐 **¿Qué tamaño de baldosa?** (30x30, 40x40, 60x60)\n\nEjemplo: "60 m2 40x40" o "60 metros cuadrados 40 por 40"\n\n📊 **Materiales que calcularemos:**\n• Cantidad de baldosas\n• Adhesivo necesario\n• Lechada (junta)\n• Materiales auxiliares\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['6', 'techo', 'tejas'],
            response: '🏠 **CALCULADORA DE TECHO**\n\nPara calcular los materiales del techo:\n\n📏 **¿Cuántos metros cuadrados (m²) de techo?**\n🏠 **¿Qué tipo de teja?** (asfáltica, cerámica, zinc)\n\nEjemplo: "150 m2 asfáltica" o "150 metros cuadrados teja asfáltica"\n\n📊 **Materiales que calcularemos:**\n• Cantidad de tejas\n• Maderas estructurales\n• Aislantes\n• Clavos y tornillos\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['7', 'piso flotante', 'laminado'],
            response: '🪵 **CALCULADORA DE PISO FLOTANTE**\n\nPara calcular el piso flotante:\n\n📏 **¿Cuántos metros cuadrados (m²)?**\n📐 **¿Qué tipo de tabla?** (8mm, 10mm, 12mm)\n\nEjemplo: "80 m2 10mm" o "80 metros cuadrados 10 milímetros"\n\n📊 **Materiales que calcularemos:**\n• Cantidad de tablas\n• Aislante acústico\n• Zócalos\n• Materiales de instalación\n• Costo aproximado en pesos chilenos'
        },
        {
            keywords: ['8', 'presupuesto', 'general'],
            response: '💰 **PRESUPUESTO GENERAL**\n\nPara un presupuesto completo, necesito:\n\n📏 **¿Cuántos metros cuadrados totales?**\n🏠 **¿Qué tipo de construcción?** (casa, edificio, local)\n📐 **¿Cuántos pisos?**\n\nEjemplo: "120 m2 casa 2 pisos" o "120 metros cuadrados casa dos pisos"\n\n📊 **Incluiremos:**\n• Todos los materiales\n• Mano de obra\n• Costo total aproximado\n• Desglose por partidas\n• Tiempo estimado de construcción'
        },
        {
            keywords: ['9', 'mano de obra', 'trabajadores'],
            response: '👷 **CALCULADORA DE MANO DE OBRA**\n\nPara calcular costos de mano de obra, necesito:\n\n📏 **¿Cuántos metros cuadrados (m²)?**\n🔨 **¿Qué tipo de trabajo?** (radier, losa, muros, pintura, cerámica, techo)\n\nEjemplo: "50 m2 radier" o "50 metros cuadrados radier"\n\n📊 **Información que calcularemos:**\n• Costo por m²\n• Tiempo estimado\n• Número de trabajadores\n• Costo total de mano de obra'
        },
        {
            keywords: ['10', 'aislamiento', 'térmico'],
            response: '🧊 **CALCULADORA DE AISLAMIENTO TÉRMICO**\n\nPara calcular materiales de aislamiento, necesito:\n\n📏 **¿Cuántos metros cuadrados (m²)?**\n🧊 **¿Qué tipo de aislamiento?** (poliestireno, lana, poliuretano)\n\nEjemplo: "80 m2 poliestireno" o "80 metros cuadrados poliestireno"\n\n📊 **Materiales que calcularemos:**\n• Cantidad de material aislante\n• Espesor recomendado\n• Costo total\n• Beneficios energéticos'
        },
        {
            keywords: ['servicios', 'servicio', 'construcción', 'construir'],
            response: 'Ofrecemos varios servicios: 🏠 Construcción Residencial, 🏢 Construcción Comercial, 🏭 Construcción Industrial, 🔨 Remodelaciones, 🚿 Remodelación de Baños, 📐 Diseño Arquitectónico y 💼 Consultoría. ¿Te interesa alguno en particular?'
        },
        {
            keywords: ['precio', 'costo', 'presupuesto', 'cotización'],
            response: 'Para obtener un presupuesto personalizado, necesito conocer más detalles de tu proyecto. Puedes contactarnos al +56 9 8765 4321 o completar el formulario de contacto. ¿Qué tipo de proyecto tienes en mente?'
        },
        {
            keywords: ['contacto', 'teléfono', 'email', 'dirección'],
            response: '📞 Teléfono: +56 9 8765 4321\n📧 Email: contacto@constructorasd.cl\n📍 Dirección: Av. Principal 1234, Villarrica, Región de La Araucanía\n💬 WhatsApp: +56 9 8765 4321 (Disponible 24/7)'
        },
        {
            keywords: ['horarios', 'horario', 'atención'],
            response: 'Nuestros horarios de atención son:\n🕐 Lunes a Viernes: 8:00 - 18:00\n🕘 Sábados: 9:00 - 14:00\n💬 WhatsApp disponible 24/7'
        },
        {
            keywords: ['proyectos', 'proyecto', 'obras'],
            response: 'Tenemos varios proyectos en desarrollo y finalizados. Puedes verlos en las secciones "Proyectos en Desarrollo" y "Proyectos Finalizados" de nuestro sitio web. ¿Te gustaría conocer más sobre algún tipo específico de proyecto?'
        },
        {
            keywords: ['gracias', 'thank you', 'thanks'],
            response: '¡De nada! 😊 Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en consultarme.'
        },
        {
            keywords: ['comparar', 'precios', 'proveedores'],
            response: '💰 **COMPARADOR DE PRECIOS**\n\nPara comparar precios entre proveedores, escribe:\n\n📝 **"comparar [material] [cantidad]"**\n\nEjemplo: "comparar cemento 10" o "comparar arena 2"\n\n📊 **Materiales disponibles:**\n• Cemento\n• Arena\n• Gravilla\n\n💡 Te mostraré precios de Sodimac, Easy, Mall Plaza y proveedores locales.'
        },
        {
            keywords: ['huella', 'carbono', 'ambiental', 'sostenible'],
            response: '🌱 **CALCULADORA DE HUELLA DE CARBONO**\n\nPara calcular el impacto ambiental de tu construcción, escribe:\n\n📝 **"huella [m2] [tipo]"**\n\nEjemplo: "huella 100 casa" o "huella 200 edificio"\n\n🏠 **Tipos de construcción:**\n• Casa\n• Edificio\n• Local\n\n🌍 Te mostraré el CO₂ emitido y recomendaciones sostenibles.'
        },
        {
            keywords: ['guardados', 'guardar', 'historial'],
            response: '📚 **CÁLCULOS GUARDADOS**\n\nPara ver tus cálculos guardados, escribe:\n\n📝 **"guardados"** - Ver lista de cálculos\n📝 **"[número]"** - Ver cálculo específico\n\nEjemplo: "guardados" o "1" para ver el primer cálculo\n\n💡 Los cálculos se guardan automáticamente cuando usas las calculadoras.'
        },
        {
            keywords: ['adiós', 'bye', 'chao', 'hasta luego'],
            response: '¡Hasta luego! 👋 Fue un placer ayudarte. ¡Que tengas un excelente día!'
        }
    ];
    
    // Configurar event listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    
    const chatbotClose = document.querySelector('.chatbot-close');
    if (chatbotClose) {
        chatbotClose.addEventListener('click', toggleChatbot);
    }
    
    const chatbotInput = document.getElementById('chatbotInput');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleChatbotKeypress);
    }
    
    const chatbotSendButton = document.querySelector('.chatbot-input button');
    if (chatbotSendButton) {
        chatbotSendButton.addEventListener('click', sendChatbotMessage);
    }
    
    console.log('✅ Chatbot event listeners configured');
}

// Alternar chatbot
function toggleChatbot() {
    console.log('🤖 Toggle chatbot clicked');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotBadge = document.querySelector('.chatbot-badge');
    
    if (!chatbotWindow) {
        console.error('❌ Chatbot window not found');
        return;
    }
    
    chatbotOpen = !chatbotOpen;
    console.log('🤖 Chatbot open:', chatbotOpen);
    
    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
        chatbotWindow.style.display = 'flex';
        if (chatbotBadge) {
            chatbotBadge.style.display = 'none';
        }
    } else {
        chatbotWindow.classList.remove('active');
        chatbotWindow.style.display = 'none';
    }
}

// Manejar tecla Enter en el input del chatbot
function handleChatbotKeypress(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

// Enviar mensaje del chatbot
function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Simular delay de respuesta
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessageToChat(botResponse, 'bot');
    }, 1000);
}

// Agregar mensaje al chat
function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = message.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll al final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Obtener respuesta del bot
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Verificar si es un cálculo de materiales
    const calculationResult = processMaterialCalculation(message);
    if (calculationResult) {
        return calculationResult;
    }
    
    // Buscar respuesta basada en palabras clave
    for (let botMessage of chatbotMessages) {
        for (let keyword of botMessage.keywords) {
            if (message.includes(keyword)) {
                return botMessage.response;
            }
        }
    }
    
    // Respuesta por defecto
    return 'Interesante pregunta. 🤔 Para darte la mejor respuesta, te recomiendo contactar directamente con nuestro equipo al +56 9 8765 4321 o completar el formulario de contacto. ¿Hay algo más en lo que pueda ayudarte?';
}

// ==================== CALCULADORA DE MATERIALES ====================

// Procesar cálculos de materiales
function processMaterialCalculation(message) {
    const text = message.toLowerCase();
    
    // Detectar cálculos de radier
    if (text.includes('m2') || text.includes('metros cuadrados') || text.includes('m²')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            return calculateRadier(m2);
        }
    }
    
    // Detectar cálculos de losa
    if (text.includes('losa') && (text.includes('cm') || text.includes('centímetros'))) {
        const m2 = extractNumber(text);
        const cm = extractNumber(text.replace(/m2|metros cuadrados|m²/gi, ''));
        if (m2 && cm && m2 > 0 && cm > 0) {
            return calculateLosa(m2, cm);
        }
    }
    
    // Detectar cálculos de muros
    if (text.includes('muro') && (text.includes('cm') || text.includes('bloque'))) {
        const m2 = extractNumber(text);
        const cm = extractNumber(text.replace(/m2|metros cuadrados|m²/gi, ''));
        if (m2 && cm && m2 > 0 && cm > 0) {
            return calculateMuros(m2, cm);
        }
    }
    
    // Detectar cálculos de pintura
    if (text.includes('pintar') && text.includes('capas')) {
        const m2 = extractNumber(text);
        const capas = extractNumber(text.replace(/m2|metros cuadrados|m²/gi, ''));
        if (m2 && capas && m2 > 0 && capas > 0) {
            return calculatePintura(m2, capas);
        }
    }
    
    // Detectar cálculos de cerámica
    if (text.includes('cerámica') || text.includes('baldosa')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            return calculateCeramica(m2);
        }
    }
    
    // Detectar cálculos de techo
    if (text.includes('techo') || text.includes('teja')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            let tipoTeja = 'asfáltica'; // default
            if (text.includes('cerámica')) tipoTeja = 'cerámica';
            else if (text.includes('zinc')) tipoTeja = 'zinc';
            return calculateTecho(m2, tipoTeja);
        }
    }
    
    // Detectar cálculos de piso flotante
    if (text.includes('piso flotante') || text.includes('laminado')) {
        const m2 = extractNumber(text);
        const mm = extractNumber(text.replace(/m2|metros cuadrados|m²/gi, ''));
        if (m2 && m2 > 0) {
            const espesor = mm && mm > 0 ? mm : 10; // default 10mm
            return calculatePisoFlotante(m2, espesor);
        }
    }
    
    // Detectar cálculos de presupuesto general
    if (text.includes('presupuesto') || text.includes('general')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            let tipoConstruccion = 'casa'; // default
            let pisos = 1; // default
            
            if (text.includes('edificio')) tipoConstruccion = 'edificio';
            else if (text.includes('local')) tipoConstruccion = 'local';
            
            const numeroPisos = extractNumber(text.replace(/m2|metros cuadrados|m²/gi, ''));
            if (numeroPisos && numeroPisos > 0) pisos = numeroPisos;
            
            return calculatePresupuestoGeneral(m2, tipoConstruccion, pisos);
        }
    }
    
    // Detectar cálculos de mano de obra
    if (text.includes('mano de obra') || text.includes('trabajadores')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            let tipoTrabajo = 'general'; // default
            if (text.includes('radier')) tipoTrabajo = 'radier';
            else if (text.includes('losa')) tipoTrabajo = 'losa';
            else if (text.includes('muros')) tipoTrabajo = 'muros';
            else if (text.includes('pintura')) tipoTrabajo = 'pintura';
            else if (text.includes('cerámica') || text.includes('baldosa')) tipoTrabajo = 'ceramica';
            else if (text.includes('techo') || text.includes('teja')) tipoTrabajo = 'techo';
            
            return calculateManoObra(m2, tipoTrabajo);
        }
    }
    
    // Detectar cálculos de aislamiento térmico
    if (text.includes('aislamiento') || text.includes('térmico')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            let tipoAislamiento = 'poliestireno'; // default
            if (text.includes('lana')) tipoAislamiento = 'lana';
            else if (text.includes('poliuretano')) tipoAislamiento = 'poliuretano';
            
            return calculateAislamiento(m2, tipoAislamiento);
        }
    }
    
    // Detectar comparador de precios
    if (text.includes('comparar')) {
        const palabras = text.toLowerCase().split(' ');
        const indiceComparar = palabras.indexOf('comparar');
        if (indiceComparar !== -1 && palabras[indiceComparar + 1]) {
            const material = palabras[indiceComparar + 1];
            const cantidad = extractNumber(text);
            if (cantidad && cantidad > 0) {
                return comparePrices(material, cantidad);
            }
        }
    }
    
    // Detectar calculadora de huella de carbono
    if (text.includes('huella')) {
        const m2 = extractNumber(text);
        if (m2 && m2 > 0) {
            let tipoConstruccion = 'casa'; // default
            if (text.includes('edificio')) tipoConstruccion = 'edificio';
            else if (text.includes('local')) tipoConstruccion = 'local';
            
            return calculateHuellaCarbono(m2, tipoConstruccion);
        }
    }
    
    // Detectar comandos de cálculos guardados
    if (text.includes('guardados')) {
        return showSavedCalculations();
    }
    
    // Detectar solicitud de cálculo guardado específico
    const numero = extractNumber(text);
    if (numero && numero > 0 && numero <= 10) {
        return getSavedCalculation(numero);
    }
    
    return null;
}

// Extraer número de un texto
function extractNumber(text) {
    const numbers = text.match(/\d+(\.\d+)?/g);
    return numbers ? parseFloat(numbers[0]) : null;
}

// Calcular materiales para radier
function calculateRadier(m2) {
    const espesor = 0.10; // 10cm de espesor estándar
    const volumen = m2 * espesor; // m³
    
    // Proporciones estándar para radier: 1:3:3 (cemento:arena:gravilla)
    // Bolsas de cemento de 25kg (14 sacos por m³)
    const cemento = Math.ceil(volumen * 14); // 14 sacos de 25kg por m³
    const arena = Math.ceil(volumen * 0.5); // 0.5 m³ por m³
    const gravilla = Math.ceil(volumen * 0.5); // 0.5 m³ por m³
    const agua = Math.ceil(volumen * 200); // 200 litros por m³
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (cemento * 3500) + (arena * 18000) + (gravilla * 18000);
    
    const resultado = `🏗️ **CÁLCULO DE RADIER - ${m2} m²**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Cemento:** ${cemento} sacos (25kg cada uno)\n🔸 **Arena:** ${arena} m³\n🔸 **Gravilla:** ${gravilla} m³\n🔸 **Agua:** ${agua} litros\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Espesor:** 10cm (estándar)\n📦 **Volumen total:** ${volumen.toFixed(2)} m³\n\n💡 Precios referenciales. Consulta precios actualizados en tu local de materiales.`;
    
    // Guardar cálculo automáticamente
    saveCalculation('Radier', `${m2} m²`, resultado);
    
    return resultado;
}

// Calcular materiales para losa
function calculateLosa(m2, espesorCm) {
    const espesor = espesorCm / 100; // convertir a metros
    const volumen = m2 * espesor; // m³
    
    const hormigon = Math.ceil(volumen * 1.1); // 10% de desperdicio
    const acero = Math.ceil(m2 * 80); // 80kg por m²
    const encofrado = Math.ceil(m2 * 1.2); // 20% de desperdicio
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (hormigon * 55000) + (acero * 950) + (encofrado * 12000);
    
    return `🏢 **CÁLCULO DE LOSA - ${m2} m² (${espesorCm}cm)**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Hormigón:** ${hormigon} m³\n🔸 **Acero de refuerzo:** ${acero} kg\n🔸 **Encofrado:** ${encofrado} m²\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Espesor:** ${espesorCm}cm\n📦 **Volumen total:** ${volumen.toFixed(2)} m³\n\n💡 Incluye 10% de desperdicio. Precios referenciales. Consulta precios actualizados.`;
}

// Calcular materiales para muros
function calculateMuros(m2, espesorCm) {
    let bloques, cemento, arena;
    
    if (espesorCm === 15) {
        bloques = Math.ceil(m2 * 12.5); // 12.5 bloques por m²
        cemento = Math.ceil(m2 * 1); // 1 saco de 25kg por m²
        arena = Math.ceil(m2 * 0.1); // 0.1 m³ por m²
    } else if (espesorCm === 20) {
        bloques = Math.ceil(m2 * 10); // 10 bloques por m²
        cemento = Math.ceil(m2 * 1.2); // 1.2 sacos de 25kg por m²
        arena = Math.ceil(m2 * 0.12); // 0.12 m³ por m²
    } else {
        bloques = Math.ceil(m2 * 8); // 8 bloques por m²
        cemento = Math.ceil(m2 * 1.4); // 1.4 sacos de 25kg por m²
        arena = Math.ceil(m2 * 0.15); // 0.15 m³ por m²
    }
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (bloques * 1200) + (cemento * 3500) + (arena * 18000);
    
    return `🧱 **CÁLCULO DE MUROS - ${m2} m² (${espesorCm}cm)**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Bloques:** ${bloques} unidades\n🔸 **Cemento:** ${cemento} sacos (25kg cada uno)\n🔸 **Arena:** ${arena} m³\n🔸 **Mortero:** ${Math.ceil(arena * 0.3)} m³\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Espesor:** ${espesorCm}cm\n🏗️ **Tipo:** Bloque de hormigón\n\n💡 Incluye mortero para juntas. Precios referenciales. Consulta precios actualizados.`;
}

// Calcular materiales para pintura
function calculatePintura(m2, capas) {
    const rendimiento = 12; // m² por litro
    const pintura = Math.ceil((m2 * capas) / rendimiento);
    const rodillos = Math.ceil(m2 / 50); // 1 rodillo cada 50m²
    const brochas = Math.ceil(m2 / 100); // 1 brocha cada 100m²
    const cinta = Math.ceil(m2 / 20); // 1 rollo cada 20m²
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (pintura * 12000) + (rodillos * 4500) + (brochas * 3000) + (cinta * 3500);
    
    return `🎨 **CÁLCULO DE PINTURA - ${m2} m² (${capas} capas)**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Pintura:** ${pintura} litros\n🔸 **Rodillos:** ${rodillos} unidades\n🔸 **Brochas:** ${brochas} unidades\n🔸 **Cinta de enmascarar:** ${cinta} rollos\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Rendimiento:** 12 m² por litro\n🎨 **Capas:** ${capas}\n\n💡 Rendimiento promedio. Varía según tipo de pintura. Consulta precios actualizados.`;
}

// Calcular materiales para cerámica
function calculateCeramica(m2) {
    const baldosas = Math.ceil(m2 * 1.1); // 10% de desperdicio
    const adhesivo = Math.ceil(m2 * 4); // 4kg por m²
    const lechada = Math.ceil(m2 * 0.5); // 0.5kg por m²
    const separadores = Math.ceil(m2 * 2); // 2mm separadores
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (baldosas * 4500) + (adhesivo * 3500) + (lechada * 2500) + (separadores * 200);
    
    return `🔲 **CÁLCULO DE CERÁMICA - ${m2} m²**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Baldosas:** ${baldosas} unidades (40x40cm)\n🔸 **Adhesivo:** ${adhesivo} kg\n🔸 **Lechada (junta):** ${lechada} kg\n🔸 **Separadores:** ${separadores} unidades\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Tamaño estándar:** 40x40cm\n📦 **Desperdicio:** 10% incluido\n\n💡 Ajusta según tamaño de baldosa elegida. Consulta precios actualizados.`;
}

// Calcular materiales para techo
function calculateTecho(m2, tipoTeja) {
    let tejas, maderas, aislante, clavos;
    
    if (tipoTeja === 'asfáltica') {
        tejas = Math.ceil(m2 * 1.1); // 10% de desperdicio
        maderas = Math.ceil(m2 * 0.8); // 0.8 m² de madera por m² de techo
        aislante = Math.ceil(m2 * 1.1); // 10% de desperdicio
        clavos = Math.ceil(m2 * 0.5); // 0.5kg de clavos por m²
    } else if (tipoTeja === 'cerámica') {
        tejas = Math.ceil(m2 * 1.15); // 15% de desperdicio
        maderas = Math.ceil(m2 * 1.0); // 1.0 m² de madera por m² de techo
        aislante = Math.ceil(m2 * 1.1); // 10% de desperdicio
        clavos = Math.ceil(m2 * 0.3); // 0.3kg de clavos por m²
    } else { // zinc
        tejas = Math.ceil(m2 * 1.05); // 5% de desperdicio
        maderas = Math.ceil(m2 * 0.6); // 0.6 m² de madera por m² de techo
        aislante = Math.ceil(m2 * 1.0); // Sin desperdicio
        clavos = Math.ceil(m2 * 0.4); // 0.4kg de clavos por m²
    }
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (tejas * 2500) + (maderas * 15000) + (aislante * 8000) + (clavos * 3000);
    
    return `🏠 **CÁLCULO DE TECHO - ${m2} m² (${tipoTeja})**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Tejas:** ${tejas} unidades\n🔸 **Maderas estructurales:** ${maderas} m²\n🔸 **Aislante térmico:** ${aislante} m²\n🔸 **Clavos y tornillos:** ${clavos} kg\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n🏠 **Tipo de teja:** ${tipoTeja}\n📦 **Desperdicio incluido** según tipo\n\n💡 Incluye materiales estructurales. Consulta precios actualizados.`;
}

// Calcular materiales para piso flotante
function calculatePisoFlotante(m2, espesorMm) {
    const tablas = Math.ceil(m2 * 1.1); // 10% de desperdicio
    const aislante = Math.ceil(m2 * 1.05); // 5% de desperdicio
    const zocalos = Math.ceil(m2 * 0.3); // 0.3m de zócalo por m²
    const adhesivo = Math.ceil(m2 * 0.2); // 0.2kg de adhesivo por m²
    
    // Costos según espesor
    let costoPorTabla;
    if (espesorMm === 8) {
        costoPorTabla = 8000;
    } else if (espesorMm === 10) {
        costoPorTabla = 12000;
    } else { // 12mm
        costoPorTabla = 15000;
    }
    
    // Costos actualizados en pesos chilenos (CLP) - Diciembre 2024
    const costoTotal = (tablas * costoPorTabla) + (aislante * 3000) + (zocalos * 2000) + (adhesivo * 5000);
    
    return `🪵 **CÁLCULO DE PISO FLOTANTE - ${m2} m² (${espesorMm}mm)**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Tablas de piso:** ${tablas} unidades\n🔸 **Aislante acústico:** ${aislante} m²\n🔸 **Zócalos:** ${zocalos} metros lineales\n🔸 **Adhesivo:** ${adhesivo} kg\n\n💰 **COSTO APROXIMADO:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n📐 **Espesor:** ${espesorMm}mm\n📦 **Desperdicio:** 10% incluido\n\n💡 Incluye materiales de instalación. Consulta precios actualizados.`;
}

// Calcular presupuesto general
function calculatePresupuestoGeneral(m2, tipoConstruccion, pisos) {
    const factorComplejidad = tipoConstruccion === 'casa' ? 1.0 : tipoConstruccion === 'edificio' ? 1.3 : 1.1;
    const factorPisos = pisos > 1 ? 1.2 : 1.0;
    
    // Cálculos base por m²
    const radier = m2 * 8500; // $8,500 por m²
    const estructura = m2 * 45000; // $45,000 por m²
    const muros = m2 * 25000; // $25,000 por m²
    const techo = m2 * 18000; // $18,000 por m²
    const instalaciones = m2 * 35000; // $35,000 por m²
    const terminaciones = m2 * 40000; // $40,000 por m²
    
    // Aplicar factores
    const subtotal = (radier + estructura + muros + techo + instalaciones + terminaciones) * factorComplejidad * factorPisos;
    
    // Mano de obra (30% del subtotal)
    const manoObra = subtotal * 0.3;
    
    // Costo total
    const costoTotal = subtotal + manoObra;
    
    // Tiempo estimado (días)
    const tiempoEstimado = Math.ceil((m2 * 0.8) * factorComplejidad * factorPisos);
    
    return `💰 **PRESUPUESTO GENERAL - ${m2} m² (${tipoConstruccion}, ${pisos} piso${pisos > 1 ? 's' : ''})**\n\n📊 **DESGLOSE DE COSTOS:**\n\n🔸 **Radier:** $${radier.toLocaleString('es-CL')} CLP\n🔸 **Estructura:** $${estructura.toLocaleString('es-CL')} CLP\n🔸 **Muros:** $${muros.toLocaleString('es-CL')} CLP\n🔸 **Techo:** $${techo.toLocaleString('es-CL')} CLP\n🔸 **Instalaciones:** $${instalaciones.toLocaleString('es-CL')} CLP\n🔸 **Terminaciones:** $${terminaciones.toLocaleString('es-CL')} CLP\n\n👷 **Mano de obra:** $${manoObra.toLocaleString('es-CL')} CLP\n\n💰 **COSTO TOTAL:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n⏱️ **Tiempo estimado:** ${tiempoEstimado} días\n🏠 **Tipo:** ${tipoConstruccion}\n📐 **Pisos:** ${pisos}\n\n💡 Presupuesto aproximado. Incluye materiales y mano de obra. Consulta precios actualizados.`;
}

// ==================== NUEVAS CALCULADORAS AVANZADAS ====================

// Calcular mano de obra
function calculateManoObra(m2, tipoTrabajo) {
    let costoPorM2, tiempoPorM2;
    
    switch(tipoTrabajo) {
        case 'radier':
            costoPorM2 = 8000;
            tiempoPorM2 = 0.5; // días por m²
            break;
        case 'losa':
            costoPorM2 = 12000;
            tiempoPorM2 = 1.0;
            break;
        case 'muros':
            costoPorM2 = 15000;
            tiempoPorM2 = 0.8;
            break;
        case 'pintura':
            costoPorM2 = 5000;
            tiempoPorM2 = 0.3;
            break;
        case 'ceramica':
            costoPorM2 = 10000;
            tiempoPorM2 = 0.6;
            break;
        case 'techo':
            costoPorM2 = 18000;
            tiempoPorM2 = 1.2;
            break;
        default:
            costoPorM2 = 10000;
            tiempoPorM2 = 0.7;
    }
    
    const costoTotal = m2 * costoPorM2;
    const tiempoTotal = Math.ceil(m2 * tiempoPorM2);
    const trabajadores = Math.ceil(m2 / 50); // 1 trabajador cada 50m²
    
    return `👷 **CÁLCULO DE MANO DE OBRA - ${m2} m² (${tipoTrabajo})**\n\n📊 **INFORMACIÓN DE MANO DE OBRA:**\n\n🔸 **Costo por m²:** $${costoPorM2.toLocaleString('es-CL')} CLP\n🔸 **Costo total:** $${costoTotal.toLocaleString('es-CL')} CLP\n🔸 **Tiempo estimado:** ${tiempoTotal} días\n🔸 **Trabajadores necesarios:** ${trabajadores} personas\n\n⏱️ **DETALLES:**\n• Tiempo por m²: ${tiempoPorM2} días\n• Rendimiento: 50 m² por trabajador\n• Incluye: Albañiles especializados\n\n💡 Costos de mano de obra especializada. Consulta precios actualizados.`;
}

// Calcular aislamiento térmico
function calculateAislamiento(m2, tipoAislamiento) {
    let material, espesor, costoPorM2;
    
    switch(tipoAislamiento) {
        case 'poliestireno':
            material = 'Poliestireno expandido';
            espesor = '5cm';
            costoPorM2 = 12000;
            break;
        case 'lana':
            material = 'Lana de vidrio';
            espesor = '10cm';
            costoPorM2 = 15000;
            break;
        case 'poliuretano':
            material = 'Poliuretano expandido';
            espesor = '3cm';
            costoPorM2 = 25000;
            break;
        default:
            material = 'Poliestireno expandido';
            espesor = '5cm';
            costoPorM2 = 12000;
    }
    
    const materialNecesario = Math.ceil(m2 * 1.1); // 10% de desperdicio
    const costoTotal = materialNecesario * costoPorM2;
    const ahorroEnergetico = Math.round(m2 * 0.3); // 30% de ahorro estimado
    
    return `🧊 **CÁLCULO DE AISLAMIENTO TÉRMICO - ${m2} m²**\n\n📊 **MATERIALES NECESARIOS:**\n\n🔸 **Material:** ${material}\n🔸 **Espesor:** ${espesor}\n🔸 **Cantidad:** ${materialNecesario} m²\n🔸 **Costo por m²:** $${costoPorM2.toLocaleString('es-CL')} CLP\n\n💰 **COSTO TOTAL:**\n$${costoTotal.toLocaleString('es-CL')} CLP\n\n🌡️ **BENEFICIOS:**\n• Ahorro energético: ${ahorroEnergetico}%\n• Reducción de ruido\n• Mayor confort térmico\n• Ahorro en calefacción/refrigeración\n\n💡 Incluye 10% de desperdicio. Consulta precios actualizados.`;
}

// Comparador de precios entre proveedores
function comparePrices(material, cantidad) {
    const proveedores = {
        'cemento': [
            { nombre: 'Sodimac', precio: 3500, calidad: 'Alta' },
            { nombre: 'Easy', precio: 3400, calidad: 'Alta' },
            { nombre: 'Mall Plaza', precio: 3600, calidad: 'Media' },
            { nombre: 'Proveedor Local', precio: 3200, calidad: 'Media' }
        ],
        'arena': [
            { nombre: 'Sodimac', precio: 18000, calidad: 'Alta' },
            { nombre: 'Easy', precio: 17500, calidad: 'Alta' },
            { nombre: 'Mall Plaza', precio: 18500, calidad: 'Media' },
            { nombre: 'Proveedor Local', precio: 16000, calidad: 'Media' }
        ],
        'gravilla': [
            { nombre: 'Sodimac', precio: 18000, calidad: 'Alta' },
            { nombre: 'Easy', precio: 17500, calidad: 'Alta' },
            { nombre: 'Mall Plaza', precio: 18500, calidad: 'Media' },
            { nombre: 'Proveedor Local', precio: 16000, calidad: 'Media' }
        ]
    };
    
    const materialData = proveedores[material.toLowerCase()];
    if (!materialData) return '❌ Material no disponible para comparación.';
    
    let comparacion = `💰 **COMPARADOR DE PRECIOS - ${material.toUpperCase()}**\n\n📊 **PRECIOS POR UNIDAD:**\n\n`;
    
    materialData.forEach(proveedor => {
        const total = proveedor.precio * cantidad;
        comparacion += `🔸 **${proveedor.nombre}:** $${proveedor.precio.toLocaleString('es-CL')} CLP (${proveedor.calidad})\n`;
        comparacion += `   Total ${cantidad} unidades: $${total.toLocaleString('es-CL')} CLP\n\n`;
    });
    
    const precios = materialData.map(p => p.precio);
    const masBarato = Math.min(...precios);
    const masCaro = Math.max(...precios);
    const ahorro = (masCaro - masBarato) * cantidad;
    
    comparacion += `💡 **RECOMENDACIÓN:**\n`;
    comparacion += `• Más barato: $${masBarato.toLocaleString('es-CL')} CLP\n`;
    comparacion += `• Más caro: $${masCaro.toLocaleString('es-CL')} CLP\n`;
    comparacion += `• Ahorro máximo: $${ahorro.toLocaleString('es-CL')} CLP\n\n`;
    comparacion += `⚠️ Considera calidad y disponibilidad.`;
    
    return comparacion;
}

// Calculadora de huella de carbono
function calculateHuellaCarbono(m2, tipoConstruccion) {
    const factores = {
        'casa': { co2: 0.8, energia: 120 },
        'edificio': { co2: 1.2, energia: 180 },
        'local': { co2: 0.6, energia: 100 }
    };
    
    const factor = factores[tipoConstruccion] || factores['casa'];
    const co2Total = m2 * factor.co2; // toneladas de CO2
    const energiaTotal = m2 * factor.energia; // kWh
    
    // Equivalencias
    const arbolesNecesarios = Math.ceil(co2Total * 20); // 20 árboles por tonelada
    const autosEquivalente = Math.round(co2Total * 2.5); // 2.5 autos por tonelada
    
    return `🌱 **CALCULADORA DE HUELLA DE CARBONO - ${m2} m² (${tipoConstruccion})**\n\n📊 **IMPACTO AMBIENTAL:**\n\n🔸 **CO₂ emitido:** ${co2Total.toFixed(1)} toneladas\n🔸 **Energía consumida:** ${energiaTotal.toLocaleString('es-CL')} kWh\n\n🌳 **EQUIVALENCIAS:**\n• Árboles necesarios para compensar: ${arbolesNecesarios}\n• Equivalente a ${autosEquivalente} autos por año\n\n💡 **RECOMENDACIONES:**\n• Usar materiales reciclados\n• Implementar energías renovables\n• Optimizar diseño para eficiencia\n• Considerar certificaciones verdes\n\n🌍 Construcción sostenible para un futuro mejor.`;
}

// Guardar cálculo
function saveCalculation(tipo, datos, resultado) {
    const calculo = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString('es-CL'),
        tipo: tipo,
        datos: datos,
        resultado: resultado
    };
    
    savedCalculations.unshift(calculo); // Agregar al inicio
    if (savedCalculations.length > 10) {
        savedCalculations = savedCalculations.slice(0, 10); // Mantener solo los últimos 10
    }
    
    localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    return `💾 **Cálculo guardado exitosamente!**\n\n📅 Fecha: ${calculo.fecha}\n🔧 Tipo: ${tipo}\n\nEscribe "guardados" para ver todos tus cálculos.`;
}

// Mostrar cálculos guardados
function showSavedCalculations() {
    if (savedCalculations.length === 0) {
        return '📝 **No tienes cálculos guardados aún.**\n\n💡 Los cálculos se guardan automáticamente cuando usas las calculadoras.';
    }
    
    let mensaje = `📚 **TUS CÁLCULOS GUARDADOS (${savedCalculations.length})**\n\n`;
    
    savedCalculations.forEach((calculo, index) => {
        mensaje += `**${index + 1}.** ${calculo.tipo} - ${calculo.fecha}\n`;
        mensaje += `   Datos: ${calculo.datos}\n\n`;
    });
    
    mensaje += `💡 Escribe el número para ver el cálculo completo.`;
    return mensaje;
}

// Obtener cálculo guardado por índice
function getSavedCalculation(index) {
    const indice = parseInt(index) - 1;
    if (indice >= 0 && indice < savedCalculations.length) {
        const calculo = savedCalculations[indice];
        return `📋 **CÁLCULO GUARDADO #${index}**\n\n📅 **Fecha:** ${calculo.fecha}\n🔧 **Tipo:** ${calculo.tipo}\n📊 **Datos:** ${calculo.datos}\n\n${calculo.resultado}`;
    }
    return '❌ Cálculo no encontrado.';
}

// ==================== WHATSAPP FUNCTIONS ====================

// Abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '56987654321'; // Número sin + y espacios
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre los servicios de Constructora S&D.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// ==================== ENHANCED CONTACT FORM ====================

// Mejorar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Agregar IDs a los campos si no los tienen
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach((input, index) => {
            if (!input.id) {
                input.id = `field_${index}`;
            }
        });
        
        // Mejorar validación del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar todos los campos
            let isValid = true;
            const formData = new FormData(this);
            const formObject = {};
            
            // Convertir FormData a objeto y validar
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
                
                const field = this.querySelector(`[name="${key}"]`);
                if (field && !validateField(field)) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Simular envío exitoso
                showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                this.reset();
                
                // Opcional: Enviar también por WhatsApp
                setTimeout(() => {
                    const whatsappMessage = `Hola! Soy ${formObject.nombre || 'un cliente interesado'} y me interesa el servicio de ${formObject.servicio || 'construcción'}. ${formObject.mensaje || 'Por favor contáctenme.'}`;
                    const encodedMessage = encodeURIComponent(whatsappMessage);
                    const whatsappUrl = `https://wa.me/56987654321?text=${encodedMessage}`;
                    
                    if (confirm('¿Te gustaría también enviar este mensaje por WhatsApp para una respuesta más rápida?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 2000);
            } else {
                showNotification('Por favor, corrige los errores en el formulario.', 'error');
            }
        });
    }
});

// Inicializar header scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    if (header) {
        const handleScroll = throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const footerHeight = 300; // Altura aproximada del footer
            const isMobile = window.innerWidth <= 768; // Detectar dispositivos móviles

            // Calcular si estamos cerca del footer
            const nearFooter = scrollTop + windowHeight >= documentHeight - footerHeight;

            // En móviles, mantener el header siempre visible
            if (isMobile) {
                header.classList.remove('hidden');
                return;
            }

            // Ocultar header al hacer scroll hacia abajo (excepto cerca del footer)
            if (scrollTop > lastScrollTop && scrollTop > 100 && !nearFooter) {
                header.classList.add('hidden');
            }
            // Mostrar header al hacer scroll hacia arriba
            else if (scrollTop < lastScrollTop) {
                header.classList.remove('hidden');
            }
            // Mantener header oculto cuando estamos en el footer
            else if (nearFooter) {
                header.classList.add('hidden');
            }

            lastScrollTop = scrollTop;
        }, THROTTLE_DELAY);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // También escuchar cambios de tamaño de ventana para móviles
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                header.classList.remove('hidden');
            }
        });
    }
}

// Función de diagnóstico de enlaces
function diagnoseLinks() {
    console.log('🔍 === DIAGNÓSTICO DE ENLACES ===');
    
    // Verificar secciones
    const sections = ['#inicio', '#quienes-somos', '#servicios', '#proyectos-realizados', '#proyectos-finalizados', '#contacto'];
    console.log('📋 Verificando secciones:');
    sections.forEach(section => {
        const element = document.querySelector(section);
        if (element) {
            console.log(`✅ ${section} - Encontrada`);
        } else {
            console.log(`❌ ${section} - NO encontrada`);
        }
    });
    
    // Verificar enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`📋 Enlaces de navegación: ${navLinks.length}`);
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        console.log(`🔗 Nav ${index + 1}: ${href} - ${target ? '✅' : '❌'}`);
    });
    
    // Verificar enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-link');
    console.log(`📋 Enlaces del footer: ${footerLinks.length}`);
    footerLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            console.log(`🔗 Footer ${index + 1}: ${href} - ${target ? '✅' : '❌'}`);
        } else {
            console.log(`🔗 Footer ${index + 1}: ${href} - Enlace externo`);
        }
    });
    
    // Verificar todos los enlaces con ancla
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`📋 Total enlaces con ancla: ${allAnchorLinks.length}`);
    
    console.log('🔍 === FIN DIAGNÓSTICO ===');
}

// Función para probar enlaces manualmente
function testLink(href) {
    console.log(`🧪 Probando enlace: ${href}`);
    const target = document.querySelector(href);
    if (target) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 120;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        console.log(`✅ Navegación exitosa a ${href}`);
    } else {
        console.log(`❌ No se encontró la sección ${href}`);
    }
}

// Función específica para inicializar enlaces del footer
function initFooterLinks() {
    console.log('🔗 Inicializando enlaces específicos del footer...');
    
    // Esperar un poco para asegurar que el DOM esté completamente cargado
    setTimeout(() => {
        const footerLinks = document.querySelectorAll('.footer-link');
        console.log(`📋 Footer: ${footerLinks.length} enlaces encontrados`);
        
        if (footerLinks.length === 0) {
            console.error('❌ Footer: No se encontraron enlaces .footer-link');
            return;
        }
        
        footerLinks.forEach((link, index) => {
            const href = link.getAttribute('href');
            console.log(`🔗 Footer enlace ${index + 1}: ${href}`);
            
            // Remover todos los event listeners existentes
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Agregar nuevo event listener
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`🎯 Footer: Click en ${href}`);
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 120;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    console.log(`📍 Footer: Navegando a ${href} - Posición: ${targetPosition}px`);
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar URL
                    history.pushState(null, null, href);
                    
                    console.log(`✅ Footer: Navegación exitosa a ${href}`);
                    
                    // Mostrar notificación visual
                    showFooterNotification(`Navegando a ${href}`);
                } else {
                    console.error(`❌ Footer: Sección no encontrada: ${href}`);
                    showFooterError(`Sección ${href} no encontrada`);
                }
            });
            
            console.log(`✅ Footer: Enlace ${index + 1} inicializado`);
        });
        
        console.log('✅ Footer: Todos los enlaces inicializados correctamente');
    }, 100);
}

// Función para mostrar notificación del footer
function showFooterNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066ff, #0052cc);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
    `;
    notification.innerHTML = `🔗 ${message}`;
    
    document.body.appendChild(notification);
    
    // Remover después de 2 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Función para mostrar notificación de navegación
function showNavigationNotification(sectionName) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066ff, #0052cc);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `✅ Navegando a ${sectionName}`;
    
    document.body.appendChild(notification);
    
    // Remover después de 2 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Función para mostrar error del footer
function showFooterError(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(220, 53, 69, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
    `;
    notification.innerHTML = `❌ ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para mostrar notificación de error
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(220, 53, 69, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `❌ ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

 
 