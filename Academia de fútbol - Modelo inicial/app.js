// Variables globales
let currentUser = null;
let currentUserType = null;
let appData = {
    // Datos del administrador
    admin: {
        students: [
            { id: "ALU2458", name: "Mateo Gómez", age: 10, program: "Formación Técnica", status: "active", avatar: "assets/student-1.jpg", registrationDate: "28/04/2025", attendance: "95%", coach: "Carlos Díaz" },
            { id: "ALU2459", name: "Sofía Medina", age: 6, program: "Iniciación Deportiva", status: "pending", avatar: "assets/student-2.jpg", registrationDate: "27/04/2025", attendance: "88%", coach: "Laura Sánchez" },
            { id: "ALU2460", name: "Diego Torres", age: 14, program: "Alto Rendimiento", status: "active", avatar: "assets/student-3.jpg", registrationDate: "26/04/2025", attendance: "98%", coach: "Miguel Ángel Pérez" },
            { id: "ALU2461", name: "Lucía Mendoza", age: 9, program: "Formación Técnica", status: "inactive", avatar: "assets/student-4.jpg", registrationDate: "25/04/2025", attendance: "75%", coach: "Carlos Díaz" },
            { id: "ALU2462", name: "Joaquín Rojas", age: 12, program: "Formación Técnica", status: "active", avatar: "assets/student-5.jpg", registrationDate: "24/04/2025", attendance: "90%", coach: "Laura Sánchez" },
            { id: "ALU2463", name: "Valentina Castro", age: 7, program: "Iniciación Deportiva", status: "active", avatar: "assets/student-6.jpg", registrationDate: "23/04/2025", attendance: "92%", coach: "Carlos Díaz" },
            { id: "ALU2464", name: "Sebastián Ramos", age: 15, program: "Alto Rendimiento", status: "pending", avatar: "assets/student-7.jpg", registrationDate: "22/04/2025", attendance: "85%", coach: "Miguel Ángel Pérez" },
            { id: "ALU2465", name: "Camila Vargas", age: 11, program: "Formación Técnica", status: "active", avatar: "assets/student-8.jpg", registrationDate: "21/04/2025", attendance: "93%", coach: "Laura Sánchez" }
        ],
        trainers: [
            { id: "ENT001", name: "Carlos Díaz", specialty: "Técnica y táctica", status: "active", avatar: "assets/trainer-1.jpg", students: 32, classes: 12, experience: "8 años" },
            { id: "ENT002", name: "Laura Sánchez", specialty: "Iniciación deportiva", status: "active", avatar: "assets/trainer-2.jpg", students: 28, classes: 10, experience: "5 años" },
            { id: "ENT003", name: "Miguel Ángel Pérez", specialty: "Alto rendimiento", status: "active", avatar: "assets/trainer-3.jpg", students: 18, classes: 8, experience: "12 años" },
            { id: "ENT004", name: "Ana Martínez", specialty: "Preparación física", status: "inactive", avatar: "assets/trainer-4.jpg", students: 0, classes: 0, experience: "7 años" }
        ],
        classes: [
            { id: "CLS001", name: "Iniciación Deportiva Grupo A", trainer: "Laura Sánchez", schedule: "Lunes y Miércoles, 15:00 - 16:30", students: 12, location: "Cancha 2" },
            { id: "CLS002", name: "Formación Técnica Grupo B", trainer: "Carlos Díaz", schedule: "Lunes y Miércoles, 17:00 - 18:30", students: 15, location: "Cancha principal" },
            { id: "CLS003", name: "Alto Rendimiento Grupo Único", trainer: "Miguel Ángel Pérez", schedule: "Martes y Jueves, 16:00 - 18:00", students: 10, location: "Cancha principal" },
            { id: "CLS004", name: "Iniciación Deportiva Grupo B", trainer: "Laura Sánchez", schedule: "Martes y Jueves, 15:00 - 16:30", students: 14, location: "Cancha 2" },
            { id: "CLS005", name: "Formación Técnica Grupo A", trainer: "Carlos Díaz", schedule: "Martes y Jueves, 17:00 - 18:30", students: 16, location: "Cancha 1" },
            { id: "CLS006", name: "Preparación de Arqueros", trainer: "Miguel Ángel Pérez", schedule: "Viernes, 15:00 - 16:30", students: 6, location: "Cancha 3" }
        ],
        events: [
            { id: "EVT001", name: "Torneo Interno de Categorías", date: "15/05/2025", time: "9:00 AM - 6:00 PM", location: "Cancha principal, Sede Central", status: "upcoming", image: "assets/event-1.jpg", description: "Torneo interno para todas las categorías de la academia. Se realizarán partidos entre los diferentes grupos para fomentar la competencia sana y evaluar el progreso de los alumnos.", participants: "8 equipos", organizer: "Carlos Díaz" },
            { id: "EVT002", name: "Entrenamiento Especial con Entrenador Invitado", date: "20/05/2025", time: "3:00 PM - 6:00 PM", location: "Cancha de entrenamiento", status: "upcoming", image: "assets/event-2.jpg", description: "Sesión especial de entrenamiento con Carlos Rodríguez, entrenador profesional con experiencia internacional. Se enfocarán en técnicas avanzadas de control de balón y tácticas de juego.", participants: "Alumnos de Formación Técnica y Alto Rendimiento", organizer: "Miguel Ángel Pérez" },
            { id: "EVT003", name: "Festival Deportivo Familiar", date: "05/06/2025", time: "10:00 AM - 2:00 PM", location: "Complejo deportivo", status: "upcoming", image: "assets/event-3.jpg", description: "Evento para toda la familia donde los padres podrán participar junto con sus hijos en actividades deportivas y recreativas. Se realizarán mini-torneos, juegos y exhibiciones.", participants: "Todas las categorías y familiares", organizer: "Laura Sánchez" },
            { id: "EVT004", name: "Evaluación Técnica Trimestral", date: "10/06/2025", time: "Durante horario regular de clases", location: "Todas las canchas", status: "upcoming", image: "assets/event-4.jpg", description: "Evaluación trimestral de habilidades técnicas para todos los alumnos. Se medirá el progreso en diferentes aspectos como control de balón, pases, tiros a puerta, y comprensión táctica según la categoría.", participants: "Todos los alumnos", organizer: "Todo el equipo de entrenadores" }
        ],
        payments: [
            { id: "PAG001", student: "Mateo Gómez", amount: "S/. 350.00", date: "01/04/2025", concept: "Mensualidad Abril", status: "completed", method: "Tarjeta de crédito" },
            { id: "PAG002", student: "Sofía Medina", amount: "S/. 300.00", date: "02/04/2025", concept: "Mensualidad Abril", status: "completed", method: "Transferencia bancaria" },
            { id: "PAG003", student: "Diego Torres", amount: "S/. 400.00", date: "01/04/2025", concept: "Mensualidad Abril", status: "completed", method: "Efectivo" },
            { id: "PAG004", student: "Lucía Mendoza", amount: "S/. 350.00", date: "05/04/2025", concept: "Mensualidad Abril", status: "pending", method: "Pendiente" },
            { id: "PAG005", student: "Joaquín Rojas", amount: "S/. 350.00", date: "03/04/2025", concept: "Mensualidad Abril", status: "completed", method: "Tarjeta de débito" },
            { id: "PAG006", student: "Valentina Castro", amount: "S/. 300.00", date: "02/04/2025", concept: "Mensualidad Abril", status: "completed", method: "Transferencia bancaria" }
        ],
        announcements: [
            { id: "COM001", title: "Cambio de horario para categoría Iniciación", date: "30/04/2025", content: "Se informa a todos los padres de familia de la categoría Iniciación Deportiva que a partir de la próxima semana, las clases de los lunes se adelantarán 30 minutos. El nuevo horario será de 14:30 a 16:00.", author: "Carlos Díaz", category: "announcement", image: "assets/announcement-1.jpg" },
            { id: "COM002", title: "Nuevo convenio con tienda deportiva", date: "28/04/2025", content: "Nos complace informar que hemos firmado un convenio con Deportes El Campeón. Todos nuestros alumnos tendrán un 15% de descuento en equipamiento deportivo presentando su carnet de la academia.", author: "Administración", category: "announcement", image: "assets/announcement-2.jpg" },
            { id: "COM003", title: "Felicitaciones a nuestro equipo Sub-12", date: "25/04/2025", content: "Extendemos nuestras felicitaciones al equipo Sub-12 por obtener el segundo lugar en el Torneo Regional Escolar. ¡Un gran logro que demuestra el esfuerzo y dedicación de nuestros alumnos!", author: "Laura Sánchez", category: "achievement", image: "assets/announcement-3.jpg" }
        ]
    },

    // Datos del entrenador
    trainer: {
        myClasses: [
            { id: "CLS001", name: "Iniciación Deportiva Grupo A", schedule: "Lunes y Miércoles, 15:00 - 16:30", students: 12, location: "Cancha 2", date: "Jueves, 1 de Mayo, 2025", time: "15:00 - 16:30", status: "upcoming" },
            { id: "CLS002", name: "Formación Técnica Grupo B", schedule: "Lunes y Miércoles, 17:00 - 18:30", students: 15, location: "Cancha principal", date: "Jueves, 1 de Mayo, 2025", time: "17:00 - 18:30", status: "upcoming" },
            { id: "CLS003", name: "Alto Rendimiento Grupo Único", schedule: "Martes y Jueves, 16:00 - 18:00", students: 10, location: "Cancha principal", date: "Viernes, 3 de Mayo, 2025", time: "16:00 - 18:00", status: "upcoming" }
        ],
        myStudents: [
            { id: "ALU2458", name: "Mateo Gómez", age: 10, program: "Formación Técnica", attendance: "95%", avatar: "assets/student-1.jpg", progress: { physical: 85, technical: 78, tactical: 65 } },
            { id: "ALU2459", name: "Sofía Medina", age: 6, program: "Iniciación Deportiva", attendance: "88%", avatar: "assets/student-2.jpg", progress: { physical: 70, technical: 65, tactical: 50 } },
            { id: "ALU2460", name: "Diego Torres", age: 14, program: "Alto Rendimiento", attendance: "98%", avatar: "assets/student-3.jpg", progress: { physical: 92, technical: 88, tactical: 85 } },
            { id: "ALU2461", name: "Lucía Mendoza", age: 9, program: "Formación Técnica", attendance: "75%", avatar: "assets/student-4.jpg", progress: { physical: 68, technical: 72, tactical: 60 } },
            { id: "ALU2462", name: "Joaquín Rojas", age: 12, program: "Formación Técnica", attendance: "90%", avatar: "assets/student-5.jpg", progress: { physical: 82, technical: 80, tactical: 75 } },
            { id: "ALU2463", name: "Valentina Castro", age: 7, program: "Iniciación Deportiva", attendance: "92%", avatar: "assets/student-6.jpg", progress: { physical: 75, technical: 70, tactical: 55 } }
        ],
        attendanceRecords: {
            "CLS001": {
                date: "01/05/2025",
                students: [
                    { id: "ALU2459", name: "Sofía Medina", status: "present" },
                    { id: "ALU2463", name: "Valentina Castro", status: "present" },
                    { id: "ALU2467", name: "Gabriel Morales", status: "absent" },
                    { id: "ALU2468", name: "Isabella Jiménez", status: "present" },
                    { id: "ALU2469", name: "Nicolás Silva", status: "late" },
                    { id: "ALU2470", name: "Emma Flores", status: "present" }
                ]
            },
            "CLS002": {
                date: "01/05/2025",
                students: [
                    { id: "ALU2458", name: "Mateo Gómez", status: "present" },
                    { id: "ALU2461", name: "Lucía Mendoza", status: "absent" },
                    { id: "ALU2462", name: "Joaquín Rojas", status: "present" },
                    { id: "ALU2465", name: "Camila Vargas", status: "present" },
                    { id: "ALU2471", name: "Emiliano Ruiz", status: "present" },
                    { id: "ALU2472", name: "Valeria Ortega", status: "late" }
                ]
            }
        },
        trainingPlans: [
            {
                id: "PLAN001",
                student: "Mateo Gómez",
                date: "01/05/2025",
                exercises: [
                    { name: "Calentamiento general", description: "5 minutos de trote suave y ejercicios de movilidad articular.", duration: "5 min", difficulty: "easy" },
                    { name: "Técnica de conducción", description: "Ejercicios de conducción del balón con ambos pies, alternando velocidad y cambios de dirección.", duration: "15 min", difficulty: "medium" },
                    { name: "Pases precisos", description: "Series de 20 pases con el interior del pie, alternando pierna izquierda y derecha, a una distancia de 5 metros.", duration: "10 min", difficulty: "medium" },
                    { name: "Ejercicio de definición", description: "15 tiros a portería desde el borde del área, alternando pie derecho e izquierdo.", duration: "15 min", difficulty: "hard" },
                    { name: "Estiramientos finales", description: "Estiramientos completos para evitar lesiones y mejorar la flexibilidad.", duration: "5 min", difficulty: "easy" }
                ],
                notes: "Enfocarse en mejorar la precisión en los pases y la técnica de conducción con el pie izquierdo."
            },
            {
                id: "PLAN002",
                student: "Diego Torres",
                date: "03/05/2025",
                exercises: [
                    { name: "Calentamiento específico", description: "10 minutos de ejercicios de activación con énfasis en tobillos y rodillas.", duration: "10 min", difficulty: "medium" },
                    { name: "Circuito de velocidad", description: "5 series de sprints cortos con cambios de dirección y obstáculos.", duration: "20 min", difficulty: "hard" },
                    { name: "Técnica de cabeceo", description: "Práctica de cabeceo ofensivo y defensivo con diferentes trayectorias de balón.", duration: "15 min", difficulty: "medium" },
                    { name: "Juego reducido 3vs3", description: "Partido en espacio reducido con reglas específicas para trabajar la presión y salida de balón.", duration: "25 min", difficulty: "hard" },
                    { name: "Recuperación activa", description: "Trote suave y estiramientos profundos.", duration: "10 min", difficulty: "easy" }
                ],
                notes: "Diego ha mostrado mejora en su capacidad aeróbica. Seguir trabajando en la técnica de cabeceo defensivo."
            }
        ],
        resources: [
            { id: "REC001", title: "Técnicas básicas de control de balón", type: "video", description: "Video demostrativo sobre las técnicas fundamentales para un buen control de balón.", category: "Técnica", date: "20/04/2025", size: "45 MB" },
            { id: "REC002", title: "Guía de ejercicios de calentamiento", type: "document", description: "Documento PDF con una serie de ejercicios recomendados para un calentamiento adecuado antes del entrenamiento.", category: "Preparación Física", date: "15/04/2025", size: "2.3 MB" },
            { id: "REC003", title: "Tácticas defensivas para categorías infantiles", type: "presentation", description: "Presentación con explicaciones y diagramas sobre tácticas defensivas adaptadas para niños.", category: "Táctica", date: "10/04/2025", size: "8.7 MB" },
            { id: "REC004", title: "Ejercicios de coordinación y agilidad", type: "video", description: "Video con una serie de ejercicios para mejorar la coordinación y agilidad en jóvenes futbolistas.", category: "Preparación Física", date: "05/04/2025", size: "38 MB" }
        ],
        events: [
            { id: "EVT001", name: "Torneo Interno de Categorías", date: "15/05/2025", time: "9:00 AM - 6:00 PM", location: "Cancha principal, Sede Central", status: "upcoming", image: "assets/event-1.jpg", description: "Torneo interno para todas las categorías de la academia. Se realizarán partidos entre los diferentes grupos para fomentar la competencia sana y evaluar el progreso de los alumnos.", participants: "8 equipos", organizer: "Carlos Díaz" },
            { id: "EVT002", name: "Entrenamiento Especial con Entrenador Invitado", date: "20/05/2025", time: "3:00 PM - 6:00 PM", location: "Cancha de entrenamiento", status: "upcoming", image: "assets/event-2.jpg", description: "Sesión especial de entrenamiento con Carlos Rodríguez, entrenador profesional con experiencia internacional. Se enfocarán en técnicas avanzadas de control de balón y tácticas de juego.", participants: "Alumnos de Formación Técnica y Alto Rendimiento", organizer: "Miguel Ángel Pérez" }
        ]
    },

    // Datos del alumno/padre
    student: {
        profile: {
            id: "ALU2458",
            name: "Miguel Torres Ramírez",
            age: 10,
            birthdate: "15/05/2014",
            category: "Formación Técnica",
            coach: "Carlos Díaz",
            joinDate: "10/01/2023",
            avatar: "assets/student-profile.jpg",
            attendance: "95%",
            parentName: "Roberto Torres",
            parentPhone: "+51 987 123 456",
            parentEmail: "roberto.torres@email.com",
            emergencyContact: "María Ramírez (Madre): +51 987 654 321"
        },
        schedule: [
            { day: "Lunes", time: "17:00 - 18:30", activity: "Entrenamiento Regular", location: "Cancha principal", coach: "Carlos Díaz" },
            { day: "Miércoles", time: "17:00 - 18:30", activity: "Entrenamiento Regular", location: "Cancha principal", coach: "Carlos Díaz" },
            { day: "Viernes", time: "16:00 - 17:30", activity: "Entrenamiento Físico", location: "Cancha 2 y Gimnasio", coach: "Laura Sánchez" }
        ],
        trainingPlan: {
            date: "Jueves, 1 de Mayo, 2025",
            exercises: [
                { name: "Calentamiento general", description: "5 minutos de trote suave y ejercicios de movilidad articular.", duration: "5 min", difficulty: "easy", completed: false },
                { name: "Técnica de conducción", description: "Ejercicios de conducción del balón con ambos pies, alternando velocidad y cambios de dirección.", duration: "15 min", difficulty: "medium", completed: false },
                { name: "Pases precisos", description: "Series de 20 pases con el interior del pie, alternando pierna izquierda y derecha, a una distancia de 5 metros.", duration: "10 min", difficulty: "medium", completed: false },
                { name: "Ejercicio de definición", description: "15 tiros a portería desde el borde del área, alternando pie derecho e izquierdo.", duration: "15 min", difficulty: "hard", completed: false },
                { name: "Estiramientos finales", description: "Estiramientos completos para evitar lesiones y mejorar la flexibilidad.", duration: "5 min", difficulty: "easy", completed: false }
            ],
            completionPercentage: 0,
            notes: "Enfocarse en mejorar la precisión en los pases y la técnica de conducción con el pie izquierdo."
        },
        progress: [
            { month: "Enero", physical: 65, technical: 60, tactical: 50 },
            { month: "Febrero", physical: 70, technical: 65, tactical: 55 },
            { month: "Marzo", physical: 75, technical: 70, tactical: 60 },
            { month: "Abril", physical: 80, technical: 75, tactical: 65 }
        ],
        attendance: [
            { date: "01/04/2025", status: "present" },
            { date: "03/04/2025", status: "present" },
            { date: "05/04/2025", status: "present" },
            { date: "08/04/2025", status: "absent" },
            { date: "10/04/2025", status: "present" },
            { date: "12/04/2025", status: "present" },
            { date: "15/04/2025", status: "present" },
            { date: "17/04/2025", status: "late" },
            { date: "19/04/2025", status: "present" },
            { date: "22/04/2025", status: "present" },
            { date: "24/04/2025", status: "present" },
            { date: "26/04/2025", status: "present" },
            { date: "29/04/2025", status: "present" }
        ],
        payments: [
            { id: "PAG001", date: "01/01/2025", concept: "Mensualidad Enero", amount: "S/. 350.00", status: "completed", method: "Tarjeta de crédito" },
            { id: "PAG002", date: "01/02/2025", concept: "Mensualidad Febrero", amount: "S/. 350.00", status: "completed", method: "Transferencia bancaria" },
            { id: "PAG003", date: "01/03/2025", concept: "Mensualidad Marzo", amount: "S/. 350.00", status: "completed", method: "Tarjeta de crédito" },
            { id: "PAG004", date: "01/04/2025", concept: "Mensualidad Abril", amount: "S/. 350.00", status: "completed", method: "Tarjeta de crédito" },
            { id: "PAG005", date: "01/05/2025", concept: "Mensualidad Mayo", amount: "S/. 350.00", status: "pending", method: "Pendiente" }
        ],
        events: [
            { id: "EVT001", name: "Torneo Interno de Categorías", date: "15/05/2025", time: "9:00 AM - 6:00 PM", location: "Cancha principal, Sede Central", status: "upcoming", image: "assets/event-1.jpg", description: "Torneo interno para todas las categorías de la academia. Se realizarán partidos entre los diferentes grupos para fomentar la competencia sana y evaluar el progreso de los alumnos.", participants: "8 equipos" },
            { id: "EVT002", name: "Entrenamiento Especial con Entrenador Invitado", date: "20/05/2025", time: "3:00 PM - 6:00 PM", location: "Cancha de entrenamiento", status: "upcoming", image: "assets/event-2.jpg", description: "Sesión especial de entrenamiento con Carlos Rodríguez, entrenador profesional con experiencia internacional. Se enfocarán en técnicas avanzadas de control de balón y tácticas de juego.", participants: "Alumnos de Formación Técnica y Alto Rendimiento" }
        ],
        resources: [
            { id: "REC001", title: "Técnicas básicas de control de balón", type: "video", description: "Video demostrativo sobre las técnicas fundamentales para un buen control de balón.", category: "Técnica", date: "20/04/2025", size: "45 MB" },
            { id: "REC002", title: "Guía de ejercicios de calentamiento", type: "document", description: "Documento PDF con una serie de ejercicios recomendados para un calentamiento adecuado antes del entrenamiento.", category: "Preparación Física", date: "15/04/2025", size: "2.3 MB" },
            { id: "REC003", title: "Tácticas defensivas para categorías infantiles", type: "presentation", description: "Presentación con explicaciones y diagramas sobre tácticas defensivas adaptadas para niños.", category: "Táctica", date: "10/04/2025", size: "8.7 MB" }
        ],
        coachComments: [
            { id: "COM001", date: "28/04/2025", coach: "Carlos Díaz", comment: "Miguel está mostrando un gran progreso en su técnica de conducción. Necesita trabajar más en la precisión de los pases largos, pero su actitud es excelente y está muy comprometido con su entrenamiento." },
            { id: "COM002", date: "21/04/2025", coach: "Carlos Díaz", comment: "Excelente participación en el entrenamiento táctico de hoy. Miguel mostró buena comprensión de los conceptos de posicionamiento defensivo y está mejorando su comunicación con los compañeros durante los ejercicios de equipo." },
            { id: "COM003", date: "14/04/2025", coach: "Laura Sánchez", comment: "Durante el entrenamiento físico, Miguel demostró buena resistencia en los ejercicios de intervalos. Se recomienda trabajar un poco más en ejercicios de fuerza para las extremidades inferiores." }
        ]
    }
};

