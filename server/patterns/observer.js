// Sujeto (Subject) que mantiene la lista de observadores y propaga las alertas
class Subject {
    constructor() {
        this.observers = [];
    }

    // Suscribir un nuevo contacto de emergencia
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Notificar a todos los observadores registrados con la información de la alerta
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }

    // Recuperar la lista de nombres para auditoría y visualización
    getListaNombres() {
        return this.observers.map(o => o.nombre);
    }
}

// Observador concreto que representa a los contactos de emergencia
class ContactoObserver {
    constructor(nombre) {
        this.nombre = nombre;
    }

    // Método que se activa síncronamente al recibir la alerta
    update(data) {
        // En un entorno de producción móvil real, aquí se llamaría al SDK de SMS o Push Notification
        console.log(`[SMS Enviado a ${this.nombre}]: ${data.mensaje} | Ubicación: ${data.ubicacion}`);
    }
}

// Exportamos de forma explícita ambas clases como un objeto estructurado para Node.js
module.exports = {
    Subject,
    ContactoObserver
};