// Módulo de dashboard

/**
 * Módulo de dashboard del sistema TextilPro
 */

/**
 * Inicializa el módulo de dashboard
 */
function initDashboardModule() {
    console.log('Inicializando módulo de dashboard...');
    
    // Eventos específicos del dashboard
    document.addEventListener('section:dashboard:loaded', function() {
        console.log('Dashboard cargado, inicializando gráficos...');
        // Inicializar gráficos del dashboard
        initDashboardCharts();
        
        // Inicializar periodos de gráficos
        initChartPeriods();
        
        // Inicializar acciones de gráficos
        initChartActions();
    });
}

/**
 * Inicializa los selectores de periodo de los gráficos
 */
function initChartPeriods() {
    const chartPeriods = document.querySelectorAll('.chart-period');
    
    chartPeriods.forEach(select => {
        select.addEventListener('change', function() {
            const chartId = this.id.replace('-period', '');
            const period = this.value;
            
            // Actualizar gráfico según el periodo seleccionado
            updateChartByPeriod(chartId, period);
        });
    });
}

/**
 * Actualiza un gráfico según el periodo seleccionado
 * @param {string} chartId - ID del gráfico
 * @param {string} period - Periodo seleccionado
 */
function updateChartByPeriod(chartId, period) {
    // Simulación de carga
    toggleLoader(true);
    
    setTimeout(() => {
        // En una aplicación real, aquí se cargarían los datos según el periodo
        // Por ahora, solo actualizamos la visualización existente
        
        // Crear nuevos datos según el periodo
        let newData;
        
        if (chartId === 'production-chart') {
            newData = generateProductionDataByPeriod(period);
        } else if (chartId === 'stoppage-chart') {
            newData = generateStoppageDataByPeriod(period);
        }
        
        // Actualizar el gráfico con los nuevos datos
        if (newData && charts[chartId]) {
            charts[chartId].data = newData;
            charts[chartId].update();
        }
        
        toggleLoader(false);
    }, 800);
}

/**
 * Genera datos de producción según el periodo
 * @param {string} period - Periodo seleccionado
 * @returns {object} - Datos para el gráfico
 */
function generateProductionDataByPeriod(period) {
    let labels, realData, projectedData;
    
    switch (period) {
        case 'daily':
            labels = Array.from({length: 30}, (_, i) => `${i+1}/04`);
            realData = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 350);
            // Completar con valores vacíos para datos futuros
            realData = [...realData, ...Array(20).fill(0)];
            projectedData = Array.from({length: 30}, () => 400);
            break;
            
        case 'weekly':
            labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12'];
            realData = [2800, 2950, 3100, 3300, 0, 0, 0, 0, 0, 0, 0, 0];
            projectedData = [2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800];
            break;
            
        case 'monthly':
        default:
            labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            realData = [10200, 10800, 11500, 12450, 0, 0, 0, 0, 0, 0, 0, 0];
            projectedData = [10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500];
            break;
    }
    
    return {
        labels: labels,
        datasets: [
            {
                label: 'Producción Real',
                data: realData,
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1
            },
            {
                label: 'Producción Proyectada',
                data: projectedData,
                type: 'line',
                fill: false,
                backgroundColor: CONFIG.charts.colors.secondary,
                borderColor: CONFIG.charts.borderColors.secondary,
                borderWidth: 2,
                pointRadius: 4
            }
        ]
    };
}

/**
 * Genera datos de tiempo de parada según el periodo
 * @param {string} period - Periodo seleccionado
 * @returns {object} - Datos para el gráfico
 */
function generateStoppageDataByPeriod(period) {
    // Diferentes datos según el periodo
    let causes, hours;
    
    switch (period) {
        case 'daily':
            causes = ['Cambio de Bobinas', 'Mantenimiento', 'Avería', 'Otros'];
            hours = [2.5, 1.2, 0.8, 0.5];
            break;
            
        case 'weekly':
            causes = ['Cambio de Bobinas', 'Mantenimiento', 'Avería', 'Servicios', 'Otros'];
            hours = [15, 8, 5, 3, 2];
            break;
            
        case 'monthly':
        default:
            causes = ['Cambio de Bobinas', 'Mantenimiento', 'Avería', 'Servicios', 'Ajuste de Máquina', 'Cambio de Turno'];
            hours = [61, 35, 20, 12, 9, 8];
            break;
    }
    
    // Colores para el gráfico
    const backgrounds = [
        CONFIG.charts.colors.primary,
        CONFIG.charts.colors.secondary,
        CONFIG.charts.colors.danger,
        CONFIG.charts.colors.warning,
        CONFIG.charts.colors.info,
        CONFIG.charts.colors.gray
    ];
    
    const borders = [
        CONFIG.charts.borderColors.primary,
        CONFIG.charts.borderColors.secondary,
        CONFIG.charts.borderColors.danger,
        CONFIG.charts.borderColors.warning,
        CONFIG.charts.borderColors.info,
        CONFIG.charts.borderColors.gray
    ];
    
    return {
        labels: causes,
        datasets: [
            {
                label: 'Horas',
                data: hours,
                backgroundColor: backgrounds.slice(0, causes.length),
                borderColor: borders.slice(0, causes.length),
                borderWidth: 1
            }
        ]
    };
}

/**
 * Inicializa las acciones de los gráficos
 */
function initChartActions() {
    // Exportar gráfico
    const exportChartBtns = document.querySelectorAll('.export-chart');
    exportChartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const chartId = this.getAttribute('data-chart');
            exportChart(chartId);
        });
    });
    
    // Actualizar gráfico
    const refreshChartBtns = document.querySelectorAll('.refresh-chart');
    refreshChartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const chartId = this.getAttribute('data-chart');
            refreshChart(chartId);
        });
    });
    
    // Ver gráfico completo
    const fullscreenChartBtns = document.querySelectorAll('.fullscreen-chart');
    fullscreenChartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const chartId = this.getAttribute('data-chart');
            showFullscreenChart(chartId);
        });
    });
}

/**
 * Exporta un gráfico
 * @param {string} chartId - ID del gráfico
 */
function exportChart(chartId) {
    // Simulación de carga
    toggleLoader(true);
    
    setTimeout(() => {
        // En una aplicación real, aquí se implementaría la exportación del gráfico
        toggleLoader(false);
        showToast('success', `Gráfico ${chartId} exportado correctamente`, 3000);
    }, 1000);
}

/**
 * Actualiza un gráfico
 * @param {string} chartId - ID del gráfico
 */
function refreshChart(chartId) {
    // Simulación de carga
    toggleLoader(true);
    
    setTimeout(() => {
        // En una aplicación real, aquí se cargarían nuevos datos
        
        // Seleccionar periodo actual
        const periodSelect = document.getElementById(`${chartId}-period`);
        const period = periodSelect ? periodSelect.value : 'monthly';
        
        // Actualizar según periodo
        updateChartByPeriod(chartId, period);
        
        toggleLoader(false);
        showToast('success', `Gráfico ${chartId} actualizado`, 3000);
    }, 1000);
}

/**
 * Muestra un gráfico en pantalla completa
 * @param {string} chartId - ID del gráfico
 */
function showFullscreenChart(chartId) {
    // En una aplicación real, aquí se implementaría la vista completa del gráfico
    // Por ahora, solo mostraremos un mensaje
    showToast('info', `Vista completa del gráfico ${chartId}`, 3000);
}