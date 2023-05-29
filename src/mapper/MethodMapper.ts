import { TypeMapper } from "ts-mapper";
import { MethodAtributos } from "../models/Method";
import { mMethod } from "./method/mMethod";

export class MethodMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<MethodAtributos, mMethod>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}