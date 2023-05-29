"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisBrand_1 = __importDefault(require("../controllers/cApilisBrand"));
class ApilisBrandRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cApilisBrand_1.default.getAllBrand);
        this.router.get("/:id", cApilisBrand_1.default.getBrand);
        this.router.post("/", cApilisBrand_1.default.addBrand);
        this.router.put("/:id", cApilisBrand_1.default.updateBrand);

        this.router.delete("/:id", cApilisBrand_1.default.deleteBrand);
    }
}
const apilisBrandRouter = new ApilisBrandRouter();
exports.default = apilisBrandRouter.router;