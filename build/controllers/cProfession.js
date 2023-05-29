"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const ProfessionMapper_1 = require("../mapper/ProfessionMapper");
const sProfession_1 = __importDefault(require("../services/sProfession"));
const mapper = new ProfessionMapper_1.ProfessionMapper();
class ProfessionController {
    constructor() {
    }
    getPagedProfession(_req, _res) {
        try {
            //const range = _req.query.range || '[0,9]';
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const profession = sProfession_1.default.getPagedProfession(start, limit);
            profession.then((p) => {
                let result = Object.assign({ "status": true }, p);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllProfession(_req, _res) {
        try {
            const profession = sProfession_1.default.getAllProfession();
            profession.then((p) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                p.forEach((x) => {
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
    getProfession(_req, _res) {
        try {
            let id = _req.params.id;
            let profession = sProfession_1.default.getProfession(id);
            profession.then((p) => {
                let result = {
                    "status": true,
                    "data": p
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createProfession(_req, _res) {
        try {
            let body = _req.body;
            sProfession_1.default.createProfession(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I047",
                    "text": "Profesión - agregado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateProfession(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const profession = sProfession_1.default.updateProfession(id, body);
            profession.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Profesión - Modificado exitosamente!"
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
    deleteProfession(_req, _res) {
        try {
            let id = _req.params.id;
            sProfession_1.default.destroyProfession(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I051",
                    "text": "Profesión - Elminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const professionController = new ProfessionController();
exports.default = professionController;
