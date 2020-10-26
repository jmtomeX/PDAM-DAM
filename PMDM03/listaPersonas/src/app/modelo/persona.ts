import { NullTemplateVisitor } from '@angular/compiler';

export class Persona {

    public static totalPersonas = 0;

    constructor(
        public nombre: string,
        public apellido: string,
        public id: number = -1
    ) {
        // crear id
        // Persona.personas++;
        // if (this.id == -1) {
        //     this.id = Persona.personas;
        // }
    }

    public static fromJson(data): Persona {
        try {
            if (data.nombre && data.apellido && data.id) {
                return new Persona(data.nombre, data.apellido, data.id);
            }
            throw new TypeError('Faltan campos por recibir.');
        }
        catch (e) {
            console.log((e as Error).message);
        }
    }

    clonar(persona): Persona {
        return new Persona(persona.nombre, persona.apellido, persona.id);
    }

    public Persona() {
        Persona.totalPersonas++;
    }

    public getTotal(): number {
        return Persona.totalPersonas;
    }
}
