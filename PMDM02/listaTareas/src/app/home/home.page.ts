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
  // justo antes de animar la vista
  ionViewWillEnter() { }
  // Se ejecuta cuando el componente enrutamiento ha terminado la animación de la nueva vista.
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
    let message = 'Tarea modificada.';
    const valueTask = this.serviceTask.getTask(idTask);

    const modal = await this.modalCtrl.create({
      component: ModalTaskPage,
      componentProps: {
        data: valueTask,
        isUpdate: isUpdateTask
      },
    });
    // variable para recoger el estado anterior al envio de la data al modal
    const dataIsIportant: boolean = valueTask.isImportant;
    await modal.present();
    // datos recogidos
    const { data } = await modal.onWillDismiss();
    if (data) {
      // si se acualiza
      if (isUpdateTask) {
        console.log(' valueTask ' + JSON.stringify(valueTask));
        // mostrar toast y guargar los datos si hay cambios.
        if (valueTask.description !== data.data.description ||
          dataIsIportant !== data.data.isImportant) {
          this.serviceTask.updateTask(data, idTask);
          // comprobar checks terminados
          this.checkForTasks();
          this.presentToast(message);
        } else {
          // mensaje para el toast.
          message = 'No se ha modificado ninguna tarea.';
          console.log('Else ' + valueTask.isImportant + ' ' + data.data.isImportant);
          this.presentToast(message);
        }
      }
      // si se añade un nuevo elemento
      else {
        // tslint:disable-next-line: no-shadowed-variable
        const idTask = this.serviceTask.tasks.length + 1;
        this.serviceTask.addTask(new Task(idTask, data.data.description, data.data.isImportant));
        message = 'Añadida nueva tarea.';
        this.presentToast(message);
      }
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
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

