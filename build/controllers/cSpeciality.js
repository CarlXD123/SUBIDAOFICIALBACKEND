"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const SpecialityMapper_1 = require("../mapper/SpecialityMapper");
const sSpeciality_1 = __importDefault(require("../services/sSpeciality"));
const mapper = new SpecialityMapper_1.SpecialityMapper();
class SpecialityController {
    constructor() {
    }
    getPagedSpeciality(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const speciality = sSpeciality_1.default.getPagedSpeciality(start, limit);
            speciality.then((s) => {
                let result = Object.assign({ "status": true }, s);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllSpeciality(_req, _res) {
        try {
            const speciality = sSpeciality_1.default.getAllSpeciality();
            speciality.then((s) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                s.forEach((x) => {
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
    createSpeciality(_req, _res) {
        try {
            let body = _req.body;
            sSpeciality_1.default.createSpeciality(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I009",
                    "text": "Especialidad - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getSpeciality(_req, _res) {
        try {
            let id = _req.params.id;
            let speciality = sSpeciality_1.default.getSpeciality(id);
            speciality.then((s) => {
                let result = {
                    "status": true,
                    "data": s
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateSpeciality(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const speciality = sSpeciality_1.default.updateSpeciality(id, body);
            speciality.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I011",
                        "text": "Especialidad - Modificado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteSpeciality(_req, _res) {
        try {
            let id = _req.params.id;
            sSpeciality_1.default.destroySpeciality(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I013",
                    "text": "Especialidad - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const specialityController = new SpecialityController();
exports.default = specialityController;
