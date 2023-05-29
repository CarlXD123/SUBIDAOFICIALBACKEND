import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mSpeciality } from "../mapper/speciality/mSpeciality";
import { SpecialityMapper } from "../mapper/SpecialityMapper";
import { SpecialityAtributos } from "../models/Speciality";
import sSpeciality from '../services/sSpeciality'
const mapper = new SpecialityMapper();
class SpecialityController {
    constructor() {
    }
    public getPagedSpeciality(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const speciality = sSpeciality.getPagedSpeciality(start, limit);
            speciality.then((s: any) => {
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
    public getAllSpeciality(_req: Request, _res: Response) {
        try {
            const speciality = sSpeciality.getAllSpeciality();
            speciality.then((s: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                s.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<SpecialityAtributos, mSpeciality>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createSpeciality(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sSpeciality.createSpeciality(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I009",
                    "text": "Especialidad - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getSpeciality(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let speciality = sSpeciality.getSpeciality(id);
            speciality.then((s: any) => {
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
    public updateSpeciality(_req: Request, _res: Response) {
        try {
            let body = _req.body
            let id = _req.params.id
            const speciality = sSpeciality.updateSpeciality(id, body);
            speciality.then((p: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I011",
                        "text": "Especialidad - Modificado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteSpeciality(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sSpeciality.destroySpeciality(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I013",
                    "text": "Especialidad - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const specialityController = new SpecialityController();
export default specialityController;