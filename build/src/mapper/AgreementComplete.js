"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsCompleteMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class AgreementsCompleteMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.address, dest => dest.address)
            .map(src => src.ruc, dest => dest.ruc)
            .map(src => src.email, dest => dest.email)
            .map(src => src.tlfNumber, dest => dest.tlfNumber)
            .map(src => src.description, dest => dest.description)
            .map(src => src.TypeAgreementId, dest => dest.TypeAgreementId);
    }
}
exports.AgreementsCompleteMapper = AgreementsCompleteMapper;
