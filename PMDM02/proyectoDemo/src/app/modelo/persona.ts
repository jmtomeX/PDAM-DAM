import { NullTemplateVisitor } from '@angular/compiler';

export class Persona {
    private static personas = 0;
    constructor(
        public nombre: string,
        public apellido: string,
        public id: number= -1
    ) {

    }

    clonar(): Persona {
        return null;
    }

    public static fromJson(data): Persona {
        return null;
    }

}
