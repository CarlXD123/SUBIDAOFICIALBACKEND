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
const ServiceMapper_1 = require("../mapper/ServiceMapper");
const sService_1 = __importDefault(require("../services/sService"));
const response_1 = require("../global/response");
const mapper = new ServiceMapper_1.ServiceMapper();
class ServiceController {
    constructor() {
    }
    getAllService(_req, _res) {
        try {
            const service = sService_1.default.getAllService();
            service.then((p) => {
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
    getPagedService(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const service = sService_1.default.getPagedService(start, limit);
            service.then((s) => {
                let result = Object.assign({ "status": true }, s);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createService(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                yield sService_1.default.createService(body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I024",
                        "text": "Servicio - Creado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
    getService(_req, _res) {
        try {
            let id = _req.params.id;
            let service = sService_1.default.getService(id);
            service.then((s) => {
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
    updateService(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const service = sService_1.default.updateService(id, body);
            service.then((p) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I026",
                        "text": "Servicio - Modificado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteService(_req, _res) {
        try {
            let id = _req.params.id;
            sService_1.default.destroyService(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I028",
                    "text": "Servicio - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const serviceController = new ServiceController();
exports.default = serviceController;
