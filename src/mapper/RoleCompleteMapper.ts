import { TypeMapper } from "ts-mapper";
import { RoleAtributos } from "../models/Role";
import { mRole } from "./role/mRole";

export class RoleCompleteMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<RoleAtributos, mRole>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
    }
}
