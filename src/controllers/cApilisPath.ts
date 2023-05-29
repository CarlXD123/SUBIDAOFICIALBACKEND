import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sApilisPath from '../services/sApilisPath';

class ApilisPathController {
    constructor() {
    }

    public getAllPath(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,5000]'
            const [start, end] = JSON.parse(range as any)
            const limit = end - start + 1
            const query = _req.query;
            const path = sApilisPath.getAllPath(start, limit, query);
            path.then((m: any) => {
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

    public getPath(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let path = sApilisPath.getPath(id);
            path.then((c: any) => {
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

    public async addPath(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sApilisPath.addPath(body);
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

    public updatePath(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const path = sApilisPath.updatePath(id, data);
            path.then((a: any) => {
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

    public async deletePath(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisPath.destroyPath(id);
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

const apilispathController = new ApilisPathController();
export default apilispathController;