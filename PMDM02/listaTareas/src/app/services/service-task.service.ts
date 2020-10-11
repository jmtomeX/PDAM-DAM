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

  private searchTask(task): number {
    const foundTask = this.tasks.indexOf(task);
    return foundTask;
  }
}
