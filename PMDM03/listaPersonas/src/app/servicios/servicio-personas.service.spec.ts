import { TestBed } from '@angular/core/testing';

import { ServicioPersonasService } from './servicio-personas.service';

describe('ServicioPersonasService', () => {
  let service: ServicioPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
