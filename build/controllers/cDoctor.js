"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const sDoctor_1 = __importDefault(require("../services/sDoctor"));
class DoctorController {
    constructor() {
    }
    getAllDoctors(_req, _res) {
        try {
            const doctor = sDoctor_1.default.getAllDoctors();
            doctor.then((d) => {
                let result = {
                    "status": true,
                    "data": d
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    addDoctor(_req, _res) {
        try {
            let data = _req.body;
            //console.log(data);
            sDoctor_1.default.addDoctor(data);
            let result = {
                "status": true,
                "message": {
                    "code": "I061",
                    "text": "Médico - Se añadió un nuevo médico correctamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const doctorController = new DoctorController();
exports.default = doctorController;
