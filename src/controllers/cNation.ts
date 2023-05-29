import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mNation } from "../mapper/nation/mNation";
import { NationMapper } from "../mapper/NationMapper";
import { NationAtributos } from "../models/Nation";
import sNation from '../services/sNation';
const mapper = new NationMapper();
class NationController {
    constructor() {
    }
    public getAllNation(_req: Request, _res: Response) {
        try {
            const nation = sNation.getAllNation();
            nation.then((m: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                m.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<NationAtributos, mNation>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedNation(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const nation = sNation.getPagedNation(start, limit);
            nation.then((m: any) => {
                let result = {
                    "status": true,
                    ...m
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createNation(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sNation.createNation(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I050",
                    "text": "Nacionalidad - Creada exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getNation(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let nation = sNation.getNation(id);
            nation.then((m: any) => {
                let result = {
                    "status": true,
                    "data": m
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateNation(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const nation = sNation.updateNation(id, body);
            nation.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Nacionalidad - Modificada exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteNation(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sNation.destroyNation(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Nacionalidad - Eliminada exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const nationController = new NationController();
export default nationController;