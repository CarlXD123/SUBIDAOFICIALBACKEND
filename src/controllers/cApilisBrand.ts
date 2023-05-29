import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mApilisBrandComplete } from "../mapper/apilisBrand/mApilisBrandComplete";
import { mApilisBrand } from "../mapper/apilisBrand/mApilisBrand";
import { ApilisBrandCompleteMapper } from "../mapper/ApilisBrandComplete";
import { ApilisBrandMapper } from "../mapper/ApilisBrandMapper";
import { ApilisBrandAtributos } from "../models/ApilisBrand";
import sApilisBrand from '../services/sApilisBrand';
const mapper = new ApilisBrandMapper();
const mapperBrand = new ApilisBrandCompleteMapper();

class ApilisBrandController {
    constructor() {
    }

    public getAllBrand(_req: Request, _res: Response) {
        try {
            const range = _req.params.range || '[0,5000]'
            const [start, end] = JSON.parse(range as any)
            const limit = end - start + 1
            const query = _req.query;
            const brand = sApilisBrand.getAllBrand(start, limit, query);
            brand.then((m: any) => {
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

    public getBrand(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let brand = sApilisBrand.getBrand(id);
            brand.then(async (a: any) => {
                let result = {
                    "status": true,
                    "data":a
                }
                result.data=[];
                const bra = await sApilisBrand.getModelByBrand(id)
                let mapeado: any = {};
                mapperBrand.map<ApilisBrandAtributos, mApilisBrandComplete>(a, mapeado);
                if (bra != undefined)
                    mapeado.modelos = bra;
                result.data =mapeado;
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public async addBrand(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sApilisBrand.addBrand(body);
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

    public updateBrand(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const brand = sApilisBrand.updateBrand(id, data);
            brand.then((a: any) => {
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

    public async deleteBrand(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sApilisBrand.destroyBrand(id);
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

const apilisbrandController = new ApilisBrandController();
export default apilisbrandController;