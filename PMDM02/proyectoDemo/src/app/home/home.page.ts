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

    // Añadir persona?

  }

}
