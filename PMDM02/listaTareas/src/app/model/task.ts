import { stringify } from 'querystring';

import { NullTemplateVisitor } from '@angular/compiler';
export class Task {
    task: Task;
    constructor(
        public description: string,
        public isImportant: boolean = false,
        public finished: boolean = false
    ) { }

    public static clonTask(itemTask: Task): Task {
        return new Task(itemTask.description, itemTask.isImportant, itemTask.finished);
    }

}
