// Modales JS

/**
 * Gestión de modales del sistema TextilPro
 */

/**
 * Inicializa todos los eventos de modales
 */
function initModalEvents() {
    // Botones para abrir modales
    initModalTriggers();
    
    // Botones para cerrar modales
    initModalClosers();
    
    // Cerrar modal al hacer clic fuera
    initModalOutsideClick();
    
    // Eventos específicos de modales
    initStoppageModalEvents();
    initCutModalEvents();
    initAssignmentModalEvents();
    initInventoryModalEvents();
    initConfirmModalEvents();
    initMachineModalEvents();
    initFabricModalEvents();
    initOperatorModalEvents();
}

/**
 * Inicializa los botones que abren modales
 */
function initModalTriggers() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            showModal(modalId);
        });
    });
}

/**
 * Inicializa los botones que cierran modales
 */
function initModalClosers() {
    const closeModalBtns = document.querySelectorAll('.close-modal, .modal-footer .btn-secondary');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-content').parentElement;
            hideModal(modal.id);
        });
    });
}

/**
 * Inicializa el cierre de modales al hacer clic fuera
 */
function initModalOutsideClick() {
    const modals = document.querySelectorAll('.inventory-adjustment-modal, .machine-modal, .fabric-modal, .operator-modal, .assignment-modal, .stoppage-modal, .cut-modal, .confirmation-modal, .new-inventory-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this.id);
            }
        });
    });
}

/**
 * Muestra un modal
 * @param {string} modalId - ID del modal a mostrar
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
        
        // Disparar evento de apertura
        const event = new CustomEvent('modal:open', { detail: { modalId } });
        document.dispatchEvent(event);
    }
}

/**
 * Oculta un modal
 * @param {string} modalId - ID del modal a ocultar
 */
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll del body
        
        // Disparar evento de cierre
        const event = new CustomEvent('modal:close', { detail: { modalId } });
        document.dispatchEvent(event);
    }
}

/**
 * Inicializa eventos del modal de parada
 */
function initStoppageModalEvents() {
    const stoppageReasonSelect = document.getElementById('stoppage-reason');
    const otherReasonGroup = document.getElementById('other-reason-group');
    
    if (stoppageReasonSelect && otherReasonGroup) {
        stoppageReasonSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherReasonGroup.style.display = 'block';
            } else {
                otherReasonGroup.style.display = 'none';
            }
        });
    }
    
    // Botón para registrar parada
    const registerStoppageBtn = document.getElementById('register-stoppage');
    if (registerStoppageBtn) {
        registerStoppageBtn.addEventListener('click', function() {
            // Validar formulario
            const reason = document.getElementById('stoppage-reason').value;
            if (!reason) {
                showToast('warning', 'Por favor, seleccione un motivo de parada', 3000);
                return;
            }
            
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Implementar lógica para registrar la parada
                hideModal('stoppage-modal');
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', 'Parada registrada correctamente', 3000);
                
                // Actualizar interfaz para mostrar máquina detenida
                updateMachineAfterStoppage();
            }, 1000);
        });
    }
    
    // Botón para cancelar parada
    const cancelStoppageBtn = document.getElementById('cancel-stoppage');
    if (cancelStoppageBtn) {
        cancelStoppageBtn.addEventListener('click', function() {
            hideModal('stoppage-modal');
        });
    }
}

/**
 * Actualiza la interfaz de la máquina después de registrar una parada
 */
function updateMachineAfterStoppage() {
    const machineCard = document.querySelector('.machine-card.active');
    if (machineCard) {
        machineCard.classList.remove('active');
        machineCard.classList.add('stopped');
        
        const statusElement = machineCard.querySelector('.machine-status');
        if (statusElement) {
            statusElement.textContent = 'Detenida';
            statusElement.className = 'machine-status paused';
        }
        
        const stopBtn = machineCard.querySelector('#stop-machine-btn');
        const resumeBtn = machineCard.querySelector('.machine-actions button:first-child');
        if (stopBtn) {
            stopBtn.disabled = true;
            resumeBtn.disabled = false;
            resumeBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
            resumeBtn.id = 'resume-machine-btn';
            resumeBtn.className = 'btn-primary';
        }
    }
}

