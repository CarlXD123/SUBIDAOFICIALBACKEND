import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sReferer from "../services/sReferer";

class RefererController {
    constructor() {
    }

    public getAllReferers(_req: Request, _res: Response) {
        try {
            const referer = sReferer.getAllReferers();
            referer.then((r: any) => {
                let result = {
                    "status": true,
                    "data": r
                }
                //console.log(result);
                _res.status(200).json(result);
            })

        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public addReferer(req: Request, _res: Response) {
        try {
            let data = req.body;
            //console.log(data);

            sReferer.addReferer(data);
            let result = {
                "status": true,
                "message": {
                    "code": "I060",
                    "text": "Referencias - Se añadió una nueva referencia correctamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }


}
const refererController = new RefererController();
export default refererController;