# Aura - Salud Integral y Seguridad Ginecológica

Aura es una aplicación diseñada para brindar acompañamiento integral a niñas, adolescentes y mujeres en su salud ginecológica y seguridad personal. El sistema adapta dinámicamente sus contenidos educativos según la edad de la usuaria e integra un módulo crítico de alerta temprana (Botón de Pánico) con geolocalización automatizada ante situaciones de riesgo.

---

## Arquitectura del Proyecto

El sistema está desarrollado sobre un entorno desacoplado **Cliente-Servidor** utilizando Node.js y Express. Los datos de sesión y bitácoras de salud se administran de forma aislada localmente para garantizar el cumplimiento de los estándares de privacidad y rendimiento.

### Estructura de Directorios

```text
AURA_WEB/
├── public/                 # Capa de Presentación (Frontend)
│   ├── index.html          # Interfaz gráfica interactiva y consola de logs
│   └── style.css           # Estilos globales y paleta de colores adaptativa
├── server/                 # Capa de Lógica de Negocio (Backend)
│   ├── patterns/           # Módulos de Patrones de Diseño de Software
│   │   ├── factory.js      # Patrón Factory (Módulo Educativo Adaptativo)
│   │   ├── decorator.js    # Patrón Decorator (Enriquecimiento de Alertas)
│   │   └── observer.js     # Patrón Observer (Distribución de SMS de Auxilio)
│   └── index.js            # Punto de entrada del servidor Express y API endpoints
├── package.json            # Configuración del proyecto y dependencias
└── README.md               # Documentación guía del sistema