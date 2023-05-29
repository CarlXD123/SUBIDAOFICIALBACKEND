"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cEmployee_1 = __importDefault(require("../controllers/cEmployee"));
class EmployeeRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cEmployee_1.default.getPagedEmployee);
        this.router.get("/all", cEmployee_1.default.getAllEmployee);
        this.router.get("/:id", cEmployee_1.default.getEmployee);
        this.router.get("/type/:typeEmployeeId", cEmployee_1.default.getEmployeeByTypeEmployee);
        this.router.delete("/:user_id", cEmployee_1.default.destroyEmployee);
        this.router.put("/:user_id", cEmployee_1.default.updateEmployee);
    }
}
const employeeRouter = new EmployeeRouter();
exports.default = employeeRouter.router;
