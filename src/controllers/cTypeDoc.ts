import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mTypeDocs } from "../mapper/typeDocs/mTypeDocs";
import { TypeDocsMapper } from "../mapper/TyperDocsMapper";
import { TypeDocsAtributos } from "../models/TypeDocs";
import sTypeDocs from '../services/sTypeDocs';
const mapper = new TypeDocsMapper();
class TypeDocController {
    constructor() {
    }
    public getPagedTypeDoc(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,9]'
            const [start, end] = JSON.parse(range)
            const limit = end - start + 1
            const typeDocs = sTypeDocs.getPagedTypeDoc(start, limit);
            typeDocs.then((t: any) => {
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
    public getAllTypeDoc(_req: Request, _res: Response) {
        try {
            const typeDocs = sTypeDocs.getAllTypeDoc();
            typeDocs.then((t: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                t.forEach((x: any) => {
                    //mapper
                    let mapeado: any = {};
                    mapper.map<TypeDocsAtributos, mTypeDocs>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public createTypeDoc(_req: Request, _res: Response) {
        try {
            //No olvidar que para insertar los datos es obligatorio insertar el name y description
            //sino se caera el backend
            let body = _req.body;
            sTypeDocs.createTypeDoc(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I003",
                    "text": "Tipo de documento - Creado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getTypeDoc(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let typeDoc = sTypeDocs.getTypeDocs(id);
            typeDoc.then((t: any) => {
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
    public updateTypeDoc(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const profession = sTypeDocs.updateProfession(id, body);
            profession.then((t: any) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I005",
                        "text": "Tipo de documento - Modificado exitosamente!"
                    }
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deleteTypeDoc(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sTypeDocs.destroyProfession(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I007",
                    "text": "Tipo de documento - Eliminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

}
const typeDocController = new TypeDocController();
export default typeDocController;