import { Department } from "./Department";

export class Student {
    id!: number; 
    course:string | undefined
    fee:number | undefined
    name:string | undefined
    year:number | undefined
    department : Department | undefined    
}