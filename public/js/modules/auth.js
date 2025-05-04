/**
 * Módulo de autenticación del sistema TextilPro
 */

// Datos de usuario para simulación
const users = [
    {
        username: 'admin',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin',
        avatar: 'fas fa-user-tie'
    },
    {
        username: 'owner',
        password: 'owner123',
        name: 'Juan Pérez',
        role: 'owner',
        avatar: 'fas fa-user-shield'
    },
    {
        username: 'operator',
        password: 'operator123',
        name: 'Luis Mendoza',
        role: 'operator',
        avatar: 'fas fa-user-hard-hat'
    }
];

/**
 * Inicializa el módulo de autenticación
 */
function initAuthModule() {
    console.log('Inicializando módulo de autenticación...');
    loadLoginScreen();
    initLoginEvents();
}

/**
 * Carga la pantalla de login
 */
async function loadLoginScreen() {
    try {
        const loginHTML = await loadHTML(CONFIG.paths.components.login);
        setHTML('login-screen', loginHTML);
        document.querySelector('.login-help').style.display = 'block';
    } catch (error) {
        console.error('Error al cargar la pantalla de login:', error);
    }
}

/**
 * Inicializa eventos de login
 */
function initLoginEvents() {
    // Esperar a que existan los elementos
    const waitForElements = setInterval(() => {
        const loginBtn = document.getElementById('login-btn');
        const passwordInput = document.getElementById('password');
        
        if (loginBtn && passwordInput) {
            clearInterval(waitForElements);
            
            loginBtn.addEventListener('click', handleLogin);
            
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    loginBtn.click();
                }
            });
            
            // Logout
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
            }
            
            // Dropdown logout
            document.addEventListener('click', function(e) {
                if (e.target && e.target.id === 'dropdown-logout') {
                    handleLogout();
                }
            });
        }
    }, 100);
}

/**
 * Maneja el evento de login
 */
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showToast('warning', 'Por favor, complete todos los campos', 3000);
        return;
    }
    
    // Simulación de carga
    toggleLoader(true);
    
    setTimeout(() => {
        // Validar credenciales
        const user = users.find(u => u.username === username && u.password === password);
        
        toggleLoader(false);
        
        if (user) {
            loginUser(user);
            showToast('success', `Bienvenido, ${user.name}`, 3000);
        } else {
            showToast('error', 'Usuario o contraseña incorrectos', 3000);
        }
    }, 1000);
}

/**
 * Login de usuario
 * @param {object} user - Datos del usuario
 */
async function loginUser(user) {
    // Guardar usuario actual
    currentUser = user;
    
    // Ocultar login y mostrar app principal
    toggleElement('login-screen', false);
    toggleElement('main-container', true);
    
    // Cargar componentes según el rol
    await loadComponentsByRole(user.role);
    
    // Actualizar información del usuario
    updateUserInfo(user);
    
    // Mostrar sección por defecto según rol
    showDefaultSection(user.role);
    
    // Actualizar fecha y hora
    updateDateTime();
}

/**
 * Carga los componentes según el rol del usuario
 * @param {string} role - Rol del usuario
 */
async function loadComponentsByRole(role) {
    try {
        // Cargar header
        const headerHTML = await loadHTML(CONFIG.paths.components.header);
        setHTML('header-container', headerHTML);
        
        // Cargar sidebar según rol
        let sidebarPath;
        switch (role) {
            case CONFIG.ROLES.OWNER:
                sidebarPath = CONFIG.paths.components.sidebarOwner;
                break;
            case CONFIG.ROLES.ADMIN:
                sidebarPath = CONFIG.paths.components.sidebarAdmin;
                break;
            case CONFIG.ROLES.OPERATOR:
                sidebarPath = CONFIG.paths.components.sidebarOperator;
                break;
            default:
                sidebarPath = CONFIG.paths.components.sidebarOperator;
        }
        
        const sidebarHTML = await loadHTML(sidebarPath);
        setHTML('sidebar-container', sidebarHTML);
        
        // Inicializar eventos
        initSidebarEvents();
        initMenuEvents();
        
    } catch (error) {
        console.error('Error al cargar componentes:', error);
        showToast('error', 'Error al cargar la interfaz', 3000);
    }
}

/**
 * Actualiza la información del usuario en la interfaz
 * @param {object} user - Datos del usuario
 */
function updateUserInfo(user) {
    const userNameElements = document.querySelectorAll('#user-name');
    const userRoleElements = document.querySelectorAll('#user-role');
    
    userNameElements.forEach(element => {
        element.textContent = user.name;
    });
    
    userRoleElements.forEach(element => {
        element.textContent = capitalizeFirstLetter(user.role);
    });
}

/**
 * Muestra la sección por defecto según el rol
 * @param {string} role - Rol del usuario
 */
function showDefaultSection(role) {
    let defaultSection;
    
    switch (role) {
        case CONFIG.ROLES.OWNER:
            defaultSection = 'dashboard';
            break;
        case CONFIG.ROLES.ADMIN:
            defaultSection = 'data-entry';
            break;
        case CONFIG.ROLES.OPERATOR:
            defaultSection = 'assigned-machines';
            break;
        default:
            defaultSection = 'dashboard';
    }
    
    loadSection(defaultSection);
}

/**
 * Maneja el evento de logout
 */
function handleLogout() {
    // Simulación de carga
    toggleLoader(true);
    
    setTimeout(() => {
        logoutUser();
        toggleLoader(false);
        showToast('success', 'Sesión cerrada correctamente', 3000);
    }, 1000);
}

/**
 * Logout de usuario
 */
function logoutUser() {
    currentUser = null;
    
    // Limpiar contenido
    setHTML('sidebar-container', '');
    setHTML('header-container', '');
    setHTML('content-container', '');
    
    // Ocultar app principal y mostrar login
    toggleElement('main-container', false);
    toggleElement('login-screen', true);
    
    // Limpiar campos de login
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}