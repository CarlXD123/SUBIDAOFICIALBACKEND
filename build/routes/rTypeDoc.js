"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cTypeDoc_1 = __importDefault(require("../controllers/cTypeDoc"));
class TypeDocRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cTypeDoc_1.default.getPagedTypeDoc);
        this.router.get("/all", cTypeDoc_1.default.getAllTypeDoc);
        this.router.get("/:id", cTypeDoc_1.default.getTypeDoc);
        this.router.post("/", cTypeDoc_1.default.createTypeDoc);
        this.router.put("/:id", cTypeDoc_1.default.updateTypeDoc);
        this.router.delete("/:id", cTypeDoc_1.default.deleteTypeDoc);
    }
}
const typeDocRouter = new TypeDocRouter();
exports.default = typeDocRouter.router;
