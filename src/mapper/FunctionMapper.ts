import { TypeMapper } from "ts-mapper";
import { FunctionAtributos } from "../models/Function";
import { mFunction } from "./function/mFuncions";

export class FunctionMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<FunctionAtributos,mFunction>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.title,dest => dest.title)
        .map(src=> src.type,dest => dest.type)
        .map(src=> src.parent_id,dest => dest.parent_id)
        .map(src=> src.url,dest => dest.url)
        .map(src=> src.icon,dest => dest.icon)
    }
}