import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../Model/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiServer=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  //Sending request to backend and receiving response
  public getDeparments():Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServer}/departments`);
  }

  public addDepartment(department: Department):Observable<Department>{
    return this.http.post<Department>(`${this.apiServer}/addDepartment`,department);
  }
}
