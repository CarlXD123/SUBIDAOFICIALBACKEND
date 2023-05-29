import { Request, Response } from "express";
import { ServiceMapper } from "../mapper/ServiceMapper";
import { ServiceAtributos } from "../models/Service";
import { mService } from '../mapper/service/mService'
import sService from '../services/sService'
import { ExecuteResponce } from "../global/response";

const mapper = new ServiceMapper();
class ServiceController {
    constructor() {
    }
    public getAllService(_req: Request, _res: Response) {
        try {
            const service = sService.getAllService();
            service.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<ServiceAtributos, mService>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedService(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const service = sService.getPagedService(start, limit);
            service.then((s: any) => {
                let result = {
                    "status": true,
                    ...s
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async createService(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sService.createService(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I024",
                    "text": "Servicio - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getService(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let service = sService.getService(id);
            service.then((s: any) => {
                let result = {
                    "status": true,
                    "data": s
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateService(_req: Request, _res: Response) {
        try {
            let body = _req.body
            let id = _req.params.id
            const service = sService.updateService(id, body);
            service.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I026",
                        "text": "Servicio - Modificado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteService(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sService.destroyService(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I028",
                    "text": "Servicio - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const serviceController = new ServiceController();
export default serviceController;