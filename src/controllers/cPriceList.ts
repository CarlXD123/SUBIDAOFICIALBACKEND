import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import { mPriceList } from "../mapper/priceList/mPriceList";
import { mPriceListComplete } from "../mapper/priceList/mPriceListComplete";
import { PriceListCompleteMapper } from "../mapper/PriceListComplete";
import { PriceListMapper } from "../mapper/PriceListMapper";
import { PriceListAtributos } from "../models/PriceList";
import sPriceList from '../services/sPriceList'
const mapper = new PriceListMapper();
const mappercomplete = new PriceListCompleteMapper();
class PriceListController {
    constructor() {
    }
    public getAllPriceList(_req: Request, _res: Response) {
        try {
            const query = _req.query;
            const pricesList = sPriceList.getAllPriceList(query);
            pricesList.then(async (p: any) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                }
                result.data = [];
                //console.log(p);

                for (const x of p) {
                    const ex = await sPriceList.getExaminationsByPriceList(x.id)
                    let mapeado: any = {};
                    mapper.map<PriceListAtributos, mPriceList>(x, mapeado);
                    if (ex != undefined)
                        mapeado.examinations = ex;
                    result.data.push(mapeado);
                }

                //console.log(result);

                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async createPriceList(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sPriceList.createPriceList(body)
            let result = {
                "status": true,
                "message": {
                    "code": "I040",
                    "text": "PriceList - Creado exitosamente!"
                }
            }
            //console.log(result);
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getPriceList(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let priceList = sPriceList.getPriceList(id);
            priceList.then(async (p: any) => {
                let result = {
                    "status": true,
                    "data": p
                }
                const price = await sPriceList.getPriceListByExamination(id)
                let mapeado: any = {};
                mappercomplete.map<PriceListAtributos, mPriceListComplete>(p, mapeado);
                if (price != undefined)
                    mapeado.examinations = price;
                result.data=mapeado;
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async updatePriceList(_req: Request, _res: Response) {
        try {
            let body = _req.body
            let id = _req.params.id
            await sPriceList.updatePriceList(id, body);
            let result = {
                "status": true,
                "message": {
                    "code": "I042",
                    "text": "PriceList - Modificado exitosamente!"
                }
            }
            //console.log(result);
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public deletePriceList(_req: Request, _res: Response) {
        try {
            let id = _req.params.id
            sPriceList.destroyPriceList(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I044",
                    "text": "PriceList - Elminado exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

}
const priceListController = new PriceListController();
export default priceListController;