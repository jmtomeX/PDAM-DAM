import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Persona } from '../modelo/persona';
import { ServicioPersonasService } from '../servicios/servicio-personas.service';
import { ModalPersonaPage } from '../modal-persona/modal-persona.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicio: ServicioPersonasService, public modalCtrl: ModalController, public router: Router) { }

  async addPersona() {
    // this.servicio.addPersona(new Persona('Prueba desde ', 'servicio'));
    // lanzar modal
    const modal = await this.modalCtrl.create({
      // modal vacia
      component: ModalPersonaPage
    });
    await modal.present();
    // recoger datos del modal cuando se cierra
    const { data } = await modal.onWillDismiss();
    console.log(data);

    // Añadir persona
    if (data) {
      const idPerson = this.servicio.personas.length + 1;
      console.log(idPerson);
      this.servicio.addPersona(new Persona(data.data.nombre, data.data.apellido, idPerson));
    }
  }

  public deletedPerson(item: Persona) {
    this.servicio.deletePerson(item);
  }

  public navegar(id) {
    console.log(id);

    this.router.navigate(['/detalle-persona/' + id]);
  }

}
