/**
 * Gestión de gráficos del sistema TextilPro
 */

/**
 * Inicializa todos los gráficos
 */
function initAllCharts() {
    // Destruir gráficos existentes
    destroyAllCharts();
    
    // Inicializar gráficos según la sección actual
    if (currentSection === 'dashboard') {
        initDashboardCharts();
    } else if (currentSection === 'analysis') {
        initAnalysisCharts();
    } else if (currentSection === 'kpis') {
        animateKPIProgressBars();
    } else if (currentSection === 'reports' || currentSection === 'reports-admin') {
        initReportCharts();
    } else if (currentSection === 'inventory-owner' || currentSection === 'inventory-admin') {
        initInventoryCharts();
    } else if (currentSection === 'performance') {
        initPerformanceCharts();
    }
}

/**
 * Destruye todos los gráficos existentes
 */
function destroyAllCharts() {
    Object.keys(charts).forEach(chartId => {
        if (charts[chartId]) {
            charts[chartId].destroy();
            charts[chartId] = null;
        }
    });
}

/**
 * Inicializa los gráficos del dashboard
 */
function initDashboardCharts() {
    // Gráfico de producción vs proyectado
    initProductionChart();
    
    // Gráfico de tiempo de parada por causa
    initStoppageChart();
}

/**
 * Inicializa los gráficos de análisis
 */
function initAnalysisCharts() {
    // Gráfico de rendimiento por máquina
    initMachinePerformanceChart();
    
    // Gráfico de razones de parada
    initStoppageReasonsChart();
    
    // Gráfico de tendencia de parada
    initStoppageTrendChart();
    
    // Gráfico de eficiencia
    initEfficiencyChart();
    
    // Gráfico de proyección vs real
    initProjectionVsRealChart();
}

/**
 * Inicializa los gráficos de inventario
 */
function initInventoryCharts() {
    // Gráfico de distribución de inventario
    initInventoryDistributionChart();
    
    // Gráfico de histórico de inventario
    initInventoryHistoryChart();
}

/**
 * Inicializa los gráficos de reportes
 */
function initReportCharts() {
    // Gráfico de reporte
    initReportChart();
}

/**
 * Inicializa los gráficos de rendimiento
 */
function initPerformanceCharts() {
    // Gráfico de rendimiento por operario
    initOperatorPerformanceChart();
    
    // Gráfico de tiempo de parada por operario
    initOperatorStoppageChart();
}

/**
 * Anima las barras de progreso de KPIs
 */
function animateKPIProgressBars() {
    const progressBars = document.querySelectorAll('.kpi-card .progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

/**
 * Configura opciones comunes para los gráficos
 * @param {string} type - Tipo de gráfico
 * @param {object} customOptions - Opciones personalizadas
 * @returns {object} - Opciones del gráfico
 */
function getChartOptions(type, customOptions = {}) {
    // Opciones base para todos los gráficos
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    };
    
    // Opciones específicas según el tipo de gráfico
    const typeSpecificOptions = {};
    
    if (type === 'bar' || type === 'line') {
        typeSpecificOptions.scales = {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        };
    } else if (type === 'pie' || type === 'doughnut') {
        typeSpecificOptions.legend = {
            position: 'right',
            labels: {
                fontColor: '#4B5563',
                padding: 15,
                usePointStyle: true
            }
        };
        if (type === 'doughnut') {
            typeSpecificOptions.cutoutPercentage = 65;
        }
    }
    
    // Combinar opciones
    return {
        ...baseOptions,
        ...typeSpecificOptions,
        ...customOptions
    };
}

/**
 * Inicializa un gráfico
 * @param {string} canvasId - ID del elemento canvas
 * @param {string} type - Tipo de gráfico
 * @param {object} data - Datos del gráfico
 * @param {object} options - Opciones adicionales
 * @returns {Chart} - Instancia del gráfico
 */
function initChart(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const chartOptions = getChartOptions(type, options);
    
    // Crear nuevo gráfico
    const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: chartOptions
    });
    
    // Guardar referencia
    charts[canvasId] = chart;
    
    return chart;
}

/**
 * Gráfico de producción vs proyectado
 */
function initProductionChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Producción Real',
                data: [10200, 10800, 11500, 12450, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1
            },
            {
                label: 'Producción Proyectada',
                data: [10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500],
                type: 'line',
                fill: false,
                backgroundColor: CONFIG.charts.colors.secondary,
                borderColor: CONFIG.charts.borderColors.secondary,
                borderWidth: 2,
                pointRadius: 4
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return new Intl.NumberFormat('es-PE').format(value);
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += new Intl.NumberFormat('es-PE').format(tooltipItem.yLabel) + ' m';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('production-chart', 'bar', data, options);
}

