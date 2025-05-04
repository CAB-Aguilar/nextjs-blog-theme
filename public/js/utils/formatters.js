// Formateadores

/**
 * Funciones de formateo de datos para el sistema TextilPro
 */

/**
 * Formatea un número como moneda (Soles peruanos)
 * @param {number} value - Valor a formatear
 * @returns {string} - Valor formateado
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2
    }).format(value);
}

/**
 * Formatea un número con separador de miles
 * @param {number} value - Valor a formatear
 * @param {number} decimals - Número de decimales (por defecto 0)
 * @returns {string} - Valor formateado
 */
function formatNumber(value, decimals = 0) {
    return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

/**
 * Formatea un porcentaje
 * @param {number} value - Valor a formatear (0-100)
 * @param {number} decimals - Número de decimales (por defecto 1)
 * @returns {string} - Valor formateado con símbolo %
 */
function formatPercent(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Formatea una fecha para mostrar en la interfaz
 * @param {Date|string} date - Fecha a formatear
 * @param {boolean} includeTime - Incluir hora
 * @returns {string} - Fecha formateada
 */
function formatDate(date, includeTime = false) {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    
    return dateObj.toLocaleDateString('es-PE', options);
}

/**
 * Formatea una duración de tiempo en horas y minutos
 * @param {number} minutes - Tiempo en minutos
 * @returns {string} - Tiempo formateado
 */
function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
        return `${mins}min`;
    } else if (mins === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${mins}min`;
    }
}

/**
 * Formatea un nombre de ID de máquina, operario, etc.
 * @param {string} type - Tipo de ID (machine, operator, fabric, etc)
 * @param {number} num - Número a formatear
 * @returns {string} - ID formateado
 */
function formatId(type, num) {
    const prefixes = {
        'machine': 'M',
        'operator': 'OP',
        'fabric': 'F',
        'assignment': 'A'
    };
    
    const prefix = prefixes[type] || '';
    return `${prefix}${num.toString().padStart(3, '0')}`;
}

/**
 * Calcula el tiempo transcurrido desde una fecha hasta ahora
 * @param {Date|string} date - Fecha inicial
 * @returns {string} - Texto descriptivo del tiempo transcurrido
 */
function timeAgo(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Hace unos segundos';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `Hace ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `Hace ${diffInYears} ${diffInYears === 1 ? 'año' : 'años'}`;
}

/**
 * Formatea metros o kilogramos con unidades
 * @param {number} value - Valor a formatear
 * @param {string} unit - Unidad ('m' o 'kg')
 * @returns {string} - Valor con unidad
 */
function formatMeasurement(value, unit) {
    const formattedValue = formatNumber(value);
    return `${formattedValue} ${unit}`;
}

/**
 * Calcula la edad a partir de la fecha de nacimiento
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @returns {number} - Edad en años
 */
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

/**
 * Trunca un texto si es demasiado largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}