// Credenciales de usuarios
const users = {
    admin: {
        email: "admin@campeonesdelfuturo.pe",
        password: "admin123",
        name: "Administrador",
        type: "admin"
    },
    trainer: {
        email: "entrenador@campeonesdelfuturo.pe",
        password: "entrenador123",
        name: "Carlos Díaz",
        type: "trainer"
    },
    student: {
        email: "alumno@campeonesdelfuturo.pe",
        password: "alumno123",
        name: "Roberto Torres (Padre)",
        type: "student"
    }
};

// Función que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    // Eventos del login/register
    setupLoginRegisterTabs();
    setupFormSubmissions();
    setupModalClose();
    setupSlider();

    // Evento para volver de la sección de login a la landing page
    document.querySelector('.btn-back-to-site').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.login-section').style.display = 'none';
        document.querySelector('.info-section').style.flexBasis = '100%';
    });

    // Evento para ir a la sección de login desde la landing page
    document.getElementById('loginBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.login-section').style.display = 'flex';
        if (window.innerWidth > 1200) {
            document.querySelector('.info-section').style.flexBasis = 'calc(100% - 450px)';
        }
    });

    // Si hay un usuario ya logueado en localStorage, iniciar sesión automáticamente
    checkLoggedInUser();
}

/**
 * Configura las pestañas de login y registro
 */
function setupLoginRegisterTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover la clase active de todos los botones y formularios
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
            
            // Activar la pestaña actual
            this.classList.add('active');
            
            // Mostrar el formulario correspondiente
            const formId = this.getAttribute('data-tab') + 'Form';
            document.getElementById(formId).classList.add('active');
        });
    });
}

/**
 * Configura los envíos de formularios
 */
function setupFormSubmissions() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;
        
        // Verificar las credenciales según el tipo de usuario
        let isAuthenticated = false;

        if (userType === 'admin' && email === users.admin.email && password === users.admin.password) {
            isAuthenticated = true;
            currentUser = users.admin;
        } else if (userType === 'trainer' && email === users.trainer.email && password === users.trainer.password) {
            isAuthenticated = true;
            currentUser = users.trainer;
        } else if (userType === 'student' && email === users.student.email && password === users.student.password) {
            isAuthenticated = true;
            currentUser = users.student;
        } else if (email && password) {
            // Para demostración, permitir cualquier correo/contraseña si no coincide con los predefinidos
            isAuthenticated = true;
            currentUser = {
                email: email,
                type: userType,
                name: userType === 'admin' ? 'Administrador' : (userType === 'trainer' ? 'Entrenador' : 'Alumno/Padre')
            };
        } else {
            showModal('Error de inicio de sesión', 'Por favor, introduce un correo electrónico y contraseña válidos.', 'error');
            return;
        }
        
        if (isAuthenticated) {
            currentUserType = userType;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Mostrar mensaje de bienvenida
            showModal('Bienvenido', `Has iniciado sesión como ${currentUser.name}`, 'success');
            
            // Cargar el dashboard correspondiente
            setTimeout(() => {
                loadDashboard(userType);
            }, 1500);
        } else {
            showModal('Error de inicio de sesión', 'Credenciales incorrectas. Por favor, verifica tus datos.', 'error');
        }
    });
    
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            showModal('Error de registro', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.', 'error');
            return;
        }
        
        // Simular un registro exitoso
        showModal('Registro exitoso', 'Te hemos enviado un correo electrónico para confirmar tu cuenta. Por favor, revisa tu bandeja de entrada.', 'success');
        
        // Limpiar el formulario y volver a la pestaña de login
        registerForm.reset();
        document.querySelector('[data-tab="login"]').click();
    });
}

/**
 * Cierra el modal cuando se hace clic en el botón de cierre o en el botón de aceptar
 */
function setupModalClose() {
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    closeModal.addEventListener('click', function() {
        document.getElementById('modalMessage').classList.remove('active');
    });
    
    modalBtn.addEventListener('click', function() {
        document.getElementById('modalMessage').classList.remove('active');
    });
}

/**
 * Configura el slider de imágenes
 */
