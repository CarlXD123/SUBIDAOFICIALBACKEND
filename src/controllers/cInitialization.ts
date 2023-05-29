import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
class InitializacionController {
    constructor() {
    }
    public initialization(_req: Request, _res: Response){
        try {
            //await sInitialization.initialization()
            _res.status(200).json({status:true,message:"todo ok"})
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
}
const initializacionController= new InitializacionController();
export default initializacionController;