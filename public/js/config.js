// Archivo de configuración JS

/**
 * Configuración global del sistema TextilPro
 * Contiene constantes y configuraciones que se usarán en todo el sistema
 */

const CONFIG = {
    // Configuración general
    appName: 'TextilPro',
    apiUrl: 'http://localhost:3000/api', // URL base para API cuando tengamos backend
    version: '1.0.0',
    
    // Roles de usuario
    ROLES: {
        OWNER: 'owner',
        ADMIN: 'admin',
        OPERATOR: 'operator'
    },
    
    // Configuración de animaciones
    animations: {
        enabled: true,
        duration: 300 // ms
    },
    
    // Configuración de notificaciones
    notifications: {
        displayTime: 3000, // ms
        position: 'bottom-right'
    },
    
    // Rutas HTML para componentes
    paths: {
        components: {
            login: 'views/components/login.html',
            header: 'views/components/header.html',
            sidebarOwner: 'views/components/sidebar-owner.html',
            sidebarAdmin: 'views/components/sidebar-admin.html',
            sidebarOperator: 'views/components/sidebar-operator.html'
        },
        pages: {
            // Páginas del dueño
            dashboard: 'views/pages/dashboard.html',
            analysis: 'views/pages/analysis.html',
            kpis: 'views/pages/kpis.html',
            reports: 'views/pages/reports.html',
            inventoryOwner: 'views/pages/inventory-owner.html',
            
            // Páginas del admin
            dataEntry: 'views/pages/data-entry.html',
            inventoryAdmin: 'views/pages/inventory-admin.html',
            reportsAdmin: 'views/pages/reports-admin.html',
            machines: 'views/pages/machines.html',
            fabrics: 'views/pages/fabrics.html',
            operators: 'views/pages/operators.html',
            assignments: 'views/pages/assignments.html',
            performance: 'views/pages/performance.html',
            settings: 'views/pages/settings.html',
            
            // Páginas del operario
            assignedMachines: 'views/pages/assigned-machines.html'
        },
        modals: {
            stoppageModal: 'views/modals/stoppage-modal.html',
            cutModal: 'views/modals/cut-modal.html',
            assignmentModal: 'views/modals/assignment-modal.html',
            inventoryModal: 'views/modals/inventory-modal.html',
            machineModal: 'views/modals/machine-modal.html',
            fabricModal: 'views/modals/fabric-modal.html',
            operatorModal: 'views/modals/operator-modal.html',
            confirmationModal: 'views/modals/confirmation-modal.html'
        }
    },
    
    // Configuración de paradas de máquina
    stoppageReasons: [
        { id: 'bobbins', name: 'Cambio de Bobinas' },
        { id: 'maintenance', name: 'Mantenimiento' },
        { id: 'breakdown', name: 'Avería' },
        { id: 'services', name: 'Servicios' },
        { id: 'adjustment', name: 'Ajuste de Máquina' },
        { id: 'shift-change', name: 'Cambio de Turno' },
        { id: 'other', name: 'Otro' }
    ],
    
    // Configuración de gráficos
    charts: {
        colors: {
            primary: 'rgba(37, 99, 235, 0.7)',
            secondary: 'rgba(16, 185, 129, 0.7)',
            danger: 'rgba(239, 68, 68, 0.7)',
            warning: 'rgba(245, 158, 11, 0.7)',
            info: 'rgba(6, 182, 212, 0.7)',
            gray: 'rgba(107, 114, 128, 0.7)'
        },
        borderColors: {
            primary: 'rgba(37, 99, 235, 1)',
            secondary: 'rgba(16, 185, 129, 1)',
            danger: 'rgba(239, 68, 68, 1)',
            warning: 'rgba(245, 158, 11, 1)',
            info: 'rgba(6, 182, 212, 1)',
            gray: 'rgba(107, 114, 128, 1)'
        }
    },
    
    // Configuración por defecto del sistema
    defaultSettings: {
        marginError: 5, // %
        defaultEfficiency: 85, // %
        maxStoppage: 15, // %
        
        // Turnos
        shifts: {
            morning: { start: '06:00', end: '14:00' },
            afternoon: { start: '14:00', end: '22:00' },
            night: { start: '22:00', end: '06:00' }
        }
    }
};