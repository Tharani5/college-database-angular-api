import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../Model/Department';
import { Student } from '../Model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServer=environment.apiBaseUrl;
  public year: any;
  public deptid:any;
  public studentid:any;
  
  constructor(private http:HttpClient) { }

  public getDeparments():Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServer}/departments`);
  }

  //Sending request to backend and receiving response
  public getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServer}/student`);
  }

  public getStudentByYear():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServer}/studentsByYear/${this.year}`)
  }

  public getStudentsByDepartment():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServer}/department/${this.deptid}/student`)
  }

  public getFeeTotalByDepartment():Observable<number>{
    return this.http.get<number>(`${this.apiServer}/department/${this.deptid}/feeTotal`);
  }

  public deleteStudent():Observable<Student>{
    return this.http.delete<Student>(`${this.apiServer}/deleteStudent/${this.studentid}`)
  }

  public addStudent(student:Student):Observable<Student>  {
    return this.http.post<Student>(`${this.apiServer}/addStudent`,student)
  }

  public updateStudent(student:Student):Observable<Student>{
    return this.http.put<Student>(`${this.apiServer}/updateStudent`,student)
  }

  public uploadFile(file:File):Observable<string>{
    const uploadingFile=new FormData();
    uploadingFile.append('file',file)
    return this.http.post<string>(`${this.apiServer}/upload`,uploadingFile, {responseType: 'text' as 'json'})
  }
  
}
