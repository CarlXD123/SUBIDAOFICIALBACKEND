"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const TuitionMapper_1 = require("../mapper/TuitionMapper");
const sTuition_1 = __importDefault(require("../services/sTuition"));
const mapper = new TuitionMapper_1.TuitionMapper();
class TuitionController {
    constructor() {
    }
    getPagedTuition(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const tuition = sTuition_1.default.getPagedTuition(start, limit);
            tuition.then((t) => {
                let result = Object.assign({ "status": true }, t);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllTuition(_req, _res) {
        try {
            const tuition = sTuition_1.default.getAllTuition();
            tuition.then((p) => {
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
    createTuition(_req, _res) {
        try {
            let body = _req.body;
            sTuition_1.default.createTuition(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I021",
                    "text": "Colegiatura - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getTuition(_req, _res) {
        try {
            let id = _req.params.id;
            let tuition = sTuition_1.default.getTuition(id);
            tuition.then((t) => {
                let result = {
                    "status": true,
                    "data": t
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateTuition(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const tuition = sTuition_1.default.updateTuition(id, body);
            tuition.then((t) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I023",
                        "text": "Colegiatura - Modificado exitosamente!"
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
    deleteTuition(_req, _res) {
        try {
            let id = _req.params.id;
            sTuition_1.default.destroyTuition(id);
            let resultado = {
                "status": true,
                "message": {
                    "code": "I025",
                    "text": "Colegiatura - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(resultado);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const tuitionController = new TuitionController();
exports.default = tuitionController;
