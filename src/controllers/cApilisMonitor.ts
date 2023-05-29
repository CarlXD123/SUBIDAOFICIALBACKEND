import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sApilisMonitor from '../services/sApilisMonitor';

class ApilisMonitorController {
    constructor() {
    }

    public getAllMonitor(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,5000]'
            const [start, end] = JSON.parse(range as any)
            const limit = end - start + 1
            let match = sApilisMonitor.getAllMonitor(start, limit);
            match.then((a: any) => {
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

    public getMonitor(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let match = sApilisMonitor.getMonitor(id);
            match.then((c: any) => {
                let result = {
                    "status": true,
                    "data": c
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public async addMonitor(_req: Request, _res: Response) {
        try {
            let body1 = _req.body;
            let idmatchdata = await sApilisMonitor.addMonitor(body1);
            let result = {
                "status": true,
                "message": {
                    "code": "I034",
                    "text": "Cita - Creada exitosamente!",
                    "data": [idmatchdata],
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public updateMonitor(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const match = sApilisMonitor.updateMonitor(id, data);
            match.then((a: any) => {
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

    public async deleteMonitor(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisMonitor.destroyMonitor(id);
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

const apilismonitorController = new ApilisMonitorController();
export default apilismonitorController;