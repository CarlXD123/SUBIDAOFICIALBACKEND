"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cAmb_1 = __importDefault(require("../controllers/cAmb"));
class AmbRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cAmb_1.default.getPagedAmb);
        this.router.get("/all", cAmb_1.default.getAllAmb);
        this.router.get("/:id", cAmb_1.default.getAmb);
        this.router.post("/", cAmb_1.default.createAmb);
        this.router.put("/:id", cAmb_1.default.updateAmb);
        this.router.delete("/:id", cAmb_1.default.deleteAmb);
    }
}
const ambRouter = new AmbRouter();
exports.default = ambRouter.router;