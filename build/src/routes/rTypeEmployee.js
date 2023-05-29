"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cTypeEmployee_1 = __importDefault(require("../controllers/cTypeEmployee"));
class TypeEmployeeRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cTypeEmployee_1.default.getPagedTypeEmployee);
        this.router.get("/all", cTypeEmployee_1.default.getAllTypeEmployee);
        this.router.get("/:id", cTypeEmployee_1.default.getTypeEmployee);
        this.router.post("/", cTypeEmployee_1.default.createTypeEmployee);
        this.router.put("/:id", cTypeEmployee_1.default.updateTypeEmployee);
        this.router.delete("/:id", cTypeEmployee_1.default.deleteTypeEmployee);
    }
}
const typeEmployeeRouter = new TypeEmployeeRouter();
exports.default = typeEmployeeRouter.router;
