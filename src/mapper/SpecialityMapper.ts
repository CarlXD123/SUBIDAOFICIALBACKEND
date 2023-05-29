import { TypeMapper } from "ts-mapper";
import { SpecialityAtributos } from "../models/Speciality";
import { mSpeciality } from "./speciality/mSpeciality";

export class SpecialityMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<SpecialityAtributos, mSpeciality>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}