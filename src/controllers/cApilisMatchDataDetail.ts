import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { ApilisMatchDataDetailMapper } from "../mapper/ApilisMatchDataDetailMapper";
import sApilisMatchDataDetail from '../services/sApilisMatchDataDetail';
import { mApilisMatchDataDetail } from "../mapper/apilisMatchDataDetail/mApilisMatchDataDetail";
const mapperMatchDataDetail = new  ApilisMatchDataDetailMapper();

class ApilisMatchDataDetailController {
    constructor() {
    }

    public getAllMatchDataDetail(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,5000]'
            const [start, end] = JSON.parse(range as any)
            const limit = end - start + 1
            let matchdetail = sApilisMatchDataDetail.getAllMatchDataDetail(start, limit);
            matchdetail.then((a: any) => {
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

    public getExamValueByExamination(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail.getExamValueByExamination(id);
            matchdetail.then((c: any) => {
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

    public getExamValueByExamination2(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail.getExamValueByExamination2(id);
            matchdetail.then((c: any) => {
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

    public getMatchDataDetail(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let matchdetail = sApilisMatchDataDetail.getMatchDataDetail(id);
            matchdetail.then((c: any) => {
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

    public async addMatchDataDetail(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sApilisMatchDataDetail.addMatchDataDetail(body);
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

    public updateMatchDataDetail(_req: Request, _res: Response) {
        try {
            const { priorityid, idvalueexam } = _req.body;
            sApilisMatchDataDetail.updateMatchDataDetail(priorityid, idvalueexam);
            _res.status(200).json({ message: "Match data detail updated successfully" });
        } catch (error) {
            console.error(error);
            _res.status(500).json({ message: "Error updating match data detail" });
        }
    }

    public async deleteMatchDataDetail(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisMatchDataDetail.destroyMatchDataDetail(id);
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

const apilismatchdatadetailController = new ApilisMatchDataDetailController();
export default apilismatchdatadetailController;