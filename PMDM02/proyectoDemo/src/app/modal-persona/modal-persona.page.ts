import { Component, OnInit } from '@angular/core';
import { } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.page.html',
  styleUrls: ['./modal-persona.page.scss'],
})
export class ModalPersonaPage implements OnInit {
  formulario;
  // para el dismiss se inyecta el modalCtrl
  constructor(public formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.formulario = formBuilder.group({
      nombre: ['',
        Validators.compose([Validators.maxLength(30),
        Validators.minLength(2),
        Validators.required,
        Validators.pattern('')])],
      apellido: ['',
        Validators.compose([Validators.maxLength(30),
        Validators.minLength(2),
        Validators.required,
        Validators.pattern('')])]
    });

  }
  ngOnInit() {
  }
  public cerrar() {
    this.modalCtrl.dismiss();
  }
  public enviar(value) { 
    this.modalCtrl.dismiss({
      // devolver la información a home.ts
      data: value
    });
  }

}