function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Cambiar de slide cada 5 segundos
    setInterval(function() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

/**
 * Muestra un modal con un mensaje
 * @param {string} title - El título del modal
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de mensaje ('success', 'warning', 'error')
 */
function showModal(title, message, type = 'success') {
    const modal = document.getElementById('modalMessage');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalIcon = document.querySelector('.modal-icon');
    
    modalTitle.textContent = title;
    modalText.textContent = message;
    
    // Cambiar la clase del icono según el tipo de mensaje
    modalIcon.classList.remove('success', 'warning', 'error');
    modalIcon.classList.add(type);
    
    // Cambiar el icono según el tipo
    if (type === 'success') {
        modalIcon.className = 'fas fa-check-circle modal-icon success';
    } else if (type === 'warning') {
        modalIcon.className = 'fas fa-exclamation-triangle modal-icon warning';
    } else if (type === 'error') {
        modalIcon.className = 'fas fa-times-circle modal-icon error';
    }
    
    // Mostrar el modal
    modal.classList.add('active');
}

/**
 * Muestra una notificación tipo toast
 * @param {string} title - El título de la notificación
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de notificación ('success', 'warning', 'error', 'info')
 */
function showNotification(title, message, type = 'success') {
    // Crear la notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Crear el contenido de la notificación
    let iconClass = '';
    if (type === 'success') {
        iconClass = 'fa-check-circle';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
    } else if (type === 'error') {
        iconClass = 'fa-times-circle';
    } else if (type === 'info') {
        iconClass = 'fa-info-circle';
    }
    
    notification.innerHTML = `
        <div class="notification-icon ${type}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Agregar la notificación al cuerpo del documento
    document.body.appendChild(notification);
    
    // Mostrar la notificación con una pequeña animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Configurar el evento para cerrar la notificación
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Verifica si hay un usuario ya logueado en localStorage
 */
function checkLoggedInUser() {
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        currentUser = user;
        currentUserType = user.type;
        
        // Cargar directamente el dashboard
        loadDashboard(user.type);
    }
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    // Eliminar el usuario de localStorage
    localStorage.removeItem('currentUser');
    
    // Resetear variables globales
    currentUser = null;
    currentUserType = null;
    
    // Ocultar dashboard y mostrar la landing page
    document.getElementById('dashboard').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    
    // Mostrar mensaje de despedida
    showModal('Sesión cerrada', 'Has cerrado sesión correctamente', 'success');
}

/**
 * Carga el dashboard correspondiente al tipo de usuario
 * @param {string} userType - El tipo de usuario ('admin', 'trainer', 'student')
 */
function loadDashboard(userType) {
    // Ocultar la landing page
    document.querySelector('.container').style.display = 'none';
    
    // Mostrar el dashboard
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    
    // Cargar el contenido según el tipo de usuario
    if (userType === 'admin') {
        loadAdminDashboard();
    } else if (userType === 'trainer') {
        loadTrainerDashboard();
    } else {
        loadStudentDashboard();
    }
}

/***********************************
 * DASHBOARD DEL ADMINISTRADOR
 ***********************************/

/**
 * Carga el dashboard de administrador
 */
function loadAdminDashboard() {
    const dashboard = document.getElementById('dashboard');
    
    // HTML del dashboard de administrador
    dashboard.innerHTML = `
        <div class="admin-dashboard">
            <div class="sidebar">
                <div class="sidebar-header">
                    <img src="assets/logo.png" alt="Logo">
                    <h3>Campeones del Futuro</h3>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Panel de control</div>
                    <ul>
                        <li><a href="#" class="active" data-section="overview"><i class="fas fa-th-large"></i> Vista general</a></li>
                        <li><a href="#" data-section="students"><i class="fas fa-user-graduate"></i> Alumnos</a></li>
                        <li><a href="#" data-section="trainers"><i class="fas fa-user-tie"></i> Entrenadores</a></li>
                        <li><a href="#" data-section="classes"><i class="fas fa-calendar-alt"></i> Clases</a></li>
                        <li><a href="#" data-section="events"><i class="fas fa-trophy"></i> Eventos y torneos</a></li>
                        <li><a href="#" data-section="payments"><i class="fas fa-credit-card"></i> Pagos</a></li>
                        <li><a href="#" data-section="reports"><i class="fas fa-chart-bar"></i> Reportes</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Gestión</div>
                    <ul>
                        <li><a href="#" data-section="courses"><i class="fas fa-book"></i> Cursos y programas</a></li>
                        <li><a href="#" data-section="resources"><i class="fas fa-folder"></i> Recursos</a></li>
                        <li><a href="#" data-section="announcements"><i class="fas fa-bullhorn"></i> Comunicados</a></li>
                        <li><a href="#" data-section="settings"><i class="fas fa-cog"></i> Configuración</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-footer">
                    <div class="user-info">
                        <div class="user-avatar">
                            <img src="assets/admin-avatar.jpg" alt="Administrador">
                        </div>
                        <div class="user-details">
                            <h4>${currentUser.name}</h4>
                            <p>Administrador</p>
                        </div>
                    </div>
                    <a href="#" id="logoutBtn" class="btn btn-block btn-secondary" style="margin-top: 1rem;">Cerrar sesión</a>
                </div>
            </div>
            
            <div class="main-content">
                <div class="topbar">
                    <button class="toggle-sidebar"><i class="fas fa-bars"></i></button>
                    
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="admin-search" placeholder="Buscar...">
                    </div>
                    
                    <div class="user-actions">
                        <div class="action-icon" id="admin-notifications">
                            <i class="fas fa-bell"></i>
                            <span class="badge">3</span>
                        </div>
                        <div class="action-icon" id="admin-messages">
                            <i class="fas fa-envelope"></i>
                            <span class="badge">5</span>
                        </div>
                    </div>
                </div>
                
                <div id="overview" class="dashboard-section active">
                    <h2>Vista general</h2>
                    
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-icon blue">
                                <i class="fas fa-user-graduate"></i>
                            </div>
                            <div class="card-title">Total de alumnos</div>
                            <div class="card-value">245</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 12% </span> vs. mes anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon orange">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="card-title">Entrenadores</div>
                            <div class="card-value">18</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 2 </span> nuevos este mes
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon green">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div class="card-title">Ingresos (mes)</div>
                            <div class="card-value">S/. 48,560</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 8% </span> vs. mes anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon red">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="card-title">Asistencia</div>
                            <div class="card-value">92%</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 3% </span> vs. mes anterior
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Últimas inscripciones</h3>
                            <a href="#" class="btn btn-primary" id="admin-view-all-students">Ver todos</a>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Alumno</th>
                                            <th>Programa</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="admin-students-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="pagination">
                                <a href="#" class="pagination-link"><i class="fas fa-chevron-left"></i></a>
                                <a href="#" class="pagination-link active">1</a>
                                <a href="#" class="pagination-link">2</a>
                                <a href="#" class="pagination-link">3</a>
                                <a href="#" class="pagination-link"><i class="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Próximos eventos</h3>
                            <a href="#" class="btn btn-primary" id="admin-view-all-events">Ver todos</a>
                        </div>
                        <div class="card-body">
                            <div class="events-container" id="admin-events-container">
                                <!-- Se cargará dinámicamente -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Alumnos -->
                <div id="students" class="dashboard-section">
                    <div class="section-header">
                        <h2>Gestión de Alumnos</h2>
                        <button class="btn btn-primary" id="add-student-btn">
                            <i class="fas fa-plus"></i> Nuevo Alumno
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="students-search" placeholder="Buscar alumno...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="program-filter">
                                <option value="">Todos los programas</option>
                                <option value="Iniciación Deportiva">Iniciación Deportiva</option>
                                <option value="Formación Técnica">Formación Técnica</option>
                                <option value="Alto Rendimiento">Alto Rendimiento</option>
                            </select>
                            
                            <select id="status-filter">
                                <option value="">Todos los estados</option>
                                <option value="active">Activo</option>
                                <option value="pending">Pendiente</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="students-grid" id="students-grid">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Entrenadores -->
                <div id="trainers" class="dashboard-section">
                    <div class="section-header">
                        <h2>Gestión de Entrenadores</h2>
                        <button class="btn btn-primary" id="add-trainer-btn">
                            <i class="fas fa-plus"></i> Nuevo Entrenador
                        </button>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Lista de Entrenadores</h3>
                            <div class="card-actions">
                                <div class="search-bar">
                                    <i class="fas fa-search"></i>
                                    <input type="text" placeholder="Buscar entrenador...">
                                </div>
                                <select id="trainer-status-filter">
                                    <option value="">Todos los estados</option>
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Entrenador</th>
                                            <th>Especialidad</th>
                                            <th>Alumnos</th>
                                            <th>Clases</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="trainers-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Clases -->
                <div id="classes" class="dashboard-section">
                    <div class="section-header">
                        <h2>Gestión de Clases</h2>
                        <button class="btn btn-primary" id="add-class-btn">
                            <i class="fas fa-plus"></i> Nueva Clase
                        </button>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Lista de Clases</h3>
                            <div class="card-actions">
                                <div class="search-bar">
                                    <i class="fas fa-search"></i>
                                    <input type="text" placeholder="Buscar clase...">
                                </div>
                                <select id="class-program-filter">
                                    <option value="">Todos los programas</option>
                                    <option value="Iniciación Deportiva">Iniciación Deportiva</option>
                                    <option value="Formación Técnica">Formación Técnica</option>
                                    <option value="Alto Rendimiento">Alto Rendimiento</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Clase</th>
                                            <th>Entrenador</th>
                                            <th>Horario</th>
                                            <th>Alumnos</th>
                                            <th>Ubicación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="classes-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Eventos y Torneos -->
                <div id="events" class="dashboard-section">
                    <div class="section-header">
                        <h2>Eventos y Torneos</h2>
                        <button class="btn btn-primary" id="add-event-btn">
                            <i class="fas fa-plus"></i> Nuevo Evento
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar evento...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="event-status-filter">
                                <option value="">Todos los estados</option>
                                <option value="upcoming">Próximos</option>
                                <option value="in-progress">En curso</option>
                                <option value="completed">Completados</option>
                            </select>
                            
                            <select id="event-type-filter">
                                <option value="">Todos los tipos</option>
                                <option value="tournament">Torneo</option>
                                <option value="training">Entrenamiento</option>
                                <option value="festival">Festival</option>
                                <option value="evaluation">Evaluación</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="events-container" id="events-container">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Pagos -->
                <div id="payments" class="dashboard-section">
                    <div class="section-header">
                        <h2>Gestión de Pagos</h2>
                        <button class="btn btn-primary" id="add-payment-btn">
                            <i class="fas fa-plus"></i> Registrar Pago
                        </button>
                    </div>
                    
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-icon blue">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div class="card-title">Ingresos del mes</div>
                            <div class="card-value">S/. 48,560</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 8% </span> vs. mes anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon green">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="card-title">Pagos completados</div>
                            <div class="card-value">218</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 5% </span> vs. mes anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon orange">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="card-title">Pagos pendientes</div>
                            <div class="card-value">27</div>
                            <div class="card-stats">
                                <span class="stats-negative"><i class="fas fa-arrow-up"></i> 3 </span> vs. mes anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon red">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="card-title">Pagos atrasados</div>
                            <div class="card-value">8</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-down"></i> 2 </span> vs. mes anterior
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Últimos Pagos</h3>
                            <div class="card-actions">
                                <select id="payment-month-filter">
                                    <option value="04">Abril 2025</option>
                                    <option value="03">Marzo 2025</option>
                                    <option value="02">Febrero 2025</option>
                                    <option value="01">Enero 2025</option>
                                </select>
                                <select id="payment-status-filter">
                                    <option value="">Todos los estados</option>
                                    <option value="completed">Completados</option>
                                    <option value="pending">Pendientes</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Alumno</th>
                                            <th>Concepto</th>
                                            <th>Monto</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Método</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="payments-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Reportes -->
                <div id="reports" class="dashboard-section">
                    <h2>Reportes y Estadísticas</h2>
                    
                    <div class="tabs-container">
                        <div class="tabs-nav">
                            <div class="tab-item active" data-tab="income-tab">Ingresos</div>
                            <div class="tab-item" data-tab="attendance-tab">Asistencia</div>
                            <div class="tab-item" data-tab="students-tab">Alumnos</div>
                            <div class="tab-item" data-tab="performance-tab">Rendimiento</div>
                        </div>
                        
                        <div class="tab-content active" id="income-tab">
                            <div class="chart-container">
                                <h3>Ingresos mensuales (2025)</h3>
                                <div class="chart" id="income-chart">
                                    <!-- Aquí iría el gráfico de ingresos -->
                                    <div style="width: 100%; height: 300px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center;">
                                        <span style="color: #6c757d;">Aquí se mostraría el gráfico de ingresos mensuales</span>
                                    </div>
                                </div>
                                
                                <div class="dashboard-main-card" style="margin-top: 1.5rem;">
                                    <div class="card-header">
                                        <h3>Detalle de ingresos por programa</h3>
                                        <select id="income-year-filter">
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                        </select>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Programa</th>
                                                        <th>Ene</th>
                                                        <th>Feb</th>
                                                        <th>Mar</th>
                                                        <th>Abr</th>
                                                        <th>May</th>
                                                        <th>Jun</th>
                                                        <th>Jul</th>
                                                        <th>Ago</th>
                                                        <th>Sep</th>
                                                        <th>Oct</th>
                                                        <th>Nov</th>
                                                        <th>Dic</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Iniciación Deportiva</strong></td>
                                                        <td>S/. 9,000</td>
                                                        <td>S/. 9,300</td>
                                                        <td>S/. 9,300</td>
                                                        <td>S/. 9,600</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td><strong>S/. 37,200</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Formación Técnica</strong></td>
                                                        <td>S/. 14,000</td>
                                                        <td>S/. 14,350</td>
                                                        <td>S/. 14,700</td>
                                                        <td>S/. 15,400</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td><strong>S/. 58,450</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Alto Rendimiento</strong></td>
                                                        <td>S/. 10,800</td>
                                                        <td>S/. 10,800</td>
                                                        <td>S/. 11,200</td>
                                                        <td>S/. 12,000</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td><strong>S/. 44,800</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Eventos Especiales</strong></td>
                                                        <td>S/. 2,500</td>
                                                        <td>S/. 1,800</td>
                                                        <td>S/. 3,200</td>
                                                        <td>S/. 2,800</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td><strong>S/. 10,300</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Total</strong></td>
                                                        <td><strong>S/. 36,300</strong></td>
                                                        <td><strong>S/. 36,250</strong></td>
                                                        <td><strong>S/. 38,400</strong></td>
                                                        <td><strong>S/. 39,800</strong></td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td><strong>S/. 150,750</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-content" id="attendance-tab">
                                <div class="chart-container">
                                    <h3>Porcentaje de asistencia por programa</h3>
                                    <div class="chart" id="attendance-chart">
                                        <div style="width: 100%; height: 300px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: #6c757d;">Aquí se mostraría el gráfico de asistencia</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="dashboard-main-card" style="margin-top: 1.5rem;">
                                    <div class="card-header">
                                        <h3>Asistencia por clase</h3>
                                        <select id="attendance-month-filter">
                                            <option value="04">Abril 2025</option>
                                            <option value="03">Marzo 2025</option>
                                            <option value="02">Febrero 2025</option>
                                            <option value="01">Enero 2025</option>
                                        </select>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Clase</th>
                                                        <th>Programa</th>
                                                        <th>Entrenador</th>
                                                        <th>Alumnos</th>
                                                        <th>Asistencia</th>
                                                        <th>Tendencia</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Iniciación Deportiva Grupo A</td>
                                                        <td>Iniciación Deportiva</td>
                                                        <td>Laura Sánchez</td>
                                                        <td>12</td>
                                                        <td>92%</td>
                                                        <td><span class="stats-positive"><i class="fas fa-arrow-up"></i> 2%</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Formación Técnica Grupo B</td>
                                                        <td>Formación Técnica</td>
                                                        <td>Carlos Díaz</td>
                                                        <td>15</td>
                                                        <td>95%</td>
                                                        <td><span class="stats-positive"><i class="fas fa-arrow-up"></i> 3%</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alto Rendimiento Grupo Único</td>
                                                        <td>Alto Rendimiento</td>
                                                        <td>Miguel Ángel Pérez</td>
                                                        <td>10</td>
                                                        <td>98%</td>
                                                        <td><span class="stats-positive"><i class="fas fa-arrow-up"></i> 1%</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Iniciación Deportiva Grupo B</td>
                                                        <td>Iniciación Deportiva</td>
                                                        <td>Laura Sánchez</td>
                                                        <td>14</td>
                                                        <td>88%</td>
                                                        <td><span class="stats-negative"><i class="fas fa-arrow-down"></i> 2%</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Formación Técnica Grupo A</td>
                                                        <td>Formación Técnica</td>
                                                        <td>Carlos Díaz</td>
                                                        <td>16</td>
                                                        <td>93%</td>
                                                        <td><span class="stats-positive"><i class="fas fa-arrow-up"></i> 1%</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tab-content" id="students-tab">
                                <!-- Contenido de la pestaña de Alumnos -->
                            </div>
                            
                            <div class="tab-content" id="performance-tab">
                                <!-- Contenido de la pestaña de Rendimiento -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Cursos y Programas -->
                <div id="courses" class="dashboard-section">
                    <div class="section-header">
                        <h2>Cursos y Programas</h2>
                        <button class="btn btn-primary" id="add-course-btn">
                            <i class="fas fa-plus"></i> Nuevo Programa
                        </button>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Programas Activos</h3>
                        </div>
                        <div class="card-body">
                            <div class="programs-grid">
                                <div class="program-card">
                                    <div class="program-image">
                                        <img src="assets/program-1.jpg" alt="Iniciación Deportiva">
                                    </div>
                                    <div class="program-content">
                                        <h3>Iniciación Deportiva</h3>
                                        <p>Edades: 5-7 años</p>
                                        <p>Alumnos actuales: 58</p>
                                        <p>Precio mensual: S/. 300.00</p>
                                        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                                            <button class="btn btn-secondary btn-sm">Ver detalles</button>
                                            <button class="btn btn-primary btn-sm">Editar</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="program-card">
                                    <div class="program-image">
                                        <img src="assets/program-2.jpg" alt="Formación Técnica">
                                    </div>
                                    <div class="program-content">
                                        <h3>Formación Técnica</h3>
                                        <p>Edades: 8-12 años</p>
                                        <p>Alumnos actuales: 112</p>
                                        <p>Precio mensual: S/. 350.00</p>
                                        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                                            <button class="btn btn-secondary btn-sm">Ver detalles</button>
                                            <button class="btn btn-primary btn-sm">Editar</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="program-card">
                                    <div class="program-image">
                                        <img src="assets/program-3.jpg" alt="Alto Rendimiento">
                                    </div>
                                    <div class="program-content">
                                        <h3>Alto Rendimiento</h3>
                                        <p>Edades: 13-17 años</p>
                                        <p>Alumnos actuales: 75</p>
                                        <p>Precio mensual: S/. 400.00</p>
                                        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                                            <button class="btn btn-secondary btn-sm">Ver detalles</button>
                                            <button class="btn btn-primary btn-sm">Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Recursos -->
                <div id="resources" class="dashboard-section">
                    <div class="section-header">
                        <h2>Recursos</h2>
                        <button class="btn btn-primary" id="add-resource-btn">
                            <i class="fas fa-plus"></i> Nuevo Recurso
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar recurso...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="resource-type-filter">
                                <option value="">Todos los tipos</option>
                                <option value="document">Documentos</option>
                                <option value="video">Videos</option>
                                <option value="presentation">Presentaciones</option>
                                <option value="exercise">Ejercicios</option>
                            </select>
                            
                            <select id="resource-category-filter">
                                <option value="">Todas las categorías</option>
                                <option value="Técnica">Técnica</option>
                                <option value="Táctica">Táctica</option>
                                <option value="Preparación Física">Preparación Física</option>
                                <option value="Psicología">Psicología</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="resources-container" id="resources-container">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Comunicados -->
                <div id="announcements" class="dashboard-section">
                    <div class="section-header">
                        <h2>Comunicados</h2>
                        <button class="btn btn-primary" id="add-announcement-btn">
                            <i class="fas fa-plus"></i> Nuevo Comunicado
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar comunicado...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="announcement-category-filter">
                                <option value="">Todas las categorías</option>
                                <option value="announcement">Anuncios</option>
                                <option value="achievement">Logros</option>
                                <option value="news">Noticias</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="news-container" id="announcements-container">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Configuración -->
                <div id="settings" class="dashboard-section">
                    <h2>Configuración</h2>
                    
                    <div class="tabs-container">
                        <div class="tabs-nav">
                            <div class="tab-item active" data-tab="account-settings">Cuenta</div>
                            <div class="tab-item" data-tab="general-settings">General</div>
                            <div class="tab-item" data-tab="notifications-settings">Notificaciones</div>
                            <div class="tab-item" data-tab="security-settings">Seguridad</div>
                        </div>
                        
                        <div class="tab-content active" id="account-settings">
                            <div class="dashboard-main-card">
                                <div class="card-header">
                                    <h3>Información de cuenta</h3>
                                </div>
                                <div class="card-body">
                                    <form id="account-form">
                                        <div class="form-grid">
                                            <div class="form-group">
                                                <label for="account-name">Nombre completo</label>
                                                <input type="text" id="account-name" value="Administrador" required>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label for="account-email">Correo electrónico</label>
                                                <input type="email" id="account-email" value="admin@campeonesdelfuturo.pe" required>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label for="account-phone">Teléfono</label>
                                                <input type="tel" id="account-phone" value="+51 987 654 321">
                                            </div>
                                            
                                            <div class="form-group">
                                                <label for="account-position">Cargo</label>
                                                <input type="text" id="account-position" value="Administrador del Sistema">
                                            </div>
                                            
                                            <div class="form-group full-width">
                                                <label>Foto de perfil</label>
                                                <div style="display: flex; align-items: center; gap: 1rem;">
                                                    <div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden;">
                                                        <img src="assets/admin-avatar.jpg" alt="Perfil" style="width: 100%; height: 100%; object-fit: cover;">
                                                    </div>
                                                    <div>
                                                        <button type="button" class="btn btn-secondary">Cambiar foto</button>
                                                        <p style="font-size: 0.9rem; color: #6c757d; margin-top: 0.5rem;">Formato JPG, PNG. Máximo 2MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-actions">
                                                <button type="button" class="btn btn-cancel">Cancelar</button>
                                                <button type="submit" class="btn btn-primary">Guardar cambios</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="general-settings">
                            <!-- Configuración general -->
                        </div>
                        
                        <div class="tab-content" id="notifications-settings">
                            <!-- Configuración de notificaciones -->
                        </div>
                        
                        <div class="tab-content" id="security-settings">
                            <!-- Configuración de seguridad -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurar los eventos del dashboard
    setupAdminDashboardEvents();
    loadAdminDashboardData();
}

/**
 * Configura los eventos del dashboard de administrador
 */
function setupAdminDashboardEvents() {
    // Manejar el botón de logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Manejar la navegación entre secciones
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Quitar la clase active de todos los links
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar la clase active al link actual
            this.classList.add('active');
            
            // Obtener la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Mostrar la sección seleccionada
            const currentSection = document.getElementById(sectionId);
            if (currentSection) {
                currentSection.classList.add('active');
                currentSection.style.display = 'block';
            }
        });
    });
    
    // Manejar el toggle del sidebar
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '80px';
            document.querySelector('.main-content').style.marginLeft = '80px';
        } else {
            sidebar.style.width = '260px';
            document.querySelector('.main-content').style.marginLeft = '260px';
        }
    });

    // Manejar notificaciones y mensajes
    document.getElementById('admin-notifications').addEventListener('click', function() {
        showNotification('Notificaciones', 'Tienes 3 notificaciones sin leer', 'info');
    });

    document.getElementById('admin-messages').addEventListener('click', function() {
        showNotification('Mensajes', 'Tienes 5 mensajes sin leer', 'info');
    });

    // Manejar el botón "Ver todos" de la sección de estudiantes
    document.getElementById('admin-view-all-students').addEventListener('click', function(e) {
        e.preventDefault();
        // Activar la sección de estudiantes
        document.querySelector('.sidebar-menu a[data-section="students"]').click();
    });

    // Manejar el botón "Ver todos" de la sección de eventos
    document.getElementById('admin-view-all-events').addEventListener('click', function(e) {
        e.preventDefault();
        // Activar la sección de eventos
        document.querySelector('.sidebar-menu a[data-section="events"]').click();
    });

    // Manejar la búsqueda en el dashboard
    document.getElementById('admin-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                showNotification('Búsqueda', `Buscando: "${searchTerm}"`, 'info');
                // Aquí iría la lógica de búsqueda real
            }
        }
    });

    // Configurar las pestañas de reportes
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Quitar la clase active de todas las pestañas
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Activar la pestaña actual
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Manejar botones de añadir
    const addButtons = document.querySelectorAll('[id$="-btn"]');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.id.replace('-btn', '');
            showModal('Añadir nuevo', `Formulario para añadir ${action.replace('add-', '')}`, 'info');
        });
    });

    // Manejar formulario de configuración de cuenta
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Configuración', 'Cambios guardados correctamente', 'success');
        });
    }
}

