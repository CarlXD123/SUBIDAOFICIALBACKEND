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
const sApilisMonitor_1 = __importDefault(require("../services/sApilisMonitor"));

class ApilisMonitorController {
    constructor() {
    }

    getAllMonitor(_req, _res) {
        try {
            const range = _req.params.range || '[0,5000]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            let match = sApilisMonitor_1.default.getAllMonitor(start, limit);
            match.then((a) => {
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

    getMonitor(_req, _res) {
        try {
            let id = _req.params.id;
            let match = sApilisMonitor_1.default.getMonitor(id);
            match.then((c) => {
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

    addMonitor(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body1 = _req.body;
                let idmatchdata = yield sApilisMonitor_1.default.addMonitor(body1);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I034",
                        "text": "Cita - Creada exitosamente!",
                        "data": [idmatchdata],
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }

    updateMonitor(_req, _res) {
        try {
            let id = _req.params.id;
            let data = _req.body;
            const match = sApilisMonitor_1.default.updateMonitor(id, data);
            match.then((a) => {
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

    deleteMonitor(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                sApilisMonitor_1.default.destroyMonitor(id);
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

const apilisMonitorController = new ApilisMonitorController();
exports.default = apilisMonitorController;