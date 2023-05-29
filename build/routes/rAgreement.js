"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cAgreement_1 = __importDefault(require("../controllers/cAgreement"));
class AgreementRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/filter", cAgreement_1.default.getFilterAgreement);
        this.router.get("/", cAgreement_1.default.getPagedAgreement);
        this.router.get("/all", cAgreement_1.default.getAllAgreement);
        this.router.get("/:id", cAgreement_1.default.getAgreement);
        this.router.post("/", cAgreement_1.default.createAgreement);
        this.router.put("/:id", cAgreement_1.default.updateAgreement);
        this.router.delete("/:id", cAgreement_1.default.deleteAgreement);
    }
}
const agreementRouter = new AgreementRouter();
exports.default = agreementRouter.router;
