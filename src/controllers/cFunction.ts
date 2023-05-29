import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mFunction } from "../mapper/function/mFuncions";
import { FunctionMapper } from "../mapper/FunctionMapper";
import { FunctionAtributos } from "../models/Function";
import sFunction from '../services/sFunction';
const mapper = new FunctionMapper();
class FunctionController {
    constructor() {
    }
    public getAllFunctions(_req: Request, _res: Response) {
        try {
            const functions = sFunction.getAllFunctions();
            functions.then(async (f: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                for (const x of f) {
                    const ex = await sFunction.getFunctionByRole(x.id)
                    let mapeado: any = {};
                    mapper.map<FunctionAtributos, mFunction>(x, mapeado);
                    if (ex != undefined)
                        mapeado.roles = ex;
                    result.data.push(mapeado);
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAllLinkableFunctions(_req: Request, _res: Response) {
        try {
            const functions = sFunction.getLinkableFunctions();
            functions.then((f: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                f.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<FunctionAtributos, mFunction>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public addFunction(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            sFunction.createFunction(body);
            _res.status(200).json('Ok');
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getFunction(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let auxFunction = sFunction.getFunction(id);
            auxFunction.then(async (f: any) => {
                let result = {
                    "status": true,
                    "data": f
                }
                result.data = [];
                const ex = await sFunction.getFunctionByRole(id)
                let mapeado: any = {};
                mapper.map<FunctionAtributos, mFunction>(f, mapeado);
                if (ex != undefined)
                    mapeado.roles = ex;
                result.data.push(mapeado);
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateFunction(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const functions = sFunction.updateFunction(id, body);
            functions.then((f: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "function - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteFunction(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sFunction.destroyFunction(id);
            _res.status(200).json('Delete Function');
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getRolesForFunction(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let roles = sFunction.getRolesForFunction(id);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    //Metodo que no se utiliza
    public getActionsByRole(_req: Request, _res: Response) {
        try {
            //let { id, role_id } = _req.params;
            //let auxFunction = await sFunction.getActionsByRole(id, role_id);
            //res.status(200).json(auxFunction);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const functionController = new FunctionController();
export default functionController;