import { TypeMapper } from "ts-mapper";
import { RoleAtributos } from "../models/Role";
import { mRole } from "./role/mRole";

export class RoleMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<RoleAtributos, mRole>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}
