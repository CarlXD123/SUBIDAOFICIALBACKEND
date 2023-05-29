"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cPriceList_1 = __importDefault(require("../controllers/cPriceList"));
class PriceListRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cPriceList_1.default.getAllPriceList);
        this.router.get("/:id", cPriceList_1.default.getPriceList);
        this.router.post("/", cPriceList_1.default.createPriceList);
        this.router.put("/:id", cPriceList_1.default.updatePriceList);
        this.router.delete("/:id", cPriceList_1.default.deletePriceList);
    }
}
const priceListRouter = new PriceListRouter();
exports.default = priceListRouter.router;
