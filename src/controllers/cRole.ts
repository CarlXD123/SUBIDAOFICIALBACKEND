import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mRole } from "../mapper/role/mRole";
import { mRoleCompleto } from "../mapper/role/mRoleCompleto";
import { RoleCompleteMapper } from "../mapper/RoleCompleteMapper";
import { RoleCompMapper } from "../mapper/RoleCompMapper ";
import { RoleMapper } from "../mapper/RoleMapper";
import { RoleAtributos } from "../models/Role";
import sRole from '../services/sRole'
const mapper = new RoleMapper();
const mappercomplete = new RoleCompleteMapper();
const mappercomp = new RoleCompMapper();
class RoleController {
    constructor() {
    }
    public getAllRole(_req: Request, _res: Response) {
        try {
            const role = sRole.getAllRole();
            role.then((r: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                r.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<RoleAtributos, mRole>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPagedRole(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const role = sRole.getPagedRole(start, limit);
            role.then(async (p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                //console.log(p);

                for (const x of p.data) {
                    const ex = await sRole.getFunctionByRole(x.id)
                    let mapeado: any = {};
                    mappercomplete.map<RoleAtributos, mRole>(x, mapeado);
                    if (ex != undefined)
                        mapeado.functions = ex;
                    result.data.push(mapeado);
                }

                //console.log(result);

                _res.status(200).json(result);
            })

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createRole(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sRole.createRole(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I006",
                    "text": "Role - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getRole(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let role = sRole.getRole(id);
            role.then(async (r: any) => {
                let result = {
                    "status": true,
                    "data": r
                }
                result.data = [];
                const ex = await sRole.getFunctionByRole(id)
                let mapeado: any = {};
                mappercomp.map<RoleAtributos, mRoleCompleto>(r, mapeado);
                if (ex != undefined)
                    mapeado.functions = ex;
                result.data.push(mapeado);
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateRole(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const role = sRole.updateRole(id, body);
            role.then((r: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I008",
                        "text": "Role - Actualizado exitosamente!"
                    }
                }
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async getFunctionsForRole(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let functions = await sRole.getFunctionByRole(id);
            let result = {
                "status": true,
                "data": functions
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const roleController = new RoleController();
export default roleController;