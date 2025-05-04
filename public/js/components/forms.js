/**
 * Gestión de formularios del sistema TextilPro
 */

/**
 * Inicializa todos los eventos de formularios
 */
function initFormEvents() {
    // Manejo de sliders de configuración
    initRangeSliders();
    
    // Manejo de causas de parada
    initStoppageCauses();
    
    // Inicializar validación de formularios
    initFormValidations();
    
    // Inicializar eventos para formulario de datos
    initDataEntryForm();
    
    // Inicializar eventos de configuración
    initSettingsForm();
    
    // Botones de exportación
    initExportButtons();
    
    // Botones de impresión
    initPrintButtons();
}

/**
 * Inicializa sliders de configuración
 */
function initRangeSliders() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(input => {
        const rangeValue = input.nextElementSibling;
        
        if (rangeValue && rangeValue.classList.contains('range-value')) {
            // Actualizar valor inicial
            updateRangeValue(input, rangeValue);
            
            // Eventos para actualizar en cambio
            input.addEventListener('input', function() {
                updateRangeValue(this, rangeValue);
            });
        }
    });
}

/**
 * Actualiza el valor mostrado de un slider
 * @param {HTMLInputElement} input - Elemento input range
 * @param {HTMLElement} valueElement - Elemento que muestra el valor
 */
function updateRangeValue(input, valueElement) {
    const isPercent = input.id.includes('efficiency') || input.id.includes('margin') || input.id.includes('stoppage');
    valueElement.textContent = `${input.value}${isPercent ? '%' : ''}`;
}

/**
 * Inicializa la gestión de causas de parada
 */
function initStoppageCauses() {
    const addCauseBtn = document.querySelector('.add-cause');
    const deleteCauseBtns = document.querySelectorAll('.delete-cause:not(.disabled)');
    
    if (addCauseBtn) {
        addCauseBtn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const causeText = input.value.trim();
            
            if (causeText) {
                addStoppageCause(causeText);
                input.value = '';
            }
        });
    }
    
    deleteCauseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const causeItem = this.parentElement;
            causeItem.remove();
        });
    });
}

/**
 * Agrega una nueva causa de parada a la lista
 * @param {string} causeText - Texto de la causa
 */
function addStoppageCause(causeText) {
    const stoppageCauses = document.querySelector('.stoppage-causes');
    const newCause = document.querySelector('.new-cause');
    
    if (stoppageCauses && newCause) {
        const causeElement = document.createElement('div');
        causeElement.className = 'stoppage-cause';
        causeElement.innerHTML = `
            <input type="text" value="${causeText}">
            <button class="btn-icon delete-cause">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        
        stoppageCauses.insertBefore(causeElement, newCause);
        
        // Agregar evento para eliminar
        const deleteBtn = causeElement.querySelector('.delete-cause');
        deleteBtn.addEventListener('click', function() {
            causeElement.remove();
        });
    }
}

/**
 * Inicializa validaciones de formularios
 */
function initFormValidations() {
    // Obtener todos los formularios con clase 'validated-form'
    const forms = document.querySelectorAll('.validated-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar formulario
            const validation = validateForm(this);
            
            // Si es válido, continuar con la acción
            if (validation.valid) {
                const submitAction = this.getAttribute('data-submit-action');
                if (submitAction && typeof window[submitAction] === 'function') {
                    window[submitAction](this);
                }
            } else {
                // Mostrar mensaje de error general
                showToast('warning', 'Por favor, complete todos los campos obligatorios', 3000);
            }
        });
    });
}

/**
 * Inicializa eventos para formulario de ingreso de datos
 */
function initDataEntryForm() {
    const saveProductionBtn = document.getElementById('save-production');
    if (saveProductionBtn) {
        saveProductionBtn.addEventListener('click', function() {
            // Validar formulario
            const requiredFields = ['production-date', 'production-shift', 'production-machine', 'production-operator', 'production-fabric', 'production-meters', 'production-weight', 'production-time'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showToast('warning', 'Por favor, complete todos los campos obligatorios', 3000);
                return;
            }
            
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Aquí se implementaría la lógica para guardar los datos
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', 'Datos guardados correctamente', 3000);
                
                // Limpiar formulario
                clearDataEntryForm();
            }, 1000);
        });
    }
}

/**
 * Limpia el formulario de ingreso de datos
 */
function clearDataEntryForm() {
    document.querySelectorAll('.data-entry-form input:not([type="date"]):not([type="hidden"])').forEach(input => {
        input.value = '';
    });
    
    document.querySelectorAll('.data-entry-form select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    document.querySelectorAll('.data-entry-form textarea').forEach(textarea => {
        textarea.value = '';
    });
}

/**
 * Inicializa eventos para formulario de configuración
 */
function initSettingsForm() {
    const saveSettingsBtn = document.getElementById('save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Aquí se implementaría la lógica para guardar la configuración
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', 'Configuración guardada correctamente', 3000);
            }, 1000);
        });
    }
    
    const resetSettingsBtn = document.getElementById('reset-settings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            resetSettingsToDefault();
        });
    }
}

/**
 * Restablece la configuración a valores por defecto
 */
function resetSettingsToDefault() {
    // Restablecer sliders a valores por defecto
    document.getElementById('margin-error').value = CONFIG.defaultSettings.marginError;
    document.getElementById('default-efficiency').value = CONFIG.defaultSettings.defaultEfficiency;
    document.getElementById('max-stoppage').value = CONFIG.defaultSettings.maxStoppage;
    
    // Actualizar valores mostrados
    document.querySelectorAll('.range-value').forEach((span) => {
        const input = span.previousElementSibling;
        if (input) {
            updateRangeValue(input, span);
        }
    });
    
    // Restablecer horarios de turnos
    document.getElementById('morning-start').value = CONFIG.defaultSettings.shifts.morning.start;
    document.getElementById('morning-end').value = CONFIG.defaultSettings.shifts.morning.end;
    document.getElementById('afternoon-start').value = CONFIG.defaultSettings.shifts.afternoon.start;
    document.getElementById('afternoon-end').value = CONFIG.defaultSettings.shifts.afternoon.end;
    document.getElementById('night-start').value = CONFIG.defaultSettings.shifts.night.start;
    document.getElementById('night-end').value = CONFIG.defaultSettings.shifts.night.end;
    
    // Restablecer notificaciones
    document.querySelectorAll('.notification-setting input[type="checkbox"]').forEach((checkbox, index) => {
        checkbox.checked = index < 3;
    });
    
    // Mostrar mensaje
    showToast('success', 'Configuración restablecida', 3000);
}

/**
 * Inicializa botones de exportación
 */
function initExportButtons() {
    const exportButtons = document.querySelectorAll('[id^="export-"]');
    exportButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Obtener tipo de exportación
            const exportType = this.id.replace('export-', '');
            
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Aquí se implementaría la lógica para exportar los datos
                // Cuando tengamos backend, esto usará la API
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', `Datos exportados correctamente a ${exportType}`, 3000);
            }, 1000);
        });
    });
}

/**
 * Inicializa botones de impresión
 */
function initPrintButtons() {
    const printButtons = document.querySelectorAll('[id^="print-"]');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulación de impresión
            window.print();
        });
    });
}