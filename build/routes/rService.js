"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cService_1 = __importDefault(require("../controllers/cService"));
class ServiceRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cService_1.default.getPagedService);
        this.router.get("/all", cService_1.default.getAllService);
        this.router.get("/:id", cService_1.default.getService);
        this.router.post("/", cService_1.default.createService);
        this.router.put("/:id", cService_1.default.updateService);
        this.router.delete("/:id", cService_1.default.deleteService);
    }
}
const serviceRouter = new ServiceRouter();
exports.default = serviceRouter.router;
