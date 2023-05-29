import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mTypeAgreement } from "../mapper/typeAgreement/mTypeAgreement";
import { TypeAgreementMapper } from "../mapper/TypeAgreementMapper";
import { TypeAgreementAtributos } from "../models/TypeAgreement";
import sTypeAgreement from '../services/sTypeAgreement';
const mapper = new TypeAgreementMapper();
class TypeAgreementController {
    constructor() {
    }
    public getAllTypeAgreement(_req: Request, _res: Response) {
        try {
            const typeAgreements = sTypeAgreement.getAllTypeAgreement();
            typeAgreements.then((t: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                t.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<TypeAgreementAtributos, mTypeAgreement>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
}
const typeAgreementController = new TypeAgreementController();
export default typeAgreementController;