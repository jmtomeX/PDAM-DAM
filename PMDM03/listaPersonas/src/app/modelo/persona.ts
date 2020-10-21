import { NullTemplateVisitor } from '@angular/compiler';

export class Persona {

    constructor(
        public nombre: string,
        public apellido: string,
        public id: number = -1
    ) {

    }
    public static personas = 0;

    // public static fromJson(data): Persona {
    //     const newData = JSON.parse(data);
    //     return newData;
    // }


    clonar(persona): Persona {
        return new Persona(persona.id, persona.nombre, persona.apellido);
    }

}
