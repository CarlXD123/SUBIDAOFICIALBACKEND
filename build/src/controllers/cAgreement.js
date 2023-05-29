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
const AgreementComplete_1 = require("../mapper/AgreementComplete");
const AgreementsMapper_1 = require("../mapper/AgreementsMapper");
const sAgreement_1 = __importDefault(require("../services/sAgreement"));
const mapper = new AgreementsMapper_1.AgreementsMapper();
const mapperAgreement = new AgreementComplete_1.AgreementsCompleteMapper();
class AgreementController {
    constructor() {
    }
    getFilterAgreement(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = _req.query;
                const agreement = sAgreement_1.default.getFilterAgreement(body);
                agreement.then((a) => {
                    let result = Object.assign({ "status": true }, a);
                    //console.log(result);
                    _res.status(200).json(result);
                });
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getAllAgreement(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agreements = sAgreement_1.default.getAllAgreement();
                agreements.then((a) => {
                    let result = {
                        "status": true,
                        "data": [undefined]
                    };
                    result.data = [];
                    a.forEach((x) => {
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
        });
    }
    getPagedAgreement(_req, _res) {
        try {
            const range = _req.query.range || '[0,9]';
            const [start, end] = JSON.parse(range + "");
            const limit = end - start + 1;
            const agreements = sAgreement_1.default.getPagedAgreement(start, limit);
            agreements.then((a) => {
                let result = Object.assign({ "status": true }, a);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAgreement(_req, _res) {
        try {
            let id = _req.params.id;
            let agreement = sAgreement_1.default.getAgreement(id);
            agreement.then((a) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": a
                };
                result.data = [];
                const agre = yield sAgreement_1.default.getAgreementByPriceList(id);
                let mapeado = {};
                mapperAgreement.map(a, mapeado);
                if (agre != undefined)
                    mapeado.priceList = agre;
                result.data = mapeado;
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createAgreement(_req, _res) {
        try {
            let body = _req.body;
            sAgreement_1.default.createAgreement(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I018",
                    "text": "Convenio - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateAgreement(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const agreements = sAgreement_1.default.updateAgreement(id, body);
            agreements.then((a) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I020",
                        "text": "Convenio - Modificado exitosamente!"
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
    deleteAgreement(_req, _res) {
        try {
            let id = _req.params.id;
            sAgreement_1.default.destroyAgreement(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I022",
                    "text": "Convenio - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const agreementController = new AgreementController();
exports.default = agreementController;
