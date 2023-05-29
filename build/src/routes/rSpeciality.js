"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cSpeciality_1 = __importDefault(require("../controllers/cSpeciality"));
class SpecialityRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cSpeciality_1.default.getPagedSpeciality);
        this.router.get("/all", cSpeciality_1.default.getAllSpeciality);
        this.router.get("/:id", cSpeciality_1.default.getSpeciality);
        this.router.post("/", cSpeciality_1.default.createSpeciality);
        this.router.put("/:id", cSpeciality_1.default.updateSpeciality);
        this.router.delete("/:id", cSpeciality_1.default.deleteSpeciality);
    }
}
const specialityRouter = new SpecialityRouter();
exports.default = specialityRouter.router;
