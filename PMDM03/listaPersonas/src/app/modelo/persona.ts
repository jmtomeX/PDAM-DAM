import { NullTemplateVisitor } from '@angular/compiler';

export class Persona {

    constructor(
        public nombre: string,
        public apellido: string,
        public id: number = -1
    ) {

    }
    public static personas = 0;

    public static fromJson(data): Persona {
        if (data.nombre && data.apellido && data.id) {
            return new Persona(data.nombre, data.apellido, data.id);
        }
        try {
            throw new TypeError('Faltan campos por recibir.');
        }
        catch (e) {
            console.log(( e as Error).message);
        }

    }

    clonar(persona): Persona {
        return new Persona(persona.nombre, persona.apellido, persona.id);
    }
}
