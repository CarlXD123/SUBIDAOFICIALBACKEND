"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cExamination_1 = __importDefault(require("../controllers/cExamination"));
class ExaminationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/filter", cExamination_1.default.getFilterExamination);
        this.router.get("/", cExamination_1.default.getPagedExamination);
        this.router.get("/all", cExamination_1.default.getAllExamination);
        this.router.get("/:id", cExamination_1.default.getExamination);
        this.router.put("/edit/values/:id", cExamination_1.default.updateExaminationValues);
        this.router.put("/group/edit/:id", cExamination_1.default.updateGroupExamination);
        this.router.put("/examn/edit", cExamination_1.default.updateGroupExam);
        this.router.put("/:id", cExamination_1.default.updateExamination);
        this.router.post("/", cExamination_1.default.createExamination);
        this.router.delete("/:id", cExamination_1.default.deleteExamination);
    }
}
const examinationRouter = new ExaminationRouter();
exports.default = examinationRouter.router;
