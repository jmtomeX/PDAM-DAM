import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Task } from '../../model/task';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.page.html',
  styleUrls: ['./modal-task.page.scss'],
})
export class ModalTaskPage implements OnInit {
  title = 'Añadir nueva Tarea';
  actionSend = 'Guardar';
  @Input() isUpdateTask: boolean;
  @Input() data: Task;

  formTask;

  // tslint:disable-next-line: max-line-length
  constructor(public formBuilder: FormBuilder, public modalCtrl: ModalController, private activatedRoute: ActivatedRoute) {


  }

  ngOnInit() {
    if (this.isUpdateTask) {
      this.title = 'Modificar Tarea';
      this.actionSend = 'Modificar';
    }
    console.log('datos en el modal ' + JSON.stringify(this.data) + ' ' + this.isUpdateTask);
    this.formTask = this.formBuilder.group({
      description: [this.isUpdateTask ? this.data.description : '',
      Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.required
      ]
      )],
      isImportant: ([this.isUpdateTask ? this.data.isImportant : false,
      Validators.compose([])
      ])
    });
  }
  ionViewWillEnter() {
  }

  public exitModal() {
    this.modalCtrl.dismiss();
  }

  public sendTask(value) {
    // devolver la informacion a la vista home
    console.log(value);
    this.modalCtrl.dismiss({
      // tslint:disable-next-line: object-literal-key-quotes
      data: value
    });
  }
}
