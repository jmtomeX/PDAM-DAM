import { Injectable } from '@angular/core';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class ServicioPersonasService {

  personas: Persona[];

  constructor() {
    this.personas = [
      new Persona('Angel', 'Pepin', 1),
      new Persona('María', 'Lucida', 2),
      new Persona('Charlie', 'Walk', 3),
      new Persona('Louise', 'Tist', 4),
    ];
  }

  public addPersona(item: Persona) {
    this.personas = [...this.personas, item];
  }

  public getPersona(id): Persona {
    const personaE = this.personas.find(persona => persona.id === id);
    console.log('desde servicio getPersona ' + personaE);
    return personaE;
  }

  public deletePerson(item: Persona) {
    // recoger la posición del array
    const index = this.personas.indexOf(item);
    // divider el array en inicio y fin
    this.personas = [...this.personas.slice(0, index), ...this.personas.slice(index + 1)];
  }
}
