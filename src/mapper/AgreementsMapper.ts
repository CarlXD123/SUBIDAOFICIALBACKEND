import { TypeMapper } from "ts-mapper";
import { AgreementsAtributos } from "../models/Agreements";
import { mAgreement } from "./agreement/mAgrement";

export class AgreementsMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<AgreementsAtributos, mAgreement>()
            .map(src => src.name, dest => dest.name)
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.label)
            .map(src => src.id, dest => dest.value)

    }
}
