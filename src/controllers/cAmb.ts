import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mAmb } from "../mapper/amb/mAmb";
import { AmbMapper } from "../mapper/AmbMapper";
import { AmbAtributos } from "../models/Amb";
import sAmb from '../services/sAmb';
const mapper = new AmbMapper();
class AmbController {
    constructor() {
    }
    public getAllAmb(_req: Request, _res: Response) {
        try {
            const amb = sAmb.getAllAmb();
            amb.then((m: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                m.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<AmbAtributos, mAmb>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedAmb(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const amb = sAmb.getPagedAmb(start, limit);
            amb.then((m: any) => {
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
    public createAmb(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sAmb.createAmb(body);
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
    public getAmb(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let amb = sAmb.getAmb(id);
            amb.then((m: any) => {
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
    public updateAmb(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const amb = sAmb.updateAmb(id, body);
            amb.then((p: any) => {
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
    public deleteAmb(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sAmb.destroyAmb(id);
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
const ambController = new AmbController();
export default ambController;