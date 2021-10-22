import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import {HttpClientModule}from '@angular/common/http';
import { DepartmentService } from './Services/department.service';
import { StudentComponent } from './student/student.component';
import { StudentService } from './Services/student.service';
import { StaffComponent } from './staff/staff.component';
import { StaffService } from './Services/staff.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    StudentComponent,
    routingComponents,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DepartmentService,
    StudentService,
    StaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
