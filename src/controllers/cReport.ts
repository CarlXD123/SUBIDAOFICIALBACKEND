import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sReport from '../services/sReport';
class ReportController {
    constructor() {
    }
    public async getAppointmentsByMonth(_req: Request, _res: Response) {
        try {
            let query = _req.query;
            const report = await sReport.getAppointmentsByMonth(query);
            if (Array.isArray(report)) {
                _res.json({
                    "status": false,
                    "message": {
                        "code": "E017",
                        "text": "Reporte - no hay datos en ese mes/año"
                    }
                })
            }else{
                _res.json({
                    "status": true,
                    "data": report
                })
            }
            
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
    public getAppointmentsByDate(_req: Request, _res: Response) {
        try {
            let query = _req.query;
            //const report = await sReport.getAppointmentsByDate(query);
            //  //res.json(report)
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
    public async getAppointmentResultsPDF(_req: Request, _res: Response) {
        try {
            const report = await sReport.getAppointmentResultsPDF(_req.params.id);
            let result =
                {
                    "status": true,
                    "data": report
                }
            
            _res.json(result)
        } catch (error) {
            ExecuteResponce.makeResponseException(_res,error);
        }
    }
}
const reportController = new ReportController();
export default reportController;