import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
@Pipe({
  name: 'orderTask'
})
export class OrderTaskPipe implements PipeTransform {

  transform(value: Task[], ...args: unknown[]): unknown {

    let tasksOrder: Task[];

    tasksOrder =  value.sort((a, b) => {
      if (a.isImportant < b.isImportant) {
        return 1;
      }
      if (a.isImportant > b.isImportant) {
        return -1;
      }
      return 0;
    });
    console.log(tasksOrder);
    return tasksOrder;
  }


}
