import { TypeMapper } from "ts-mapper";
import { RoleAtributos } from "../models/Role";
import { mRoleCompleto } from "./role/mRoleCompleto";

export class RoleCompMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<RoleAtributos, mRoleCompleto>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.name, dest => dest.description)
    }
}
