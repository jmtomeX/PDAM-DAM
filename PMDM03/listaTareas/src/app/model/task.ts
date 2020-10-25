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

    // public static fromJson(data): Task {
    //     try {
    //         if (data.descrition &&
    //             data.isImportant &&
    //             data.finished &&
    //             data.id) {
    //             return new Task(data.id, data.description, data.isImportant, data.finished);
    //         }
    //         throw new TypeError('Argumento no válido: la estructura del argumento no coincide con los campos del modelo.');
    //     }
    //     catch (e) {
    //         console.log((e as Error).message);
    //     }
    // }

        public static fromJson(data): any {
        if (data.descrition &&
            data.isImportant &&
            data.finished &&
            data.id) {
            return new Task(data.id, data.description, data.isImportant, data.finished);
        }
        throw (new Error('Argumento no válido: la estructura del argumento no coincide con los campos del modelo'));
    }

    public static cloneTask(itemTask: Task): Task {
        return new Task(itemTask.id, itemTask.description, itemTask.isImportant, itemTask.finished);
    }

}
