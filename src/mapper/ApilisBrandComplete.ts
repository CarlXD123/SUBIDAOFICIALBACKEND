import { TypeMapper } from "ts-mapper";
import { ApilisBrandAtributos } from "../models/ApilisBrand";
import { mApilisBrandComplete } from "./apilisBrand/mApilisBrandComplete";

export class ApilisBrandCompleteMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisBrandAtributos, mApilisBrandComplete>()
             .map(src => src.id, dest => dest.id)
             .map(src => src.nameBrand, dest => dest.nameBrand)
             .map(src => src.Descr, dest => dest.Descr)
             .map(src => src.codBaja, dest => dest.codBaja)
    }
} 