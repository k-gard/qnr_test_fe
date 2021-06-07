import { Location } from './models/Location';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as xml2js from 'xml2js';
import {API_URL, API_ALL_LOCATIONS, API_ALL_DEPARTMENTS, API_ALL_EMPLOYEES, API_EMPLOYEES_BY_DEPARTMENT, API_DEPARTMENTS_BY_LOCATION_NAME} from '..//app/app.constants';
import { Employee } from './models/Employee';
import { analyzeAndValidateNgModules, CompileShallowModuleMetadata } from '@angular/compiler';
import { Department } from './models/Department';
import { ParsingService } from './parsing.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private parse: ParsingService) { }

    parser = new xml2js.Parser({ strict: false, trim: true });





  getAllEmployees(): Promise<Employee[]> {
    let res: any ;
    let list: Employee[] = [];
    let promise: Promise<Employee[]> = new Promise((resolve, reject) => {
    this.http.get(API_URL + API_ALL_EMPLOYEES, {responseType : 'text'} ).toPromise().then(
      (response: any) => {
        resolve(this.parse.parseEmployeeXML(response));
      });
                          }
    );
    return promise;
    }


    getEmployeesByDepartmentId(id: number | undefined): Promise<Employee[]> {
      let res: any ;
      let list: Employee[] = [];
      let promise: Promise<Employee[]> = new Promise((resolve, reject) => {
      this.http.get(API_URL + API_EMPLOYEES_BY_DEPARTMENT + id , {responseType : 'text'} ).toPromise().then(
        (response: any) => {
          resolve(this.parse.parseEmployeeXML(response));
        }).catch((error) => {
          resolve([]);
      });;
                            }
      );
      return promise;
      }



  getAllDepartments(): Promise<Department[]>{
    let res: any ;
    let list: Department[] = [];
    let promise: Promise<Department[]> = new Promise((resolve, reject) => {
      this.http.get(API_URL + API_ALL_DEPARTMENTS, {responseType : 'text'} ).toPromise().then(
        (response: any) => {

                          resolve(this.parse.parseDepartmentXML(response));
                        }
            ).catch((error) => {
              resolve([]);
          });
                            }
      );
      return promise;
  }


  getDepartmentsByLocationName(name: string): Promise<Department[]>{
    let res: any ;
    let list: Department[] = [];
    let promise: Promise<Department[]> = new Promise((resolve, reject) => {
      this.http.get(API_URL + API_DEPARTMENTS_BY_LOCATION_NAME + name , {responseType : 'text'} ).toPromise().then(
        (response: any) => {

                          resolve(this.parse.parseDepartmentXML(response));
                            },
                        ).catch((error) => {
                          resolve([]);
                      });
                            }
      );

      return promise;
  }





  getAllLocations(): Promise<Location[]>{
    let res: any ;
    let list: Location[] = [];
    let promise: Promise<Location[]> = new Promise((resolve, reject) => {
      this.http.get(API_URL + API_ALL_LOCATIONS, {responseType : 'text'} ).toPromise().then(
        (response: any) => {
          resolve(this.parse.parseLocationXML(response));
        }).catch((error) => {
          resolve([]);
      });
            }
  );
    return promise;
  }





}








