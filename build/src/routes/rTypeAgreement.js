"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cTypeAgreement_1 = __importDefault(require("../controllers/cTypeAgreement"));
class TypeAgreementRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cTypeAgreement_1.default.getAllTypeAgreement);
    }
}
const typeAgreementRouter = new TypeAgreementRouter();
exports.default = typeAgreementRouter.router;
