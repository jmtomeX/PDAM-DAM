import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Task } from '../model/task';
import { HttpServiceService } from './http.service';
import { StorageServiceService } from './storage.service';
import { LoadingController } from '@ionic/angular';
import { newArray } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  tasks: Task[] = [];
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
          // comprobamos que llegan todos los datos de cada tarea
          const map = datos.map((task) => Task.fromJson(task));
          // no añadimos si algún elemento viene como undefined
          const keys = Object.values(map).filter(x => x !== undefined);

          this.tasks = keys;
          // cargamos la base de datos en el storage
          this.servicioStorage.setObject('tareas', this.tasks);
        },
        (error) => console.log(error)
      );
    });

  }

  // añadir task bbdd, storage y array
  public addTask(item: Task) {
    // añadir una tarea a la base de datos.
    this.servicioHttp.createItem(item).subscribe((data) => {
      this.servicioStorage.setObject('tareas', this.tasks)
        .then(() => {
          // añadir tarea al array
          this.tasks = [...this.tasks, item];
        })
        .catch((err) => {
          // comtemplo es storage como importante por lo que lo elimino de la bbdd
          this.servicioHttp.deleteItem(data.id); // al item no se le ha dado un id, lo da el servidor
        });
    });

  }

  public deleteTask(item: Task) {
    // eliminar item del array
    const index: number = this.tasks.findIndex(task => task.id === item.id);
    this.tasks = [...this.tasks.slice(0, index), ...this.tasks.slice(index + 1)];

    // eliminar item de la bbdd
    this.servicioHttp.deleteItem(item.id).subscribe();

    // eliminar item del local
    // pasamos a string
    const itemString = JSON.stringify(item);
    this.servicioStorage.removeItem(itemString);
  }

  // Se le pasa como parámetros el objeto modificado y el id del objeto a modificar
  public updateTask(item: Task, id) {

    const index: number = this.tasks.findIndex(task => task.id === id);

    // Actualizar la bbdd

    // Actualizar el local storage

    // Actualizar el array
    console.log(index);
    // tslint:disable-next-line: prefer-const
    let auxTask: Task = this.tasks.find(task => task.id === id);
    auxTask.description = item.data.description;
    auxTask.isImportant = item.data.isImportant;
    this.tasks = [...this.tasks.slice(0, index), auxTask, ...this.tasks.slice(index + 1)];
  }

  // función para devolver una tarea por id
  public getTask(id): Task {
    // devolver una tarea de la bbdd

    // devolver una tarea del storage

    // devolver una tarea del array
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
    const taskFinished = this.tasks.filter(task => task.finished);
    const finish = taskFinished.length;

    if (finish >= 1) {
      return true;
    }
    return false;
  }
}
