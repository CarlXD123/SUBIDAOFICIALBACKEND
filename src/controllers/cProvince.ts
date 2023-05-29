import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mProvince } from "../mapper/province/mProvince";
import { ProvinceMapper } from "../mapper/ProvinceMapper";
import { ProvinceAtributos } from "../models/Province";
import sProvince from '../services/sProvince';
const mapper= new ProvinceMapper();
class ProvinceController {
    constructor() {
    }

    public getDistrictsForProvince(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            let districts = sProvince.getDistrictsForProvince(id);
            districts.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<ProvinceAtributos, mProvince>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
}
const provinceController = new ProvinceController();
export default provinceController;