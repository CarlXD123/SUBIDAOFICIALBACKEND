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
const sReport_1 = __importDefault(require("../services/sReport"));
class ReportController {
    constructor() {
    }
    getAppointmentsByMonth(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = _req.query;
                const report = yield sReport_1.default.getAppointmentsByMonth(query);
                if (Array.isArray(report)) {
                    _res.json({
                        "status": false,
                        "message": {
                            "code": "E017",
                            "text": "Reporte - no hay datos en ese mes/año"
                        }
                    });
                }
                else {
                    _res.json({
                        "status": true,
                        "data": report
                    });
                }
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getAppointmentsByDate(_req, _res) {
        try {
            let query = _req.query;
            //const report = await sReport.getAppointmentsByDate(query);
            //  //res.json(report)
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAppointmentResultsPDF(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield sReport_1.default.getAppointmentResultsPDF(_req.params.id);
                let result = {
                    "status": true,
                    "data": report
                };
                _res.json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}
const reportController = new ReportController();
exports.default = reportController;
