import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mAgreementComplete } from "../mapper/agreement/mAgreementComplete";
import { mAgreement } from "../mapper/agreement/mAgrement";
import { AgreementsCompleteMapper } from "../mapper/AgreementComplete";
import { AgreementsMapper } from "../mapper/AgreementsMapper";
import { AgreementsAtributos } from "../models/Agreements";
import sAgreement from '../services/sAgreement';
const mapper = new AgreementsMapper();
const mapperAgreement = new AgreementsCompleteMapper();
class AgreementController {
    constructor() {
    }
    public async getFilterAgreement(_req: Request, _res: Response) {
        try {
            const body = _req.query;
            const agreement = sAgreement.getFilterAgreement(body);
            agreement.then((a: any) => {
                let result = {
                    "status": true,
                    ...a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getAllAgreement(_req: Request, _res: Response) {
        try {
            const agreements = sAgreement.getAllAgreement();
            agreements.then((a: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                a.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<AgreementsAtributos, mAgreement>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedAgreement(_req: Request, _res: Response) {
        try {
            const range = _req.query.range || '[0,9]'
            const [start, end] = JSON.parse(range+"")
            const limit = end - start + 1
            const agreements = sAgreement.getPagedAgreement(start, limit);
            console.log(agreements)
            agreements.then((a: any) => {
                let result = {
                    "status": true,
                    ...a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAgreement(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let agreement = sAgreement.getAgreement(id);
            agreement.then(async (a: any) => {
                let result = {
                    "status": true,
                    "data":a
                }
                result.data=[];
                const agre = await sAgreement.getAgreementByPriceList(id)
                let mapeado: any = {};
                mapperAgreement.map<AgreementsAtributos, mAgreementComplete>(a, mapeado);
                if (agre != undefined)
                    mapeado.priceList = agre;
                result.data =mapeado;
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createAgreement(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sAgreement.createAgreement(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I018",
                    "text": "Convenio - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateAgreement(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id
            const agreements = sAgreement.updateAgreement(id, body);
            agreements.then((a: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I020",
                        "text": "Convenio - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteAgreement(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sAgreement.destroyAgreement(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I022",
                    "text": "Convenio - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const agreementController = new AgreementController();
export default agreementController;