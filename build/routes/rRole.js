"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cRole_1 = __importDefault(require("../controllers/cRole"));
class RoleRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cRole_1.default.getAllRole);
        this.router.get("/", cRole_1.default.getPagedRole);
        this.router.get("/function/:id", cRole_1.default.getFunctionsForRole);
        this.router.get("/:id", cRole_1.default.getRole);
        this.router.post("/", cRole_1.default.createRole);
        this.router.put("/:id", cRole_1.default.updateRole);
    }
}
const roleRouter = new RoleRouter();
exports.default = roleRouter.router;
