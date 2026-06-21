class PerfilInfantil {
    getContenido() {
        return {
            enfoque: "Integral: Enfocado en el conocimiento del cuerpo, límites, emociones y vínculos seguros. Gradual según desarrollo.",
            menu: [
                { titulo: "Pubertad", detalle: "Menstruación, cambios corporales, higiene biológica y emociones." },
                { titulo: "Consentimiento Básico", detalle: "Nadie debe tocar tu cuerpo sin permiso; aprender a decir 'no' y pedir ayuda al adulto de confianza." },
                { titulo: "Internet y Autocuidado", detalle: "Privacidad digital, imágenes íntimas y cómo reaccionar ante situaciones incómodas." },
                { titulo: "Buen Trato", detalle: "Distinguir afecto, presión, manipulación y violencia." }
            ],
            acompanamiento: "Ruta para Cuidadores: Escuchar sin burlas, responder con lenguaje simple y sin tabúes, no culpabilizar.",

            soporte: "Espacios Amigables Tarapacá: Atención confidencial, gratuita y cercana para el cuidado de tu desarrollo (10 a 13 años).",
            cuandoConsultar: "Dudas sobre tu primera menstruación (menarquia), dolores intensos en tu periodo, cambios corporales que te asusten, o si alguien te hace sentir incómoda, presionada o asustada en internet o en persona."
        };
    }
}

class PerfilAdolescente {
    getContenido() {
        return {
            enfoque: "Integral: Decisiones informadas, relaciones respetuosas, prevención de riesgos y fomento de la autonomía.",
            menu: [
                { titulo: "Consentimiento Pleno", detalle: "Debe ser libre, claro y reversible. La presión, el control o el miedo NO son consentimiento." },
                { titulo: "Prevención Activa", detalle: "Uso correcto del condón, métodos anticonceptivos y acceso a anticoncepción de emergencia." },
                { titulo: "ITS y Salud", detalle: "Señales de alerta, testeo rápido y búsqueda de atención médica sin vergüenza ni mitos." },
                { titulo: "Salud Mental y Vínculos", detalle: "Manejo de celos, sexting seguro, prevención de violencia en el pololeo y redes de apoyo." }
            ],
            acompanamiento: "Ruta para Padres/Docentes: Promover el pensamiento crítico sobre el cuerpo, la igualdad y la responsabilidad sin invadir.",

            soporte: "Espacios Amigables & CESFAM Tarapacá: Consejería y entrega de métodos anticonceptivos/píldora de emergencia para jóvenes de 14 a 18 años.",
            cuandoConsultar: "Inicio de vida sexual activa, consejería o entrega confidencial de métodos anticonceptivos (incluida la píldora de emergencia), sospechas de Infecciones de Transmisión Sexual (ITS) o control de violencia en el pololeo."
        };
    }
}

class PerfilAdulto {
    getContenido() {
        return {
            enfoque: "Integral: Autonomía, bienestar sexual, co-responsabilidad, placer cuidado y relaciones adultas sanas.",
            menu: [
                { titulo: "Planificación Familiar", detalle: "Comparativa de métodos, continuidad de uso y guía en la consulta profesional." },
                { titulo: "Controles Preventivos", detalle: "Testeo oportuno de ITS, examen PAP, vacuna VPH y chequeos preventivos de mama." },
                { titulo: "Relaciones Adultas Sanas", detalle: "Comunicación, acuerdos mutuos, límites claros y autocuidado emocional." },
                { titulo: "Derechos Reproductivos", detalle: "Confidencialidad en la atención, trato digno e información científica oportuna." }
            ],
            acompanamiento: "Ruta de Apoyo: Acompañar en el ejercicio autónomo de controles ginecológicos y derivar ante dolores de pelvis persistentes.",

            soporte: "Red de Salud Tarapacá: Acceso a Matronería en CESFAM y derivaciones oportunas ante sospechas de ITS, dolores o dudas de anticoncepción.",
            cuandoConsultar: "Controles preventivos ginecológicos anuales (Papanicolaou - PAP, examen físico de mamas), planificación familiar, dolores ginecológicos severos o persistentes, o para orientación sobre derechos reproductivos."
        };
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