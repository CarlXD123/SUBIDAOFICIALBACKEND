import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mProfession } from "../mapper/Profession/mProfession";
import { ProfessionMapper } from "../mapper/ProfessionMapper";
import { ProfessionAtributos } from "../models/Profession";
import sProfession from '../services/sProfession';

const mapper = new ProfessionMapper();
class ProfessionController {
    constructor() {
    }
    public getPagedProfession(_req: Request, _res: Response) {
        try {
            //const range = _req.query.range || '[0,9]';
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1
            const profession = sProfession.getPagedProfession(start, limit);
            profession.then((p: any) => {
                let result = {
                    "status": true,
                    ...p
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAllProfession(_req: Request, _res: Response) {
        try {
            const profession = sProfession.getAllProfession();
            profession.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<ProfessionAtributos, mProfession>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getProfession(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let profession = sProfession.getProfession(id);
            profession.then((p: any) => {
                let result = {
                    "status": true,
                    "data": p
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createProfession(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sProfession.createProfession(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I047",
                    "text": "Profesión - agregado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateProfession(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const profession = sProfession.updateProfession(id, body);
            profession.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Profesión - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteProfession(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sProfession.destroyProfession(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I051",
                    "text": "Profesión - Elminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const professionController = new ProfessionController();
export default professionController;