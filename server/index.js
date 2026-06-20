const express = require('express');
const app = express();
const path = require('path');
const PerfilFactory = require('./patterns/factory');
const decorarAlerta = require('./patterns/decorator');
// Cambiamos el requerimiento para desestructurar los nuevos componentes del observer
const { panicoSubject, ContactoObserver } = require('./patterns/observer');

app.use(express.json());
app.use(express.static('public'));

let historialUsuarios = {}; 

// [RF-01, RF-03, RB-01] Consultar consejos educativos y perfiles dinámicos
app.get('/api/perfil/:edad', (req, res) => {
    const perfil = PerfilFactory.crearPerfil(parseInt(req.params.edad));
    res.json({ perfil_tipo: perfil.constructor.name, contenido: perfil.getContenido() });
});

// [RF-04] Configurar contactos de emergencia: Obtener lista
app.get('/api/contactos', (req, res) => {
    res.json(panicoSubject.getListaNombres());
});

// [RF-04] Configurar contactos de emergencia: Agregar uno nuevo
app.post('/api/contactos', (req, res) => {
    const { nombre } = req.body;
    if (nombre) {
        panicoSubject.subscribe(new ContactoObserver(nombre));
        console.log(`+ Nuevo contacto configurado en el sistema: ${nombre}`);
    }
    res.json({ estado: "exitoso", contactos: panicoSubject.getListaNombres() });
});

// [RF-02] Ruta para registrar, borrar o consultar datos menstruales/citas
app.post('/api/datos', (req, res) => {
    const { usuario, tipo, inicio, fin, fecha, index, accion } = req.body;
    if (!historialUsuarios[usuario]) historialUsuarios[usuario] = { citas: [], ciclos: [] };
    
    if (accion === 'eliminar') {
        historialUsuarios[usuario][tipo === 'cicle' || tipo === 'ciclo' ? 'ciclos' : 'citas'].splice(index, 1);
    } else {
        if (tipo === 'ciclo') {
            const diffDays = Math.ceil((new Date(fin) - new Date(inicio)) / (1000 * 60 * 60 * 24)) + 1;
            historialUsuarios[usuario].ciclos.push({ inicio, fin, duracion: diffDays });
        } else {
            document = historialUsuarios[usuario].citas.push({ fecha });
        }
    }
    res.json({ historial: historialUsuarios[usuario] });
});

app.get('/api/historial/:usuario', (req, res) => {
    res.json(historialUsuarios[req.params.usuario] || { citas: [], ciclos: [] });
});

// [RF-05, RF-06, RNF-02] Botón de pánico con Decorator + Observer
app.get('/api/panico', (req, res) => {
    panicoSubject.notify(decorarAlerta({ mensaje: "¡Emergencia detectada! Necesito ayuda.", ubicacion: "-20.21, -70.14" }));
    res.send("🚨 ¡Alerta crítica distribuida a todos los contactos de emergencia!");
});

app.listen(3000, () => console.log('Aura corriendo de forma completa en http://localhost:3000'));