/**
 * Carga los datos para el dashboard de administrador
 */
function loadAdminDashboardData() {
    // Cargar la tabla de estudiantes en la vista general
    const studentsTable = document.getElementById('admin-students-table');
    if (studentsTable) {
        let html = '';
        appData.admin.students.slice(0, 4).forEach(student => {
            html += `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; overflow: hidden; margin-right: 10px;">
                                <img src="${student.avatar}" alt="${student.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div>
                                <div style="font-weight: 600;">${student.name}</div>
                                <div style="font-size: 0.85rem; color: #6c757d;">ID: ${student.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>${student.program}</td>
                    <td>${student.registrationDate}</td>
                    <td><span class="status ${student.status}">${student.status === 'active' ? 'Activo' : (student.status === 'pending' ? 'Pendiente' : 'Inactivo')}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-view" data-student-id="${student.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action btn-edit" data-student-id="${student.id}"><i class="fas fa-pen"></i></button>
                            <button class="btn-action btn-delete" data-student-id="${student.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        studentsTable.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = this.getAttribute('data-student-id');
                showModal('Detalles del alumno', `Ver detalles del alumno con ID: ${studentId}`, 'info');
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = this.getAttribute('data-student-id');
                showModal('Editar alumno', `Editar información del alumno con ID: ${studentId}`, 'info');
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = this.getAttribute('data-student-id');
                showModal('Eliminar alumno', `¿Está seguro que desea eliminar al alumno con ID: ${studentId}?`, 'warning');
            });
        });
    }

    // Cargar los eventos en la vista general
    const adminEventsContainer = document.getElementById('admin-events-container');
    if (eventsContainer) {
        let html = '';
        appData.admin.events.slice(0, 2).forEach(event => {
            html += `
                <div class="event-card">
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.name}">
                        <div class="event-date">
                            <div class="event-day">${event.date.split('/')[0]}</div>
                            <div class="event-month">${getMonthAbbr(event.date.split('/')[1])}</div>
                        </div>
                    </div>
                    <div class="event-content">
                        <h4 class="event-title">${event.name}</h4>
                        <div class="event-info">
                            <div class="event-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-users"></i>
                                <span>${event.participants}</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-footer">
                        <span class="event-status ${event.status}">${event.status === 'upcoming' ? 'Próximo' : (event.status === 'in-progress' ? 'En curso' : 'Completado')}</span>
                        <a href="#" class="btn-read-more" data-event-id="${event.id}">Detalles <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        eventsContainer.innerHTML = html;

        // Agregar event listeners a los enlaces de detalles
        document.querySelectorAll('.btn-read-more').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const eventId = this.getAttribute('data-event-id');
                const event = appData.admin.events.find(e => e.id === eventId);
                if (event) {
                    showModal(event.name, event.description, 'info');
                }
            });
        });
    }

    // Cargar la lista completa de estudiantes en la sección de estudiantes
    const studentsGrid = document.getElementById('students-grid');
    if (studentsGrid) {
        let html = '';
        appData.admin.students.forEach(student => {
            html += `
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">
                            <img src="${student.avatar}" alt="${student.name}">
                        </div>
                    </div>
                    <div class="student-info">
                        <h4 class="student-name">${student.name}</h4>
                        <span class="student-age">${student.age} años - ${student.program}</span>
                        <div class="student-stats">
                            <div class="student-stat">
                                <div class="student-stat-value">${student.attendance}</div>
                                <div class="student-stat-label">Asistencia</div>
                            </div>
                            <div class="student-stat">
                                <div class="student-stat-value">${student.coach}</div>
                                <div class="student-stat-label">Entrenador</div>
                            </div>
                        </div>
                    </div>
                    <div class="student-actions">
                        <a href="#" class="btn-student btn-profile" data-student-id="${student.id}">Ver perfil</a>
                        <a href="#" class="btn-student btn-progress" data-student-id="${student.id}">Progreso</a>
                    </div>
                </div>
            `;
        });
        studentsGrid.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-profile').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Perfil del alumno', `Ver perfil completo del alumno con ID: ${studentId}`, 'info');
            });
        });

        document.querySelectorAll('.btn-progress').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Progreso del alumno', `Ver progreso del alumno con ID: ${studentId}`, 'info');
            });
        });
    }

    // Cargar la tabla de entrenadores
    const trainersTable = document.getElementById('trainers-table');
    if (trainersTable) {
        let html = '';
        appData.admin.trainers.forEach(trainer => {
            html += `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; overflow: hidden; margin-right: 10px;">
                                <img src="${trainer.avatar}" alt="${trainer.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div>
                                <div style="font-weight: 600;">${trainer.name}</div>
                                <div style="font-size: 0.85rem; color: #6c757d;">ID: ${trainer.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>${trainer.specialty}</td>
                    <td>${trainer.students}</td>
                    <td>${trainer.classes}</td>
                    <td><span class="status ${trainer.status}">${trainer.status === 'active' ? 'Activo' : 'Inactivo'}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-view" data-trainer-id="${trainer.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action btn-edit" data-trainer-id="${trainer.id}"><i class="fas fa-pen"></i></button>
                            <button class="btn-action btn-delete" data-trainer-id="${trainer.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        trainersTable.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-action[data-trainer-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const trainerId = this.getAttribute('data-trainer-id');
                const action = this.classList.contains('btn-view') ? 'Ver' : (this.classList.contains('btn-edit') ? 'Editar' : 'Eliminar');
                showModal(`${action} entrenador`, `${action} entrenador con ID: ${trainerId}`, this.classList.contains('btn-delete') ? 'warning' : 'info');
            });
        });
    }

    // Cargar la tabla de clases
    const classesTable = document.getElementById('classes-table');
    if (classesTable) {
        let html = '';
        appData.admin.classes.forEach(cls => {
            html += `
                <tr>
                    <td>
                        <div style="font-weight: 600;">${cls.name}</div>
                        <div style="font-size: 0.85rem; color: #6c757d;">ID: ${cls.id}</div>
                    </td>
                    <td>${cls.trainer}</td>
                    <td>${cls.schedule}</td>
                    <td>${cls.students}</td>
                    <td>${cls.location}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-view" data-class-id="${cls.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action btn-edit" data-class-id="${cls.id}"><i class="fas fa-pen"></i></button>
                            <button class="btn-action btn-delete" data-class-id="${cls.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        classesTable.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-action[data-class-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.getAttribute('data-class-id');
                const action = this.classList.contains('btn-view') ? 'Ver' : (this.classList.contains('btn-edit') ? 'Editar' : 'Eliminar');
                showModal(`${action} clase`, `${action} clase con ID: ${classId}`, this.classList.contains('btn-delete') ? 'warning' : 'info');
            });
        });
    }

    // Cargar la lista completa de eventos en la sección de eventos
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        let html = '';
        appData.admin.events.forEach(event => {
            html += `
                <div class="event-card">
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.name}">
                        <div class="event-date">
                            <div class="event-day">${event.date.split('/')[0]}</div>
                            <div class="event-month">${getMonthAbbr(event.date.split('/')[1])}</div>
                        </div>
                    </div>
                    <div class="event-content">
                        <h4 class="event-title">${event.name}</h4>
                        <div class="event-info">
                            <div class="event-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-users"></i>
                                <span>${event.participants}</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-footer">
                        <span class="event-status ${event.status}">${event.status === 'upcoming' ? 'Próximo' : (event.status === 'in-progress' ? 'En curso' : 'Completado')}</span>
                        <a href="#" class="btn-read-more" data-event-id="${event.id}">Detalles <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        eventsContainer.innerHTML = html;

        // Agregar event listeners a los enlaces de detalles
        document.querySelectorAll('.btn-read-more[data-event-id]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const eventId = this.getAttribute('data-event-id');
                const event = appData.admin.events.find(e => e.id === eventId);
                if (event) {
                    showModal(event.name, `
                        <p><strong>Fecha:</strong> ${event.date}</p>
                        <p><strong>Hora:</strong> ${event.time}</p>
                        <p><strong>Ubicación:</strong> ${event.location}</p>
                        <p><strong>Participantes:</strong> ${event.participants}</p>
                        <p><strong>Organizador:</strong> ${event.organizer}</p>
                        <p><strong>Descripción:</strong> ${event.description}</p>
                    `, 'info');
                }
            });
        });
    }

    // Cargar la tabla de pagos
    const paymentsTable = document.getElementById('payments-table');
    if (paymentsTable) {
        let html = '';
        appData.admin.payments.forEach(payment => {
            html += `
                <tr>
                    <td>${payment.id}</td>
                    <td>${payment.student}</td>
                    <td>${payment.concept}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.date}</td>
                    <td><span class="status ${payment.status}">${payment.status === 'completed' ? 'Completado' : 'Pendiente'}</span></td>
                    <td>${payment.method}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-view" data-payment-id="${payment.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action btn-edit" data-payment-id="${payment.id}"><i class="fas fa-pen"></i></button>
                            <button class="btn-action btn-delete" data-payment-id="${payment.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        paymentsTable.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-action[data-payment-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const paymentId = this.getAttribute('data-payment-id');
                const action = this.classList.contains('btn-view') ? 'Ver' : (this.classList.contains('btn-edit') ? 'Editar' : 'Eliminar');
                showModal(`${action} pago`, `${action} pago con ID: ${paymentId}`, this.classList.contains('btn-delete') ? 'warning' : 'info');
            });
        });
    }

    // Cargar la lista de recursos
    const resourcesContainer = document.getElementById('resources-container');
    if (resourcesContainer) {
        let html = '';
        [
            { id: "REC001", title: "Técnicas básicas de control de balón", type: "video", description: "Video demostrativo sobre las técnicas fundamentales para un buen control de balón.", category: "Técnica", date: "20/04/2025", size: "45 MB" },
            { id: "REC002", title: "Guía de ejercicios de calentamiento", type: "document", description: "Documento PDF con una serie de ejercicios recomendados para un calentamiento adecuado antes del entrenamiento.", category: "Preparación Física", date: "15/04/2025", size: "2.3 MB" },
            { id: "REC003", title: "Tácticas defensivas para categorías infantiles", type: "presentation", description: "Presentación con explicaciones y diagramas sobre tácticas defensivas adaptadas para niños.", category: "Táctica", date: "10/04/2025", size: "8.7 MB" },
            { id: "REC004", title: "Ejercicios de coordinación y agilidad", type: "video", description: "Video con una serie de ejercicios para mejorar la coordinación y agilidad en jóvenes futbolistas.", category: "Preparación Física", date: "05/04/2025", size: "38 MB" }
        ].forEach(resource => {
            let typeIcon = '';
            if (resource.type === 'document') {
                typeIcon = 'fa-file-pdf';
            } else if (resource.type === 'video') {
                typeIcon = 'fa-video';
            } else if (resource.type === 'presentation') {
                typeIcon = 'fa-file-powerpoint';
            } else if (resource.type === 'exercise') {
                typeIcon = 'fa-running';
            }

            html += `
                <div class="resource-card">
                    <div class="resource-type ${resource.type}">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div class="resource-content">
                        <h3 class="resource-title">${resource.title}</h3>
                        <p class="resource-description">${resource.description}</p>
                        <div class="resource-meta">
                            <div class="resource-info">
                                <span>Categoría: <strong>${resource.category}</strong></span> | 
                                <span>Tamaño: <strong>${resource.size}</strong></span>
                            </div>
                            <div class="resource-actions">
                                <a href="#" class="resource-action" title="Descargar"><i class="fas fa-download"></i></a>
                                <a href="#" class="resource-action" title="Editar"><i class="fas fa-pen"></i></a>
                                <a href="#" class="resource-action" title="Eliminar"><i class="fas fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        resourcesContainer.innerHTML = html;

        // Agregar event listeners a los enlaces de acción
        document.querySelectorAll('.resource-action').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.title;
                showModal(action + ' recurso', `Acción: ${action} un recurso`, action === 'Eliminar' ? 'warning' : 'info');
            });
        });
    }

    // Cargar la lista de comunicados
    const announcementsContainer = document.getElementById('announcements-container');
    if (announcementsContainer) {
        let html = '';
        appData.admin.announcements.forEach(announcement => {
            html += `
                <div class="news-card">
                    <div class="news-image">
                        <img src="${announcement.image}" alt="${announcement.title}">
                    </div>
                    <div class="news-content">
                        <span class="news-category ${announcement.category}">${getCategoryName(announcement.category)}</span>
                        <h3 class="news-title">${announcement.title}</h3>
                        <p class="news-excerpt">${announcement.content}</p>
                    </div>
                    <div class="news-footer">
                        <div class="news-date">
                            <i class="far fa-calendar-alt"></i>
                            <span>${announcement.date}</span>
                        </div>
                        <a href="#" class="btn-read-more" data-announcement-id="${announcement.id}">Detalles <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        announcementsContainer.innerHTML = html;

        // Agregar event listeners a los enlaces de detalles
        document.querySelectorAll('.btn-read-more[data-announcement-id]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const announcementId = this.getAttribute('data-announcement-id');
                const announcement = appData.admin.announcements.find(a => a.id === announcementId);
                if (announcement) {
                    showModal(announcement.title, `
                        <p><strong>Fecha:</strong> ${announcement.date}</p>
                        <p><strong>Autor:</strong> ${announcement.author}</p>
                        <p><strong>Categoría:</strong> ${getCategoryName(announcement.category)}</p>
                        <p><strong>Contenido:</strong></p>
                        <p>${announcement.content}</p>
                    `, 'info');
                }
            });
        });
    }
}

