import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { TypeEmployeeMapper } from "../mapper/TypeEmployeeMapper";
import { mTypeEmployee } from "../mapper/typeEmployees/mTypeEmployees";
import { TypeEmployeeAtributos } from "../models/TypeEmployee";
import sTypeEmployee from '../services/sTypeEmployee';
const mapper = new TypeEmployeeMapper();
class TypeEmployeeController {
    constructor() {
    }
    public getPagedTypeEmployee(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const typeEmployees = sTypeEmployee.getPagedTypeEmployee(start, limit);
            typeEmployees.then((t: any) => {
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
    public getAllTypeEmployee(_req: Request, _res: Response) {
        try {
            const typeEmployees = sTypeEmployee.getAllTypeEmployee();
            typeEmployees.then((t: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                t.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<TypeEmployeeAtributos, mTypeEmployee>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createTypeEmployee(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sTypeEmployee.createTypeEmployee(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I041",
                    "text": "Cargo - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getTypeEmployee(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let typeEmployee = sTypeEmployee.getTypeEmployee(id);
            typeEmployee.then((t: any) => {
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
    public updateTypeEmployee(_req: Request, _res: Response) {
        try {
            let body = _req.body
            let id = _req.params.id
            const typeEmployee = sTypeEmployee.updateTypeEmployee(id, body);
            typeEmployee.then((t: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I043",
                        "text": "Cargo - Modificado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteTypeEmployee(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sTypeEmployee.destroyTypeEmployee(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I045",
                    "text": "Cargo - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const typeEmployeeController = new TypeEmployeeController();
export default typeEmployeeController;