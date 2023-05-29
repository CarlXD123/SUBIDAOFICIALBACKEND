"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cAppointment_1 = __importDefault(require("../controllers/cAppointment"));
class AppointmentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cAppointment_1.default.getAppointmentsAll);
        this.router.post("/", cAppointment_1.default.addAppointment);
        this.router.get("/:id", cAppointment_1.default.getAppointment);
        this.router.get("/pacient/:id", cAppointment_1.default.getAppointmentByPati);
        this.router.get("/referer/search", cAppointment_1.default.getAppointmentsByReferer);
        this.router.get("/pacient/search", cAppointment_1.default.getAppointmentsByPacient);
        this.router.get("/dates/search", cAppointment_1.default.getAppointmentsByDates);
        this.router.get("/examvalueresult/:appointmentDetailId/", cAppointment_1.default.getExamValueResult);
        this.router.get("/examvalues/:id", cAppointment_1.default.getExamValues);
        this.router.get("/result/:id", cAppointment_1.default.getAppointmentResults);
        this.router.put("/attend/:id", cAppointment_1.default.attendAppointment);
        this.router.put("/:id", cAppointment_1.default.updateAppointment);
        this.router.delete("/:id", cAppointment_1.default.deleteAppointment);
    }
}
const appointmentRouter = new AppointmentRouter();
exports.default = appointmentRouter.router;
