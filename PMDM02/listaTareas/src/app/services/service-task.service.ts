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
    // const index = this.searchTask(item);
    this.tasks = [...this.tasks.slice(0, index), ...this.tasks.slice(index + 1)];
  }

  public updateTask(item: Task, id) {
    const index: number = this.tasks.findIndex(task => task.id === id);
    const auxTask: Task = this.tasks.find(task => task.id === id);
    // console.log(' autask ' + JSON.stringify(auxTask));
    // console.log('item ' + JSON.stringify(item));
    auxTask.description = item.data.description;
    auxTask.isImportant = item.data.isImportant;
    this.tasks = [...this.tasks.slice(0, index), auxTask, ...this.tasks.slice(index + 1)];
  }

  // función interna para buscar un índice de tarea en el array
  private searchTask(task): number {
    const foundTask = this.tasks.indexOf(task);
    return foundTask;
  }

  // función para devolver una tarea por id
  public getTask(id): Task {
    // tslint:disable-next-line: triple-equals
    const task = this.tasks.find(taskFind => taskFind.id == id);
    return task;
  }

  // función para comprobar si hay tareas terminadas
  public checkForTasks(): boolean {
    let state;
    let count = 0;
    this.tasks.forEach((entry, index) => {
      console.log(entry.finished + ' ' + entry.description);
      if (entry.finished) {
        count = index;
      }
    });
    // tslint:disable-next-line: no-unused-expression
    if (count > 0) { state = true; } else { state = false; }
    return state;
  }
}
