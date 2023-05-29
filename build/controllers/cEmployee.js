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
const EmployeeMapper_1 = require("../mapper/EmployeeMapper");
const sEmployee_1 = __importDefault(require("../services/sEmployee"));
const sUser_1 = __importDefault(require("../services/sUser"));
const mailer_1 = require("../global/mailer");
const mapper = new EmployeeMapper_1.EmployeeMapper();
class EmployeeController {
    constructor() {
    }
    getPagedEmployee(_req, _res) {
        try {
            const range = _req.query.range || '[0,9]';
            const [start, end] = JSON.parse(range);
            const limit = end - start + 1;
            const query = _req.query;
            let employee = sEmployee_1.default.getPagedEmployee(start, limit, query);
            employee.then((e) => {
                let result = Object.assign({ "status": true }, e);
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getAllEmployee(_req, _res) {
        try {
            const query = _req.query;
            let employee = sEmployee_1.default.getAllEmployee(query);
            employee.then((e) => {
                let result = {
                    "status": true,
                    "data": e
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getEmployee(_req, _res) {
        try {
            const id = _req.params.id;
            const employee = sEmployee_1.default.getEmployee(id);
            employee.then((e) => {
                let result = {
                    "status": true,
                    "data": e
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    getEmployeeByTypeEmployee(_req, _res) {
        try {
            const { typeEmployeeId } = _req.params;
            let employees = sEmployee_1.default.getEmployeeByTypeEmployeeId(typeEmployeeId);
            employees.then((e) => {
                let result = {
                    "status": true,
                    "data": e
                };
                //console.log(result);
                _res.status(200).json(result);
            });
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    destroyEmployee(_req, _res) {
        try {
            let id = _req.params.user_id;
            sEmployee_1.default.destroyEmployee(id);
            _res.status(200).json('Delete Employee');
        }
        catch (error) {
            response_1.ExecuteResponce.makeResponseException(_res, error);
        }
    }
    updateEmployee(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = _req.body;
                const fields2 = _req.body;
                const file = _req.body.file;
                const id = _req.params.user_id;
                const id2 = _req.params.user_id;
                yield sEmployee_1.default.updateEmployee(id, fields, file);
                yield sEmployee_1.default.updateUser(id2, fields2);
                yield EmployeeController.sendCredentials(fields, _res);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I002",
                        "text": "Personal - Modificado exitosamente!"
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



    static sendCredentials(userExtension, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield sUser_1.default.getUserById(userExtension.iduser);
                const { username, password } = user.get();
                const { name, lastNameP } = userExtension;
                const emailData = { email: username, password: password, fullname: `${name} ${lastNameP}` };
                // Send email with password
                (0, mailer_1.sendPassword2)(emailData);
                let result = {
                    "status": true,
                    "message": {
                        "code": "I001",
                        "text": "Usuario Modificado"
                    }
                };
                res.status(200).json(result);
            }
            catch (err) {
                response_1.ExecuteResponce.makeResponseException(res, err);
            }
        });
    }   




}
const employeeController = new EmployeeController();
exports.default = employeeController;
