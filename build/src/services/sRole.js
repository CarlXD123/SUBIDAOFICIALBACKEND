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
const Role_1 = __importDefault(require("../models/Role"));
const RoleFunction_1 = __importDefault(require("../models/RoleFunction"));
class RoleServicios {
    constructor() {
    }
    static getAllRole() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.default.findAll();
        });
    }
    static getPagedRole(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Role_1.default.findAndCountAll({
                where: { status: "A" },
                order: [
                    ['id', 'asc']
                ],
                offset,
                limit,
                distinct: true
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static getFunctionByRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT rf."FunctionId"
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where r.id = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static getFunctionByRoleComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT *
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where r.id = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static createRole(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            Role_1.default.create(data, { transaction }).then((r) => __awaiter(this, void 0, void 0, function* () {
                const roles = yield RoleFunction_1.default.findAll({ where: { RoleId: r.id } });
                if (!roles) {
                    RoleFunction_1.default.create(data.functions, { transaction }).then();
                }
                else {
                    RoleFunction_1.default.destroy({ where: { RoleId: r.id }, transaction }).then((d) => {
                        RoleFunction_1.default.create(data.functions, { transaction }).then();
                    });
                }
            }));
        }));
    }
    static getRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = Role_1.default.findOne({
                where: { id: id },
                order: [
                    ['id', 'asc']
                ]
            });
            if (!role) {
                console.error('Error');
            }
            return yield role;
        });
    }
    static updateRole(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                Role_1.default.update(id, data).then((r) => __awaiter(this, void 0, void 0, function* () {
                    const roles = yield RoleFunction_1.default.findAll({ where: { RoleId: r.id } });
                    if (!roles) {
                        RoleFunction_1.default.create(data.functions, { transaction }).then();
                    }
                    else {
                        RoleFunction_1.default.destroy({ where: { RoleId: r.id }, transaction }).then((d) => {
                            RoleFunction_1.default.create(data.functions, { transaction }).then();
                        });
                    }
                }));
            }));
        });
    }
}
exports.default = RoleServicios;
