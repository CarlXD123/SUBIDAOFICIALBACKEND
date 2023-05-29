"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisMatchDataMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisMatchDataMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.codBaja, dest => dest.codBaja)
            .map(src => src.idExamen, dest => dest.idExamen)
            .map(src => src.idModel, dest => dest.idModel)
    }
}
exports.ApilisMatchDataMapper = ApilisMatchDataMapper;