"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cReferer_1 = __importDefault(require("../controllers/cReferer"));
class RefererRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", cReferer_1.default.getAllReferers);
        this.router.post("/", cReferer_1.default.addReferer);
    }
}
const refererRouter = new RefererRouter();
exports.default = refererRouter.router;
