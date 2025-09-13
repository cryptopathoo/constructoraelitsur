// Script limpio y funcional para Constructora Elite Sur
let chatbotOpen = false;
let chatbotMessages = [];
let savedCalculations = JSON.parse(localStorage.getItem('savedCalculations')) || [];

const DEBOUNCE_DELAY = 300;
const THROTTLE_DELAY = 100;

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script principal cargado');
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        console.log('🍔 Hamburger encontrado:', hamburger);
        console.log('📱 Nav menu encontrado:', navMenu);
        
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('📱 Menú cerrado');
        }
        
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('📱 Menú toggled');
        }
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Smooth scroll para enlaces
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 90;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const submitText = document.getElementById('submitText');
            const formMessage = document.getElementById('formMessage');
            
            submitBtn.disabled = true;
            submitText.textContent = 'Enviando...';
            
            fetch('contact-form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.innerHTML = '<div style="color:green;padding:10px;background:#d4edda;border:1px solid #c3e6cb;border-radius:5px;margin-top:10px;">Mensaje enviado correctamente. Te contactaremos pronto.</div>';
                    this.reset();
                } else {
                    formMessage.innerHTML = '<div style="color:red;padding:10px;background:#f8d7da;border:1px solid #f5c6cb;border-radius:5px;margin-top:10px;">Error al enviar el mensaje. Inténtalo de nuevo.</div>';
                }
            })
            .catch(error => {
                formMessage.innerHTML = '<div style="color:red;padding:10px;background:#f8d7da;border:1px solid #f5c6cb;border-radius:5px;margin-top:10px;">Error de conexión. Inténtalo de nuevo.</div>';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitText.textContent = 'Enviar Mensaje';
            });
        });
    }
    
    // Animaciones de entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .value-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Header scroll behavior
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    const handleScroll = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }, THROTTLE_DELAY);
    
    window.addEventListener('scroll', handleScroll);
    
    // Lazy loading de imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    console.log('✅ Script principal inicializado correctamente');
});

// Función para WhatsApp
function openWhatsApp() {
    const phoneNumber = '+56948088573';
    const message = 'Hola! Me interesa conocer más sobre los servicios de Constructora Elite Sur.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Función para probar imágenes de fondo
function testBackgroundImages() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const computedStyle = window.getComputedStyle(hero);
        const backgroundImage = computedStyle.backgroundImage;
        console.log('🖼️ Imagen de fondo del hero:', backgroundImage);
        if (backgroundImage === 'none' || !backgroundImage.includes('url')) {
            console.log('❌ No se detectó imagen de fondo');
            hero.style.background = 'linear-gradient(135deg, #2c5530 0%, #4a7c59 50%, #1a1a1a 100%)';
        } else {
            console.log('✅ Imagen de fondo detectada correctamente');
            console.log('📁 Usando imagen local para compatibilidad total');
        }
    }
}

window.addEventListener('load', testBackgroundImages);


