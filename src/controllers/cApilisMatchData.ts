import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sApilisMatchData from '../services/sApilisMatchData';

class ApilisMatchDataController {
    constructor() {
    }

    public getAllMatchData(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,5000]'
            const [start, end] = JSON.parse(range as any)
            const limit = end - start + 1
            let match = sApilisMatchData.getAllMatchData(start, limit);
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

    public getMatchData(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let match = sApilisMatchData.getMatchData(id);
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

    public async addMatchData(_req: Request, _res: Response) {
        try {
            let body1 = _req.body;
            let idmatchdata = await sApilisMatchData.addMatchData(body1);
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

    public updateMatchData(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const match = sApilisMatchData.updateMatchData(id, data);
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

    public async deleteMatchData(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisMatchData.destroyMatchData(id);
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

const apilismatchdataController = new ApilisMatchDataController();
export default apilismatchdataController;