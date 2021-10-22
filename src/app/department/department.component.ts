import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../Model/Department';
import { DepartmentService } from '../Services/department.service';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public department: Department[] = [];
  public departmentList: any;
  public addDepartments:any;

  constructor(private departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }
  //display all departments
  public getDepartments(): void {
    this.departmentService.getDeparments().subscribe(
      (response: Department[]) => {
        this.department = response;        
        console.log(this.department);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //To add a new department
  public addDepartment(addForm:NgForm):void{
    this.getDepartments();
    this.departmentService.addDepartment(addForm.value).subscribe(
      (response:Department)=>{
        alert("Added SuccessFully"),
        this.getDepartments(),
        addForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
