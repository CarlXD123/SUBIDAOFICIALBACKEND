"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cHeadquarter_1 = __importDefault(require("../controllers/cHeadquarter"));
class HeadquarterRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cHeadquarter_1.default.getAllHeadquarter);
        this.router.get("/:id", cHeadquarter_1.default.getHeadquarter);
        this.router.put("/:id", cHeadquarter_1.default.updateHeadquarter);
        this.router.post("/", cHeadquarter_1.default.createHeadquarter);
    }
}
const headquarterRouter = new HeadquarterRouter();
exports.default = headquarterRouter.router;
