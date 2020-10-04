import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePersonaPage } from './detalle-persona.page';

describe('DetallePersonaPage', () => {
  let component: DetallePersonaPage;
  let fixture: ComponentFixture<DetallePersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
