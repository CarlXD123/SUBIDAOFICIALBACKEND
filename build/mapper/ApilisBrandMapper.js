"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApilisBrandMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ApilisBrandMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.nameBrand, dest => dest.nameBrand)
            .map(src => src.Descr, dest => dest.Descr)
            .map(src => src.codBaja, dest => dest.codBaja);
    }
}
exports.ApilisBrandMapper = ApilisBrandMapper;