const express = require('express');
const path = require('path');

// IMPORTACIÓN DE NUESTROS PATRONES DE DISEÑO (Estructura Modular Limpia)
const PerfilFactory = require('./patterns/factory');
const decorarAlerta = require('./patterns/decorator');
const { Subject, ContactoObserver } = require('./patterns/observer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Base de datos local simulada en memoria del servidor
const usuariosDB = {
    "selena": { nombre: "Selena", edad: 11 },
    "aurora": { nombre: "Aurora", edad: 15 },
    "ema": { nombre: "Ema", edad: 22 }
};

// Historial transaccional aislado por cada usuario
const ciclosDB = {};
const citasDB = {};

// Instanciar el canal de observadores del Botón de Pánico
const panicoSubject = new Subject();
panicoSubject.subscribe(new ContactoObserver("Mamá (Contacto SOS)"));
panicoSubject.subscribe(new ContactoObserver("Papá (Contacto SOS)"));

// 1. Endpoint de Login / Autenticación
app.post('/api/login', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "Nombre requerido" });

    const key = nombre.toLowerCase();
    const usuario = usuariosDB[key];

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ error: "Usuario no registrado en este equipo. ¿Deseas registrarte?" });
    }
});

// 2. Endpoint de Registro con fecha de nacimiento (Cálculo de edad automático)
app.post('/api/registro', (req, res) => {
    const { nombre, fechaNacimiento } = req.body;
    if (!nombre || !fechaNacimiento) {
        return res.status(400).json({ error: "Nombre y fecha de nacimiento requeridos." });
    }

    // Cálculo dinámico de edad en el servidor
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    // Regla de Negocio (RB-03, 04, 05): Diseñado responsablemente para mayores de 10 años
    if (edad < 10) {
        return res.status(400).json({ error: `La usuaria tiene ${edad} años. Aura está diseñado de forma responsable para usuarias desde los 10 años.` });
    }

    const key = nombre.toLowerCase();
    usuariosDB[key] = { nombre, edad };

    res.status(201).json(usuariosDB[key]);
});

// 3. Endpoint del Patrón Factory Method (Mapeador de perfiles adaptativos por edad)
app.get('/api/perfil/:edad', (req, res) => {
    const edad = parseInt(req.params.edad);
    
    // El Factory crea el perfil concreto sin que Express conozca su estructura
    const perfil = PerfilFactory.crearPerfil(edad);
    
    res.json({
        perfil_tipo: perfil.constructor.name,
        contenido: perfil.getContenido()
    });
});

// 4. Endpoints para el Registro de Ciclos Menstruales
app.post('/api/ciclo', (req, res) => {
    const { usuario, fechaInicio, fechaTermino } = req.body;
    if (!usuario || !fechaInicio || !fechaTermino) {
        return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    // Validar regla de negocio de fechas
    if (new Date(fechaTermino) < new Date(fechaInicio)) {
        return res.status(400).json({ error: "La fecha de término no puede ser anterior a la de inicio." });
    }

    const fechaIni = new Date(fechaInicio);
    const fechaTer = new Date(fechaTermino);
    const duracion = Math.round((fechaTer - fechaIni) / (1000 * 60 * 60 * 24)) + 1;

    const key = usuario.toLowerCase();
    if (!ciclosDB[key]) ciclosDB[key] = [];

    const nuevoCiclo = { fechaInicio, fechaTermino, duracion };
    ciclosDB[key].push(nuevoCiclo);

    res.status(201).json(nuevoCiclo);
});

app.get('/api/ciclos/:usuario', (req, res) => {
    const key = req.params.usuario.toLowerCase();
    res.json(ciclosDB[key] || []);
});

// 5. Endpoints para la Agenda Médica Preventiva
app.post('/api/cita', (req, res) => {
    const { usuario, fecha, motivo } = req.body;
    if (!usuario || !fecha || !motivo) {
        return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    const key = usuario.toLowerCase();
    if (!citasDB[key]) citasDB[key] = [];

    const nuevaCita = { fecha, motivo };
    citasDB[key].push(nuevaCita);

    res.status(201).json(nuevaCita);
});

app.get('/api/citas/:usuario', (req, res) => {
    const key = req.params.usuario.toLowerCase();
    res.json(citasDB[key] || []);
});

app.delete('/api/cita/:usuario/:index', (req, res) => {
    const key = req.params.usuario.toLowerCase();
    const index = parseInt(req.params.index);

    if (citasDB[key] && citasDB[key][index] !== undefined) {
        citasDB[key].splice(index, 1);
        return res.status(200).json({ mensaje: "Cita médica eliminada con éxito." });
    }
    res.status(404).json({ error: "Cita no encontrada." });
});

// 6. Endpoint de Activación Crítica del Botón de Pánico SOS (Decorator + Observer)
app.get('/api/panico', (req, res) => {
    const alertaBase = {
        mensaje: "¡Emergencia detectada! Necesito ayuda urgente.",
        ubicacion: "-20.21, -70.14" // Geoposición de simulación (Iquique, Tarapacá)
    };

    // DECORATOR: Enriquecemos la alerta con timestamp, firma y severidad crítica
    const alertaDecorada = decorarAlerta(alertaBase);

    // OBSERVER: Propagación masiva de la alerta decorada a todos los contactos suscritos
    panicoSubject.notify(alertaDecorada);

    res.json({
        alerta: alertaDecorada,
        contactosNotificados: panicoSubject.getListaNombres()
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Corriendo de forma segura en: http://localhost:${PORT}`);
    });
}

module.exports = app;