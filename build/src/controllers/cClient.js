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
const ClientMApper_1 = require("../mapper/ClientMApper");
const sClient_1 = __importDefault(require("../services/sClient"));
const mapper = new ClientMApper_1.ClientMapper();
class ClientController {
    constructor() {
    }
    getClientAll(_req, _res) {
        try {
            //console.log(_req);
            const range = _req.query.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const query = _req.query;
            const client = sClient_1.default.getClientAll(start, limit, query);
            client.then((c) => {
                let result = Object.assign({ "status": true }, c);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getClientByDOC(_req, _res) {
        try {
            const query = _req.query;
            const client = sClient_1.default.getClientByDOC(query);
            //console.log(client)
            client.then((c) => {
                //console.log(c)
                if (!c) {
                    //console.log("error")
                    let res = { "status": false, "message": { "code": "E001", "text": "Usuario - no encontrado!" } };
                    _res.status(200).json(res);
                }
                else {
                    let result = {
                        "status": true,
                        "data": c
                    };
                    _res.status(200).json(result);
                }
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getClientByName(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const query = _req.query;
            let client = sClient_1.default.getClientByName(start, limit, query);
            client.then((c) => {
                let result = Object.assign({ "status": true }, c);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getClient(_req, _res) {
        try {
            const id = _req.params.id;
            const client = sClient_1.default.getClient(id);
            client.then((p) => {
                let result = {
                    "status": true,
                    "data": p
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    destroyClient(_req, _res) {
        try {
            let id = _req.params.user_id;
            sClient_1.default.destroyClient(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I002",
                    "text": "Usuario - Elimado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateClient(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = _req.body;
                let id = _req.params.user_id;
                const client = yield sClient_1.default.updateClient(id, body);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I002",
                        "text": "Usuario - Modificado exitosamente!"
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
}
const clientController = new ClientController();
exports.default = clientController;
