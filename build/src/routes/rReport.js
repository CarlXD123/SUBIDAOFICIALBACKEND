"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cReport_1 = __importDefault(require("../controllers/cReport"));
class ReportRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/appointments", cReport_1.default.getAppointmentsByMonth);
        this.router.get("/appointments/date", cReport_1.default.getAppointmentsByDate);
        this.router.get("/result/:id", cReport_1.default.getAppointmentResultsPDF);
    }
}
const reportRouter = new ReportRouter();
exports.default = reportRouter.router;
