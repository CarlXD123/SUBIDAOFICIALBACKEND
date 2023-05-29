import TypeAgreement from "../models/TypeAgreement";

class TypeAgreementServicios {
    constructor() {
    }
    public static async getAllTypeAgreement() {
        return await TypeAgreement.findAll();
    }
}
export default TypeAgreementServicios;