/**
 * Gráfico de tiempo de parada por causa
 */
function initStoppageChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Cambio de Bobinas', 'Mantenimiento', 'Avería', 'Servicios', 'Ajuste de Máquina', 'Cambio de Turno'],
        datasets: [
            {
                label: 'Horas',
                data: [61, 35, 20, 12, 9, 8],
                backgroundColor: [
                    CONFIG.charts.colors.primary,
                    CONFIG.charts.colors.secondary,
                    CONFIG.charts.colors.danger,
                    CONFIG.charts.colors.warning,
                    CONFIG.charts.colors.info,
                    CONFIG.charts.colors.gray
                ],
                borderColor: [
                    CONFIG.charts.borderColors.primary,
                    CONFIG.charts.borderColors.secondary,
                    CONFIG.charts.borderColors.danger,
                    CONFIG.charts.borderColors.warning,
                    CONFIG.charts.borderColors.info,
                    CONFIG.charts.borderColors.gray
                ],
                borderWidth: 1
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = Math.round((currentValue/total) * 100);
                    
                    return `${data.labels[tooltipItem.index]}: ${currentValue} hrs (${percentage}%)`;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('stoppage-chart', 'pie', data, options);
}

/**
 * Gráfico de rendimiento por máquina
 */
function initMachinePerformanceChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Máquina 01', 'Máquina 02', 'Máquina 03', 'Máquina 04', 'Máquina 05', 'Máquina 06', 'Máquina 07', 'Máquina 08', 'Máquina 09', 'Máquina 10'],
        datasets: [
            {
                label: 'Eficiencia (%)',
                data: [85, 87.8, 95.2, 86.5, 91.3, 84.2, 82.1, 93.7, 88.4, 90.1],
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1
            },
            {
                label: 'Meta (%)',
                data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
                type: 'line',
                fill: false,
                backgroundColor: CONFIG.charts.colors.danger,
                borderColor: CONFIG.charts.borderColors.danger,
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5]
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel.toFixed(1) + '%';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('machine-performance-chart', 'bar', data, options);
}

/**
 * Gráfico de razones de parada
 */
function initStoppageReasonsChart() {
    // Datos de ejemplo - similares a initStoppageChart pero para otra visualización
    const data = {
        labels: ['Cambio de Bobinas', 'Mantenimiento', 'Avería', 'Servicios', 'Ajuste', 'Otros'],
        datasets: [
            {
                label: 'Horas',
                data: [61, 35, 20, 12, 9, 8],
                backgroundColor: [
                    CONFIG.charts.colors.primary,
                    CONFIG.charts.colors.secondary,
                    CONFIG.charts.colors.danger,
                    CONFIG.charts.colors.warning,
                    CONFIG.charts.colors.info,
                    CONFIG.charts.colors.gray
                ],
                borderColor: [
                    CONFIG.charts.borderColors.primary,
                    CONFIG.charts.borderColors.secondary,
                    CONFIG.charts.borderColors.danger,
                    CONFIG.charts.borderColors.warning,
                    CONFIG.charts.borderColors.info,
                    CONFIG.charts.borderColors.gray
                ],
                borderWidth: 1
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = Math.round((currentValue/total) * 100);
                    
                    return `${data.labels[tooltipItem.index]}: ${currentValue} hrs (${percentage}%)`;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('stoppage-reasons-chart', 'doughnut', data, options);
}

/**
 * Gráfico de tendencia de parada
 */
function initStoppageTrendChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [
            {
                label: 'Tiempo de Parada (h)',
                data: [160, 152, 148, 145],
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: CONFIG.charts.borderColors.danger,
                borderWidth: 2,
                pointRadius: 4,
                fill: true
            },
            {
                label: 'Meta (h)',
                data: [150, 145, 140, 135],
                backgroundColor: 'rgba(16, 185, 129, 0.0)',
                borderColor: CONFIG.charts.borderColors.secondary,
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5],
                fill: false
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    callback: function(value) {
                        return value + ' h';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel.toFixed(1) + ' h';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('stoppage-trend-chart', 'line', data, options);
}

/**
 * Gráfico de eficiencia
 */
function initEfficiencyChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Eficiencia (%)',
                data: [84.2, 85.1, 86.3, 87.5, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 2,
                pointRadius: 4,
                fill: true
            },
            {
                label: 'Meta (%)',
                data: [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
                backgroundColor: 'rgba(239, 68, 68, 0.0)',
                borderColor: CONFIG.charts.borderColors.danger,
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5],
                fill: false
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel.toFixed(1) + '%';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('efficiency-chart', 'line', data, options);
}

/**
 * Gráfico de proyección vs real
 */
function initProjectionVsRealChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [
            {
                label: 'Producción Real (m)',
                data: [10200, 10800, 11500, 12450],
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1
            },
            {
                label: 'Producción Proyectada (m)',
                data: [10000, 10500, 11000, 13000],
                backgroundColor: CONFIG.charts.colors.secondary,
                borderColor: CONFIG.charts.borderColors.secondary,
                borderWidth: 1
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return new Intl.NumberFormat('es-PE').format(value) + ' m';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += new Intl.NumberFormat('es-PE').format(tooltipItem.yLabel) + ' m';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('projection-vs-real-chart', 'bar', data, options);
}

/**
 * Gráfico de distribución de inventario
 */
function initInventoryDistributionChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Algodón', 'Poliéster', 'Drill', 'Denim', 'Otros'],
        datasets: [
            {
                label: 'Metros',
                data: [18250, 15980, 7230, 3450, 910],
                backgroundColor: [
                    CONFIG.charts.colors.primary,
                    CONFIG.charts.colors.secondary,
                    CONFIG.charts.colors.warning,
                    CONFIG.charts.colors.info,
                    CONFIG.charts.colors.gray
                ],
                borderColor: [
                    CONFIG.charts.borderColors.primary,
                    CONFIG.charts.borderColors.secondary,
                    CONFIG.charts.borderColors.warning,
                    CONFIG.charts.borderColors.info,
                    CONFIG.charts.borderColors.gray
                ],
                borderWidth: 1
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = Math.round((currentValue/total) * 100);
                    
                    return `${data.labels[tooltipItem.index]}: ${new Intl.NumberFormat('es-PE').format(currentValue)} m (${percentage}%)`;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('inventory-distribution-chart', 'pie', data, options);
}

/**
 * Gráfico de histórico de inventario
 */
function initInventoryHistoryChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [
            {
                label: 'Metros Totales',
                data: [38500, 40200, 42800, 45820],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 2,
                pointRadius: 4,
                fill: true
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    callback: function(value) {
                        return new Intl.NumberFormat('es-PE').format(value) + ' m';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += new Intl.NumberFormat('es-PE').format(tooltipItem.yLabel) + ' m';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('inventory-history-chart', 'line', data, options);
}

/**
 * Gráfico de reporte
 */
function initReportChart() {
    const canvas = document.getElementById('report-chart') || document.getElementById('admin-report-chart');
    if (!canvas) return;
    
    // Datos de ejemplo
    const data = {
        labels: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04', '08/04', '09/04', '10/04'],
        datasets: [
            {
                label: 'Producción Real (m)',
                data: [1240, 1180, 1350, 1290, 1320, 1270, 1310, 1390, 1420, 1480],
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: 'Producción Esperada (m)',
                data: [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
                backgroundColor: 'rgba(16, 185, 129, 0.0)',
                borderColor: CONFIG.charts.borderColors.secondary,
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                type: 'line'
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return value + ' m';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel + ' m';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    const chartId = canvas.id;
    initChart(chartId, 'bar', data, options);
}

/**
 * Gráfico de rendimiento de operarios
 */
function initOperatorPerformanceChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Luis Mendoza', 'María Sánchez', 'Jorge Pérez', 'Carmen Lazo', 'Miguel Torres'],
        datasets: [
            {
                label: 'Rendimiento (%)',
                data: [97.2, 94.5, 92.1, 91.8, 90.2],
                backgroundColor: CONFIG.charts.colors.primary,
                borderColor: CONFIG.charts.borderColors.primary,
                borderWidth: 1
            },
            {
                label: 'Meta (%)',
                data: [95, 95, 95, 95, 95],
                backgroundColor: 'rgba(239, 68, 68, 0.0)',
                borderColor: CONFIG.charts.borderColors.danger,
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5],
                fill: false,
                type: 'line'
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel.toFixed(1) + '%';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('operator-performance-chart', 'bar', data, options);
}

/**
 * Gráfico de tiempo de parada por operario
 */
function initOperatorStoppageChart() {
    // Datos de ejemplo
    const data = {
        labels: ['Luis Mendoza', 'María Sánchez', 'Jorge Pérez', 'Carmen Lazo', 'Miguel Torres'],
        datasets: [
            {
                label: 'Tiempo de Parada (h)',
                data: [5.2, 9.8, 14.3, 14.7, 17.2],
                backgroundColor: CONFIG.charts.colors.danger,
                borderColor: CONFIG.charts.borderColors.danger,
                borderWidth: 1
            }
        ]
    };
    
    // Opciones personalizadas
    const options = {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {
                        return value + ' h';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.xLabel.toFixed(1) + ' h';
                    return label;
                }
            }
        }
    };
    
    // Inicializar gráfico
    initChart('operator-stoppage-chart', 'horizontalBar', data, options);
}