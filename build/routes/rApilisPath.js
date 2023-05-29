"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisPath_1 = __importDefault(require("../controllers/cApilisPath"));
class ApilisPathRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cApilisPath_1.default.getAllPath);
        this.router.get("/:id", cApilisPath_1.default.getPath);
        this.router.post("/", cApilisPath_1.default.addPath);
        this.router.put("/:id", cApilisPath_1.default.updatePath);

        this.router.delete("/:id", cApilisPath_1.default.deletePath);
    }
}
const apilisPathRouter = new ApilisPathRouter();
exports.default = apilisPathRouter.router;