/***********************************
 * DASHBOARD DEL ENTRENADOR
 ***********************************/

/**
 * Carga el dashboard de entrenador
 */
function loadTrainerDashboard() {
    const dashboard = document.getElementById('dashboard');
    
    // HTML del dashboard de entrenador
    dashboard.innerHTML = `
        <div class="admin-dashboard">
            <div class="sidebar">
                <div class="sidebar-header">
                    <img src="assets/logo.png" alt="Logo">
                    <h3>Campeones del Futuro</h3>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Panel de control</div>
                    <ul>
                        <li><a href="#" class="active" data-section="overview"><i class="fas fa-th-large"></i> Vista general</a></li>
                        <li><a href="#" data-section="my-classes"><i class="fas fa-calendar-alt"></i> Mis clases</a></li>
                        <li><a href="#" data-section="my-students"><i class="fas fa-user-graduate"></i> Mis alumnos</a></li>
                        <li><a href="#" data-section="attendance"><i class="fas fa-clipboard-check"></i> Control de asistencia</a></li>
                        <li><a href="#" data-section="training-plans"><i class="fas fa-running"></i> Planes de entrenamiento</a></li>
                        <li><a href="#" data-section="progress"><i class="fas fa-chart-line"></i> Progreso de alumnos</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Recursos</div>
                    <ul>
                        <li><a href="#" data-section="resources"><i class="fas fa-folder"></i> Mis recursos</a></li>
                        <li><a href="#" data-section="videos"><i class="fas fa-video"></i> Videos</a></li>
                        <li><a href="#" data-section="documents"><i class="fas fa-file-alt"></i> Documentos</a></li>
                        <li><a href="#" data-section="events"><i class="fas fa-trophy"></i> Eventos y torneos</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-footer">
                    <div class="user-info">
                        <div class="user-avatar">
                            <img src="assets/trainer-avatar.jpg" alt="Entrenador">
                        </div>
                        <div class="user-details">
                            <h4>${currentUser.name}</h4>
                            <p>Entrenador</p>
                        </div>
                    </div>
                    <a href="#" id="logoutBtn" class="btn btn-block btn-secondary" style="margin-top: 1rem;">Cerrar sesión</a>
                </div>
            </div>
            
            <div class="main-content">
                <div class="topbar">
                    <button class="toggle-sidebar"><i class="fas fa-bars"></i></button>
                    
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="trainer-search" placeholder="Buscar...">
                    </div>
                    
                    <div class="user-actions">
                        <div class="action-icon" id="trainer-notifications">
                            <i class="fas fa-bell"></i>
                            <span class="badge">2</span>
                        </div>
                        <div class="action-icon" id="trainer-messages">
                            <i class="fas fa-envelope"></i>
                            <span class="badge">3</span>
                        </div>
                    </div>
                </div>
                
                <div id="overview" class="dashboard-section active">
                    <h2>Vista general</h2>
                    
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-icon blue">
                                <i class="fas fa-user-graduate"></i>
                            </div>
                            <div class="card-title">Mis alumnos</div>
                            <div class="card-value">78</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 5 </span> nuevos este mes
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon orange">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="card-title">Clases semanales</div>
                            <div class="card-value">12</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-plus"></i> 1 </span> extra esta semana
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon green">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div class="card-title">Asistencia (semana)</div>
                            <div class="card-value">94%</div>
                            <div class="card-stats">
                                <span class="stats-positive"><i class="fas fa-arrow-up"></i> 2% </span> vs. semana anterior
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-icon red">
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="card-title">Planes por revisar</div>
                            <div class="card-value">5</div>
                            <div class="card-stats">
                                <span class="stats-negative"><i class="fas fa-arrow-up"></i> 2 </span> más que ayer
                            </div>
                        </div>
                    </div>
                    
                    <div class="calendar-view" id="trainer-calendar">
                        <div class="calendar-header">
                            <div class="calendar-title">
                                <h3>Mayo 2025</h3>
                                <div class="calendar-nav">
                                    <button id="prev-month"><i class="fas fa-chevron-left"></i></button>
                                    <button id="next-month"><i class="fas fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <div class="calendar-view-options">
                                <div class="view-option active" data-view="month">Mes</div>
                                <div class="view-option" data-view="week">Semana</div>
                                <div class="view-option" data-view="day">Día</div>
                            </div>
                        </div>
                        <div class="calendar-grid">
                            <div class="calendar-day-header">Dom</div>
                            <div class="calendar-day-header">Lun</div>
                            <div class="calendar-day-header">Mar</div>
                            <div class="calendar-day-header">Mié</div>
                            <div class="calendar-day-header">Jue</div>
                            <div class="calendar-day-header">Vie</div>
                            <div class="calendar-day-header">Sáb</div>
                            
                            <!-- Días del mes (primera semana) -->
                            <div class="calendar-day">
                                <div class="day-number">28</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">29</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">30</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">1</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">2</div>
                                <div class="calendar-event orange">
                                    Reunión entrenadores
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">3</div>
                                <div class="calendar-event">
                                    Clase Alto Rend. 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">4</div>
                            </div>
                            
                            <!-- Segunda semana -->
                            <div class="calendar-day">
                                <div class="day-number">5</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">6</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">7</div>
                                <div class="calendar-event">
                                    Evaluaciones 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">8</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">9</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">10</div>
                                <div class="calendar-event">
                                    Clase Alto Rend. 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">11</div>
                            </div>
                            
                            <!-- Tercera semana -->
                            <div class="calendar-day">
                                <div class="day-number">12</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">13</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">14</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">15</div>
                                <div class="calendar-event green">
                                    Torneo Interno
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">16</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">17</div>
                                <div class="calendar-event">
                                    Clase Alto Rend. 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">18</div>
                            </div>
                            
                            <!-- Cuarta semana -->
                            <div class="calendar-day">
                                <div class="day-number">19</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">20</div>
                                <div class="calendar-event orange">
                                    Entrenamiento especial
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">21</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">22</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">23</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">24</div>
                                <div class="calendar-event">
                                    Clase Alto Rend. 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">25</div>
                            </div>
                            
                            <!-- Quinta semana (parcial) -->
                            <div class="calendar-day">
                                <div class="day-number">26</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">27</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">28</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">29</div>
                                <div class="calendar-event">
                                    Clase Iniciación 3PM
                                </div>
                                <div class="calendar-event">
                                    Clase Técnica 5PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">30</div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">31</div>
                                <div class="calendar-event">
                                    Clase Alto Rend. 4PM
                                </div>
                            </div>
                            <div class="calendar-day">
                                <div class="day-number">1</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Mis próximas clases</h3>
                            <a href="#" class="btn btn-primary" id="trainer-view-all-classes">Ver todas</a>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Clase</th>
                                            <th>Fecha y hora</th>
                                            <th>Alumnos</th>
                                            <th>Ubicación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="trainer-classes-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Mis Clases -->
                <div id="my-classes" class="dashboard-section">
                    <div class="section-header">
                        <h2>Mis Clases</h2>
                        <div class="section-actions">
                            <button class="btn btn-secondary" id="export-classes-btn">
                                <i class="fas fa-download"></i> Exportar
                            </button>
                            <button class="btn btn-primary" id="add-class-request-btn">
                                <i class="fas fa-plus"></i> Solicitar nueva clase
                            </button>
                        </div>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="classes-search" placeholder="Buscar clase...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="class-day-filter">
                                <option value="">Todos los días</option>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                            
                            <select id="class-program-filter">
                                <option value="">Todos los programas</option>
                                <option value="Iniciación Deportiva">Iniciación Deportiva</option>
                                <option value="Formación Técnica">Formación Técnica</option>
                                <option value="Alto Rendimiento">Alto Rendimiento</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="trainer-classes-grid" id="trainer-classes-grid">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Mis Alumnos -->
                <div id="my-students" class="dashboard-section">
                    <div class="section-header">
                        <h2>Mis Alumnos</h2>
                        <div class="section-actions">
                            <button class="btn btn-secondary" id="export-students-btn">
                                <i class="fas fa-download"></i> Exportar listado
                            </button>
                            <button class="btn btn-primary" id="message-all-students-btn">
                                <i class="fas fa-envelope"></i> Mensaje masivo
                            </button>
                        </div>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="my-students-search" placeholder="Buscar alumno...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="student-program-filter">
                                <option value="">Todos los programas</option>
                                <option value="Iniciación Deportiva">Iniciación Deportiva</option>
                                <option value="Formación Técnica">Formación Técnica</option>
                                <option value="Alto Rendimiento">Alto Rendimiento</option>
                            </select>
                            
                            <select id="student-age-filter">
                                <option value="">Todas las edades</option>
                                <option value="5-7">5-7 años</option>
                                <option value="8-12">8-12 años</option>
                                <option value="13-17">13-17 años</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="students-grid" id="trainer-students-grid">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Control de Asistencia -->
                <div id="attendance" class="dashboard-section">
                    <div class="section-header">
                        <h2>Control de Asistencia</h2>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="filter-container">
                            <select id="attendance-class-filter">
                                <option value="">Seleccionar clase</option>
                                <option value="CLS001">Iniciación Deportiva Grupo A</option>
                                <option value="CLS002">Formación Técnica Grupo B</option>
                                <option value="CLS003">Alto Rendimiento Grupo Único</option>
                            </select>
                            
                            <input type="date" id="attendance-date" value="2025-05-01">
                            
                            <button class="btn btn-primary" id="load-attendance-btn">
                                Cargar lista
                            </button>
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Registro de asistencia</h3>
                            <div class="card-actions">
                                <button class="btn btn-secondary" id="mark-all-present-btn">
                                    Marcar todos presentes
                                </button>
                                <button class="btn btn-primary" id="save-attendance-btn">
                                    Guardar registro
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Alumno</th>
                                            <th>Programa</th>
                                            <th>Asistencia</th>
                                            <th>Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="attendance-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Planes de Entrenamiento -->
                <div id="training-plans" class="dashboard-section">
                    <div class="section-header">
                        <h2>Planes de Entrenamiento</h2>
                        <button class="btn btn-primary" id="create-plan-btn">
                            <i class="fas fa-plus"></i> Crear nuevo plan
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="plans-search" placeholder="Buscar plan...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="plan-student-filter">
                                <option value="">Todos los alumnos</option>
                                <option value="Mateo Gómez">Mateo Gómez</option>
                                <option value="Sofía Medina">Sofía Medina</option>
                                <option value="Diego Torres">Diego Torres</option>
                                <option value="Lucía Mendoza">Lucía Mendoza</option>
                            </select>
                            
                            <select id="plan-date-filter">
                                <option value="">Todas las fechas</option>
                                <option value="01/05/2025">1 Mayo 2025</option>
                                <option value="02/05/2025">2 Mayo 2025</option>
                                <option value="03/05/2025">3 Mayo 2025</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="training-grid" id="training-plans-grid">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Progreso de Alumnos -->
                <div id="progress" class="dashboard-section">
                    <div class="section-header">
                        <h2>Progreso de Alumnos</h2>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="progress-search" placeholder="Buscar alumno...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="progress-program-filter">
                                <option value="">Todos los programas</option>
                                <option value="Iniciación Deportiva">Iniciación Deportiva</option>
                                <option value="Formación Técnica">Formación Técnica</option>
                                <option value="Alto Rendimiento">Alto Rendimiento</option>
                            </select>
                            
                            <select id="progress-period-filter">
                                <option value="month">Este mes</option>
                                <option value="quarter">Este trimestre</option>
                                <option value="year">Este año</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="students-grid" id="progress-students-grid">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Recursos -->
                <div id="resources" class="dashboard-section">
                    <div class="section-header">
                        <h2>Recursos</h2>
                        <button class="btn btn-primary" id="add-trainer-resource-btn">
                            <i class="fas fa-plus"></i> Añadir recurso
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="trainer-resources-search" placeholder="Buscar recurso...">
                        </div>
                        
                        <div class="filter-container">
                            <select id="trainer-resource-type-filter">
                                <option value="">Todos los tipos</option>
                                <option value="document">Documentos</option>
                                <option value="video">Videos</option>
                                <option value="presentation">Presentaciones</option>
                                <option value="exercise">Ejercicios</option>
                            </select>
                            
                            <select id="trainer-resource-category-filter">
                                <option value="">Todas las categorías</option>
                                <option value="Técnica">Técnica</option>
                                <option value="Táctica">Táctica</option>
                                <option value="Preparación Física">Preparación Física</option>
                                <option value="Psicología">Psicología</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="resources-container" id="trainer-resources-container">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
                
                <!-- Sección de Videos -->
                <div id="videos" class="dashboard-section">
                    <div class="section-header">
                        <h2>Videos</h2>
                        <button class="btn btn-primary" id="add-video-btn">
                            <i class="fas fa-plus"></i> Añadir video
                        </button>
                    </div>
                    
                    <div class="filter-bar">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar video...">
                        </div>
                        
                        <div class="filter-container">
                            <select>
                                <option value="">Todas las categorías</option>
                                <option value="Técnica">Técnica</option>
                                <option value="Táctica">Táctica</option>
                                <option value="Preparación Física">Preparación Física</option>
                                <option value="Psicología">Psicología</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="videos-grid">
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="assets/video-1.jpg" alt="Técnicas básicas de control de balón">
                                <div class="video-duration">08:45</div>
                                <div class="video-play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-content">
                                <h3 class="video-title">Técnicas básicas de control de balón</h3>
                                <p class="video-description">Video demostrativo sobre las técnicas fundamentales para un buen control de balón.</p>
                                <div class="video-meta">
                                    <span><i class="fas fa-tag"></i> Técnica</span>
                                    <span><i class="fas fa-calendar-alt"></i> 20/04/2025</span>
                                </div>
                                <div class="video-actions">
                                    <button class="btn btn-secondary btn-sm">Editar</button>
                                    <button class="btn btn-primary btn-sm">Compartir</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="assets/video-2.jpg" alt="Ejercicios de coordinación y agilidad">
                                <div class="video-duration">12:20</div>
                                <div class="video-play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-content">
                                <h3 class="video-title">Ejercicios de coordinación y agilidad</h3>
                                <p class="video-description">Video con una serie de ejercicios para mejorar la coordinación y agilidad en jóvenes futbolistas.</p>
                                <div class="video-meta">
                                    <span><i class="fas fa-tag"></i> Preparación Física</span>
                                    <span><i class="fas fa-calendar-alt"></i> 05/04/2025</span>
                                </div>
                                <div class="video-actions">
                                    <button class="btn btn-secondary btn-sm">Editar</button>
                                    <button class="btn btn-primary btn-sm">Compartir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Documentos -->
                <div id="documents" class="dashboard-section">
                    <!-- Contenido para la sección de Documentos -->
                </div>
                
                <!-- Sección de Eventos y Torneos -->
                <div id="events" class="dashboard-section">
                    <!-- Contenido para la sección de Eventos y Torneos -->
                </div>
            </div>
        </div>
    `;
    
    // Configurar los eventos del dashboard
    setupTrainerDashboardEvents();
    loadTrainerDashboardData();
}

