"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class RoleMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value);
    }
}
exports.RoleMapper = RoleMapper;
