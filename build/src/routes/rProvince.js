"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cProvince_1 = __importDefault(require("../controllers/cProvince"));
class ProvinceRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/district/:id", cProvince_1.default.getDistrictsForProvince);
    }
}
const provinceRouter = new ProvinceRouter();
exports.default = provinceRouter.router;