/**
 * Inicializa eventos del modal de corte
 */
function initCutModalEvents() {
    // Botón para registrar corte
    const registerCutBtn = document.getElementById('register-cut');
    if (registerCutBtn) {
        registerCutBtn.addEventListener('click', function() {
            // Validar campos
            const meters = document.getElementById('cut-meters').value;
            const weight = document.getElementById('cut-weight').value;
            
            if (!meters || !weight) {
                showToast('warning', 'Por favor, complete los campos de metros y peso', 3000);
                return;
            }
            
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Implementar lógica para registrar el corte
                hideModal('cut-modal');
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', 'Corte registrado correctamente', 3000);
                
                // Actualizar interfaz para mostrar máquina completada
                updateMachineAfterCut(meters, weight);
            }, 1000);
        });
    }
    
    // Botón para cancelar corte
    const cancelCutBtn = document.getElementById('cancel-cut');
    if (cancelCutBtn) {
        cancelCutBtn.addEventListener('click', function() {
            hideModal('cut-modal');
        });
    }
}

/**
 * Actualiza la interfaz de la máquina después de registrar un corte
 * @param {string} meters - Metros producidos
 * @param {string} weight - Peso en kg
 */
function updateMachineAfterCut(meters, weight) {
    const machineCard = document.querySelector('.machine-card.active');
    if (machineCard) {
        const progressCircle = machineCard.querySelector('.progress-circle-fill');
        const progressValue = machineCard.querySelector('.progress-value');
        
        if (progressCircle && progressValue) {
            progressValue.textContent = '100%';
            progressCircle.style.strokeDashoffset = '0';
        }
    }
    
    // Actualizar resumen de producción
    const metersSummary = document.querySelector('.summary-item:first-child .summary-info p');
    const weightSummary = document.querySelector('.summary-item:nth-child(2) .summary-info p');
    
    if (metersSummary && weightSummary) {
        const currentMeters = parseInt(metersSummary.textContent);
        const currentWeight = parseInt(weightSummary.textContent);
        
        metersSummary.textContent = (currentMeters + parseInt(meters)) + ' m';
        weightSummary.textContent = (currentWeight + parseInt(weight)) + ' kg';
    }
}

/**
 * Inicializa eventos del modal de asignación
 */
function initAssignmentModalEvents() {
    // Botón para nueva asignación
    const newAssignmentBtn = document.getElementById('new-assignment-btn');
    if (newAssignmentBtn) {
        newAssignmentBtn.addEventListener('click', function() {
            // Limpiar formulario
            clearAssignmentForm();
            
            // Mostrar modal
            showModal('assignment-modal');
        });
    }
    
    // Botones para editar asignación
    const editAssignmentBtns = document.querySelectorAll('.edit-assignment');
    editAssignmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const assignmentId = this.getAttribute('data-id');
            
            // Cargar los datos de la asignación
            loadAssignmentData(assignmentId);
            
            // Mostrar modal
            showModal('assignment-modal');
        });
    });
    
    // Botones para eliminar asignación
    const deleteAssignmentBtns = document.querySelectorAll('.delete-assignment');
    deleteAssignmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const assignmentId = this.getAttribute('data-id');
            
            // Guardar ID de asignación para eliminar
            document.getElementById('confirm-delete-assignment').setAttribute('data-id', assignmentId);
            
            // Mostrar modal de confirmación
            showModal('delete-assignment-confirm');
        });
    });
    
    // Botón para guardar asignación
    const saveAssignmentBtn = document.getElementById('save-assignment');
    if (saveAssignmentBtn) {
        saveAssignmentBtn.addEventListener('click', function() {
            // Validar formulario
            const requiredFields = ['assignment-id', 'assignment-operator', 'assignment-machine', 'assignment-fabric', 'assignment-date'];
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
                // Implementar lógica para guardar la asignación
                hideModal('assignment-modal');
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', 'Asignación guardada correctamente', 3000);
            }, 1000);
        });
    }
}