/**
 * Configura los eventos del dashboard de entrenador
 */
function setupTrainerDashboardEvents() {
    // Manejar el botón de logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Manejar la navegación entre secciones
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            const currentSection = document.getElementById(sectionId);
            if (currentSection) {
                currentSection.classList.add('active');
                currentSection.style.display = 'block';
            }
        });
    });
    
    // Manejar el toggle del sidebar
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '80px';
            document.querySelector('.main-content').style.marginLeft = '80px';
        } else {
            sidebar.style.width = '260px';
            document.querySelector('.main-content').style.marginLeft = '260px';
        }
    });

    // Manejar notificaciones y mensajes
    document.getElementById('trainer-notifications').addEventListener('click', function() {
        showNotification('Notificaciones', 'Tienes 2 notificaciones sin leer', 'info');
    });

    document.getElementById('trainer-messages').addEventListener('click', function() {
        showNotification('Mensajes', 'Tienes 3 mensajes sin leer', 'info');
    });

    // Manejar el botón "Ver todas" de la sección de clases
    document.getElementById('trainer-view-all-classes').addEventListener('click', function(e) {
        e.preventDefault();
        // Activar la sección de mis clases
        document.querySelector('.sidebar-menu a[data-section="my-classes"]').click();
    });

    // Configurar las opciones de vista del calendario
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            showNotification('Vista de calendario', `Cambiado a vista de ${view}`, 'info');
        });
    });

    // Configurar botones de navegación del calendario
    document.getElementById('prev-month').addEventListener('click', function() {
        showNotification('Calendario', 'Navegando al mes anterior', 'info');
    });

    document.getElementById('next-month').addEventListener('click', function() {
        showNotification('Calendario', 'Navegando al mes siguiente', 'info');
    });

    // Configurar eventos de calendario
    document.querySelectorAll('.calendar-event').forEach(event => {
        event.addEventListener('click', function() {
            showModal('Detalle del evento', `Información detallada sobre: ${this.textContent.trim()}`, 'info');
        });
    });

    // Configurar botón de crear nuevo plan
    document.getElementById('create-plan-btn').addEventListener('click', function() {
        showModal('Crear plan de entrenamiento', 'Formulario para crear un nuevo plan de entrenamiento', 'info');
    });

    // Configurar botón de añadir recurso
    document.getElementById('add-trainer-resource-btn').addEventListener('click', function() {
        showModal('Añadir recurso', 'Formulario para añadir un nuevo recurso', 'info');
    });

    // Configurar botón de añadir video
    document.getElementById('add-video-btn').addEventListener('click', function() {
        showModal('Añadir video', 'Formulario para añadir un nuevo video', 'info');
    });

    // Configurar botón de solicitar nueva clase
    document.getElementById('add-class-request-btn').addEventListener('click', function() {
        showModal('Solicitar nueva clase', 'Formulario para solicitar una nueva clase', 'info');
    });

    // Configurar botones de exportar
    document.getElementById('export-classes-btn').addEventListener('click', function() {
        showNotification('Exportar', 'Exportando listado de clases...', 'success');
    });

    document.getElementById('export-students-btn').addEventListener('click', function() {
        showNotification('Exportar', 'Exportando listado de alumnos...', 'success');
    });

    // Configurar botón de mensaje masivo
    document.getElementById('message-all-students-btn').addEventListener('click', function() {
        showModal('Mensaje masivo', 'Formulario para enviar un mensaje a todos los alumnos seleccionados', 'info');
    });

    // Configurar botones de control de asistencia
    document.getElementById('load-attendance-btn').addEventListener('click', function() {
        const classId = document.getElementById('attendance-class-filter').value;
        const date = document.getElementById('attendance-date').value;
        
        if (!classId) {
            showNotification('Error', 'Por favor, selecciona una clase', 'error');
            return;
        }
        
        loadAttendanceList(classId, date);
    });

    document.getElementById('mark-all-present-btn').addEventListener('click', function() {
        const radios = document.querySelectorAll('input[value="present"]');
        radios.forEach(radio => {
            radio.checked = true;
        });
        
        showNotification('Asistencia', 'Todos los alumnos marcados como presentes', 'success');
    });

    document.getElementById('save-attendance-btn').addEventListener('click', function() {
        showNotification('Asistencia', 'Registro de asistencia guardado correctamente', 'success');
    });

    // Manejar la búsqueda en el dashboard
    document.getElementById('trainer-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                showNotification('Búsqueda', `Buscando: "${searchTerm}"`, 'info');
                // Aquí iría la lógica de búsqueda real
            }
        }
    });

    // Configurar botones de reproducción de videos
    document.querySelectorAll('.video-play-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const videoTitle = this.closest('.video-card').querySelector('.video-title').textContent;
            showModal('Reproducir video', `Reproduciendo: ${videoTitle}`, 'info');
        });
    });
}

/**
 * Carga la lista de asistencia para una clase específica
 * @param {string} classId - El ID de la clase
 * @param {string} date - La fecha en formato YYYY-MM-DD
 */
