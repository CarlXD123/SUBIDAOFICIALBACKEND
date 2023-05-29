import { TypeMapper } from "ts-mapper";
import { ApilisPathAtributos } from "../models/ApilisPath";
import { mApilisPath } from "./apilisPath/mApilisPath";

export class ApilisPathMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<ApilisPathAtributos, mApilisPath>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.env, dest => dest.env)
            .map(src => src.Api, dest => dest.Api)
            .map(src => src.user, dest => dest.user)
            .map(src => src.passw, dest => dest.passw)
            .map(src => src.idModel, dest => dest.idModel)
            .map(src => src.codBaja, dest => dest.codBaja)

    }
}