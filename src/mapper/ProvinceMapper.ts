import { TypeMapper } from "ts-mapper";
import { ProvinceAtributos } from "../models/Province";
import { mProvince } from "./province/mProvince";

export class ProvinceMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ProvinceAtributos, mProvince>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}