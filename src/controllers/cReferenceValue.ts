import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mReferenceValues } from "../mapper/referenceValue/mReferenceValue";
import { ReferenceValueMapper } from "../mapper/ReferenceValuesMapper";
import { ReferenceValuesAtributos } from "../models/ReferenceValues";
import sReferenceValue from '../services/sReferenceValue';
const mapper = new ReferenceValueMapper();
class ReferenceValueController {
    constructor() {
    }
    public getPagedReferenceValue(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || "[0,9]";
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const referenceValues = sReferenceValue.getPagedReferenceValue(start, limit);
            referenceValues.then((r: any) => {
                let result = {
                    "status": true,
                    ...r
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAllReferenceValue(_req: Request, _res: Response) {
        try {
            const referenceValues = sReferenceValue.getAllReferenceValue();
            referenceValues.then((r: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                r.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<ReferenceValuesAtributos, mReferenceValues>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createReferenceValue(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sReferenceValue.createReferenceValue(body);
            _res.status(200).json('Ok');
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getReferenceValue(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let referenceValue = await sReferenceValue.getReferenceValue(id);
            let result = {
                "status": true,
                "data": referenceValue
            }
            //console.log(result);
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateExaminationReferenceValue(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const referenceValues = sReferenceValue.updateExaminationReferenceValue(id, body);
            referenceValues.then((r: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Reference Examination - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getExaminationValues(_req: Request, _res: Response) {
        try {
            const examinationValues = await sReferenceValue.getAllExaminationValues();
                let result = {
                    "status": true,
                    "data": examinationValues
                }
                //console.log(result);
                _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getExamValuebyExamId(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let appointmentId = _req.query.appointmentId;
            const referenceValue = await sReferenceValue.getExamValuebyExamId(id, appointmentId);
            let result = {
                "status": true,
                "data": referenceValue
            }
            //console.log(result);
            _res.status(200).json(result);

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateReferenceValue(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const referenceValue = sReferenceValue.updateReferenceValue(id, body);
            referenceValue.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Reference Value- Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteReferenceValue(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sReferenceValue.destroyReferenceValue(id);
            _res.status(200).json('Delete Reference Value');
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const referenceValueController = new ReferenceValueController();
export default referenceValueController;