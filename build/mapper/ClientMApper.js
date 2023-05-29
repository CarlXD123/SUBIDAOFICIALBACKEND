"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class ClientMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.dni, dest => dest.dni)
            .map(src => src.birthDate, dest => dest.birthDate)
            .map(src => src.code, dest => dest.code)
            .map(src => src.historyNumber, dest => dest.historyNumber)
            .map(src => src.name, dest => dest.name)
            .map(src => src.lastNameP, dest => dest.lastNameP)
            .map(src => src.lastNameM, dest => dest.lastNameM)
            .map(src => src.phoneNumber, dest => dest.phoneNumber)
            .map(src => src.tlfNumber, dest => dest.tlfNumber)
            .map(src => src.gender, dest => dest.gender)
            .map(src => src.civilStatus, dest => dest.civilStatus)
            .map(src => src.nationality, dest => dest.nationality)
            .map(src => src.address, dest => dest.address)
            .map(src => src.status, dest => dest.status)
            .map(src => src.edad, dest => dest.edad);
    }
}
exports.ClientMapper = ClientMapper;
