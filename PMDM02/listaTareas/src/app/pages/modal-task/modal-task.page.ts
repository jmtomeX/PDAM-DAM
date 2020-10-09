import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.page.html',
  styleUrls: ['./modal-task.page.scss'],
})
export class ModalTaskPage implements OnInit {
  public title = 'Añadir nueva Tarea';
  public action = 'Añadir';
  formTask;
  constructor(public formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.formTask = formBuilder.group({
      description: ['',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(2),
          Validators.required
        ]
        )],
        isImportant: (['',
        Validators.compose([])
      ])
    });
  }

  ngOnInit() {
  }

  public exitModal() {
    this.modalCtrl.dismiss();
  }
  public sendTask(value) {
    console.log(value);
    // devolver la informacion a la vista home
    this.modalCtrl.dismiss({
      data: value
    });
  }
}
