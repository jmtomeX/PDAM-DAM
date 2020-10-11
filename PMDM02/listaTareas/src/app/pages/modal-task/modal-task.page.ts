import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController, ModalController, NavParams } from '@ionic/angular';
import { Task } from '../../model/task';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.page.html',
  styleUrls: ['./modal-task.page.scss'],
})
export class ModalTaskPage implements OnInit {
  public title = 'Añadir nueva Tarea';
  public action = 'Añadir';
  formTask;
  task: Task;
  isUpdateTask: boolean;
  constructor(public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams) {
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
    // recoger parámetros desde el home
    this.task = navParams.get('data');
    this.isUpdateTask = navParams.get('isUpdate');
  }

  ngOnInit() {
    if (this.isUpdateTask) {
      this.title = 'Modificar Tarea';
      this.action = 'Guardar tarea';

    }

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
