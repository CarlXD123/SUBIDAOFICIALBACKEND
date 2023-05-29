import { TypeMapper } from "ts-mapper";
import { ApilisMatchDataAtributos } from "../models/ApilisMatchData";
import { mApilisMatchData } from "./apilisMatchData/mApilisMatchData";

export class ApilisMatchDataMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisMatchDataAtributos, mApilisMatchData>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.codBaja, dest => dest.codBaja)
            .map(src => src.idExamen, dest => dest.idExamen)
            .map(src => src.idModel, dest => dest.idModel)

    }
}