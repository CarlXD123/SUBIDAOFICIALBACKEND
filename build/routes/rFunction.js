"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cFunction_1 = __importDefault(require("../controllers/cFunction"));
class FunctionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cFunction_1.default.getAllFunctions);
        this.router.get("/linkable", cFunction_1.default.getAllLinkableFunctions);
        this.router.get("/:id", cFunction_1.default.getFunction);
        this.router.get("/role/:id", cFunction_1.default.getRolesForFunction);
        this.router.get("/action/:id/:role_id", cFunction_1.default.getActionsByRole);
        this.router.post("/", cFunction_1.default.addFunction);
        this.router.put("/:id", cFunction_1.default.updateFunction);
        this.router.delete("/:id", cFunction_1.default.deleteFunction);
    }
}
const functionRouter = new FunctionRouter();
exports.default = functionRouter.router;
