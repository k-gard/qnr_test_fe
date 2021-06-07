export class Employee{
  public id: number|undefined;
  constructor(
    public firstName: string,
    public lastName: string,
    public job: string,
    public manager: number,
    public salary: number,
    public commission: number,
    public hireDate: Date
  ){}
}
