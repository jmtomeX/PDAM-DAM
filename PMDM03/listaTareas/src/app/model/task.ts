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

    public static fromJson(data): any {
        try {
            if (data.id && data.description && typeof (data.isImportant) !== 'undefined' && typeof (data.finished) !== 'undefined') {
                return new Task(data.id, data.description, data.isImportant, data.finished);
            }
            throw (new Error('Argumento no válido: la estructura del argumento no coincide con los campos del modelo'));
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    public static cloneTask(itemTask: Task): Task {
        return new Task(itemTask.id, itemTask.description, itemTask.isImportant, itemTask.finished);
    }

}
