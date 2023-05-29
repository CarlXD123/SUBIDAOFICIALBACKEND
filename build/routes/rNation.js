"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cNation_1 = __importDefault(require("../controllers/cNation"));
class NationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cNation_1.default.getPagedNation);
        this.router.get("/all", cNation_1.default.getAllNation);
        this.router.get("/:id", cNation_1.default.getNation);
        this.router.post("/", cNation_1.default.createNation);
        this.router.put("/:id", cNation_1.default.updateNation);
        this.router.delete("/:id", cNation_1.default.deleteNation);
    }
}
const nationRouter = new NationRouter();
exports.default = nationRouter.router;