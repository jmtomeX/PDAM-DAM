import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPersonaPage } from './modal-persona.page';

describe('ModalPersonaPage', () => {
  let component: ModalPersonaPage;
  let fixture: ComponentFixture<ModalPersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPersonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
