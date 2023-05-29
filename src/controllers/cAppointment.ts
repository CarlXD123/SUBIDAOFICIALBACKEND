import { prototype } from "events";
import { Request, Response } from "express";
import { ExecuteResponce } from "../global/response";
import sAppointment from '../services/sAppointment';
import provinceController from "./cProvince";
class AppointmentController {
    constructor() {
    }
    public async getAppointmentsAll(_req: Request, _res: Response) {
        try {
            const range = _req.query.range || "[0,9]";
            const [start, end] = JSON.parse((range as any));
            const limit = end - start + 1;
            const query = _req.query;
            let appointments = await sAppointment.getAppointmentAll(start, limit, query);
            if (Array.isArray(appointments)) {
                _res.json({
                    "status": false,
                    "message": {
                        "code": "E017",
                        "text": "Citas - no hay datos encontrados"
                    }
                })
            } else {
                let result = {
                    "status": true,
                    ...appointments
                }
                //console.log(result);
                _res.status(200).json(result);

            }
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public async addAppointment(_req: Request, _res: Response) {
        try {
            let body = _req.body;
            await sAppointment.addAppointment(body);
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
    public getAppointment(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let appointment = sAppointment.getAppointment(id);
            appointment.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }













    public getAppointmentByPati(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let appointment = sAppointment.getAppointmentByPati(id);
            appointment.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }









    public getAppointmentsByReferer(_req: Request, _res: Response) {
        try {
            const body = _req.body;
            let appointments = sAppointment.getAppointmentsByReferer(body);
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAppointmentsByPacient(_req: Request, _res: Response) {
        try {
            const query = _req.body;//params-query
            let appointments = sAppointment.getAppointmentsByPacient(query);
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getAppointmentsByDates(_req: Request, _res: Response) {
        try {
            const query = _req.params;//params-query
            let appointments = sAppointment.getAppointmentsByDates(query);
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getExamValueResult(_req: Request, _res: Response) {
        try {
            let { appointmentDetailId } = _req.params;
            let appointments = sAppointment.getExamValueResult(appointmentDetailId);
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public getExamValues(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let appointments = sAppointment.getExamValues(id);
            
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }

    public getAppointmentResults(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let appointments = sAppointment.getAppointmentResults(id);
            appointments.then((a: any) => {
                let result = {
                    "status": true,
                    "data": a
                }
                //console.log(result);
                _res.status(200).json(result);
            })
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
    public updateAppointment(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const appointments = sAppointment.updateAppointment(id, data);
            appointments.then((a: any) => {
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
    public async attendAppointment(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            //console.log(1, id)
            //console.log(2, data)
            await sAppointment.attendAppointment(id, data);
            let result = {
                "status": true,
                "message": {
                    "code": "I039",
                    "text": "Cita - Resultados registrados exitosamente!"
                }
            }
            _res.status(200).json(result);
        } catch (error) {
            ExecuteResponce.makeResponseException(_res, error);
        }
    }
   
    public async deleteAppointment(_req: Request, _res: Response) {
        try {
            let id = _req.params.id;
            sAppointment.destroyAppointment(id);
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

const appointmentController = new AppointmentController();
export default appointmentController;