"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const MethodMapper_1 = require("../mapper/MethodMapper");
const sMethod_1 = __importDefault(require("../services/sMethod"));
const mapper = new MethodMapper_1.MethodMapper();
class MethodController {
    constructor() {
    }
    getAllMethod(_req, _res) {
        try {
            const method = sMethod_1.default.getAllMethod();
            method.then((m) => {
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
    getPagedMethod(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const method = sMethod_1.default.getPagedMethod(start, limit);
            method.then((m) => {
                let result = Object.assign({ "status": true }, m);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createMethod(_req, _res) {
        try {
            let body = _req.body;
            sMethod_1.default.createMethod(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I050",
                    "text": "Metodologia - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getMethod(_req, _res) {
        try {
            let id = _req.params.id;
            let method = sMethod_1.default.getMethod(id);
            method.then((m) => {
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
    updateMethod(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const method = sMethod_1.default.updateMethod(id, body);
            method.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Metodologia - Modificado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteMethod(_req, _res) {
        try {
            let id = _req.params.id;
            sMethod_1.default.destroyMethod(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Metodologia - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const methodController = new MethodController();
exports.default = methodController;
