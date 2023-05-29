import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sDoctor from '../services/sDoctor';
class DoctorController {
    constructor() {
    }
    public getAllDoctors(_req: Request, _res: Response) {
        try {
            const doctor = sDoctor.getAllDoctors();
            doctor.then((d: any) => {
                let result = {
                    "status": true,
                    "data": d
                }
                //console.log(result);
                _res.status(200).json(result);
            });
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public addDoctor(_req: Request, _res: Response) {
        try {
            let data = _req.body;
            //console.log(data);
            sDoctor.addDoctor(data);
            let result = {
                "status": true,
                "message": {
                    "code": "I061",
                    "text": "Médico - Se añadió un nuevo médico correctamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const doctorController = new DoctorController();
export default doctorController;