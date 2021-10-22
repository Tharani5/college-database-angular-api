import { Department } from "./Department"

export class Staff{
    id!: number
    designation:string | undefined
    name:string | undefined
    salary:number | undefined
    department : Department | undefined
}