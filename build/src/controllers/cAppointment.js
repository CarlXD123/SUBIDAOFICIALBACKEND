"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const sAppointment_1 = __importDefault(require("../services/sAppointment"));
class AppointmentController {
    constructor() {
    }
    getAppointmentsAll(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const range = _req.query.range || "[0,9]";
                const [start, end] = JSON.parse(range);
                const limit = end - start + 1;
                const query = _req.query;
                let appointments = yield sAppointment_1.default.getAppointmentAll(start, limit, query);
                if (Array.isArray(appointments)) {
                    _res.json({
                        "status": false,
                        "message": {
                            "code": "E017",
                            "text": "Citas - no hay datos encontrados"
                        }
                    });
                }
                else {
                    let result = Object.assign({ "status": true }, appointments);
                    //console.log(result);
                    _res.status(200).json(result);
                }
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    addAppointment(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sAppointment_1.default.addAppointment(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I034",
                        "text": "Cita - Creada exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getAppointment(_req, _res) {
        try {
            let id = _req.params.id;
            let appointment = sAppointment_1.default.getAppointment(id);
            appointment.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAppointmentsByReferer(_req, _res) {
        try {
            const body = _req.body;
            let appointments = sAppointment_1.default.getAppointmentsByReferer(body);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAppointmentsByPacient(_req, _res) {
        try {
            const query = _req.body; //params-query
            let appointments = sAppointment_1.default.getAppointmentsByPacient(query);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAppointmentsByDates(_req, _res) {
        try {
            const query = _req.params; //params-query
            let appointments = sAppointment_1.default.getAppointmentsByDates(query);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getExamValueResult(_req, _res) {
        try {
            let { appointmentDetailId } = _req.params;
            let appointments = sAppointment_1.default.getExamValueResult(appointmentDetailId);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getExamValues(_req, _res) {
        try {
            let id = _req.params.id;
            let appointments = sAppointment_1.default.getExamValues(id);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAppointmentResults(_req, _res) {
        try {
            let id = _req.params.id;
            let appointments = sAppointment_1.default.getAppointmentResults(id);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateAppointment(_req, _res) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const appointments = sAppointment_1.default.updateAppointment(id, data);
            appointments.then((a) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Profesión - Modificado exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    attendAppointment(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                let data = _req.body;
                //console.log(1, id)
                //console.log(2, data)
                yield sAppointment_1.default.attendAppointment(id, data);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I039",
                        "text": "Cita - Resultados registrados exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    deleteAppointment(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sAppointment_1.default.destroyAppointment(id);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I028",
                        "text": "Cita - Eliminado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}
const appointmentController = new AppointmentController();
exports.default = appointmentController;
