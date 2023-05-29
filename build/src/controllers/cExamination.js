"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const ExaminationMapper_1 = require("../mapper/ExaminationMapper");
const sExamination_1 = __importDefault(require("../services/sExamination"));
const mapper = new ExaminationMapper_1.ExaminationMapper();
class ExaminationController {
    constructor() {
    }
    getPagedExamination(_req, _res) {
        try {
            const range = _req.query.range || "[0,9]";
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const examination = sExamination_1.default.getPagedExamination(start, limit);
            examination.then((e) => {
                let result = Object.assign({ "status": true }, e);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllExamination(_req, _res) {
        try {
            const examination = sExamination_1.default.getAllExamination();
            examination.then((p) => {
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
    getFilterExamination(_req, _res) {
        try {
            const query = _req.query;
            const examinations = sExamination_1.default.getFilterExamination(query);
            examinations.then((e) => {
                let result = Object.assign({ status: true }, e);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateExaminationValues(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const examination = sExamination_1.default.updateExaminationValues(id, body);
            examination.then((e) => {
                let result = {
                    "status": true,
                    "text": "Valores de Examenes - Modificado exitosamente!"
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateGroupExam(_req, _res) {
        try {
            let body = _req.body;
            const group = sExamination_1.default.updateExaminationTotal(body);
            group.then((g) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I002",
                        "text": "Examén - Modificado exitosamente!"
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
    updateGroupExamination(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                let id = _req.params.id;
                yield sExamination_1.default.updateExaminationValues(id, body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I002",
                        "text": "Grupo de Examenes - Modificado exitosamente!"
                    }
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    createExamination(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sExamination_1.default.createExamination(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Examén - Creado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getExamination(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                let examination = yield sExamination_1.default.getExamination(id);
                let result = {
                    "status": true,
                    "data": examination
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    updateExamination(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const examination = sExamination_1.default.updateExamination(id, body);
            examination.then((e) => {
                let result = {
                    "status": true,
                    "text": "Examén - Modificado exitosamente!"
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteExamination(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                yield sExamination_1.default.destroyExamination(id);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Examén - Eliminado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}
const examinationController = new ExaminationController();
exports.default = examinationController;
