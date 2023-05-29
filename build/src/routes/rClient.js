"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cClient_1 = __importDefault(require("../controllers/cClient"));
class ClientRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cClient_1.default.getClientAll);
        this.router.get("/doc/search", cClient_1.default.getClientByDOC);
        this.router.get("/name/search", cClient_1.default.getClientByName);
        this.router.get("/:id", cClient_1.default.getClient);
        this.router.delete("/:user_id", cClient_1.default.destroyClient);
        this.router.put("/:user_id", cClient_1.default.updateClient);
    }
}
const clientRouter = new ClientRouter();
exports.default = clientRouter.router;
