import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Bill } from './bill.interface';
import { Config } from '../service.config';
import { BillInfo } from './billInfo.interface';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private billsUrl = `${Config.baseUrl}/api/bills`;

  constructor(
    private http: HttpClient
  ) { }

  /** GET Bill from the server */
  getBill(): Observable<Bill> {
    return this.http.get<Bill>(this.billsUrl)
      .pipe(
        tap(_ => console.log('get bill successfull')),
        catchError(this.handleError('getBill', undefined))
      );
  }

  updateBill(billInfo: BillInfo): Observable<any> {
    return this.http.put(this.billsUrl, billInfo, httpOptions)
      .pipe(
        tap(_ => console.log('bill update successfull')),
        catchError(this.handleError('updateBill', undefined))
      );
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
