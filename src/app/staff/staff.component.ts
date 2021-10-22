import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Staff } from '../Model/Staff';
import { StaffService } from '../Services/staff.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public selectOption:any;
  public staff:Staff[] | undefined;
  public staffsDepartment:Staff[]=[];
  public salaryTotal:any;
  public set:any;
  public deleteStaffId:any;
  public deleteSection:any;
  public editSection:any;
  public staffslenght:boolean | undefined;

  constructor(private staffService:StaffService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getStaffs();
  }

  clickEvent(temp:any){
    this.selectOption=temp;
    this.staffsDepartment=[];
    this.salaryTotal=null;
    this.set=1;
    this.staffslenght=false;
  }

  //Get all staffs in College
  public getStaffs():void{
    this.staffService.getStaff().subscribe(
      (response:Staff[])=>{
        this.staff=response,
        console.log(this.staff)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //List of staff in particular department by particular department id
  public getStaffsByDepartment(temp:string):void{
    this.staffService.deptid=temp;
    this.staffService.getStaffsByDepartment().subscribe(
      (response:Staff[])=>{
        this.staffsDepartment=response;
        this.set=this.staffsDepartment.length;
        this.setvalue(this.staffsDepartment.length);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  setvalue(temp:number){
    if(temp===0){
      this.staffslenght=false;
    }else{
      this.staffslenght=true;
    }
  }

  //Total salary of staffs in particular department by department id
  public getSalaryTotalByDepartment(temp:string):void{
    this.staffService.deptid=temp;
    this.staffService.getSalaryTotalByDepartment().subscribe(
      (response:number)=>{
        this.salaryTotal=response;
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Function to set the staff id to delete
  setDeleteId(id:number,temp:number):void{
    this.deleteStaffId=id;
    this.deleteSection=temp;
  }
 
  //Delete the staff by their ID
  public deleteStaff():void{
    this.staffService.staffId=this.deleteStaffId;
    this.staffService.deleteStaff().subscribe(
      (response:Staff)=>{
        alert("deleted");
        this.getStaffs();
        if(this.deleteSection==2)
          this.getStaffsByDepartment(this.staffService.deptid)
        console.log(response)        
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  //Get details of new staff
  staffForm=this.formBuilder.group({
    name:[''],
    designation:[''],
    salary:[''],
    department:this.formBuilder.group({
      id:['']
    })
  })

  //Add new staff in the database
  public addStaff():void{
    console.log(this.staffForm.value);
    this.staffService.addStaff(this.staffForm.value).subscribe(
      (response:Staff)=>{
        alert("saved");
        this.getStaffs();
        console.log(response),
        this.staffForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  } 

  //Load the staff details in form
  loadStaffData(staff:Staff,temp:number){
    this.editStaffForm.patchValue({
    id:staff.id,
    name:staff.name,
    designation:staff.designation,
    salary:staff.salary, 
  })
  this.editSection=temp;
  }  

  //Form to get the edited value
  editStaffForm=this.formBuilder.group({
    id:[''],
    name:[''],
    designation:[''],
    salary:[''],
    department:this.formBuilder.group({
      id:['']
    })
  })

  //update the existing staff value
  public updateStaff():void{
    this.staffService.updateStaff(this.editStaffForm.value).subscribe(
      (response:Staff)=>{
        alert("Updated Successfully"),
        this.getStaffs();
        if(this.editSection==2)
          this.getStaffsByDepartment(this.staffService.deptid)
        this.editStaffForm.reset();
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

}
