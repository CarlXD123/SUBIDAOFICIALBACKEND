import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mMethod } from "../mapper/method/mMethod";
import { MethodMapper } from "../mapper/MethodMapper";
import { MethodAtributos } from "../models/Method";
import sMethod from '../services/sMethod';
const mapper = new MethodMapper();
class MethodController {
    constructor() {
    }
    public getAllMethod(_req: Request, _res: Response) {
        try {
            const method = sMethod.getAllMethod();
            method.then((m: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                m.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<MethodAtributos, mMethod>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedMethod(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const method = sMethod.getPagedMethod(start, limit);
            method.then((m: any) => {
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
    public createMethod(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sMethod.createMethod(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I050",
                    "text": "Metodologia - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getMethod(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let method = sMethod.getMethod(id);
            method.then((m: any) => {
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
    public updateMethod(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const method = sMethod.updateMethod(id, body);
            method.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Metodologia - Modificado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteMethod(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sMethod.destroyMethod(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Metodologia - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const methodController = new MethodController();
export default methodController;