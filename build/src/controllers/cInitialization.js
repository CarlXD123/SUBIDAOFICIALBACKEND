"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
class InitializacionController {
    constructor() {
    }
    initialization(_req, _res) {
        try {
            //await sInitialization.initialization()
            _res.status(200).json({ status: true, message: "todo ok" });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const initializacionController = new InitializacionController();
exports.default = initializacionController;
