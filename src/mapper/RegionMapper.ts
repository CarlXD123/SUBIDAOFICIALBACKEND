import { TypeMapper } from "ts-mapper";
import { RegionAtributos } from "../models/Region";
import { mRegion } from "./region/mRegion";

export class RegionMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<RegionAtributos, mRegion>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}
