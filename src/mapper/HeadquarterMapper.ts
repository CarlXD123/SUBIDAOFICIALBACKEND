import { TypeMapper } from "ts-mapper";
import { HeadquarterAtributos } from "../models/Headquarter";
import { mHeadquarter } from "./headquarter/mHeadquarter";

export class HeadquarterMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<HeadquarterAtributos,mHeadquarter>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.name)
        .map(src=> src.address,dest => dest.address)
        .map(src=> src.tlfNumber,dest => dest.tlfNumber)
        .map(src=> src.email,dest => dest.email)
        .map(src=> src.urlImage,dest => dest.urlImage)
    }
}
