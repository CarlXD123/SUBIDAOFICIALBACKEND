import { TypeMapper } from "ts-mapper";
import { DoctorsAtributos } from "../models/Doctors";
import { mDoctors } from "./Doctors/mDoctors";


export class DoctorsMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }

    private config():void{
        this.createMap<DoctorsAtributos,mDoctors>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.doctorName,dest => dest.doctorName)
    }
}