class PerfilInfantil {
    getContenido() {
        return {
            enfoque: "Integral: Enfocado en el conocimiento del cuerpo, límites, emociones y vínculos seguros. Gradual según desarrollo.",
            menu: [
                { titulo: "Pubertad", detalle: "Menstruación, cambios corporales, higiene biológica y manejo de emociones." },
                { titulo: "Consentimiento Básico", detalle: "Nadie debe tocar tu cuerpo sin permiso; aprender a decir 'no' y pedir ayuda a adultos de confianza." },
                { titulo: "Internet y Autocuidado", detalle: "Privacidad digital, imágenes íntimas y cómo reaccionar ante situaciones incómodas en línea." },
                { titulo: "Buen Trato", detalle: "Aprender a distinguir el afecto real de la presión, la manipulación y la violencia." }
            ],
            acompanamiento: "Ruta para Cuidadores: Escuchar sin burlas, responder con lenguaje simple y sin tabúes, no culpabilizar.",
            soporte: "Espacios Amigables Tarapacá: Atención confidencial, gratuita y cercana para el cuidado de tu desarrollo (10 a 13 años)."
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
            soporte: "Espacios Amigables & CESFAM Tarapacá: Consejería y entrega de métodos anticonceptivos/píldora de emergencia para jóvenes de 14 a 18 años."
        };
    }
}

class PerfilAdulto {
    getContenido() {
        return {
            enfoque: "Integral: Autonomía, bienestar sexual, co-responsabilidad, placer cuidado y derechos reproductivos.",
            menu: [
                { titulo: "Planificación Familiar", detalle: "Comparativa de métodos anticonceptivos a largo plazo, continuidad de uso y guía profesional." },
                { titulo: "Controles Preventivos", detalle: "Testeo periódico de ITS, examen de PAP, vacunación VPH y chequeos ginecológicos anuales." },
                { titulo: "Relaciones Adultas Sanas", detalle: "Comunicación asertiva, acuerdos mutuos, límites claros y autocuidado emocional compartido." },
                { titulo: "Derechos Sexuales", detalle: "Exigencia de atención oportuna, confidencialidad absoluta y trato digno en el sistema de salud." }
            ],
            acompanamiento: "Ruta de Apoyo: Co-responsabilidad afectiva y derivación a profesionales ante violencia de género o malestar persistente.",
            soporte: "Red de Salud Tarapacá: Acceso a Matronería en CESFAM y derivaciones oportunas ante sospechas de ITS, dolores o dudas de anticoncepción."
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