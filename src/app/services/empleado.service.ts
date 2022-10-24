// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmpleadoService {

//   constructor(private http: HttpClient) { }

//   getEmpleado(informacion: any){
//     const url = "https://localhost:7202/empleados/guardar";
//   }
// }

const baseUrl = 'https://localhost:7297';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  // baseURL: string = "https://localhost:7297";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(baseUrl+"/employees");
  }

  get(id:number): Observable<any> {
    return this.http.get(`${baseUrl}/employee/${id}`);
  }

  create(data:Employee): Observable<Employee> {  
    console.log(data);
    return this.http.post<Employee>(baseUrl+'/employee', data);
  }

  update(id:number, data:Employee): Observable<any> {
    return this.http.put(`${baseUrl+'/employee'}/${id}`, data);
  }

  updateStatus(id: number, data:Employee): Observable<any> {
    console.log("updateStatus");
    console.log(data);
    return this.http.put(`${baseUrl+'/employee/patch'}/${id}`, data);
  }






  delete(id:number): Observable<any> {
    return this.http.delete(`${baseUrl}/employee/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${baseUrl}?title=${title}`);
  // }
}