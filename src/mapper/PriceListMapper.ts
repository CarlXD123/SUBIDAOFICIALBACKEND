import { TypeMapper } from "ts-mapper";
import { PriceListAtributos } from "../models/PriceList";
import { mPriceList } from "./priceList/mPriceList";

export class PriceListMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<PriceListAtributos,mPriceList>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.name)
        .map(src=> src.status,dest => dest.status)

    }
}