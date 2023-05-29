"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class UserMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        // put here your mapping configurations
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.username, dest => dest.email)
            .map(src => src.urlAvatar, dest => dest.urlAvatar);
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.refererName, dest => dest.refererName);
    }
}
exports.UserMapper = UserMapper;
