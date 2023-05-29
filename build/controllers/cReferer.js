"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const sReferer_1 = __importDefault(require("../services/sReferer"));
class RefererController {
    constructor() {
    }
    getAllReferers(_req, _res) {
        try {
            const referer = sReferer_1.default.getAllReferers();
            referer.then((r) => {
                let result = {
                    "status": true,
                    "data": r
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    addReferer(req, _res) {
        try {
            let data = req.body;
            //console.log(data);
            sReferer_1.default.addReferer(data);
            let result = {
                "status": true,
                "message": {
                    "code": "I060",
                    "text": "Referencias - Se añadió una nueva referencia correctamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const refererController = new RefererController();
exports.default = refererController;
