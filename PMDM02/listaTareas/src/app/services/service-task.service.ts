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

  public addTask(item: Task){
    this.tasks = [...this.tasks, item];
  }
}
