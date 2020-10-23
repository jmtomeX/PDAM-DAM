import { Injectable, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { HttpServiceService } from './http-services-service';
import { StorageServiceService } from './storage-service.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServicioPersonasService {

  personas: Persona[];
  loading: any;
  constructor(
    private servicioStorage: StorageServiceService,
    private servicioHttp: HttpServiceService,
    private loadingController: LoadingController
  ) {
    // this.personas.length = Persona.personas;
    // this.personas = [
    //   new Persona('Jose', 'Peter')
    // ];

    // cargar datos si hay del storage
    // this.servicioStorage.getObject('personas')
    //   .then((data) => {
    //     if (data) {
    //       // tslint:disable-next-line: no-angle-bracket-type-assertion
    //       this.personas = <Persona[]><unknown>data;
    //     }
    //   });

    // al ser los constructores asincronos hay que utilizar then, no async await.
    // CArgar el storage si hay algo
    this.servicioStorage.getObject('personas')
      .then((data) => {
        // hay que castear a persona porque devuelve tipo any
        //  if (data) { this.personas = <Persona[]> <unknown> data; }
        if (data) { this.personas = (data as unknown as Persona[]); }

      });


    this.presentLoading().then(() => {
      // cargar datos desde el servidor
      this.servicioHttp.getList().subscribe(
        datos => {
          console.log(datos);
          // map aplica una función
          // tslint:disable-next-line: align
          datos.map((persona) => Persona.fromJson(persona));
          this.personas = datos;
          // cargar el storage al obtener la base de datos
          this.servicioStorage.setObject('personas', this.personas);
        },
        (error) => console.log(error)
      );
    });


  }

  async presentLoading() {
    const loading = await this.loadingController.create({

      message: 'Cargando datos...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  public addPersona(item: Persona) {
    this.servicioHttp.createItem(item).subscribe((data) => {
      // console.log(data);
      this.servicioStorage.setObject('personas', this.personas)
        .then(() => {
          // añadir persona al array
          this.personas = [...this.personas, item];
        })
        .catch((error) => {
          // opción 1
          // el storage no es importante y actualizo this.personas
          // this.personas = [...this.personas, item];

          // opción 2
          // el storage si que es importante
          // eliminar el item que se ha creado y no se actualiza personas
          // this.servicioHttp.deleteItem(item.id); // <-- el id no está aquí está en data
          this.servicioHttp.deleteItem(data.id);

        });
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
    this.personas = [...this.personas.slice(0, index), ...this.personas.slice(index + 1)];

    // eliminamos de la base de datos
    this.servicioHttp.deleteItem(item.id).subscribe();

    // pasamos a string para eliminar del storage
    const itemString = JSON.stringify(item);
    this.servicioStorage.removeItem(itemString);
  }
}
