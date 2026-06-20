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

panicoSubject.subscribe(new ContactoObserver("Mamá"));
panicoSubject.subscribe(new ContactoObserver("Papá"));
panicoSubject.subscribe(new ContactoObserver("Amiga"));

module.exports = panicoSubject;