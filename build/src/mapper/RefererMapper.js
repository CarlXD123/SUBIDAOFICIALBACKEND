"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefererMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class RefererMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.refererName, dest => dest.refererName);
    }
}
exports.RefererMapper = RefererMapper;
