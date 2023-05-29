import { TypeMapper } from "ts-mapper";
import { ProfessionAtributos } from "../models/Profession";
import { mProfession } from "./Profession/mProfession";

export class ProfessionMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<ProfessionAtributos,mProfession>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.name)
        .map(src=> src.id,dest => dest.value)
        .map(src=> src.name,dest => dest.label)
    }
}