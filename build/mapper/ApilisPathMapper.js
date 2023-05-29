"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisPathMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisPathMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
        .map(src => src.id, dest => dest.id)
        .map(src => src.env, dest => dest.env)
        .map(src => src.Api, dest => dest.Api)
        .map(src => src.user, dest => dest.user)
        .map(src => src.passw, dest => dest.passw)
        .map(src => src.idModel, dest => dest.idModel)
        .map(src => src.codBaja, dest => dest.codBaja);
    }
}
exports.ApilisPathMapper = ApilisPathMapper;