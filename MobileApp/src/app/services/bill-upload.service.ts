import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverURL } from './Config';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Bill } from './bill.interface';
import { device } from 'tns-core-modules/platform/platform';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: "root",
})
export class BillUploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadPicture(base64String: string): Observable<Bill> {
    return this.http.post<Bill>(`${serverURL}/api/bills`, { base64String: base64String, uuID: device.uuid }, httpOptions)
      .pipe(
        tap(_ => console.log("img uploaded")),
        catchError(this.handleError<Bill>("uploadBill", undefined))
      )
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}