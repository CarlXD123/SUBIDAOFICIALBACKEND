"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cProfession_1 = __importDefault(require("../controllers/cProfession"));
class ProfessionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cProfession_1.default.getPagedProfession);
        this.router.get("/all", cProfession_1.default.getAllProfession);
        this.router.get("/:id", cProfession_1.default.getProfession);
        this.router.post("/", cProfession_1.default.createProfession);
        this.router.put("/:id", cProfession_1.default.updateProfession);
        this.router.delete("/:id", cProfession_1.default.deleteProfession);
    }
}
const professionRouter = new ProfessionRouter();
exports.default = professionRouter.router;
