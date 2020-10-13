import { NullTemplateVisitor } from '@angular/compiler';

export class Persona {
    constructor(
        public nombre: string,
        public apellido: string,
        public id: number = 1
    ) {

    }
    private static personas = 0;
    public static fromJson(data): Persona {
        return null;
    }

    clonar(persona): Persona {
        return new Persona(persona.id, persona.nombre, persona.apellido);
    }

}
