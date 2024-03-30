import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api;

  // Método genérico para fazer requisições HTTP GET
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}`);
  }

  // Método genérico para fazer requisições HTTP POST
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${url}`, body);
  }

  // Método genérico para fazer requisições HTTP PUT
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${url}`, body);
  }

  // Método genérico para fazer requisições HTTP DELETE
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${url}`);
  }
}
