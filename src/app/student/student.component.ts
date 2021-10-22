import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DepartmentComponent } from '../department/department.component';
import { Department } from '../Model/Department';
import { Student } from '../Model/Student';
import { DepartmentService } from '../Services/department.service';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public student:Student[]=[];
  public departments:Department[]=[];
  public studentsyear:Student[]=[];
  public studentsDepartment:Student[]=[];
  public select:any;
  public set=1;
  public studentsyearlenght:boolean | undefined;
  public feeTotal:any;
  public editStudent:any;
  public deleteStudents:any;
  public deleteSection:any;
  public editSection:any;
  public selectedValue:any;
  file: File |null=null;

  constructor(private studentService:StudentService,private formBuilder:FormBuilder,private departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.getStudents();
    this.getDepartments();
  }

  clickEvent(selects:any)
  {
    this.select=selects;
    this.studentsyear=[];
    this.studentsDepartment=[];
    this.set=1;
    this.feeTotal=null;
    this.studentsyearlenght=false;
  }
  
  //Setting the 1st file to upload
  onChange(files:FileList | null){
    if (files) {
      this.file = files.item(0)
    }
  }

  //Uploading excel file
  public uploadFile(files:FileList | null){
    console.log(this.file)
      this.studentService.uploadFile(this.file as File).subscribe(
        (response:string)=>{
          alert(response)
          this.getStudents();
        },
        (error:HttpErrorResponse)=>{
          console.log(error)
          alert(error.message);
          this.getStudents();
        },
      )
  }

  public getDepartments(): void {
    this.departmentService.getDeparments().subscribe(
      (response: Department[]) => {
        this.departments = response;        
        console.log(this.departments);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //List of students from database
  public getStudents():void{
    this.studentService.getStudents().subscribe(
      (response:Student[])=>{
        this.student=response,
        console.log(this.student)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Display all students in particular department and sort students name in ascending order
  public getStudentByYear(temp : string):void{
    this.studentService.year=temp;
    this.set=1;
    console.log(temp);
    this.studentService.getStudentByYear().subscribe(
      (response:Student[])=>{
        this.studentsyear=response
        console.log(this.studentsyear)
        this.setvalue(this.studentsyear.length);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Students in particular department by department ID
  public getStudentsByDepartment(temp:string):void{
    this.set=1;
    this.studentService.deptid=temp;
    this.studentService.getStudentsByDepartment().subscribe(
      (response:Student[])=>{
        this.studentsDepartment=response;
        this.setvalue(this.studentsDepartment.length);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Fee total of students in particular department
  public getFeeTotalByDepartment(temp:string):void{
    this.studentService.deptid=temp;
    this.studentService.getFeeTotalByDepartment().subscribe(
      (response:number)=>{
        this.feeTotal=response;
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Setting department id to delete particular student 
  setDeleteId(id:number,temp:number):void{
    this.deleteStudents=id;
    this.deleteSection=temp;
  }

  //Delete specific student by Id
  public deleteStudent():void{
    this.studentService.studentid=this.deleteStudents;
    this.studentService.deleteStudent().subscribe(
      (response:Student)=>{
        alert("deleted");
        this.getStudents();
        if(this.deleteSection==2)
          this.getStudentByYear(this.studentService.year)
        if(this.deleteSection==3)
          this.getStudentsByDepartment(this.studentService.deptid)
        console.log(response)        
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Get new Student details by form builder
  studentForm=this.formBuilder.group({
    name:[''],
    course:[''],
    fee:[''],
    year:[''],
    department:this.formBuilder.group({
      id:['']
    })
  })

  //To edit the existing student details
  editStudentForm=new FormGroup({
    id:new FormControl(''),
    name:new FormControl(''),
    course:new FormControl(''),
    fee:new FormControl(''),
    year:new FormControl(''),
    department:new FormGroup({
      id:new FormControl('')
    })
  })

  //Load student details to update the existing student
  loadStudentData(students:Student,temp:number){
    this.editStudentForm.patchValue({
    id:students.id,
    name:students.name,
    course:students.course,
    fee:students.fee,
    year:students.year
  })
  this.editSection=temp;
  }

  //Update the existing student
  public updateStudent():void{
    this.studentService.updateStudent(this.editStudentForm.value).subscribe(
      (response:Student)=>{
        alert("Updated Successfully");
        this.getStudents();
        if(this.editSection==2)
        this.getStudentByYear(this.studentService.year)
        if(this.editSection==3)
        this.getStudentsByDepartment(this.studentService.deptid)
        this.editStudentForm.reset()
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //To add a new student
  public addStudent():void{
    console.log(this.studentForm.value);
    this.studentService.addStudent(this.studentForm.value).subscribe(
      (response:Student)=>{
        alert("saved");
        this.getStudents();
        console.log(response),
        this.studentForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  } 

  setvalue(temp:number){
    if(temp===0){
      this.studentsyearlenght=false;
      this.set=0;
    }else{
      this.studentsyearlenght=true;
      this.set=1;
    }
  }

}
