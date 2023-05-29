import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mExamination } from "../mapper/examination/mExamination";
import { ExaminationMapper } from "../mapper/ExaminationMapper";
import { ExaminationAtributos } from "../models/Examination";
import sExamination from '../services/sExamination';
const mapper = new ExaminationMapper();
class ExaminationController {
    constructor() {
    }
    public getPagedExamination(_req: Request, _res: Response) {
        try {
            const range = _req.query.range || "[0,9]";
            const [start, end] = JSON.parse((range as any));
            const limit = end - start + 1;
            const examination = sExamination.getPagedExamination(start, limit);
            examination.then((e: any) => {
                let result = {
                    "status": true,
                    ...e
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAllExamination(_req: Request, _res: Response) {
        try {
            const examination = sExamination.getAllExamination();
            examination.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<ExaminationAtributos, mExamination>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getFilterExamination(_req: Request, _res: Response) {
        try {
            const query = _req.query;
            const examinations = sExamination.getFilterExamination(query);
            examinations.then((e: any) => {
                let result = {
                    status: true,
                    ...e
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateExaminationValues(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const examination = sExamination.updateExaminationValues(id, body);
            examination.then((e: any) => {
                let result = {
                    "status": true,
                    "text": "Valores de Examenes - Modificado exitosamente!"
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateGroupExam(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            const group = sExamination.updateExaminationTotal(body);
            group.then((g: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I002",
                        "text": "Examén - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async updateGroupExamination(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            await sExamination.updateExaminationValues(id, body);
            let result = {
                "status": true,
                "message": {
                    "code": "I002",
                    "text": "Grupo de Examenes - Modificado exitosamente!"
                }

            }
            //console.log(result);
            _res.status(200).json(result);

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async createExamination(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sExamination.createExamination(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I849",
                    "text": "Examén - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getExamination(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let examination = await sExamination.getExamination(id);
            let result = {
                "status": true,
                "data": examination
            }
            //console.log(result);
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateExamination(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const examination = sExamination.updateExamination(id, body);
            examination.then((e: any) => {
                let result = {
                    "status": true,
                    "text": "Examén - Modificado exitosamente!"
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async deleteExamination(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            await sExamination.destroyExamination(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I849",
                    "text": "Examén - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const examinationController = new ExaminationController();
export default examinationController;