import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staff } from '../Model/Staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiServer=environment.apiBaseUrl;
  public year: string | undefined;
  public deptid:any;
  public staffId:any;

  constructor(private http:HttpClient) { }

  //Sending request to backend and receiving response
  public getStaff():Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.apiServer}/staff`);
  }

  public getStaffsByDepartment():Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.apiServer}/department/${this.deptid}/staff`)
  }

  public getSalaryTotalByDepartment():Observable<number>{
    return this.http.get<number>(`${this.apiServer}/department/${this.deptid}/totalSalary`);
  }

  public deleteStaff():Observable<Staff>{
    return this.http.delete<Staff>(`${this.apiServer}/deleteStaff/${this.staffId}`)
  }

  public addStaff(staff:Staff):Observable<Staff>  {
    return this.http.post<Staff>(`${this.apiServer}/addStaff`,staff)
  }

  public updateStaff(staff:Staff):Observable<Staff>{
    return this.http.put<Staff>(`${this.apiServer}/updateStaff`,staff)
  }


}
