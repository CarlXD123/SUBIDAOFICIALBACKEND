"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisMatchDataDetail_1 = __importDefault(require("../controllers/cApilisMatchDataDetail"));
class ApilisMatchDataDetailRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cApilisMatchDataDetail_1.default.getAllMatchDataDetail);
        this.router.get("/:id", cApilisMatchDataDetail_1.default.getMatchDataDetail);
        this.router.get("/value/exam/:id", cApilisMatchDataDetail_1.default.getExamValueByExamination);
        this.router.get("/value/exam2/:id", cApilisMatchDataDetail_1.default.getExamValueByExamination2);
        this.router.post("/", cApilisMatchDataDetail_1.default.addMatchDataDetail);
        this.router.put("/:id", cApilisMatchDataDetail_1.default.updateMatchDataDetail);

        this.router.delete("/:id", cApilisMatchDataDetail_1.default.deleteMatchDataDetail);
    }
}
const apilisMatchDataDetailRouter = new ApilisMatchDataDetailRouter();
exports.default = apilisMatchDataDetailRouter.router;