import { Component, OnInit } from '@angular/core';
import { ModalTaskPage } from '../pages/modal-task/modal-task.page';
import { ModalController } from '@ionic/angular';
import { ServiceTaskService } from '../services/service-task.service';
import { Task } from '../model/task';
import { StylesCompileDependency } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalupdate;
  withFinishedTasks;


  constructor(public modalCtrl: ModalController, public serviceTask: ServiceTaskService) {
  }
  ngOnInit() {

  }

  // carga de datos
  ionViewDidEnter(){
    this.checkForTasks();
  }

  async addTask() {
    // lanzar modal
    const modal = await this.modalCtrl.create({
      component: ModalTaskPage,
      componentProps: {
        isUpdate: false
      }

    });
    await modal.present();
    // recoger los datos del modal al cerrar.directory
    const { data } = await modal.onWillDismiss();
    console.log(data.data.description);
    console.log('Home.page ' + JSON.stringify(data));
    // Añadir tarea
    if (data) {
      this.serviceTask.addTask(new Task(data.data.description, data.data.isImportant));
    }

  }

  public updateFinished(item: Task) {
    console.log('Cucumbers new state:' + item.finished);
    this.checkForTasks();
  }

  public deleteTask(item) {
    this.serviceTask.deleteTask(item);
  }

  async upadateTask(item) {
    // lanzar modal
    const modal = await this.modalCtrl.create({
      component: ModalTaskPage,
      componentProps: {
        data: item,
        isUpdate: true
      }
    }
    );
    await modal.present();
    // recoger los datos del modal al cerrar.directory
    const { data } = await modal.onWillDismiss();
    console.log('Home.page ' + JSON.stringify(data));
    // Añadir tarea
    if (data) {
      this.serviceTask.updateTask(new Task(data.data.description, data.data.isImportant));
    }
  }
  private checkForTasks(): boolean {
    this.withFinishedTasks = this.serviceTask.checkForTasks();
    return this.withFinishedTasks;
  }


}

// https://medium.com/@josephat94/modals-en-ionic-3-f7173188c4a8

// https://forum.ionicframework.com/t/solved-ionic-4-need-to-know-how-to-work-the-modal-controller/136414           <------------
