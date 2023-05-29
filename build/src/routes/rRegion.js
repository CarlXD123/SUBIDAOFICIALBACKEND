"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cRegion_1 = __importDefault(require("../controllers/cRegion"));
class RegionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cRegion_1.default.getRegions);
        this.router.get("/province/:id", cRegion_1.default.getProvincesForRegion);
    }
}
const regionRouter = new RegionRouter();
exports.default = regionRouter.router;
