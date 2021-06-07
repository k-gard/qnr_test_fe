import { Department } from '../models/Department';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { Location } from '../models/Location';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {

  constructor(private dataservice: DataService , private router: Router) { }
  currentList : any[] = [];
  employeeTableHeaders: string[] = ['Id', 'First name', 'Last name'];
  departmentTableHeaders: string[] = ['Id', 'Name'];
  locationTableHeaders: string[] = ['Id', 'Name'];
  tableHeaders = this.locationTableHeaders;
  title: string = "Locations"
  employeeDetails :Employee | undefined;


  xml: string|undefined;
  ngOnInit(): void { this.viewLocations();

  }


  viewDepartments(): void{
  if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
  this.title = 'Departmets';
  this.tableHeaders = ['Id', 'Name'];
  this.dataservice.getAllDepartments().then((res) => {this.currentList = res;
  });

                        }

  viewLocations(): void{
    if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
    this.title = 'Locations';
    this.tableHeaders = ['Id', 'Name'];
    this.dataservice.getAllLocations().then((res) => {
      if (res.length === 0){this.title = 'No Locations yet ';}
      this.currentList = res;
    });
  }

  viewEmployees(): void{
    if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
    this.title = 'Employees';
    this.tableHeaders = ['Id', 'First name', 'Last name'];
    this.dataservice.getAllEmployees().then((res) => {
      if (res.length === 0){this.title = 'No Employees yet ';}
      this.currentList = res;
    });
  }


  viewDepartmentEmployees(department: Department ): void {
  if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
  this.title = 'Employees in '+ department.name + ' department';
  this.tableHeaders = ['Id', 'First name', 'Last name'];
  this.dataservice.getEmployeesByDepartmentId(department.id).then((res) => {
    console.log(department)
    console.log(res)
    if (res.length === 0){this.title = 'New Department. No Employees yet ';}
    this.currentList = res;
  });

  }


  viewDepartmentsByLocationName(location: Location ): void {
    if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
    this.title = 'Departments located in '+ location.name;
    this.tableHeaders = ['Id', 'Name'];
    this.dataservice.getDepartmentsByLocationName(location.name).then((res) => {
      if (res.length === 0){this.title = 'No Department is located in '+ location.name;}
      this.currentList = res;
    });


    }

  viewEmployeeInfo(employee: Employee ): void {
      if(this.isEmployee(this.employeeDetails)){this.employeeDetails = undefined;}
      this.currentList = [];
      this.title = 'Employee Info';
      this.tableHeaders = ['Id', 'First Name','Last Name','job','salary','commission', 'Hire Date'];
      this.employeeDetails = employee
    }

  isDepartment(val: any): any { return  val instanceof Department; }
  isLocation(val: any): any { return  val instanceof Location; }
  isEmployee(val: any): any { return  val instanceof Employee; }


}


