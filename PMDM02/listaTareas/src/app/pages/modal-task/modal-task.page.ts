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

    if (this.isUpdateTask) {
      this.title = 'Modificar Tarea';
      this.actionSend = 'Modificar';
    }
  }
  ionViewWillEnter() {
  }

  public exitModal() {
    this.modalCtrl.dismiss();
  }

  public sendTask(value) {
    // devolver la informacion a la vista home
    this.modalCtrl.dismiss({
      // tslint:disable-next-line: object-literal-key-quotes
      data: value
    });
  }
}
