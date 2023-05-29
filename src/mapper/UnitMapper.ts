import { TypeMapper } from "ts-mapper";
import { UnitAtributos } from "../models/Unit";
import { mUnit } from "./unit/mUnit";

export class UnitMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<UnitAtributos,mUnit>()
        .map(src=> src.name,dest => dest.name)
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.label)
        .map(src=> src.id,dest => dest.value)
        
    }
}