import { TypeMapper } from "ts-mapper";
import { AmbAtributos } from "../models/Amb";
import { mAmb } from "./amb/mAmb";

export class AmbMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<AmbAtributos, mAmb>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}