import { TypeMapper } from "ts-mapper";
import { ApilisModelAtributos } from "../models/ApilisModel";
import { mApilisModel } from "./apilisModel/mApilisModel";

export class ApilisModelMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisModelAtributos, mApilisModel>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.nameModel, dest => dest.nameModel)
            .map(src => src.codBaja, dest => dest.codBaja)

    }
}