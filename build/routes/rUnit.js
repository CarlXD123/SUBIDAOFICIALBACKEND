"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cUnit_1 = __importDefault(require("../controllers/cUnit"));
class UnitRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cUnit_1.default.getAllUnit);
        this.router.get("/", cUnit_1.default.getPagedUnit);
        this.router.get("/:id", cUnit_1.default.getUnit);
        this.router.post("/", cUnit_1.default.createUnit);
        this.router.put("/:id", cUnit_1.default.updateUnit);
        this.router.delete("/:id", cUnit_1.default.deleteUnit);
    }
}
const unitRouter = new UnitRouter();
exports.default = unitRouter.router;
