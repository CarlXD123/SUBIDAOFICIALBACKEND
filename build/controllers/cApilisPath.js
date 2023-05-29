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
const sApilisPath_1 = __importDefault(require("../services/sApilisPath"));

class ApilisPathController {
    constructor() {
    }

    getAllPath(_req, _res) {
        try {
            const range = _req.params.range || '[0,5000]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const query = _req.query;
            const path = sApilisPath_1.default.getAllPath(start, limit, query);
            path.then((m) => {
                let result = Object.assign({ "status": true }, m);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    getPath(_req, _res) {
        try {
            let id = _req.params.id;
            let path = sApilisPath_1.default.getPath(id);
            path.then((c) => {
                let result = {
                    "status": true,
                    "data": c
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }

    addPath(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sApilisPath_1.default.addPath(body);
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

    updatePath(_req, _res) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const path = sApilisPath_1.default.updatePath(id, data);
            path.then((a) => {
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

    deletePath(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sApilisPath_1.default.destroyPath(id);
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

const apilisPathController = new ApilisPathController();
exports.default = apilisPathController;