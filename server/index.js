const express = require('express');
const app = express();
const path = require('path');
const PerfilFactory = require('./patterns/factory');
const decorarAlerta = require('./patterns/decorator');
const panicoSubject = require('./patterns/observer');

app.use(express.json());
app.use(express.static('public'));

// Almacenamiento aislado
let historialUsuarios = {}; 

app.get('/api/perfil/:edad', (req, res) => {
    const perfil = PerfilFactory.crearPerfil(parseInt(req.params.edad));
    res.json({ perfil_tipo: perfil.constructor.name, contenido: perfil.getContenido() });
});

// Ruta única para registrar, borrar o consultar datos
app.post('/api/datos', (req, res) => {
    const { usuario, tipo, inicio, fin, fecha, index, accion } = req.body;
    if (!historialUsuarios[usuario]) historialUsuarios[usuario] = { citas: [], ciclos: [] };
    
    if (accion === 'eliminar') {
        historialUsuarios[usuario][tipo === 'ciclo' ? 'ciclos' : 'citas'].splice(index, 1);
    } else {
        if (tipo === 'ciclo') {
            const diffDays = Math.ceil((new Date(fin) - new Date(inicio)) / (1000 * 60 * 60 * 24)) + 1;
            historialUsuarios[usuario].ciclos.push({ inicio, fin, duracion: diffDays });
        } else {
            historialUsuarios[usuario].citas.push({ fecha });
        }
    }
    res.json({ historial: historialUsuarios[usuario] });
});

app.get('/api/historial/:usuario', (req, res) => {
    res.json(historialUsuarios[req.params.usuario] || { citas: [], ciclos: [] });
});

app.get('/api/panico', (req, res) => {
    panicoSubject.notify(decorarAlerta({ mensaje: "Auxilio", ubicacion: "-20.21, -70.14" }));
    res.send("Alerta enviada.");
});

app.listen(3000, () => console.log('Aura en http://localhost:3000'));