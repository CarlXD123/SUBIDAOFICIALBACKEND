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
const fileSystem_1 = require("../global/fileSystem");
const Headquarter_1 = __importDefault(require("../models/Headquarter"));
class HeadquarterServicios {
    constructor() {
    }
    static getAllHeadquarter() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Headquarter_1.default.findAll();
        });
    }
    static getHeadquarter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const headquarter = yield Headquarter_1.default.findByPk(id);
            if (!headquarter) {
                //console.log("Error");
            }
            return headquarter;
        });
    }
    static HeadquarterByIdquery(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headquarter = (yield config_database_1.default.query(`SELECT h.*
        FROM public."Employees" e
        left join public."Headquarters" h on h.id = e."HeadquarterId"
        where "UserId"=${UserId}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            if (!headquarter) {
                //console.log("Error");
            }
            return headquarter;
        });
    }
    static updateHeadquarter(id, data, img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (img) {
                const headquarterUrl = (0, fileSystem_1.saveFile)(img, "headquarter");
                data.urlImage = headquarterUrl;
            }
            yield Headquarter_1.default.update(data, { where: { id: id } });
        });
    }
    static createHeadquarter(data, img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (img) {
                const headquarterUrl = (0, fileSystem_1.saveFile)(img, "headquarter");
                data.urlImage = headquarterUrl;
            }
            yield Headquarter_1.default.create(data);
        });
    }
}
exports.default = HeadquarterServicios;
