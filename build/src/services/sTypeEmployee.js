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
const config_database_1 = __importDefault(require("../config/config.database"));
const TypeEmployee_1 = __importDefault(require("../models/TypeEmployee"));
class TypeEmployeeServicios {
    constructor() {
    }
    static getPagedTypeEmployee(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield TypeEmployee_1.default.findAndCountAll({
                offset,
                limit
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static getAllTypeEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TypeEmployee_1.default.findAll();
        });
    }
    static createTypeEmployee(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const typeEmployee = yield TypeEmployee_1.default.create(data, { transaction });
            return typeEmployee;
        }));
    }
    static getTypeEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeEmployee = yield TypeEmployee_1.default.findByPk(id);
            if (!typeEmployee) {
                //console.log("Error");
            }
            return typeEmployee;
        });
    }
    static updateTypeEmployee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeEmployee = yield TypeEmployeeServicios.getTypeEmployee(id);
            if (!typeEmployee) {
                //console.log("Error");
            }
            yield typeEmployee.update(data);
        });
    }
    static destroyTypeEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeEmployee = yield TypeEmployeeServicios.getTypeEmployee(id);
            if (!typeEmployee) {
                //console.log("Error");
            }
            yield typeEmployee.destroy();
        });
    }
}
exports.default = TypeEmployeeServicios;
