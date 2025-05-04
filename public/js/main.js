// Archivo principal JS

/**
 * Script principal del sistema TextilPro
 * Inicializa la aplicación y coordina los diferentes módulos
 */

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando aplicación TextilPro...');
    initApp();
});

/**
 * Inicializa la aplicación
 */
function initApp() {
    // Inicializar módulos
    initAuthModule();
    initDashboardModule();
    
    // Activar tooltips
    initTooltips();
    
    // Dejar que el módulo de autenticación maneje el resto de inicializaciones
    console.log('Aplicación TextilPro inicializada. Esperando autenticación...');
}

/**
 * Inicializa eventos del sidebar
 */
function initSidebarEvents() {
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            sidebarCollapsed = !sidebarCollapsed;
        });
    }
}

/**
 * Inicializa eventos del menú
 */
function initMenuEvents() {
    const menuItems = document.querySelectorAll('.menu-item[data-section]');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            loadSection(section);
            
            // En dispositivos móviles, colapsar el sidebar después de seleccionar una opción
            if (window.innerWidth < 768) {
                document.querySelector('.sidebar').classList.add('collapsed');
                sidebarCollapsed = true;
            }
        });
    });
}

/**
 * Carga una sección específica
 * @param {string} sectionId - ID de la sección a cargar
 */
function loadSection(sectionId) {
    // Actualizar sección actual
    currentSection = sectionId;
    
    // Simulación de carga
    toggleLoader(true);
    
    // Determinar la ruta del archivo de la sección
    let sectionPath = '';
    
    // Verificar todas las categorías de páginas
    for (const category in CONFIG.paths.pages) {
        if (CONFIG.paths.pages[category].includes(sectionId)) {
            sectionPath = CONFIG.paths.pages[category];
            break;
        }
    }
    
    // Si no se encontró, buscar por nombre
    if (!sectionPath) {
        sectionPath = `views/pages/${sectionId}.html`;
    }
    
    // Cargar el contenido de la sección
    loadHTML(sectionPath)
        .then(html => {
            // Establecer el contenido
            setHTML('content-container', html);
            
            // Actualizar título
            updateSectionTitle(sectionId);
            
            // Actualizar elementos activos en el menú
            updateActiveMenu(sectionId);
            
            // Disparar evento de sección cargada
            triggerEvent('content-container', `section:${sectionId}:loaded`);
            
            // Detener loader
            toggleLoader(false);
        })
        .catch(error => {
            console.error(`Error al cargar la sección ${sectionId}:`, error);
            setHTML('content-container', `<div class="error-message">Error al cargar la sección ${sectionId}</div>`);
            toggleLoader(false);
            showToast('error', `Error al cargar la sección ${sectionId}`, 3000);
        });
}

/**
 * Actualiza el menú activo
 * @param {string} sectionId - ID de la sección activa
 */
function updateActiveMenu(sectionId) {
    // Quitar clase active de todos los items del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Agregar clase active al item correspondiente
    const menuItem = document.querySelector(`.menu-item[data-section="${sectionId}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
    }
}

/**
 * Inicializa los tooltips
 */
function initTooltips() {
    // Los tooltips se manejan con CSS :hover
    // Esta función se mantiene para posible implementación futura
}
