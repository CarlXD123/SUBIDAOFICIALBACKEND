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
const Service_1 = __importDefault(require("../models/Service"));
class ServiceServicios {
    constructor() {
    }
    static getAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service_1.default.findAll();
        });
    }
    static getPagedService(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Service_1.default.findAndCountAll({
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
    static createService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profession = yield Service_1.default.create(data);
            return profession;
        });
    }
    static getService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield Service_1.default.findByPk(id);
            if (!service) {
                //console.log("Error");
            }
            return service;
        });
    }
    static updateService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield Service_1.default.findByPk(id);
            if (!service) {
                //console.log("Error");
            }
            return service.update(data);
        });
    }
    static destroyService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield Service_1.default.findByPk(id);
            if (!service) {
                //console.log("Error");
            }
            return service.destroy();
        });
    }
}
exports.default = ServiceServicios;
