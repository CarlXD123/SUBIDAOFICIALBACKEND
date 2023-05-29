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
const ReferenceValuesMapper_1 = require("../mapper/ReferenceValuesMapper");
const sReferenceValue_1 = __importDefault(require("../services/sReferenceValue"));
const mapper = new ReferenceValuesMapper_1.ReferenceValueMapper();
class ReferenceValueController {
    constructor() {
    }
    getPagedReferenceValue(_req, _res) {
        try {
            const range = _req.params.range || "[0,9]";
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const referenceValues = sReferenceValue_1.default.getPagedReferenceValue(start, limit);
            referenceValues.then((r) => {
                let result = Object.assign({ "status": true }, r);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllReferenceValue(_req, _res) {
        try {
            const referenceValues = sReferenceValue_1.default.getAllReferenceValue();
            referenceValues.then((r) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                r.forEach((x) => {
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
    createReferenceValue(_req, _res) {
        try {
            let body = _req.body;
            sReferenceValue_1.default.createReferenceValue(body);
            _res.status(200).json('Ok');
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getReferenceValue(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                let referenceValue = yield sReferenceValue_1.default.getReferenceValue(id);
                let result = {
                    "status": true,
                    "data": referenceValue
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    updateExaminationReferenceValue(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const referenceValues = sReferenceValue_1.default.updateExaminationReferenceValue(id, body);
            referenceValues.then((r) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Reference Examination - Modificado exitosamente!"
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
    getExaminationValues(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const examinationValues = yield sReferenceValue_1.default.getAllExaminationValues();
                let result = {
                    "status": true,
                    "data": examinationValues
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getExamValuebyExamId(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                let appointmentId = _req.query.appointmentId;
                const referenceValue = yield sReferenceValue_1.default.getExamValuebyExamId(id, appointmentId);
                let result = {
                    "status": true,
                    "data": referenceValue
                };
                //console.log(result);
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    updateReferenceValue(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const referenceValue = sReferenceValue_1.default.updateReferenceValue(id, body);
            referenceValue.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "Reference Value- Modificado exitosamente!"
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
    deleteReferenceValue(_req, _res) {
        try {
            let id = _req.params.id;
            sReferenceValue_1.default.destroyReferenceValue(id);
            _res.status(200).json('Delete Reference Value');
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const referenceValueController = new ReferenceValueController();
exports.default = referenceValueController;
