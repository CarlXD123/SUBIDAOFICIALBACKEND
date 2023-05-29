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
const Profession_1 = __importDefault(require("../models/Profession"));
class ProfessionServicios {
    constructor() {
    }
    static getPagedProfession(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Profession_1.default.findAndCountAll({
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
    static getAllProfession() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Profession_1.default.findAll();
        });
    }
    static getProfession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profession = yield Profession_1.default.findByPk(id);
            if (!profession) {
                //console.log("Error");
            }
            return profession;
        });
    }
    static createProfession(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const profession = yield Profession_1.default.create(data, { transaction });
            return profession;
        }));
    }
    static updateProfession(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profession = yield ProfessionServicios.getProfession(id);
            if (!profession) {
                //console.log("Error");
            }
            yield profession.update(data);
        });
    }
    static destroyProfession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profession = yield ProfessionServicios.getProfession(id);
            if (!profession) {
                //console.log("Error");
            }
            yield profession.destroy();
        });
    }
}
exports.default = ProfessionServicios;
