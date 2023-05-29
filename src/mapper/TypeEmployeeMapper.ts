import { TypeMapper } from "ts-mapper";
import { TypeEmployeeAtributos } from "../models/TypeEmployee";
import { mTypeEmployee } from "./typeEmployees/mTypeEmployees";

export class TypeEmployeeMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<TypeEmployeeAtributos, mTypeEmployee>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}