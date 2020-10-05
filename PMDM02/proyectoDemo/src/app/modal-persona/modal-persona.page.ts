import { Component, OnInit } from '@angular/core';
import { } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.page.html',
  styleUrls: ['./modal-persona.page.scss'],
})
export class ModalPersonaPage implements OnInit {
  formulario;
  constructor(public formBuilder: FormBuilder) {
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
  enviar() { }
  ngOnInit() {
  }

}
