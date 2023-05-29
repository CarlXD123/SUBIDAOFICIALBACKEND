import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mProvince } from "../mapper/province/mProvince";
import { ProvinceMapper } from "../mapper/ProvinceMapper";
import { mRegion } from "../mapper/region/mRegion";
import { RegionMapper } from "../mapper/RegionMapper";
import { ProvinceAtributos } from "../models/Province";
import { RegionAtributos } from "../models/Region";
import sRegion from '../services/sRegion';
const mapper = new RegionMapper();
const mapperProvincia = new ProvinceMapper();
class RegionController {
    constructor() {
    }
    public getRegions(_req: Request, _res: Response) {
        try {
            let regions = sRegion.getRegionsAll();
            regions.then((r: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                r.forEach((x: any) => {
                    let mapeado: any = {};
                    mapper.map<RegionAtributos, mRegion>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getProvincesForRegion(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            let provinces = sRegion.getProvincesForRegion(id);
            provinces.then((p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                p.forEach((x: any) => {
                    let mapeado: any = {};
                    mapperProvincia.map<ProvinceAtributos, mProvince>(x, mapeado);
                    result.data.push(mapeado);
                })
                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const regionController = new RegionController();
export default regionController;