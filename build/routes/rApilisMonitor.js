"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisMonitor_1 = __importDefault(require("../controllers/cApilisMonitor"));
class ApilisMonitorRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cApilisMonitor_1.default.getAllMonitor);
        this.router.get("/:id", cApilisMonitor_1.default.getMonitor);
        this.router.post("/", cApilisMonitor_1.default.addMonitor);
        this.router.put("/:id", cApilisMonitor_1.default.updateMonitor);

        this.router.delete("/:id", cApilisMonitor_1.default.deleteMonitor);
    }
}
const apilisMonitorRouter = new ApilisMonitorRouter();
exports.default = apilisMonitorRouter.router;