import { Injectable } from '@angular/core';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class ServicioPersonasService {

  personas: Persona[];

  constructor() {
    this.personas = [
      new Persona('Angel', 'Pepin'),
      new Persona('María', 'Lucida'),
      new Persona('Charlie', 'Walk'),
      new Persona('Louise', 'Tist'),
    ];
  }

  public addPersona(item: Persona) {
    this.personas = [...this.personas, item];
  }

  public getPersona(id): Persona {
    return this.personas.find(persona => persona.id === id);
  }

  public deletePerson(item: Persona) {
    // recoger la posición del array
    const index = this.personas.indexOf(item);
    // divider el array en inicio y fin
    this.personas = [...this.personas.slice(0, index), ...this.personas.slice(index + 1)];
  }
}
