import { Component, OnInit } from '@angular/core';
import { ModalTaskPage } from '../pages/modal-task/modal-task.page';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiceTaskService } from '../services/service-task.service';
import { Task } from '../model/task';
import { StylesCompileDependency } from '@angular/compiler';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalupdate;
  withFinishedTasks;
  isUpdateTask = false;
  auxTask: Task;

  // tslint:disable-next-line: max-line-length
  constructor(public modalCtrl: ModalController, public serviceTask: ServiceTaskService, public router: Router, public toastController: ToastController) {
  }
  ngOnInit() { }

  ionViewDidEnter() {
    this.checkForTasks();
  }

  public updateFinished(item: Task) {
    this.checkForTasks();
  }

  public deleteTask(item) {
    this.serviceTask.deleteTask(item);
  }

  // Nueva función para presentar el modal
  async presentModal(isUpdateTask, idTask?) {
    const valueTask = this.serviceTask.getTask(idTask);
    this.auxTask = this.auxTask.cloneTask(valueTask);
    console.log(JSON.stringify(this.auxTask));

    const modal = await this.modalCtrl.create({
      component: ModalTaskPage,
      componentProps: {
        data: valueTask,
        isUpdate: isUpdateTask
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (isUpdateTask) {
        // mostrar toast
        if (valueTask.description != data.data.description ||
          valueTask.isImportant != data.data.isImportant) {
          this.serviceTask.updateTask(data, idTask);
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(valueTask));
          console.log('If ' + valueTask.isImportant + ' ' + data.data.isImportant);

          // comprobar checks terminados
          this.checkForTasks();
          return;
        } else {
          console.log('Else ' + valueTask.isImportant + ' ' + data.data.isImportant);
          this.presentToast();
        }
      } else {
        // tslint:disable-next-line: no-shadowed-variable
        const idTask = this.serviceTask.tasks.length + 1;
        this.serviceTask.addTask(new Task(idTask, data.data.description, data.data.isImportant));

      }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No se ha modificado ningún dato.',
      duration: 2000
    });
    toast.present();
  }

  // comprobar si hay estados terminados para actualizar el titulo de los terminados
  private checkForTasks(): boolean {
    this.withFinishedTasks = this.serviceTask.checkForTasks();
    return this.withFinishedTasks;
  }
}

