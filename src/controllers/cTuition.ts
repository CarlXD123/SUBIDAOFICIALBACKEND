import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mTuition } from "../mapper/tuition/mTuition";
import { TuitionMapper } from "../mapper/TuitionMapper";
import { TuitionAtributos } from "../models/Tuition";
import sTuition from '../services/sTuition';
const mapper = new TuitionMapper();
class TuitionController {
    constructor() {
    }
    public getPagedTuition(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const tuition = sTuition.getPagedTuition(start, limit);
            tuition.then((t: any) => {
                let result = {
                    "status": true,
                    ...t
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAllTuition(_req: Request, _res: Response) {
        try {
            const tuition = sTuition.getAllTuition();
            tuition.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<TuitionAtributos, mTuition>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createTuition(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sTuition.createTuition(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I021",
                    "text": "Colegiatura - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getTuition(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let tuition = sTuition.getTuition(id);
            tuition.then((t: any) => {
                let result = {
                    "status": true,
                    "data": t
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateTuition(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const tuition = sTuition.updateTuition(id, body);
            tuition.then((t: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I023",
                        "text": "Colegiatura - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteTuition(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sTuition.destroyTuition(id);
            let resultado = {
                "status": true,
                "message": {
                    "code": "I025",
                    "text": "Colegiatura - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(resultado);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const tuitionController = new TuitionController();
export default tuitionController;