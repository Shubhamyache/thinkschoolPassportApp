import { inject, Injectable } from '@angular/core';
import { NewApplication } from './test-app-form.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewApplicationService {
  httpClient = inject(HttpClient);
  constructor() {}

  addNewPassportApplication(form: NewApplication) {
    return this.httpClient
      .post<NewApplication>('http://localhost:3000/NewApplication', form)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('somthing went wrong'));
        })
      );
  }

  getAllApplications() {
    return this.httpClient
      .get<NewApplication[]>('http://localhost:3000/NewApplication')
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'Something went wrong while fetching new passport applications'
              )
          );
        })
      );
  }

  removeApplication(newApplication: NewApplication) {
    return this.httpClient
      .delete<NewApplication>(
        'http://localhost:3000/NewApplication/' + newApplication.id
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'Something went wrong while deleting the new Application'
              )
          );
        })
      );
  }
  updateApplication(newApplication: NewApplication) {
    console.log(newApplication.status);
    return this.httpClient
      .put<NewApplication>(
        'http://localhost:3000/NewApplication/' + newApplication.id,
        newApplication
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'Something went wrong while updating the new Application'
              )
          );
        })
      );
  }
}
