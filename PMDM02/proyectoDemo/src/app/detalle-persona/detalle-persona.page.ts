import { Component, OnInit } from '@angular/core';
import { ServicioPersonasService } from '../servicios/servicio-personas.service';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../modelo/persona';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.page.html',
  styleUrls: ['./detalle-persona.page.scss'],
})
export class DetallePersonaPage implements OnInit {
  private id;
  public persona: Persona;
  constructor(private activatedRouter: ActivatedRoute, private servicio: ServicioPersonasService) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('myId');
    console.log('detalle-persona ngOnInit ' + this.id);
    this.persona = this.servicio.getPersona(this.id);
    console.log('detalla-persona ' + this.persona);

  }

}
