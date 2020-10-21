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
    this.servicio.addPersona(new Persona('Prueba desde ', 'servicio'));
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
      // let idPerson = 0;
      // if (this.servicio.personas == undefined) {
      //   idPerson = 1;
      // } else {
      //   idPerson = this.servicio.personas.length + 1;
      // }
      // console.log(idPerson);
      this.servicio.addPersona(new Persona(data.data.nombre, data.data.apellido));
    }
  }

  public deletedPerson(item: Persona) {
    this.servicio.deletePerson(item);
  }

  public navegar(id) {
    this.router.navigate(['/detalle-persona/' + id]);
  }
  public aplicarStilosPersona(persona: Persona) {
    const styles = {
      color: persona.nombre.startsWith('A') ? 'red' : 'Blue',
    };
    return styles;
  }
  public log() {
    console.log('click');
  }
}