function loadAttendanceList(classId, date) {
    const attendanceTable = document.getElementById('attendance-table');
    const formattedDate = formatDateString(date);
    
    // Verificar si existen registros de asistencia para la clase y fecha seleccionadas
    const attendanceRecord = appData.trainer.attendanceRecords[classId];
    
    if (attendanceRecord) {
        let html = '';
        attendanceRecord.students.forEach(student => {
            html += `
                <tr>
                    <td>${student.name}</td>
                    <td>Formación Técnica</td>
                    <td>
                        <div class="attendance-options">
                            <label class="attendance-option">
                                <input type="radio" name="attendance-${student.id}" value="present" ${student.status === 'present' ? 'checked' : ''}>
                                <span class="attendance-text present">Presente</span>
                            </label>
                            <label class="attendance-option">
                                <input type="radio" name="attendance-${student.id}" value="late" ${student.status === 'late' ? 'checked' : ''}>
                                <span class="attendance-text late">Tarde</span>
                            </label>
                            <label class="attendance-option">
                                <input type="radio" name="attendance-${student.id}" value="absent" ${student.status === 'absent' ? 'checked' : ''}>
                                <span class="attendance-text absent">Ausente</span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <input type="text" class="form-control" placeholder="Agregar observación">
                    </td>
                </tr>
            `;
        });
        attendanceTable.innerHTML = html;
        
        showNotification('Asistencia', `Lista de asistencia cargada para el ${formattedDate}`, 'success');
    } else {
        attendanceTable.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No hay registros de asistencia para esta clase y fecha.</td>
            </tr>
        `;
        
        showNotification('Asistencia', `No se encontraron registros para el ${formattedDate}`, 'warning');
    }
}

/**
 * Carga los datos para el dashboard de entrenador
 */
function loadTrainerDashboardData() {
    // Cargar la tabla de clases en la vista general
    const classesTable = document.getElementById('trainer-classes-table');
    if (classesTable) {
        let html = '';
        appData.trainer.myClasses.forEach(cls => {
            html += `
                <tr>
                    <td>
                        <div style="font-weight: 600;">${cls.name}</div>
                        <div style="font-size: 0.85rem; color: #6c757d;">${cls.schedule}</div>
                    </td>
                    <td>
                        <div>${cls.date}</div>
                        <div style="font-size: 0.85rem; color: #6c757d;">${cls.time}</div>
                    </td>
                    <td>${cls.students} alumnos</td>
                    <td>${cls.location}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-view" data-class-id="${cls.id}"><i class="fas fa-eye"></i></button>
                            <button class="btn-action btn-edit" data-class-id="${cls.id}"><i class="fas fa-clipboard-list"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        classesTable.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-action[data-class-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.getAttribute('data-class-id');
                const action = this.classList.contains('btn-view') ? 'Ver detalles de la clase' : 'Tomar asistencia';
                showModal(action, `${action} con ID: ${classId}`, 'info');
            });
        });
    }

    // Cargar la lista de clases completa
    const classesGrid = document.getElementById('trainer-classes-grid');
    if (classesGrid) {
        let html = '';
        appData.trainer.myClasses.forEach(cls => {
            // Determinar si la clase es hoy
            const isToday = cls.date.includes('1 de Mayo');
            const statusClass = isToday ? 'active' : 'upcoming';
            const statusText = isToday ? 'Hoy' : 'Próxima';
            
            html += `
                <div class="class-card">
                    <div class="class-header ${statusClass}">
                        <span class="class-status">${statusText}</span>
                        <h3 class="class-title">${cls.name}</h3>
                        <div class="class-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${cls.date}</span>
                            <span><i class="fas fa-clock"></i> ${cls.time}</span>
                        </div>
                    </div>
                    <div class="class-body">
                        <div class="class-info">
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${cls.location}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-users"></i>
                                <span>${cls.students} alumnos</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-calendar-week"></i>
                                <span>${cls.schedule}</span>
                            </div>
                        </div>
                    </div>
                    <div class="class-footer">
                        <button class="btn btn-secondary btn-sm" data-class-id="${cls.id}">Ver detalles</button>
                        <button class="btn btn-primary btn-sm" data-class-id="${cls.id}">Tomar asistencia</button>
                    </div>
                </div>
            `;
        });
        classesGrid.innerHTML = html;

        // Agregar event listeners a los botones
        document.querySelectorAll('.class-footer .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const classId = this.getAttribute('data-class-id');
                const action = this.textContent.trim();
                showModal(action, `${action} para la clase con ID: ${classId}`, 'info');
            });
        });
    }

    // Cargar la lista de alumnos
    const studentsGrid = document.getElementById('trainer-students-grid');
    if (studentsGrid) {
        let html = '';
        appData.trainer.myStudents.forEach(student => {
            html += `
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">
                            <img src="${student.avatar}" alt="${student.name}">
                        </div>
                    </div>
                    <div class="student-info">
                        <h4 class="student-name">${student.name}</h4>
                        <span class="student-age">${student.age} años - ${student.program}</span>
                        <div class="student-stats">
                            <div class="student-stat">
                                <div class="student-stat-value">${student.attendance}</div>
                                <div class="student-stat-label">Asistencia</div>
                            </div>
                            <div class="student-stat">
                                <div class="student-stat-value">${calculateAverageProgress(student.progress)}%</div>
                                <div class="student-stat-label">Progreso</div>
                            </div>
                        </div>
                    </div>
                    <div class="student-actions">
                        <a href="#" class="btn-student btn-profile" data-student-id="${student.id}">Ver perfil</a>
                        <a href="#" class="btn-student btn-progress" data-student-id="${student.id}">Plan</a>
                    </div>
                </div>
            `;
        });
        studentsGrid.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.btn-profile').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Perfil del alumno', `Ver perfil completo del alumno con ID: ${studentId}`, 'info');
            });
        });

        document.querySelectorAll('.btn-progress').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Plan de entrenamiento', `Gestionar plan de entrenamiento del alumno con ID: ${studentId}`, 'info');
            });
        });
    }

    // Cargar la lista de alumnos con progreso
    const progressStudentsGrid = document.getElementById('progress-students-grid');
    if (progressStudentsGrid) {
        let html = '';
        appData.trainer.myStudents.forEach(student => {
            html += `
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar">
                            <img src="${student.avatar}" alt="${student.name}">
                        </div>
                    </div>
                    <div class="student-info">
                        <h4 class="student-name">${student.name}</h4>
                        <span class="student-age">${student.age} años - ${student.program}</span>
                    </div>
                    <div class="progress-section">
                        <div class="progress-item">
                            <div class="progress-label">Físico</div>
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${student.progress.physical}%"></div>
                            </div>
                            <div class="progress-value">${student.progress.physical}%</div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">Técnico</div>
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${student.progress.technical}%"></div>
                            </div>
                            <div class="progress-value">${student.progress.technical}%</div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-label">Táctico</div>
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${student.progress.tactical}%"></div>
                            </div>
                            <div class="progress-value">${student.progress.tactical}%</div>
                        </div>
                    </div>
                    <div class="student-actions">
                        <a href="#" class="btn-student btn-profile" data-student-id="${student.id}">Ver detalle</a>
                        <a href="#" class="btn-student btn-progress" data-student-id="${student.id}">Evaluar</a>
                    </div>
                </div>
            `;
        });
        progressStudentsGrid.innerHTML = html;

        // Agregar event listeners a los botones de acción
        document.querySelectorAll('#progress .btn-profile').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Detalle de progreso', `Ver detalle de progreso del alumno con ID: ${studentId}`, 'info');
            });
        });

        document.querySelectorAll('#progress .btn-progress').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const studentId = this.getAttribute('data-student-id');
                showModal('Evaluar alumno', `Formulario para evaluar al alumno con ID: ${studentId}`, 'info');
            });
        });
    }

    // Cargar la lista de planes de entrenamiento
    const trainingPlansGrid = document.getElementById('training-plans-grid');
    if (trainingPlansGrid) {
        let html = '';
        appData.trainer.trainingPlans.forEach(plan => {
            html += `
                <div class="training-card">
                    <div class="training-header">
                        <span class="training-level">Individual</span>
                        <h3 class="training-title">Plan para ${plan.student}</h3>
                        <div class="training-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${plan.date}</span>
                            <span><i class="fas fa-tasks"></i> ${plan.exercises.length} ejercicios</span>
                        </div>
                    </div>
                    <div class="training-body">
                        <p class="training-description">${plan.notes}</p>
                        <div class="training-progress">
                            <div class="progress-label">Físico</div>
                            <div class="progress-container">
                                <div class="progress-value progress-physical" style="width: 80%"></div>
                            </div>
                        </div>
                        <div class="training-progress">
                            <div class="progress-label">Técnico</div>
                            <div class="progress-container">
                                <div class="progress-value progress-technique" style="width: 65%"></div>
                            </div>
                        </div>
                        <div class="training-progress">
                            <div class="progress-label">Táctico</div>
                            <div class="progress-container">
                                <div class="progress-value progress-tactical" style="width: 50%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="training-footer">
                        <div class="training-coach">
                            <div class="coach-avatar">
                                <img src="assets/trainer-avatar.jpg" alt="Entrenador">
                            </div>
                            <div>
                                <div class="coach-name">Carlos Díaz</div>
                                <div class="coach-role">Entrenador</div>
                            </div>
                        </div>
                        <div class="training-actions">
                            <button class="btn btn-secondary btn-sm" data-plan-id="${plan.id}">Editar</button>
                            <button class="btn btn-primary btn-sm" data-plan-id="${plan.id}">Ver</button>
                        </div>
                    </div>
                </div>
            `;
        });
        trainingPlansGrid.innerHTML = html;

        // Agregar event listeners a los botones
        document.querySelectorAll('.training-actions .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const planId = this.getAttribute('data-plan-id');
                const action = this.textContent.trim();
                showModal(action + ' plan', `${action} plan de entrenamiento con ID: ${planId}`, 'info');
            });
        });
    }

    // Cargar los recursos
    const resourcesContainer = document.getElementById('trainer-resources-container');
    if (resourcesContainer) {
        let html = '';
        appData.trainer.resources.forEach(resource => {
            let typeIcon = '';
            if (resource.type === 'document') {
                typeIcon = 'fa-file-pdf';
            } else if (resource.type === 'video') {
                typeIcon = 'fa-video';
            } else if (resource.type === 'presentation') {
                typeIcon = 'fa-file-powerpoint';
            } else if (resource.type === 'exercise') {
                typeIcon = 'fa-running';
            }

            html += `
                <div class="resource-card">
                    <div class="resource-type ${resource.type}">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div class="resource-content">
                        <h3 class="resource-title">${resource.title}</h3>
                        <p class="resource-description">${resource.description}</p>
                        <div class="resource-meta">
                            <div class="resource-info">
                                <span>Categoría: <strong>${resource.category}</strong></span> | 
                                <span>Tamaño: <strong>${resource.size}</strong></span>
                            </div>
                            <div class="resource-actions">
                                <a href="#" class="resource-action" title="Descargar"><i class="fas fa-download"></i></a>
                                <a href="#" class="resource-action" title="Editar"><i class="fas fa-pen"></i></a>
                                <a href="#" class="resource-action" title="Compartir"><i class="fas fa-share-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        resourcesContainer.innerHTML = html;

        // Agregar event listeners a los enlaces de acción
        document.querySelectorAll('.resource-action').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.title;
                showNotification(action, `${action} recurso`, 'info');
            });
        });
    }
}

/***********************************
 * DASHBOARD DEL ALUMNO/PADRE
 ***********************************/

/**
 * Carga el dashboard de alumno/padre
 */
function loadStudentDashboard() {
    const dashboard = document.getElementById('dashboard');
    
    // HTML del dashboard de alumno/padre
    dashboard.innerHTML = `
        <div class="admin-dashboard">
            <div class="sidebar">
                <div class="sidebar-header">
                    <img src="assets/logo.png" alt="Logo">
                    <h3>Campeones del Futuro</h3>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Mi cuenta</div>
                    <ul>
                        <li><a href="#" class="active" data-section="overview"><i class="fas fa-th-large"></i> Panel principal</a></li>
                        <li><a href="#" data-section="profile"><i class="fas fa-user"></i> Mi perfil</a></li>
                        <li><a href="#" data-section="schedule"><i class="fas fa-calendar-alt"></i> Horario de clases</a></li>
                        <li><a href="#" data-section="training-plan"><i class="fas fa-running"></i> Plan de entrenamiento</a></li>
                        <li><a href="#" data-section="progress"><i class="fas fa-chart-line"></i> Mi progreso</a></li>
                        <li><a href="#" data-section="attendance"><i class="fas fa-clipboard-check"></i> Asistencia</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-menu">
                    <div class="sidebar-title">Academia</div>
                    <ul>
                        <li><a href="#" data-section="resources"><i class="fas fa-folder"></i> Recursos</a></li>
                        <li><a href="#" data-section="events"><i class="fas fa-trophy"></i> Eventos y torneos</a></li>
                        <li><a href="#" data-section="payments"><i class="fas fa-credit-card"></i> Pagos</a></li>
                        <li><a href="#" data-section="messages"><i class="fas fa-comments"></i> Mensajes</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-footer">
                    <div class="user-info">
                        <div class="user-avatar">
                            <img src="assets/student-avatar.jpg" alt="Alumno">
                        </div>
                        <div class="user-details">
                            <h4>${currentUser.name}</h4>
                            <p>Alumno/Padre</p>
                        </div>
                    </div>
                    <a href="#" id="logoutBtn" class="btn btn-block btn-secondary" style="margin-top: 1rem;">Cerrar sesión</a>
                </div>
            </div>
            
            <div class="main-content">
                <div class="topbar">
                    <button class="toggle-sidebar"><i class="fas fa-bars"></i></button>
                    
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="student-search" placeholder="Buscar...">
                    </div>
                    
                    <div class="user-actions">
                        <div class="action-icon" id="student-notifications">
                            <i class="fas fa-bell"></i>
                            <span class="badge">1</span>
                        </div>
                        <div class="action-icon" id="student-messages">
                            <i class="fas fa-envelope"></i>
                            <span class="badge">2</span>
                        </div>
                    </div>
                </div>
                
                <div id="overview" class="dashboard-section active">
                    <div class="student-profile">
                        <div class="profile-image">
                            <img src="${appData.student.profile.avatar}" alt="Perfil del Alumno">
                        </div>
                        <div class="profile-info">
                            <h2 class="profile-name">${appData.student.profile.name}</h2>
                            <span class="profile-category">${appData.student.profile.category}</span>
                            
                            <div class="profile-stats">
                                <div class="stat-item">
                                    <div class="stat-label">Edad</div>
                                    <div class="stat-value">${appData.student.profile.age} años</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Nivel</div>
                                    <div class="stat-value">Intermedio</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Asistencia</div>
                                    <div class="stat-value">${appData.student.profile.attendance}</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-label">Entrenador</div>
                                    <div class="stat-value">${appData.student.profile.coach}</div>
                                </div>
                            </div>
                            
                            <p>Próxima clase: <strong>Jueves, 1 de Mayo, 17:00 - 18:30</strong> • Cancha principal</p>
                            
                            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                                <a href="#" class="btn btn-primary" id="view-schedule-btn">Ver horario completo</a>
                                <a href="#" class="btn btn-secondary" id="view-training-plan-btn">Ver plan de entrenamiento</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="training-plan">
                        <div class="plan-header">
                            <h3>Mi Plan de Entrenamiento para Hoy</h3>
                            <span class="plan-date">Jueves, 1 de Mayo, 2025</span>
                        </div>
                        <div class="plan-body">
                            <!-- Se cargará dinámicamente -->
                        </div>
                        <div class="plan-footer">
                            <div class="plan-progress">
                                <div class="progress-bar-container">
                                    <div class="progress-bar" style="width: 20%;"></div>
                                </div>
                                <span class="progress-text">1/5 completados</span>
                            </div>
                            <button class="btn btn-primary" id="complete-all-btn">Completar todo</button>
                        </div>
                    </div>
                    
                    <h3>Eventos próximos</h3>
                    <div class="events-container" id="student-events-container">
                        <!-- Se cargará dinámicamente -->
                    </div>
                    
                    <h3>Comentarios recientes de tu entrenador</h3>
                    <div class="dashboard-main-card">
                        <div class="card-body" id="coach-comments-container">
                            <!-- Se cargará dinámicamente -->
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Mi Perfil -->
                <div id="profile" class="dashboard-section">
                    <div class="section-header">
                        <h2>Mi Perfil</h2>
                        <button class="btn btn-primary" id="edit-profile-btn">
                            <i class="fas fa-pen"></i> Editar perfil
                        </button>
                    </div>
                    
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <img src="${appData.student.profile.avatar}" alt="Perfil">
                        </div>
                        <div class="profile-details">
                            <div class="profile-name-container">
                                <h2 class="profile-name">${appData.student.profile.name}</h2>
                                <span class="profile-badge">${appData.student.profile.category}</span>
                            </div>
                            
                            <div class="profile-info-list">
                                <div class="profile-info-item">
                                    <i class="fas fa-birthday-cake"></i>
                                    <span>${appData.student.profile.birthdate} (${appData.student.profile.age} años)</span>
                                </div>
                                <div class="profile-info-item">
                                    <i class="fas fa-user-tie"></i>
                                    <span>Entrenador: ${appData.student.profile.coach}</span>
                                </div>
                                <div class="profile-info-item">
                                    <i class="fas fa-calendar-plus"></i>
                                    <span>Fecha de inicio: ${appData.student.profile.joinDate}</span>
                                </div>
                            </div>
                            
                            <div class="profile-info-list">
                                <div class="profile-info-item">
                                    <i class="fas fa-user-friends"></i>
                                    <span>Padre/Madre: ${appData.student.profile.parentName}</span>
                                </div>
                                <div class="profile-info-item">
                                    <i class="fas fa-phone"></i>
                                    <span>Teléfono: ${appData.student.profile.parentPhone}</span>
                                </div>
                                <div class="profile-info-item">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email: ${appData.student.profile.parentEmail}</span>
                                </div>
                            </div>
                            
                            <div class="profile-info-item">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Contacto de emergencia: ${appData.student.profile.emergencyContact}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-stats-grid">
                        <div class="profile-stat-card">
                            <div class="profile-stat-icon blue">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="profile-stat-info">
                                <div class="profile-stat-value">${appData.student.profile.attendance}</div>
                                <div class="profile-stat-label">Asistencia</div>
                            </div>
                        </div>
                        
                        <div class="profile-stat-card">
                            <div class="profile-stat-icon green">
                                <i class="fas fa-running"></i>
                            </div>
                            <div class="profile-stat-info">
                                <div class="profile-stat-value">80%</div>
                                <div class="profile-stat-label">Rendimiento físico</div>
                            </div>
                        </div>
                        
                        <div class="profile-stat-card">
                            <div class="profile-stat-icon orange">
                                <i class="fas fa-futbol"></i>
                            </div>
                            <div class="profile-stat-info">
                                <div class="profile-stat-value">75%</div>
                                <div class="profile-stat-label">Rendimiento técnico</div>
                            </div>
                        </div>
                        
                        <div class="profile-stat-card">
                            <div class="profile-stat-icon yellow">
                                <i class="fas fa-chess"></i>
                            </div>
                            <div class="profile-stat-info">
                                <div class="profile-stat-value">65%</div>
                                <div class="profile-stat-label">Rendimiento táctico</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-tabs">
                        <div class="profile-tabs-header">
                            <div class="profile-tab active" data-tab="achievements">Logros</div>
                            <div class="profile-tab" data-tab="medical">Información médica</div>
                            <div class="profile-tab" data-tab="notes">Notas del entrenador</div>
                            <div class="profile-tab" data-tab="preferences">Preferencias</div>
                        </div>
                        
                        <div class="profile-tab-content active" id="achievements">
                            <div class="empty-state">
                                <div class="empty-state-icon"><i class="fas fa-trophy"></i></div>
                                <div class="empty-state-text">Aún no tienes logros registrados</div>
                                <button class="btn btn-primary">Ver torneos disponibles</button>
                            </div>
                        </div>
                        
                        <div class="profile-tab-content" id="medical">
                            <!-- Contenido de la pestaña de información médica -->
                        </div>
                        
                        <div class="profile-tab-content" id="notes">
                            <!-- Contenido de la pestaña de notas del entrenador -->
                        </div>
                        
                        <div class="profile-tab-content" id="preferences">
                            <!-- Contenido de la pestaña de preferencias -->
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Horario de Clases -->
                <div id="schedule" class="dashboard-section">
                    <div class="section-header">
                        <h2>Horario de Clases</h2>
                        <div class="section-actions">
                            <button class="btn btn-secondary" id="export-schedule-btn">
                                <i class="fas fa-download"></i> Exportar
                            </button>
                            <button class="btn btn-primary" id="add-to-calendar-btn">
                                <i class="fas fa-calendar-plus"></i> Añadir a mi calendario
                            </button>
                        </div>
                    </div>
                    
                    <div class="calendar-view">
                        <div class="calendar-header">
                            <div class="calendar-title">
                                <h3>Mayo 2025</h3>
                                <div class="calendar-nav">
                                    <button id="student-prev-month"><i class="fas fa-chevron-left"></i></button>
                                    <button id="student-next-month"><i class="fas fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <div class="calendar-view-options">
                                <div class="view-option active" data-view="month">Mes</div>
                                <div class="view-option" data-view="week">Semana</div>
                                <div class="view-option" data-view="day">Día</div>
                                <div class="view-option" data-view="list">Lista</div>
                            </div>
                        </div>
                        <div class="calendar-grid">
                            <!-- Similar al calendario del entrenador, pero solo con las clases del alumno -->
                        </div>
                    </div>
                    
                    <div class="dashboard-main-card">
                        <div class="card-header">
                            <h3>Mis clases semanales</h3>
                        </div>
                        <div class="card-body">
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Día</th>
                                            <th>Horario</th>
                                            <th>Actividad</th>
                                            <th>Ubicación</th>
                                            <th>Entrenador</th>
                                        </tr>
                                    </thead>
                                    <tbody id="student-schedule-table">
                                        <!-- Se cargará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de Plan de Entrenamiento -->
                <div id="training-plan" class="dashboard-section">
                    <!-- Contenido para la sección de Plan de Entrenamiento -->
                </div>
                
                <!-- Sección de Mi Progreso -->
                <div id="progress" class="dashboard-section">
                    <!-- Contenido para la sección de Mi Progreso -->
                </div>
                
                <!-- Sección de Asistencia -->
                <div id="attendance" class="dashboard-section">
                    <!-- Contenido para la sección de Asistencia -->
                </div>
                
                <!-- Sección de Recursos -->
                <div id="resources" class="dashboard-section">
                    <!-- Contenido para la sección de Recursos -->
                </div>
                
                <!-- Sección de Eventos y Torneos -->
                <div id="events" class="dashboard-section">
                    <!-- Contenido para la sección de Eventos y Torneos -->
                </div>
                
                <!-- Sección de Pagos -->
                <div id="payments" class="dashboard-section">
                    <!-- Contenido para la sección de Pagos -->
                </div>
                
                <!-- Sección de Mensajes -->
                <div id="messages" class="dashboard-section">
                    <!-- Contenido para la sección de Mensajes -->
                </div>
            </div>
        </div>
    `;
    
    // Configurar los eventos del dashboard
    setupStudentDashboardEvents();
    loadStudentDashboardData();
}

/**
 * Configura los eventos del dashboard de alumno/padre
 */
function setupStudentDashboardEvents() {
    // Manejar el botón de logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Manejar la navegación entre secciones
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            const currentSection = document.getElementById(sectionId);
            if (currentSection) {
                currentSection.classList.add('active');
                currentSection.style.display = 'block';
            }
        });
    });
    
    // Manejar el toggle del sidebar
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '80px';
            document.querySelector('.main-content').style.marginLeft = '80px';
        } else {
            sidebar.style.width = '260px';
            document.querySelector('.main-content').style.marginLeft = '260px';
        }
    });

    // Manejar notificaciones y mensajes
    document.getElementById('student-notifications').addEventListener('click', function() {
        showNotification('Notificaciones', 'Tienes 1 notificación sin leer', 'info');
    });

    document.getElementById('student-messages').addEventListener('click', function() {
        showNotification('Mensajes', 'Tienes 2 mensajes sin leer', 'info');
    });

    // Manejar el botón de ver horario completo
    document.getElementById('view-schedule-btn').addEventListener('click', function(e) {
        e.preventDefault();
        // Activar la sección de horario
        document.querySelector('.sidebar-menu a[data-section="schedule"]').click();
    });

    // Manejar el botón de ver plan de entrenamiento
    document.getElementById('view-training-plan-btn').addEventListener('click', function(e) {
        e.preventDefault();
        // Activar la sección de plan de entrenamiento
        document.querySelector('.sidebar-menu a[data-section="training-plan"]').click();
    });

    // Manejar el botón de completar todo el plan
    document.getElementById('complete-all-btn').addEventListener('click', function() {
        document.querySelectorAll('.exercise-check input').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Actualizar la barra de progreso
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const total = document.querySelectorAll('.exercise-check input').length;
        
        progressBar.style.width = '100%';
        progressText.textContent = `${total}/${total} completados`;
        
        showNotification('Plan de entrenamiento', 'Todos los ejercicios marcados como completados', 'success');
    });

    // Manejar el botón de editar perfil
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        showModal('Editar perfil', 'Formulario para editar la información del perfil', 'info');
    });

    // Manejar los botones de exportar y añadir a calendario
    document.getElementById('export-schedule-btn').addEventListener('click', function() {
        showNotification('Exportar', 'Horario exportado correctamente', 'success');
    });

    document.getElementById('add-to-calendar-btn').addEventListener('click', function() {
        showNotification('Calendario', 'Clases añadidas a tu calendario', 'success');
    });

    // Configurar pestañas del perfil
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Quitar la clase active de todas las pestañas
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
            
            // Activar la pestaña actual
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Manejar la búsqueda en el dashboard
    document.getElementById('student-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                showNotification('Búsqueda', `Buscando: "${searchTerm}"`, 'info');
            }
        }
    });
}

/**
 * Carga los datos para el dashboard de alumno/padre
 */
function loadStudentDashboardData() {
    // Cargar el plan de entrenamiento diario
    const planBody = document.querySelector('.plan-body');
    if (planBody) {
        let html = '';
        appData.student.trainingPlan.exercises.forEach((exercise, index) => {
            html += `
                <div class="training-exercise">
                    <label class="exercise-check">
                        <input type="checkbox" id="exercise${index + 1}" ${exercise.completed ? 'checked' : ''}>
                        <span class="custom-checkbox"></span>
                    </label>
                    <div class="exercise-info">
                        <h4 class="exercise-title">${exercise.name}</h4>
                        <p class="exercise-description">${exercise.description}</p>
                    </div>
                    <div class="exercise-meta">
                        <span class="exercise-duration">${exercise.duration}</span>
                        <span class="exercise-difficulty ${exercise.difficulty}">${
                            exercise.difficulty === 'easy' ? 'Fácil' : 
                            (exercise.difficulty === 'medium' ? 'Medio' : 'Difícil')
                        }</span>
                    </div>
                </div>
            `;
        });
        planBody.innerHTML = html;

        // Añadir event listeners a los checkboxes
        const checkboxes = document.querySelectorAll('.exercise-check input');
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Contar cuántos ejercicios están marcados como completados
                const completed = document.querySelectorAll('.exercise-check input:checked').length;
                const total = checkboxes.length;
                
                // Actualizar la barra de progreso
                const percentage = (completed / total) * 100;
                progressBar.style.width = percentage + '%';
                progressText.textContent = completed + '/' + total + ' completados';
            });
        });
    }

    // Cargar la lista de eventos
    const eventsContainer = document.getElementById('student-events-container');
    if (eventsContainer) {
        let html = '';
        appData.student.events.forEach(event => {
            html += `
                <div class="event-card">
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.name}">
                        <div class="event-date">
                            <div class="event-day">${event.date.split('/')[0]}</div>
                            <div class="event-month">${getMonthAbbr(event.date.split('/')[1])}</div>
                        </div>
                    </div>
                    <div class="event-content">
                        <h4 class="event-title">${event.name}</h4>
                        <div class="event-info">
                            <div class="event-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-info-item">
                                <i class="fas fa-users"></i>
                                <span>${event.participants}</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-footer">
                        <span class="event-status ${event.status}">${event.status === 'upcoming' ? 'Próximo' : (event.status === 'in-progress' ? 'En curso' : 'Completado')}</span>
                        <a href="#" class="btn-read-more" data-event-id="${event.id}">Detalles <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        eventsContainer.innerHTML = html;

        // Añadir event listeners a los enlaces de detalles
        document.querySelectorAll('.btn-read-more[data-event-id]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const eventId = this.getAttribute('data-event-id');
                const event = appData.student.events.find(e => e.id === eventId);
                if (event) {
                    showModal(event.name, `
                        <p><strong>Fecha:</strong> ${event.date}</p>
                        <p><strong>Hora:</strong> ${event.time}</p>
                        <p><strong>Ubicación:</strong> ${event.location}</p>
                        <p><strong>Participantes:</strong> ${event.participants}</p>
                        <p><strong>Descripción:</strong> ${event.description}</p>
                    `, 'info');
                }
            });
        });
    }

    // Cargar los comentarios del entrenador
    const commentsContainer = document.getElementById('coach-comments-container');
    if (commentsContainer) {
        let html = '';
        appData.student.coachComments.forEach(comment => {
            html += `
                <div style="padding: 1rem; border-left: 4px solid var(--primary-color); background-color: rgba(0,102,204,0.05); margin-bottom: 1.5rem;">
                    <p style="font-style: italic;">
                        "${comment.comment}"
                    </p>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem; color: var(--gray-600);">
                        <span>${comment.coach} (Entrenador)</span>
                        <span>${comment.date}</span>
                    </div>
                </div>
            `;
        });
        commentsContainer.innerHTML = html;
    }

    // Cargar el horario de clases
    const scheduleTable = document.getElementById('student-schedule-table');
    if (scheduleTable) {
        let html = '';
        appData.student.schedule.forEach(cls => {
            html += `
                <tr>
                    <td>${cls.day}</td>
                    <td>${cls.time}</td>
                    <td>${cls.activity}</td>
                    <td>${cls.location}</td>
                    <td>${cls.coach}</td>
                </tr>
            `;
        });
        scheduleTable.innerHTML = html;
    }
}

