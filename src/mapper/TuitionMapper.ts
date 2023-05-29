import { TypeMapper } from "ts-mapper";
import { TuitionAtributos } from "../models/Tuition";
import { mTuition } from "./tuition/mTuition";

export class TuitionMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<TuitionAtributos, mTuition>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.value)
            .map(src => src.name, dest => dest.label)
    }
}
