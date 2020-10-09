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
      new Task('Angel'),
      new Task('María'),
      new Task('Charlie', true, true),
      new Task('Louise')
    ];
  }

  public addTask(item: Task){
    this.tasks = [...this.tasks, item];
  }
}
