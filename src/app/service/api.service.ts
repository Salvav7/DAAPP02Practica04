import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/DAAPP02Practica03-0.0.1-SNAPSHOT/api/empleado'; 

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const username = 'salvav'; 
    const password = '1234'; 
    const credentials = btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
  }

  getData(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, { headers: this.createAuthorizationHeader() });
  }

  postData(data: Empleado): Observable<Empleado[]> {
    return this.http.post<Empleado[]>(this.apiUrl, data, { headers: this.createAuthorizationHeader() });
  }

  putData(clave: string, data: Empleado): Observable<Empleado[]> {
    return this.http.put<Empleado[]>(`${this.apiUrl}/${clave}`, data, { headers: this.createAuthorizationHeader() });
  }

  deleteData(clave: string): Observable<Empleado[]> {
    return this.http.delete<Empleado[]>(`${this.apiUrl}/${clave}`, { headers: this.createAuthorizationHeader() });
  }
}