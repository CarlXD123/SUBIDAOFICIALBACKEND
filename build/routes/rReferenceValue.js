"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cReferenceValue_1 = __importDefault(require("../controllers/cReferenceValue"));
class ReferenceValueRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cReferenceValue_1.default.getPagedReferenceValue);
        this.router.get("/all", cReferenceValue_1.default.getAllReferenceValue);
        this.router.post("/", cReferenceValue_1.default.createReferenceValue);
        this.router.get("/:id", cReferenceValue_1.default.getReferenceValue);
        this.router.put("/exam/edit/:id/", cReferenceValue_1.default.updateExaminationReferenceValue);
        this.router.get("/exam/examinationValues/", cReferenceValue_1.default.getExaminationValues);
        this.router.get("/exam/:id/", cReferenceValue_1.default.getExamValuebyExamId);
        this.router.put("/:id", cReferenceValue_1.default.updateReferenceValue);
        this.router.delete("/:id", cReferenceValue_1.default.deleteReferenceValue);
    }
}
const referenceValueRouter = new ReferenceValueRouter();
exports.default = referenceValueRouter.router;
