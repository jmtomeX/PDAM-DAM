import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Task } from '../model/task';
import { HttpServiceService } from './http.service';
import { StorageServiceService } from './storage.service';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  tasks: Task[];
  task;
  constructor(
    private servicioStorage: StorageServiceService,
    private servicioHttp: HttpServiceService,
    private loadingController: LoadingController
  ) {
    // Si hay datos en el storage se cargan
    this.servicioStorage.getObject('tareas')
      .then((data) => {
        // casteamos a tipo Task
        if (data) {
          this.tasks = (data as unknown as Task[]);
        }
      });

    // cargar datos desde el servidor retardando la carga
    this.presentLoading().then(() => {
      this.servicioHttp.getList().subscribe(
        (datos) => {
          console.log(datos);
          // comprobamos que llegan todos los datos de cada tarea
          datos.map((task) => Task.fromJson(task));
          this.tasks = datos;
          // cargamos la base de datos en el storage
          this.servicioStorage.setObject('tareas', this.tasks);
        },
        (error) => console.log(error)
      );
    });

  }

  public addTask(item: Task) {
    this.tasks = [...this.tasks, item];
  }

  public deleteTask(item: Task) {
    const index: number = this.tasks.findIndex(task => task.id === item.id);
    this.tasks = [...this.tasks.slice(0, index), ...this.tasks.slice(index + 1)];
  }

  // Se le pasa como parámetros el objeto modificado y el id del objeto a modificar
  public updateTask(item: Task, id) {

    const index: number = this.tasks.findIndex(task => task.id === id);

    console.log(index);
    // tslint:disable-next-line: prefer-const
    let auxTask: Task = this.tasks.find(task => task.id === id);

    auxTask.description = item.data.description;
    auxTask.isImportant = item.data.isImportant;
    this.tasks = [...this.tasks.slice(0, index), auxTask, ...this.tasks.slice(index + 1)];
  }

  // función para devolver una tarea por id
  public getTask(id): Task {
    // tslint:disable-next-line: triple-equals
    const task = this.tasks.find(taskFind => taskFind.id == id);
    return task;
  }

  // mostrar el loading
  async presentLoading() {
    const loading = await this.loadingController.create({

      message: 'Cargando datos...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  // función para comprobar si hay tareas terminadas
  public checkForTasks(): boolean {
    // const state: boolean = this.tasks.some(elem => elem.isFinished === true);
    const taskFinished = this.tasks.filter(task => task.finished);
    const finish = taskFinished.length;

    if (finish >= 1) {
      return true;
    }
    return false;
  }
}
