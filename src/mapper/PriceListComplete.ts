import { TypeMapper } from "ts-mapper";
import { PriceListAtributos } from "../models/PriceList";
import { mPriceListComplete } from "./priceList/mPriceListComplete";

export class PriceListCompleteMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<PriceListAtributos,mPriceListComplete>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.name)
        .map(src=> src.status,dest => dest.status)

    }
}