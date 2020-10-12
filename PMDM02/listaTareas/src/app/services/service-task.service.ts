import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  tasks: Task[];
  constructor() {
    this.tasks = [
      new Task('Galletas'),
      new Task('Itv', true, true),
      new Task('Azúcar', true, true),
      new Task('Pan')
    ];
  }

  public addTask(item: Task) {
    this.tasks = [...this.tasks, item];
  }

  public deleteTask(item: Task) {
    const index = this.searchTask(item);
    this.tasks = [...this.tasks.slice(0, index), ...this.tasks.slice(index + 1)];
  }

  public updateTask(item: Task) {
    const index = this.searchTask(item);
    this.tasks = [...this.tasks.slice(0, index), item, ...this.tasks.slice(index + 1)];
  }

  // método interno para buscar un item en el array
  private searchTask(task): number {
    const foundTask = this.tasks.indexOf(task);
    return foundTask;
  }

  // método para comprobar si hay tareas terminadas
  public checkForTasks(): boolean {
    let state;
    let count = 0;
    this.tasks.forEach((entry, index) => {
      if (entry.finished) {
        count = index;
      }
      // console.log('desde servicio chekForTask ' + count);
    });
    // tslint:disable-next-line: no-unused-expression
    if (count > 0) { state = true; } else { state = false; }
    return state;
  }
}
