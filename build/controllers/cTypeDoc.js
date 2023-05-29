"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const TyperDocsMapper_1 = require("../mapper/TyperDocsMapper");
const sTypeDocs_1 = __importDefault(require("../services/sTypeDocs"));
const mapper = new TyperDocsMapper_1.TypeDocsMapper();
class TypeDocController {
    constructor() {
    }
    getPagedTypeDoc(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const typeDocs = sTypeDocs_1.default.getPagedTypeDoc(start, limit);
            typeDocs.then((t) => {
                let result = Object.assign({ "status": true }, t);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllTypeDoc(_req, _res) {
        try {
            const typeDocs = sTypeDocs_1.default.getAllTypeDoc();
            typeDocs.then((t) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                t.forEach((x) => {
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
    createTypeDoc(_req, _res) {
        try {
            //No olvidar que para insertar los datos es obligatorio insertar el name y description
            //sino se caera el backend
            let body = _req.body;
            sTypeDocs_1.default.createTypeDoc(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I003",
                    "text": "Tipo de documento - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getTypeDoc(_req, _res) {
        try {
            let id = _req.params.id;
            let typeDoc = sTypeDocs_1.default.getTypeDocs(id);
            typeDoc.then((t) => {
                let result = {
                    "status": true,
                    "data": t
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateTypeDoc(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const profession = sTypeDocs_1.default.updateProfession(id, body);
            profession.then((t) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I005",
                        "text": "Tipo de documento - Modificado exitosamente!"
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
    deleteTypeDoc(_req, _res) {
        try {
            let id = _req.params.id;
            sTypeDocs_1.default.destroyProfession(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I007",
                    "text": "Tipo de documento - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const typeDocController = new TypeDocController();
exports.default = typeDocController;
