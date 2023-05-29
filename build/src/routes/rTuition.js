"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cTuition_1 = __importDefault(require("../controllers/cTuition"));
class TuitionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cTuition_1.default.getPagedTuition);
        this.router.get("/all", cTuition_1.default.getAllTuition);
        this.router.get("/:id", cTuition_1.default.getTuition);
        this.router.post("/", cTuition_1.default.createTuition);
        this.router.put("/:id", cTuition_1.default.updateTuition);
        this.router.delete("/:id", cTuition_1.default.deleteTuition);
    }
}
const tuitionRouter = new TuitionRouter();
exports.default = tuitionRouter.router;
