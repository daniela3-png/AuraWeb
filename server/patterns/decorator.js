function decorarAlerta(alerta) {

    alerta.severidad = "CRÍTICA";
    alerta.mensaje = `[${alerta.severidad}] ` + alerta.mensaje;
    alerta.timestamp = new Date().toLocaleTimeString();
    alerta.esAutenticada = true;
    
    return alerta;
}

module.exports = decorarAlerta;