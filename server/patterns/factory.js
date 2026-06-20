class PerfilInfantil {
    getContenido() {
        return "Contenido: Higiene básica, pubertad, privacidad del cuerpo y cambios corporales. Recuerda consultar siempre con un adulto o en un Espacio Amigable si tienes dudas.";
    }
}

class PerfilAdolescente {
    getContenido() {
        return "Contenido: Ciclo menstrual, prevención de ITS, anticoncepción y consentimiento. Información sobre decisiones informadas y relaciones sanas.";
    }
}

class PerfilAdulto {
    getContenido() {
        return "Contenido: Salud ginecológica integral, planificación familiar, prevención de ITS y controles preventivos. Foco en autonomía y bienestar a largo plazo.";
    }
}

class PerfilFactory {
    static crearPerfil(edad) {
        if (edad >= 10 && edad <= 13) return new PerfilInfantil();
        if (edad >= 14 && edad <= 18) return new PerfilAdolescente();
        return new PerfilAdulto();
    }
}

module.exports = PerfilFactory;