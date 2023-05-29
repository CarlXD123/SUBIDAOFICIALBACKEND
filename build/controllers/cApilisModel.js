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
const sApilisModel_1 = __importDefault(require("../services/sApilisModel"));
const ApilisModelComplete_1 = require("../mapper/ApilisModelMapper");
const mapperModelData = new ApilisModelComplete_1.ApilisModelMapper();

class ApilisModelController {
    constructor() {
    }

    getAllModel(_req, _res) {
        try {
            let id = _req.params.id;
            let model = sApilisModel_1.default.getAllModel(id);
            model.then((a) => {
                let result = {
                    "status": true,
                    "data": a
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    getModel(_req, _res) {
        try {
            let id = _req.params.id;
            let model = sApilisModel_1.default.getModel(id);
            model.then((a) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": a
                };
                result.data = [];
                const bra = yield sApilisModel_1.default.getModelByMatchData(id);
                let mapeado = {};
                mapperModelData.map(a, mapeado);
                if (bra != undefined)
                    mapeado.modelos = bra;
                result.data = mapeado;
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    addModel(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sApilisModel_1.default.addModel(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I034",
                        "text": "Cita - Creada exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }

    updateModel(_req, _res) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const model = sApilisModel_1.default.updateModel(id, data);
            model.then((a) => {
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

    deleteModel(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sApilisModel_1.default.destroyModel(id);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I028",
                        "text": "Cita - Eliminado exitosamente!"
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

const apilisModelController = new ApilisModelController();
exports.default = apilisModelController;