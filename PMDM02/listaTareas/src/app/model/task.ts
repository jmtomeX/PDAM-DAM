import { stringify } from 'querystring';

import { NullTemplateVisitor } from '@angular/compiler';
export class Task {
    // añadido por que item.data no se encuentra
    [x: string]: any;
    task: Task;
    constructor(
        public id: number = -1,
        public description: string,
        public isImportant: boolean = false,
        public finished: boolean = false
    ) { }

    public static cloneTask(itemTask: Task): Task {
        return new Task(itemTask.id, itemTask.description, itemTask.isImportant, itemTask.finished);
    }

}
