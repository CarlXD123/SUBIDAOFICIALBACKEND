"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const AmbMapper_1 = require("../mapper/AmbMapper");
const sAmb_1 = __importDefault(require("../services/sAmb"));
const mapper = new AmbMapper_1.AmbMapper();
class AmbController {
    constructor() {
    }
    getAllAmb(_req, _res) {
        try {
            const amb = sAmb_1.default.getAllAmb();
            amb.then((m) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                m.forEach((x) => {
                    //mapper
                    let mapeado = {};
                    mapper.map(x, mapeado);
                    result.data.push(mapeado);
                });
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getPagedAmb(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const amb = sAmb_1.default.getPagedAmb(start, limit);
            amb.then((m) => {
                let result = Object.assign({ "status": true }, m);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createAmb(_req, _res) {
        try {
            let body = _req.body;
            sAmb_1.default.createAmb(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I050",
                    "text": "Nacionalidad - Creada exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAmb(_req, _res) {
        try {
            let id = _req.params.id;
            let amb = sAmb_1.default.getAmb(id);
            amb.then((m) => {
                let result = {
                    "status": true,
                    "data": m
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateAmb(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const amb = sAmb_1.default.updateAmb(id, body);
            amb.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Nacionalidad - Modificada exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteAmb(_req, _res) {
        try {
            let id = _req.params.id;
            sAmb_1.default.destroyAmb(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Nacionalidad - Eliminada exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const ambController = new AmbController();
exports.default = ambController;