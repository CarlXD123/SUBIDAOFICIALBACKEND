import { TypeMapper } from "ts-mapper";
import { TypeAgreementAtributos } from "../models/TypeAgreement";
import { mTypeAgreement } from "./typeAgreement/mTypeAgreement";

export class TypeAgreementMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<TypeAgreementAtributos, mTypeAgreement>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)
    }
}
