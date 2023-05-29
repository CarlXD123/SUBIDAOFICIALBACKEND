"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisModel_1 = __importDefault(require("../controllers/cApilisModel"));
class ApilisModelRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/brand/:id", cApilisModel_1.default.getAllModel);
        this.router.get("/:id", cApilisModel_1.default.getModel);
        this.router.post("/", cApilisModel_1.default.addModel);
        this.router.put("/:id", cApilisModel_1.default.updateModel);

        this.router.delete("/:id", cApilisModel_1.default.deleteModel);
    }
}
const apilisModelRouter = new ApilisModelRouter();
exports.default = apilisModelRouter.router;