import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProveitService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
  }

  store(hash: string) {
    return this.http.get(environment.api + 'store', { params: { hash }, responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  verify(hash: string) {
    return this.http.get(environment.api + 'prove', { params: { hash } })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(this);
      switch (error.error) {
        case 'DUPLICATE_ENTRY':
          this.snackBar.open('This document has already been registered', 'Warning', { duration: 5000});
          break;
        default:
          this.snackBar.open(error.error, 'Error', { duration: 5000});
      }
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}