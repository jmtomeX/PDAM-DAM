import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  tasks: Task[];
  task;
  constructor() {
    this.tasks = [
      new Task(1, 'Galletas'),
      new Task(2, 'Itv', true, true),
      new Task(3, 'Azúcar', true, true),
      new Task(4, 'Pan')
    ];
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