/**
 * Utilidades
 */

/**
 * Formatea una fecha en formato YYYY-MM-DD a DD/MM/YYYY
 * @param {string} dateString - La fecha en formato YYYY-MM-DD
 * @returns {string} La fecha formateada
 */
function formatDateString(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

/**
 * Obtiene la abreviatura del mes según su número
 * @param {string} monthNumber - El número del mes (1-12)
 * @returns {string} La abreviatura del mes
 */
function getMonthAbbr(monthNumber) {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return months[parseInt(monthNumber) - 1];
}

/**
 * Obtiene el nombre de categoría según su código
 * @param {string} categoryCode - El código de la categoría
 * @returns {string} El nombre de la categoría
 */
function getCategoryName(categoryCode) {
    const categories = {
        'announcement': 'Anuncio',
        'achievement': 'Logro',
        'news': 'Noticia',
        'event': 'Evento'
    };
    return categories[categoryCode] || categoryCode;
}

/**
 * Calcula el promedio de progreso de un estudiante
 * @param {Object} progress - Objeto con los valores de progreso
 * @returns {number} El promedio de progreso
 */
function calculateAverageProgress(progress) {
    if (!progress) return 0;
    const sum = progress.physical + progress.technical + progress.tactical;
    return Math.round(sum / 3);
}