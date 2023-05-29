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
const Tuition_1 = __importDefault(require("../models/Tuition"));
class TuitionServicios {
    constructor() {
    }
    static getPagedTuition(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Tuition_1.default.findAndCountAll({
                offset,
                limit
            });
            const result = {
                total,
                count: rows.length,
                data: rows,
            };
            return result;
        });
    }
    static getAllTuition() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Tuition_1.default.findAll();
        });
    }
    static createTuition(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const tuition = yield Tuition_1.default.create(data, { transaction });
            return tuition;
        }));
    }
    static getTuition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuition = yield Tuition_1.default.findByPk(id);
            if (!tuition) {
                //console.log("Error");
            }
            return tuition;
        });
    }
    static updateTuition(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuition = yield TuitionServicios.getTuition(id);
            if (!tuition) {
                //console.log("Error");
            }
            yield tuition.update(data);
        });
    }
    static destroyTuition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuition = yield TuitionServicios.getTuition(id);
            if (!tuition) {
                //console.log("Error");
            }
            yield tuition.destroy();
        });
    }
}
exports.default = TuitionServicios;
