"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cApilisMatchData_1 = __importDefault(require("../controllers/cApilisMatchData"));
class ApilisMatchDataRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", cApilisMatchData_1.default.getAllMatchData);
        this.router.get("/:id", cApilisMatchData_1.default.getMatchData);
        this.router.post("/", cApilisMatchData_1.default.addMatchData);
        this.router.put("/:id", cApilisMatchData_1.default.updateMatchData);

        this.router.delete("/:id", cApilisMatchData_1.default.deleteMatchData);
    }
}
const apilisMatchDataRouter = new ApilisMatchDataRouter();
exports.default = apilisMatchDataRouter.router;