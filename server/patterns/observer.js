class Subject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }

    // Nueva función para obtener los nombres de los contactos configurados
    getListaNombres() {
        return this.observers.map(o => o.nombre);
    }
}

class ContactoObserver {
    constructor(nombre) {
        this.nombre = nombre;
    }
    
    update(data) {
        console.log(` [SMS Enviado a ${this.nombre}]: ${data.mensaje} | Ubicación: ${data.ubicacion}`);
    }
}

const panicoSubject = new Subject();

// Contactos iniciales predefinidos por la regla de negocio (RB-02)
panicoSubject.subscribe(new ContactoObserver("Mamá"));
panicoSubject.subscribe(new ContactoObserver("Papá"));

// Exportamos la clase ContactoObserver para poder instanciarla dinámicamente en el server
module.exports = { panicoSubject, ContactoObserver };