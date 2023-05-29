import { TypeMapper } from "ts-mapper";
import { ReferenceValuesAtributos } from "../models/ReferenceValues";
import { mReferenceValues } from "./referenceValue/mReferenceValue";

export class ReferenceValueMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ReferenceValuesAtributos, mReferenceValues>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.unit, dest => dest.unit)
    }
}