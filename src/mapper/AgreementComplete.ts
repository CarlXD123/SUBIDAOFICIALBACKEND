import { TypeMapper } from "ts-mapper";
import { AgreementsAtributos } from "../models/Agreements";
import { mAgreementComplete } from "./agreement/mAgreementComplete";

export class AgreementsCompleteMapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config(): void {
        this.createMap<AgreementsAtributos, mAgreementComplete>()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.address, dest => dest.address)
            .map(src => src.ruc, dest => dest.ruc)
            .map(src => src.email, dest => dest.email)
            .map(src => src.tlfNumber, dest => dest.tlfNumber)
            .map(src => src.description, dest => dest.description)
            .map(src => src.TypeAgreementId, dest => dest.TypeAgreementId)
    }
} 