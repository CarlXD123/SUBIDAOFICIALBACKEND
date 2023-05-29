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
const RoleCompleteMapper_1 = require("../mapper/RoleCompleteMapper");
const RoleCompMapper_1 = require("../mapper/RoleCompMapper ");
const RoleMapper_1 = require("../mapper/RoleMapper");
const sRole_1 = __importDefault(require("../services/sRole"));
const mapper = new RoleMapper_1.RoleMapper();
const mappercomplete = new RoleCompleteMapper_1.RoleCompleteMapper();
const mappercomp = new RoleCompMapper_1.RoleCompMapper();
class RoleController {
    constructor() {
    }
    getAllRole(_req, _res) {
        try {
            const role = sRole_1.default.getAllRole();
            role.then((r) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                r.forEach((x) => {
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
    getPagedRole(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const role = sRole_1.default.getPagedRole(start, limit);
            role.then((p) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                //console.log(p);
                for (const x of p.data) {
                    const ex = yield sRole_1.default.getFunctionByRole(x.id);
                    let mapeado = {};
                    mappercomplete.map(x, mapeado);
                    if (ex != undefined)
                        mapeado.functions = ex;
                    result.data.push(mapeado);
                }
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    createRole(_req, _res) {
        try {
            let body = _req.body;
            sRole_1.default.createRole(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I006",
                    "text": "Role - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getRole(_req, _res) {
        try {
            let id = _req.params.id;
            let role = sRole_1.default.getRole(id);
            role.then((r) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": r
                };
                result.data = [];
                const ex = yield sRole_1.default.getFunctionByRole(id);
                let mapeado = {};
                mappercomp.map(r, mapeado);
                if (ex != undefined)
                    mapeado.functions = ex;
                result.data.push(mapeado);
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateRole(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const role = sRole_1.default.updateRole(id, body);
            role.then((r) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I008",
                        "text": "Role - Actualizado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getFunctionsForRole(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = _req.params.id;
                let functions = yield sRole_1.default.getFunctionByRole(id);
                let result = {
                    "status": true,
                    "data": functions
                };
                _res.status(200).json(result);
            }
            catch (error) {
                response_1.ExecuteResponce.makeResponseException(_res, error);
            }
        });
    }
}
const roleController = new RoleController();
exports.default = roleController;