/**
 * Limpia el formulario de asignación
 */
function clearAssignmentForm() {
    document.getElementById('assignment-id').value = '';
    document.getElementById('assignment-operator').value = '';
    document.getElementById('assignment-machine').value = '';
    document.getElementById('assignment-fabric').value = '';
    document.getElementById('assignment-date').value = '';
    document.getElementById('assignment-shift').value = 'morning';
    document.getElementById('assignment-status').value = 'active';
    document.getElementById('assignment-notes').value = '';
}

/**
 * Carga datos de asignación en el formulario
 * @param {string} assignmentId - ID de la asignación a cargar
 */
function loadAssignmentData(assignmentId) {
    // En una aplicación real, estos datos vendrían de una API o base de datos
    // Por ahora, simulamos con datos mockeados
    const assignments = {
        'A001': {
            id: 'A001',
            operator: 'OP001',
            machine: 'M003',
            fabric: 'ALG-180',
            date: '2025-04-01',
            shift: 'morning',
            status: 'active',
            notes: 'Asignación regular'
        },
        'A002': {
            id: 'A002',
            operator: 'OP002',
            machine: 'M008',
            fabric: 'POL-120',
            date: '2025-04-01',
            shift: 'morning',
            status: 'active',
            notes: ''
        }
    };
    
    const assignment = assignments[assignmentId];
    
    if (assignment) {
        document.getElementById('assignment-id').value = assignment.id;
        document.getElementById('assignment-operator').value = assignment.operator;
        document.getElementById('assignment-machine').value = assignment.machine;
        document.getElementById('assignment-fabric').value = assignment.fabric;
        document.getElementById('assignment-date').value = assignment.date;
        document.getElementById('assignment-shift').value = assignment.shift;
        document.getElementById('assignment-status').value = assignment.status;
        document.getElementById('assignment-notes').value = assignment.notes;
    }
}

/**
 * Inicializa eventos del modal de inventario
 */
function initInventoryModalEvents() {
    // Se implementará en el módulo de inventario
}

/**
 * Inicializa eventos de modales de confirmación
 */
function initConfirmModalEvents() {
    // Botón para confirmar eliminación de asignación
    const confirmDeleteAssignmentBtn = document.getElementById('confirm-delete-assignment');
    if (confirmDeleteAssignmentBtn) {
        confirmDeleteAssignmentBtn.addEventListener('click', function() {
            const assignmentId = this.getAttribute('data-id');
            
            // Simulación de carga
            toggleLoader(true);
            
            setTimeout(() => {
                // Implementar lógica para eliminar la asignación
                hideModal('delete-assignment-confirm');
                toggleLoader(false);
                
                // Mostrar mensaje de éxito
                showToast('success', `Asignación ${assignmentId} eliminada correctamente`, 3000);
                
                // Eliminar fila de la tabla (simulado)
                const assignmentRow = document.querySelector(`button.delete-assignment[data-id="${assignmentId}"]`).closest('tr');
                if (assignmentRow) {
                    assignmentRow.remove();
                }
            }, 1000);
        });
    }
}

/**
 * Inicializa eventos del modal de máquina
 */
function initMachineModalEvents() {
    // Se implementará en el módulo de máquinas
}

/**
 * Inicializa eventos del modal de tela
 */
function initFabricModalEvents() {
    // Se implementará en el módulo de telas
}

/**
 * Inicializa eventos del modal de operario
 */
function initOperatorModalEvents() {
    // Se implementará en el módulo de operarios
}