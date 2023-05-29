import { TypeMapper } from "ts-mapper";
import { ApilisMatchDataDetailAtributos } from "../models/ApilisMatchDataDetail";
import { mApilisMatchDataDetail } from "./apilisMatchDataDetail/mApilisMatchDataDetail";

export class ApilisMatchDataDetailMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisMatchDataDetailAtributos, mApilisMatchDataDetail>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.idApilisMatchData, dest => dest.idApilisMatchData)
            .map(src => src.idExamenValue, dest => dest.idExamenValue)
            .map(src => src.fields, dest => dest.fields)
            .map(src => src.priority, dest => dest.priority)
            .map(src => src.createdBy, dest => dest.createdBy)
            .map(src => src.modifiedBy, dest => dest.modifiedBy)
            .map(src => src.codBaja, dest => dest.codBaja)
    }
}