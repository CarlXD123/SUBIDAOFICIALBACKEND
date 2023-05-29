import { TypeMapper } from "ts-mapper";
import { NationAtributos } from "../models/Nation";
import { mNation } from "./nation/mNation";

export class NationMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<NationAtributos, mNation>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}