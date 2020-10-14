import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
@Pipe({
  name: 'orderTask'
})
export class OrderTaskPipe implements PipeTransform {

  transform(value: Task[], ...args: unknown[]): unknown {

    let tasksOrder: Task[];

    tasksOrder = value.sort((a) => {
      // tslint:disable-next-line: triple-equals
      if (a.isImportant == false) {
        return 1;
      }
      // tslint:disable-next-line: triple-equals
      if (a.isImportant == true) {
        return -1;
      }
      return 0;
    });

    console.log(tasksOrder);
    return tasksOrder;
  }


}
