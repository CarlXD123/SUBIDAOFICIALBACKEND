"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cCategory_1 = __importDefault(require("../controllers/cCategory"));
class CategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cCategory_1.default.getAllCategory);
        this.router.get("/:id", cCategory_1.default.getCategory);
        this.router.post("/", cCategory_1.default.createCategory);
        this.router.put("/:id", cCategory_1.default.updateCategory);
        this.router.delete("/:id", cCategory_1.default.deleteCategory);
    }
}
const categoryRouter = new CategoryRouter();
exports.default = categoryRouter.router;
