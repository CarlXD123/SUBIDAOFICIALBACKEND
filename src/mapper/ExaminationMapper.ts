import { TypeMapper } from "ts-mapper";
import { ExaminationAtributos } from "../models/Examination";
import { mExamination } from "./examination/mExamination";

export class ExaminationMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ExaminationAtributos, mExamination>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.code, dest => dest.code)
            .map(src => src.indications, dest => dest.indications)
            .map(src => src.typeSample, dest => dest.typeSample)
            .map(src => src.volume, dest => dest.volume)
            .map(src => src.supplies, dest => dest.supplies)
            .map(src => src.storageTemperature, dest => dest.storageTemperature)
            .map(src => src.fastingConditions, dest => dest.fastingConditions)
            .map(src => src.runFrequency, dest => dest.runFrequency)
            .map(src => src.processTime, dest => dest.processTime)
            .map(src => src.reportTime, dest => dest.reportTime)
            .map(src => src.countEG, dest => dest.countEG)
    }
}
