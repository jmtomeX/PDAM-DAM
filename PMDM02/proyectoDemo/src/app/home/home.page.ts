import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Persona } from '../modelo/persona';
import { ServicioPersonasService } from '../servicios/servicio-personas.service';
import { ModalPersonaPage } from '../modal-persona/modal-persona.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicio: ServicioPersonasService, public modalCtrl: ModalController) { }

  async addPersona() {
    console.log('home-page addPersona');
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

    // Añadir persona?
    if (data) {
      this.servicio.addPersona(new Persona(data.data.nombre, data.data.apellido));
    }
  }

  public deletedPerson(item: Persona) {
    this.servicio.deletePerson(item);
  }

}
