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
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Function_1 = __importDefault(require("../models/Function"));
class FunctionServicios {
    constructor() {
    }
    static getAllFunctions() {
        return __awaiter(this, void 0, void 0, function* () {
            const functions = yield Function_1.default.findAll({
                order: [
                    ['id', 'asc']
                ]
            });
            return functions;
        });
    }
    //buscar roles
    static getFunctionByRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT 
            rf."RoleId",
            r."name",
            r.description
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where rf."FunctionId" = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static getLinkableFunctions() {
        return __awaiter(this, void 0, void 0, function* () {
            const functions = yield Function_1.default.findAll({
            // where: { link: { [Op.ne]: null } },
            // // include: [
            // //     {
            // //         model: models.Function, as: 'children', include: [{
            // //             model: models.Function, as: 'children'
            // //         }]
            // //     },
            // // ],
            // order: [
            //     ['id', 'asc'],
            // ]
            });
            return functions;
        });
    }
    static createFunction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                const functions = yield Function_1.default.create(data, { transaction });
                return functions;
            }));
        });
    }
    static getFunction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxFunction = yield Function_1.default.findOne({
                where: { id: id },
                // include: [
                //     { model: models.Role },
                //     { model: models.Function, as: 'children' }
                // ],
                // order: [
                //     ['id', 'asc'],
                //     [models.Role, 'id', 'asc']
                // ]
            });
            if (!auxFunction) {
                //console.log("Error");
            }
            return auxFunction;
        });
    }
    static updateFunction(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxFunction = yield Function_1.default.findByPk(id);
            if (!auxFunction) {
                //console.log("Error");
            }
            return yield auxFunction.update(data);
        });
    }
    static destroyFunction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxFunction = yield Function_1.default.findByPk(id);
            if (!auxFunction) {
                //console.log("Error");
            }
            return yield auxFunction.destroy();
        });
    }
    static getRolesForFunction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let auxFunction = yield Function_1.default.findByPk(id);
            //if (!auxFunction)
            //console.log("Error");
            // let roles = await auxFunction.getRoles();
            // if (!roles || !roles.length)
            //     //console.log("Error");
            // return roles
        });
    }
    static getActionsByRole(function_id, role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxFunction = yield Function_1.default.findOne({
                where: { id: function_id },
                // include: {
                //     model: models.Role, where: { id: role_id }, through: {
                //         attributes: ['canView', 'canCreate', 'canEdit', 'canDelete'],
                //     }
                // }
            });
            if (!auxFunction)
                //console.log("Error");
                return auxFunction;
        });
    }
}
exports.default = FunctionServicios;
