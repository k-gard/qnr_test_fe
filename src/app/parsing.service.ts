import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
import { Department } from './models/Department';
import { Employee } from './models/Employee';
import { Location } from './models/Location';

@Injectable({
  providedIn: 'root'
})
export class ParsingService {


  parser = new xml2js.Parser({ strict: false, trim: true });


  constructor() { }



  parseEmployeeXML(response: any): Employee[] {
    let employeeList: Employee[] = [];
    this.parser.parseString(response, (err: any, result: any) => {
                    if (typeof result.EMPLOYEES.EMPLOYEE === 'undefined' ){
                        employeeList = [];}
                    else{
                          employeeList =this.parserResultToEmployeeList(result.EMPLOYEES.EMPLOYEE);

                          }});
                          return employeeList;
  }

  parseDepartmentXML(response: any): Department[] {
    let departmentList: Department[] = [];
    this.parser.parseString(response, (err: any, result: any) => {
                   if (typeof result.DEPARTMENTS.DEPARTMENT === 'undefined' ){
                      departmentList = [];}
                   else{
                    departmentList =  this.parserResultToDepartmentList(result.DEPARTMENTS.DEPARTMENT);
                        }
                        });
                          return departmentList;
  }

  parseLocationXML(response: any): Location[] {
    let locationList: Location[] = [];
    this.parser.parseString(response, (err: any, result: any) => {
      if (typeof result.LOCATIONS.LOCATION === 'undefined' ){
        locationList = [];}
     else{
      locationList = this.parserResultToLocationList(result.LOCATIONS.LOCATION);

     } });
                          return locationList;
  }


  parserResultToEmployeeList(result: Array<{
    $: {ID: number},
    DEPARTMENTID: number[],
    FIRSTNAME: string[],
    HIREDATE: Date[],
    JOB: string[],
    LASTNAME: string[],
    MANAGERID: number[],
    COMMISSION: number[],
    SALARY: number[]
    }>): Employee[] {
      let employeeList: Employee[] = [];
      result.forEach((e) => {const employee = new Employee(
                            e.FIRSTNAME[0],
                            e.LASTNAME[0],
                            e.JOB[0],
                            e.MANAGERID[0],
                            e.SALARY[0],
                            e.COMMISSION[0],
                            e.HIREDATE[0]);
                            employee.id = e.$.ID;
                            employeeList.push(employee);
                            console.log(employeeList);});
      return employeeList;
  }


  parserResultToDepartmentList(result: Array<{DEPARTMENTID: number[], NAME: string[], LOCATION: string[]}>): Department[]{
    const departmentList: Department[] = [];
    result.forEach((d) => {const department = new Department(d.NAME[0], d.LOCATION[0]);
                           department.id = d.DEPARTMENTID[0];
                           departmentList.push(department); });
    return departmentList;
   }

   parserResultToLocationList(result: Array<{ID: number[], NAME: string[]}>): Location[]{
    const locationsList: Location[] = [];
    result.forEach((l) => {const location = new Location(l.NAME[0]);
                           location.id = l.ID[0];
                           locationsList.push(location); });
    return locationsList;
                          }
}
