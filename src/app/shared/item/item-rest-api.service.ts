import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item'; 
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemRestApiService {
  apiURL = 'https://api.mercadolibre.com/sites/MLB';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  queryItems(query: string, offset:number = 0, limit:number = 20): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/search?q=${query}&offset=${offset}&limit=${limit}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getItems(ids:string[]): Observable<any> {
    let aux = '';
    ids.forEach((id) => {
      aux = aux.concat(`${id},`);
    });

    let aux2 = `https://api.mercadolibre.com/items?ids=${aux.length > 0 ? aux.substring(0, aux.length - 1) : '' }`;
    return this.http
      .get<Item>(aux2)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}