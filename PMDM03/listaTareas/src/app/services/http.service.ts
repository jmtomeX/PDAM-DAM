
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AppSettings } from '../config/app-config';
// Se importan las clases del modelo necesarias para utilizar en la llamadas <T>
// Incluir la clase no asegura ningun tipo de comprobacion. Si se quiere realizar
// comprobacion de los campos de debe realizar
import { Task } from '../model/task';


@Injectable({
    providedIn: 'root',
})
export class HttpServiceService {
    // url base. Se puede incluir en un fichero de configuración
    // BASE_PATH = 'http://localhost:3000/person';
    BASE_PATH = `${AppSettings.API_ENDPOINT}/todos/`;
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // Handle API errors Gestión de errores
    handleError(error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }

        // return an observable with a user-facing error message

        return throwError('Something bad happened; please try again later.');

    }

    createItem(item): Observable<Task> {
        const datos = `
        {
        "description":"${item.description}",
        "isImportant":"${item.isImportant}",
        "finished":"${item.finished}"
        }`;
        return this.http
            // .post<Task>(this.BASE_PATH, JSON.stringify(item), this.httpOptions)
            // para quitar el id y que se encargue el servidor
            .post<Task>(this.BASE_PATH, datos, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }

    getItem(id): Observable<Task> {
        return this.http
            .get<Task>(this.BASE_PATH + '/' + id)
            .pipe(retry(2), catchError(this.handleError));
    }

    getList(): Observable<Task[]> {
        console.log(this.BASE_PATH);

        return this.http
            .get<Task[]>(this.BASE_PATH)
            .pipe(retry(2), catchError(this.handleError));
    }

    updateItem(id, item): Observable<Task> {

        return this.http
            .put<Task>(
                this.BASE_PATH + '/' + id,
                JSON.stringify(item),
                this.httpOptions
            )
            .pipe(retry(2), catchError(this.handleError));

    }



    deleteItem(id) {

        return this.http
            .delete<Task>(this.BASE_PATH + '/' + id, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }

}

