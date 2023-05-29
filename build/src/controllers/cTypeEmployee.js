"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../global/response");
const TypeEmployeeMapper_1 = require("../mapper/TypeEmployeeMapper");
const sTypeEmployee_1 = __importDefault(require("../services/sTypeEmployee"));
const mapper = new TypeEmployeeMapper_1.TypeEmployeeMapper();
class TypeEmployeeController {
    constructor() {
    }
    getPagedTypeEmployee(_req, _res) {
        try {
            const range = _req.params.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const typeEmployees = sTypeEmployee_1.default.getPagedTypeEmployee(start, limit);
            typeEmployees.then((t) => {
                let result = Object.assign({ "status": true }, t);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllTypeEmployee(_req, _res) {
        try {
            const typeEmployees = sTypeEmployee_1.default.getAllTypeEmployee();
            typeEmployees.then((t) => {
                let result = {
                    "status": true,
                    "data": [undefined]
                };
                result.data = [];
                t.forEach((x) => {
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
    createTypeEmployee(_req, _res) {
        try {
            let body = _req.body;
            sTypeEmployee_1.default.createTypeEmployee(body);
            let result = {
                "status": true,
                "message": {
                    "code": "I041",
                    "text": "Cargo - Creado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getTypeEmployee(_req, _res) {
        try {
            let id = _req.params.id;
            let typeEmployee = sTypeEmployee_1.default.getTypeEmployee(id);
            typeEmployee.then((t) => {
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
    updateTypeEmployee(_req, _res) {
        try {
            let body = _req.body;
            let id = _req.params.id;
            const typeEmployee = sTypeEmployee_1.default.updateTypeEmployee(id, body);
            typeEmployee.then((t) => {
                let result = {
                    "status": true,
                    "message": {
                        "code": "I043",
                        "text": "Cargo - Modificado exitosamente!"
                    }
                };
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    deleteTypeEmployee(_req, _res) {
        try {
            let id = _req.params.id;
            sTypeEmployee_1.default.destroyTypeEmployee(id);
            let result = {
                "status": true,
                "message": {
                    "code": "I045",
                    "text": "Cargo - Eliminado exitosamente!"
                }
            };
            _res.status(200).json(result);
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
}
const typeEmployeeController = new TypeEmployeeController();
exports.default = typeEmployeeController;
