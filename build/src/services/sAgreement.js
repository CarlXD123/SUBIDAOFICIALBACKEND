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
const Agreements_1 = __importDefault(require("../models/Agreements"));
class AgreementServicios {
    constructor() {
    }
    static buildQuery(query) {
        let where = {};
        if (query.string) {
            where = {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.iLike]: `%${query.string}%` } }
                ],
            };
        }
        return where;
    }
    static getFilterAgreement(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = this.buildQuery(query);
            const { count: total, rows } = yield Agreements_1.default.findAndCountAll({
                where,
                offset: 0,
                limit: 10
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static getAllAgreement() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Agreements_1.default.findAll();
        });
    }
    static getPagedAgreement(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Agreements_1.default.findAndCountAll({
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
    static getAgreement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreement = yield Agreements_1.default.findOne({
                where: { id }
            });
            if (!agreement) {
                //console.log("Error");
            }
            return agreement;
        });
    }
    static getAgreementByPriceList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT 
        p.id,
        p."name"
        FROM public."Agreements" a 
        inner join public."PriceLists" p on a.id = p.id
        where a.id= ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static createAgreement(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const agreement = yield Agreements_1.default.create(data, { transaction });
            return agreement;
        }));
    }
    static updateAgreement(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreement = yield Agreements_1.default.findByPk(id);
            if (!agreement) {
                //console.log("Error");
            }
            return agreement.update(data);
        });
    }
    static destroyAgreement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreement = yield Agreements_1.default.findByPk(id);
            if (!agreement) {
                //console.log("Error");
            }
            return agreement.destroy();
        });
    }
}
exports.default = AgreementServicios;
