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
const FunctionMapper_1 = require("../mapper/FunctionMapper");
const sFunction_1 = __importDefault(require("../services/sFunction"));
const mapper = new FunctionMapper_1.FunctionMapper();
class FunctionController {
    constructor() {
    }
    getAllFunctions(_req, _res) {
        try {
            const functions = sFunction_1.default.getAllFunctions();
            functions.then((f) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                for (const x of f) {
                    const ex = yield sFunction_1.default.getFunctionByRole(x.id);
                    let mapeado = {};
                    mapper.map(x, mapeado);
                    if (ex != undefined)
                        mapeado.roles = ex;
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
    getAllLinkableFunctions(_req, _res) {
        try {
            const functions = sFunction_1.default.getLinkableFunctions();
            functions.then((f) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                f.forEach((x) => {
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
    addFunction(_req, _res) {
        try {
            let body = _req.body;
            sFunction_1.default.createFunction(body);
            _res.status(200).json('Ok');
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getFunction(_req, _res) {
        try {
            let id = _req.params.id;
            let auxFunction = sFunction_1.default.getFunction(id);
            auxFunction.then((f) => __awaiter(this, void 0, void 0, function* () {
                let result = {
                    "status": true,
                    "data": f
                };
                result.data = [];
                const ex = yield sFunction_1.default.getFunctionByRole(id);
                let mapeado = {};
                mapper.map(f, mapeado);
                if (ex != undefined)
                    mapeado.roles = ex;
                result.data.push(mapeado);
                //console.log(result);
                _res.status(200).json(result);
            }));
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateFunction(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const functions = sFunction_1.default.updateFunction(id, body);
            functions.then((f) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I849",
                        "text": "function - Modificado exitosamente!"
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
    deleteFunction(_req, _res) {
        try {
            let id = _req.params.id;
            sFunction_1.default.destroyFunction(id);
            _res.status(200).json('Delete Function');
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getRolesForFunction(_req, _res) {
        try {
            let id = _req.params.id;
            let roles = sFunction_1.default.getRolesForFunction(id);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    //Metodo que no se utiliza
    getActionsByRole(_req, _res) {
        try {
            //let { id, role_id } = _req.params;
            //let auxFunction = await sFunction.getActionsByRole(id, role_id);
            //res.status(200).json(auxFunction);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const functionController = new FunctionController();
exports.default = functionController;
