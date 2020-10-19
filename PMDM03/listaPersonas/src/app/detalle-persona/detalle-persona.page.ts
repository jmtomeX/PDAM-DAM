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
  constructor(private activatedRoute: ActivatedRoute, private servicio: ServicioPersonasService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('myId');
    this.persona = this.servicio.getPersona(this.id);
    // console.log('detalla-persona ' + JSON.stringify(this.persona));

  }

}
