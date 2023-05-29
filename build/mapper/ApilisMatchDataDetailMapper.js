"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisMatchDataDetailMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisMatchDataDetailMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.idApilisMatchData, dest => dest.idApilisMatchData)
            .map(src => src.idExamenValue, dest => dest.idExamenValue)
            .map(src => src.fields, dest => dest.fields)
            .map(src => src.priority, dest => dest.priority)
            .map(src => src.createdBy, dest => dest.createdBy)
            .map(src => src.modifiedBy, dest => dest.modifiedBy)
            .map(src => src.codBaja, dest => dest.codBaja)
    }
}
exports.ApilisMatchDataDetailMapper = ApilisMatchDataDetailMapper;