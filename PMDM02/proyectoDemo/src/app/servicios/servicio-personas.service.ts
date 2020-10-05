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
}
