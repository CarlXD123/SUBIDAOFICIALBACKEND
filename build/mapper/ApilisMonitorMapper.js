"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisMonitorMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisMonitorMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.codBaja, dest => dest.codBaja)
            .map(src => src.codeApi, dest => dest.codeApi)
            .map(src => src.idPatient, dest => dest.idPatient)
            .map(src => src.idExam, dest => dest.idExam)
    }
}
exports.ApilisMonitorMapper = ApilisMonitorMapper;