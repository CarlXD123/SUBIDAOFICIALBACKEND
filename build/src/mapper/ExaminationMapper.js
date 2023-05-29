"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ExaminationMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
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
            .map(src => src.countEG, dest => dest.countEG);
    }
}
exports.ExaminationMapper = ExaminationMapper;
