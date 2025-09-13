// ===== JAVASCRIPT ADICIONAL PARA NUEVAS FUNCIONALIDADES =====

// Filtros de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Calculadora de presupuestos
document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budgetForm');
    
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBudget();
        });
        
        // Calcular en tiempo real
        const inputs = budgetForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', calculateBudget);
        });
    }
});

function calculateBudget() {
    const projectType = document.getElementById('projectType').value;
    const projectArea = parseFloat(document.getElementById('projectArea').value) || 0;
    const quality = document.getElementById('quality').value;
    const location = document.getElementById('location').value;
    
    if (!projectType || !projectArea || !quality || !location) {
        return;
    }
    
    // Precios base por m² según tipo de proyecto
    const basePrices = {
        'casa': 450000,
        'departamento': 380000,
        'comercial': 520000,
        'oficina': 480000,
        'industrial': 350000,
        'remodelacion': 280000
    };
    
    // Multiplicadores de calidad
    const qualityMultipliers = {
        'economica': 0.8,
        'estandar': 1.0,
        'premium': 1.3,
        'lujo': 1.6
    };
    
    // Multiplicadores de ubicación
    const locationMultipliers = {
        'villarrica': 1.0,
        'pucon': 1.1,
        'temuco': 1.05,
        'otro': 1.2
    };
    
    // Calcular costo base
    const basePrice = basePrices[projectType] || 400000;
    const qualityMultiplier = qualityMultipliers[quality] || 1.0;
    const locationMultiplier = locationMultipliers[location] || 1.0;
    
    const baseCost = projectArea * basePrice * qualityMultiplier * locationMultiplier;
    
    // Calcular servicios adicionales
    const additionalServices = document.querySelectorAll('input[type="checkbox"]:checked');
    let additionalCost = 0;
    
    const servicePrices = {
        'movimiento-tierra': projectArea * 15000,
        'arquitectura': projectArea * 25000,
        'permisos': 500000,
        'supervision': projectArea * 8000
    };
    
    additionalServices.forEach(service => {
        const serviceValue = service.value;
        additionalCost += servicePrices[serviceValue] || 0;
    });
    
    const totalCost = baseCost + additionalCost;
    
    // Actualizar la interfaz
    document.getElementById('baseCost').textContent = formatCurrency(baseCost);
    document.getElementById('additionalCost').textContent = formatCurrency(additionalCost);
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
    
    // Guardar datos para WhatsApp
    window.budgetData = {
        projectType,
        projectArea,
        quality,
        location,
        baseCost,
        additionalCost,
        totalCost,
        additionalServices: Array.from(additionalServices).map(s => s.value)
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Enviar presupuesto por WhatsApp
function sendBudgetToWhatsApp() {
    if (!window.budgetData) {
        alert('Por favor, completa el formulario primero');
        return;
    }
    
    const data = window.budgetData;
    const projectTypeNames = {
        'casa': 'Casa Residencial',
        'departamento': 'Departamento',
        'comercial': 'Local Comercial',
        'oficina': 'Oficina',
        'industrial': 'Planta Industrial',
        'remodelacion': 'Remodelación'
    };
    
    const qualityNames = {
        'economica': 'Económica',
        'estandar': 'Estándar',
        'premium': 'Premium',
        'lujo': 'Lujo'
    };
    
    const locationNames = {
        'villarrica': 'Villarrica',
        'pucon': 'Pucón',
        'temuco': 'Temuco',
        'otro': 'Otra ubicación'
    };
    
    const serviceNames = {
        'movimiento-tierra': 'Movimiento de Tierra',
        'arquitectura': 'Diseño Arquitectónico',
        'permisos': 'Gestión de Permisos',
        'supervision': 'Supervisión Técnica'
    };
    
    let message = `🏗️ *SOLICITUD DE PRESUPUESTO*\n\n`;
    message += `📋 *Detalles del Proyecto:*\n`;
    message += `• Tipo: ${projectTypeNames[data.projectType]}\n`;
    message += `• Área: ${data.projectArea} m²\n`;
    message += `• Calidad: ${qualityNames[data.quality]}\n`;
    message += `• Ubicación: ${locationNames[data.location]}\n\n`;
    
    if (data.additionalServices.length > 0) {
        message += `🔧 *Servicios Adicionales:*\n`;
        data.additionalServices.forEach(service => {
            message += `• ${serviceNames[service]}\n`;
        });
        message += `\n`;
    }
    
    message += `💰 *Estimación de Costos:*\n`;
    message += `• Costo Base: ${formatCurrency(data.baseCost)}\n`;
    message += `• Servicios Adicionales: ${formatCurrency(data.additionalCost)}\n`;
    message += `• *Total Estimado: ${formatCurrency(data.totalCost)}*\n\n`;
    message += `📞 Me gustaría recibir una cotización detallada para este proyecto.`;
    
    const phoneNumber = '+56948088573';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Solicitar cotización detallada
function requestDetailedQuote() {
    if (!window.budgetData) {
        alert('Por favor, completa el formulario primero');
        return;
    }
    
    const data = window.budgetData;
    let message = `📋 *SOLICITUD DE COTIZACIÓN DETALLADA*\n\n`;
    message += `Estimado equipo de ELITSUR Constructora,\n\n`;
    message += `Me interesa recibir una cotización detallada para mi proyecto:\n\n`;
    message += `• Tipo: ${data.projectType}\n`;
    message += `• Área: ${data.projectArea} m²\n`;
    message += `• Calidad: ${data.quality}\n`;
    message += `• Ubicación: ${data.location}\n\n`;
    message += `Estimación actual: ${formatCurrency(data.totalCost)}\n\n`;
    message += `Por favor, contactenme para coordinar una visita técnica y cotización formal.\n\n`;
    message += `¡Gracias!`;
    
    const phoneNumber = '+56948088573';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Galería de proyectos (placeholder)
function openGallery(projectId) {
    // Aquí se implementaría la funcionalidad de galería
    alert(`Galería del proyecto: ${projectId}\n\nEsta funcionalidad se implementará con fotos reales de los proyectos.`);
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card {
        animation: fadeInUp 0.5s ease;
    }
    
    .testimonial-card {
        animation: fadeInUp 0.6s ease;
    }
    
    .stat-item {
        animation: fadeInUp 0.7s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 100;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy loading mejorado para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .testimonial-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
