"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 =  require("express");
const cReadCsv_1 = __importDefault(require("../controllers/cReadCsv"));
class ReadCsvRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cReadCsv_1.default.readCsv);
    }
}
const readCsvRouter = new ReadCsvRouter();
exports.default = readCsvRouter.router;