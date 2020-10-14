import { Component, OnInit } from '@angular/core';
import { ModalTaskPage } from '../pages/modal-task/modal-task.page';
import { ModalController } from '@ionic/angular';
import { ServiceTaskService } from '../services/service-task.service';
import { Task } from '../model/task';
import { StylesCompileDependency } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalupdate;
  withFinishedTasks;
  isUpdateTask = false;

  constructor(public modalCtrl: ModalController, public serviceTask: ServiceTaskService, public router: Router) {
  }
  ngOnInit() {

  }

  // carga de datos
  ionViewDidEnter() {
    this.checkForTasks();
  }

  public updateFinished(item: Task) {
    console.log('Cucumbers new state:' + item.finished);
    this.checkForTasks();
  }

  public deleteTask(item) {
    this.serviceTask.deleteTask(item);
  }

  // Nueva función para presentar el modal
  async presentModal(isUpdateTask, idTask?) {
    const valueTask = this.serviceTask.getTask(idTask);
    console.log(valueTask);

    const modal = await this.modalCtrl.create({
      component: ModalTaskPage,
      componentProps: {
        data: valueTask,
        isUpdate: isUpdateTask
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('Datos a guardar desde home ' + JSON.stringify(data));

    if (data) {
      if (isUpdateTask) {
        this.serviceTask.updateTask(data);
      } else {
        // tslint:disable-next-line: no-shadowed-variable
        const idTask = this.serviceTask.tasks.length + 1;
        this.serviceTask.addTask(new Task(idTask, data.data.description, data.data.isImportant));

      }
    }
  }

  private checkForTasks(): boolean {
    this.withFinishedTasks = this.serviceTask.checkForTasks();
    return this.withFinishedTasks;
  }
}

