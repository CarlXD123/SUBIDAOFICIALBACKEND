"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class FunctionMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.title, dest => dest.title)
            .map(src => src.type, dest => dest.type)
            .map(src => src.parent_id, dest => dest.parent_id)
            .map(src => src.url, dest => dest.url)
            .map(src => src.icon, dest => dest.icon);
    }
}
exports.FunctionMapper = FunctionMapper;
