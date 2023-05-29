import { TypeMapper } from "ts-mapper";
import { TypeDocsAtributos } from "../models/TypeDocs";
import { mTypeDocs } from "./typeDocs/mTypeDocs";

export class TypeDocsMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<TypeDocsAtributos, mTypeDocs>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}