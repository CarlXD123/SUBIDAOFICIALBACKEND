"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cMethod_1 = __importDefault(require("../controllers/cMethod"));
class MethodRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cMethod_1.default.getPagedMethod);
        this.router.get("/all", cMethod_1.default.getAllMethod);
        this.router.get("/:id", cMethod_1.default.getMethod);
        this.router.post("/", cMethod_1.default.createMethod);
        this.router.put("/:id", cMethod_1.default.updateMethod);
        this.router.delete("/:id", cMethod_1.default.deleteMethod);
    }
}
const methodRouter = new MethodRouter();
exports.default = methodRouter.router;
