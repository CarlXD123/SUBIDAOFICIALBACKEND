"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const NationMapper_1 = require("../mapper/NationMapper");
const sNation_1 = __importDefault(require("../services/sNation"));
const mapper = new NationMapper_1.NationMapper();
class NationController {
    constructor() {
    }
    getAllNation(_req, _res) {
        try {
            const nation = sNation_1.default.getAllNation();
            nation.then((m) => {
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
    getPagedNation(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const nation = sNation_1.default.getPagedNation(start, limit);
            nation.then((m) => {
                let result = Object.assign({ "status": true }, m);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createNation(_req, _res) {
        try {
            let body = _req.body;
            sNation_1.default.createNation(body);
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
    getNation(_req, _res) {
        try {
            let id = _req.params.id;
            let nation = sNation_1.default.getNation(id);
            nation.then((m) => {
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
    updateNation(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const nation = sNation_1.default.updateNation(id, body);
            nation.then((p) => {
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
    deleteNation(_req, _res) {
        try {
            let id = _req.params.id;
            sNation_1.default.destroyNation(id);
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
const nationController = new NationController();
exports.default = nationController;