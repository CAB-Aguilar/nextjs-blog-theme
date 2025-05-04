// Funciones de ayuda

/**
 * Funciones de utilidad general para el sistema TextilPro
 */

/**
 * Variables globales de la aplicación
 */
let currentUser = null;
let currentSection = 'dashboard';
let sidebarCollapsed = false;
let charts = {};

/**
 * Carga una vista HTML desde una URL
 * @param {string} url - URL del archivo HTML a cargar
 * @returns {Promise<string>} - Contenido HTML como cadena de texto
 */
async function loadHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error cargando HTML:', error);
        showToast('error', `Error cargando la interfaz: ${error.message}`);
        return '';
    }
}

/**
 * Establece el HTML de un elemento
 * @param {string} elementId - ID del elemento a actualizar
 * @param {string} html - HTML a insertar
 */
function setHTML(elementId, html) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = html;
    } else {
        console.warn(`Elemento con ID '${elementId}' no encontrado`);
    }
}

/**
 * Muestra o esconde un elemento por su ID
 * @param {string} elementId - ID del elemento
 * @param {boolean} show - true para mostrar, false para ocultar
 */
function toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

/**
 * Muestra un mensaje toast
 * @param {string} type - Tipo de toast: success, error, warning, info
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en ms (opcional)
 */
function showToast(type, message, duration = CONFIG.notifications.displayTime) {
    const toast = document.getElementById('success-toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message span');
    
    // Configurar toast
    toastIcon.className = `toast-icon ${type}`;
    
    if (type === 'success') {
        toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else if (type === 'warning') {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    } else if (type === 'error') {
        toastIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
    } else if (type === 'info') {
        toastIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    
    toastMessage.textContent = message;
    
    // Aplicar clase según tipo
    toast.className = `toast ${type}`;
    
    // Mostrar toast
    toast.classList.add('show');
    
    // Cerrar toast automáticamente después de un tiempo
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
    
    // Cerrar toast manualmente
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.classList.remove('show');
    });
}

/**
 * Muestra/oculta el loader
 * @param {boolean} show - true para mostrar, false para ocultar
 */
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    
    if (show) {
        loader.classList.add('show');
    } else {
        loader.classList.remove('show');
    }
}

/**
 * Actualiza la fecha y hora actual
 */
function updateDateTime() {
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    if (dateElement && timeElement) {
        const now = new Date();
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        
        dateElement.textContent = now.toLocaleDateString('es-PE', dateOptions);
        timeElement.textContent = now.toLocaleTimeString('es-PE', timeOptions);
        
        // Actualizar cada minuto
        setTimeout(updateDateTime, 60000);
    }
}

/**
 * Actualiza el título de la sección actual
 * @param {string} sectionId - ID de la sección
 */
function updateSectionTitle(sectionId) {
    const sectionTitleElement = document.getElementById('section-title');
    if (!sectionTitleElement) return;
    
    const section = document.getElementById(sectionId);
    
    if (section) {
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader && sectionHeader.querySelector('h2')) {
            sectionTitleElement.textContent = sectionHeader.querySelector('h2').textContent;
        } else {
            // Generar título a partir del ID
            sectionTitleElement.textContent = formatSectionTitle(sectionId);
        }
    }
}

/**
 * Formatea el título de sección a partir del ID
 * @param {string} sectionId - ID de la sección
 * @returns {string} - Título formateado
 */
function formatSectionTitle(sectionId) {
    return sectionId
        .split('-')
        .map(word => capitalizeFirstLetter(word))
        .join(' ');
}

/**
 * Capitaliza la primera letra de una cadena
 * @param {string} string - Cadena a capitalizar
 * @returns {string} - Cadena con la primera letra en mayúscula
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Dispara un evento personalizado en un elemento
 * @param {string} elementId - ID del elemento
 * @param {string} eventName - Nombre del evento
 * @param {object} detail - Datos adicionales para el evento
 */
function triggerEvent(elementId, eventName, detail = {}) {
    const element = document.getElementById(elementId);
    if (element) {
        const event = new CustomEvent(eventName, { detail });
        element.dispatchEvent(event);
    }
}