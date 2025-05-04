// Validadores

/**
 * Funciones de validación para el sistema TextilPro
 */

/**
 * Verifica si un valor está vacío
 * @param {any} value - Valor a validar
 * @returns {boolean} - true si está vacío, false si no
 */
function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'object') {
        if (Array.isArray(value)) return value.length === 0;
        return Object.keys(value).length === 0;
    }
    return false;
}

/**
 * Valida si un correo electrónico tiene formato válido
 * @param {string} email - Correo a validar
 * @returns {boolean} - true si es válido, false si no
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Valida si un número está dentro de un rango
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} - true si está en el rango, false si no
 */
function isInRange(value, min, max) {
    return value >= min && value <= max;
}

/**
 * Valida un DNI peruano
 * @param {string} dni - DNI a validar
 * @returns {boolean} - true si es válido, false si no
 */
function isValidDNI(dni) {
    // DNI peruano: 8 dígitos
    const re = /^\d{8}$/;
    return re.test(dni);
}

/**
 * Valida fecha en el pasado (útil para fechas de nacimiento)
 * @param {Date|string} date - Fecha a validar
 * @returns {boolean} - true si es válida, false si no
 */
function isPastDate(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    const today = new Date();
    return dateObj < today;
}

/**
 * Valida fecha en el futuro
 * @param {Date|string} date - Fecha a validar
 * @returns {boolean} - true si es válida, false si no
 */
function isFutureDate(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    const today = new Date();
    return dateObj > today;
}

/**
 * Valida que un objeto tenga todas las propiedades requeridas
 * @param {object} obj - Objeto a validar
 * @param {string[]} requiredProps - Array con nombres de propiedades requeridas
 * @returns {boolean} - true si tiene todas las propiedades, false si no
 */
function hasRequiredProps(obj, requiredProps) {
    if (!obj || typeof obj !== 'object') return false;
    
    for (const prop of requiredProps) {
        if (!(prop in obj) || isEmpty(obj[prop])) {
            return false;
        }
    }
    
    return true;
}

/**
 * Valida que un valor sea numérico
 * @param {any} value - Valor a validar
 * @returns {boolean} - true si es numérico, false si no
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Valida un formulario HTML completo
 * @param {HTMLFormElement|string} form - Formulario o ID del formulario
 * @param {object} customValidations - Validaciones adicionales (opcional)
 * @returns {object} - Objeto con resultado de validación {valid: boolean, errors: []}
 */
function validateForm(form, customValidations = {}) {
    const formElement = typeof form === 'string' ? document.getElementById(form) : form;
    
    if (!formElement || !formElement.elements) {
        return { valid: false, errors: ['Formulario inválido'] };
    }
    
    let isValid = true;
    const errors = [];
    
    // Recorrer elementos del formulario
    Array.from(formElement.elements).forEach(element => {
        // Limpiar mensajes de error previos
        clearValidationError(element);
        
        if (element.name && !element.disabled) {
            let elementValid = true;
            let errorMessage = '';
            
            // Validar requerido
            if (element.required && isEmpty(element.value)) {
                elementValid = false;
                errorMessage = 'Este campo es obligatorio';
            }
            // Validar tipo email
            else if (element.type === 'email' && element.value && !isValidEmail(element.value)) {
                elementValid = false;
                errorMessage = 'Formato de correo inválido';
            }
            // Validar número
            else if (element.type === 'number' && element.value) {
                if (!isNumeric(element.value)) {
                    elementValid = false;
                    errorMessage = 'Debe ser un número válido';
                } else if (element.min && parseFloat(element.value) < parseFloat(element.min)) {
                    elementValid = false;
                    errorMessage = `Debe ser mayor o igual a ${element.min}`;
                } else if (element.max && parseFloat(element.value) > parseFloat(element.max)) {
                    elementValid = false;
                    errorMessage = `Debe ser menor o igual a ${element.max}`;
                }
            }
            
            // Validaciones personalizadas
            if (elementValid && element.name in customValidations) {
                const customValidation = customValidations[element.name](element.value, formElement);
                if (customValidation !== true) {
                    elementValid = false;
                    errorMessage = customValidation;
                }
            }
            
            // Mostrar error si el elemento no es válido
            if (!elementValid) {
                isValid = false;
                errors.push({ field: element.name, message: errorMessage });
                showValidationError(element, errorMessage);
            }
        }
    });
    
    return { valid: isValid, errors };
}

/**
 * Muestra un mensaje de error de validación junto a un elemento
 * @param {HTMLElement} element - Elemento con error
 * @param {string} message - Mensaje de error
 */
function showValidationError(element, message) {
    // Agregar clase de error al elemento
    element.classList.add('error');
    
    // Buscar contenedor para mensaje de error
    const parent = element.parentElement;
    let errorElement = parent.querySelector('.error-message');
    
    // Crear elemento para mensaje si no existe
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        parent.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Limpia el error de validación de un elemento
 * @param {HTMLElement} element - Elemento a limpiar
 */
function clearValidationError(element) {
    // Quitar clase de error
    element.classList.remove('error');
    
    // Buscar y eliminar mensaje de error
    const parent = element.parentElement;
    const errorElement = parent.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}