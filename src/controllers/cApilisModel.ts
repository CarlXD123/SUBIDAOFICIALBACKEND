import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sApilisModel from '../services/sApilisModel';
import { ApilisModelMapper } from "../mapper/ApilisModelMapper";
import { mApilisModel } from "../mapper/apilisModel/mApilisModel";
const mapperModelData = new ApilisModelMapper();

class ApilisModelController {
    constructor() {
    }

    public getAllModel(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let model = sApilisModel.getAllModel(id);
            model.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public getModel(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let model = sApilisModel.getModel(id);
            model.then(async (a: any) => {
                let result = {
                    "status": true,
                    "data":a
                }
                result.data=[];
                const bra = await sApilisModel.getModelByMatchData(id)
                let mapeado: any = {};
                mapperModelData.map<ApilisModelMapper, mApilisModel>(a, mapeado);
                if (bra != undefined)
                    mapeado.modelos = bra;
                result.data =mapeado;
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public async addModel(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sApilisModel.addModel(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I034",
                    "text": "Cita - Creada exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public updateModel(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const model = sApilisModel.updateModel(id, data);
            model.then((a: any) => {
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

    public async deleteModel(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisModel.destroyModel(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I028",
                    "text": "Cita - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }


}

const apilismodelController = new ApilisModelController();
export default apilismodelController;