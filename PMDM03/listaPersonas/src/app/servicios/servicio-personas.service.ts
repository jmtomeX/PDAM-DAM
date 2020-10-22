import { Injectable } from '@angular/core';
import { Persona } from '../modelo/persona';
import { HttpServiceService } from './http-services-service';
import { StorageServiceService } from './storage-service.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicioPersonasService {

  personas: Persona[];

  constructor(
    private servicioStorage: StorageServiceService,
    private servicioHttp: HttpServiceService
  ) {
    // this.personas.length = Persona.personas;14
    // this.personas = [
    //   new Persona('Jose', 'Peter')
    // ];

    // cargar datos desde el servidor
    this.servicioHttp.getList().subscribe(
      datos => {
        console.log(datos);
        // map aplica una función
        // tslint:disable-next-line: align
        datos.map((persona) => Persona.fromJson(persona));
        this.personas = datos;
      },
      (error) => console.log(error)
    );

    // cargar datos si hay del storage
    // this.servicioStorage.getObject('personas')
    //   .then((data) => {
    //     if (data) {
    //       // tslint:disable-next-line: no-angle-bracket-type-assertion
    //       this.personas = <Persona[]><unknown>data;
    //     }
    //   });

  }

  public addPersona(item: Persona) {
    this.personas = [...this.personas, item];
    this.servicioHttp.createItem(item).subscribe((data) => {
      console.log(data);
    },
      (error) => {
        console.log(error);

      }
    );
    // this.servicioStorage.setObject('personas', this.personas);
  }

  public getPersona(id): Persona {
    // tslint:disable-next-line: triple-equals
    const personaM = this.personas.find(persona => persona.id == id);
    return personaM;
  }

  public deletePerson(item: Persona) {
    // recoger la posición del array
    const index = this.personas.indexOf(item);
    // dividir el array en inicio y fin
    // this.personas = [...this.personas.slice(0, index), ...this.personas.slice(index + 1)];
    // this.servicioHttp.deleteItem(item).subscribe();
    // this.servicioStorage.setObject('personas', this.personas);
  }
}
