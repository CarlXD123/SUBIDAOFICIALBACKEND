import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mUnit } from "../mapper/unit/mUnit";
import { UnitMapper } from "../mapper/UnitMapper";
import { UnitAtributos } from "../models/Unit";
import sUnit from '../services/sUnit'
const mapper = new UnitMapper();
class UnitController {
    constructor() {
    }
    public getAllUnit(_req: Request, _res: Response) {
        try {
            const unit = sUnit.getAllUnit();
            unit.then((u: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                u.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<UnitAtributos, mUnit>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedUnit(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || "[0,9]";
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const unit = sUnit.getPagedUnit(start, limit);
            unit.then((u: any) => {
                let result = {
                    "status": true,
                    ...u
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createUnit(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sUnit.createUnit(body);
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
    public getUnit(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let unit = sUnit.getUnit(id);
            unit.then((u: any) => {
                let result = {
                    "status": true,
                    "data": u
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateUnit(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const unit = sUnit.updateUnit(id, body);
            unit.then((u: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Metodologia - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteUnit(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sUnit.destroyUnit(id);
            let resultado = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Metodologia - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(resultado);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const unitController = new UnitController();
export default unitController;