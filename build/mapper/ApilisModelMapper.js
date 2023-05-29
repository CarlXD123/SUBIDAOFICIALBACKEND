"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisModelMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisModelMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.nameModel, dest => dest.nameModel)
            .map(src => src.codBaja, dest => dest.codBaja);
    }
}
exports.ApilisModelMapper = ApilisModelMapper;