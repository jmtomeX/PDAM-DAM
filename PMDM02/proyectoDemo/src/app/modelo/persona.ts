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
        this.personas = JSON.parse(data.data);
        return data;
    }

    clonar(): Persona {
        return null;
    }

}
