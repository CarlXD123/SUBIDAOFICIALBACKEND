"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cDoctor_1 = __importDefault(require("../controllers/cDoctor"));
class DoctorRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cDoctor_1.default.getAllDoctors);
        this.router.post("/", cDoctor_1.default.addDoctor);
    }
}
const doctorRouter = new DoctorRouter();
exports.default = doctorRouter.router;
