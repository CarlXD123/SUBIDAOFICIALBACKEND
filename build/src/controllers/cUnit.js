"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const UnitMapper_1 = require("../mapper/UnitMapper");
const sUnit_1 = __importDefault(require("../services/sUnit"));
const mapper = new UnitMapper_1.UnitMapper();
class UnitController {
    constructor() {
    }
    getAllUnit(_req, _res) {
        try {
            const unit = sUnit_1.default.getAllUnit();
            unit.then((u) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                u.forEach((x) => {
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
    getPagedUnit(_req, _res) {
        try {
            const range = _req.params.range || "[0,9]";
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const unit = sUnit_1.default.getPagedUnit(start, limit);
            unit.then((u) => {
                let result = Object.assign({ "status": true }, u);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createUnit(_req, _res) {
        try {
            let body = _req.body;
            sUnit_1.default.createUnit(body);
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
    getUnit(_req, _res) {
        try {
            let id = _req.params.id;
            let unit = sUnit_1.default.getUnit(id);
            unit.then((u) => {
                let result = {
                    "status": true,
                    "data": u
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateUnit(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const unit = sUnit_1.default.updateUnit(id, body);
            unit.then((u) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I052",
                        "text": "Metodologia - Modificado exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteUnit(_req, _res) {
        try {
            let id = _req.params.id;
            sUnit_1.default.destroyUnit(id);
            let resultado = {
                "status": true,
                "message": {
                    "code": "I054",
                    "text": "Metodologia - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(resultado);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const unitController = new UnitController();
exports.default = unitController;
