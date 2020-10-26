import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
@Pipe({
  name: 'completedTasks'
})
export class CompletedTasksPipe implements PipeTransform {

  transform(value: Task[], ...args: unknown[]): unknown {

    // tslint:disable-next-line: prefer-const
    const taskFinished = value.filter(task => task.finished);
    return taskFinished;
  }

}
