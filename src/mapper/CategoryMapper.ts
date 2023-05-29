import { TypeMapper } from "ts-mapper";
import { CategoryAtributos } from "../models/Category";
import { mCategory } from "./category/mCategory";

export class CategoryMapper extends TypeMapper{
    constructor(){
        super();
        this.config();
    }
    private config():void{
        this.createMap<CategoryAtributos,mCategory>()
        .map(src => src.id , dest=> dest.id)
        .map(src=> src.name,dest => dest.name)
        .map(src=> src.description,dest => dest.description)
    }
}