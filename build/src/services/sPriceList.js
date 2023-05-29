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
const ExaminationPrice_1 = __importDefault(require("../models/ExaminationPrice"));
const PriceList_1 = __importDefault(require("../models/PriceList"));
class PriceListServicios {
    constructor() {
    }
    static buildQuery(query) {
        let where = { status: 'A' };
        if (query.agreementId) {
            where['AgreementId'] = query.agreementId;
        }
        return where;
    }
    static getAllPriceList(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = PriceListServicios.buildQuery(query);
            return yield PriceList_1.default.findAll({
                where,
                order: [
                    ['id', 'ASC']
                ]
            });
        });
    }
    static getExaminationsByPriceList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT 
        e.id,
        e."name",
        ep.price
    FROM 
    public."ExaminationPrices" ep 
    inner join public."Examinations" e on e.id = ep."ExaminationId"
    where  e.status='A' and ep."PriceListId" = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static createPriceList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceList = (yield PriceList_1.default.create(data)).get();
            yield this.CreateExaminationPrice(data, priceList.id);
        });
    }
    static CreateExaminationPrice(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.examinations)
                for (let examination of data.examinations) {
                    yield config_database_1.default.query(`INSERT INTO public."ExaminationPrices"(
                    price, "createdAt", "updatedAt", "ExaminationId", "PriceListId")
                    VALUES (${examination.discountPrice}, NOW(), NOW(), ${examination.id}, ${id});`, { type: sequelize_1.QueryTypes.INSERT });
                }
        });
    }
    static DeleteExaminationPrice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ExaminationPrice_1.default.destroy({ where: { PriceListId: id } });
        });
    }
    static getPriceList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceList = yield PriceList_1.default.findOne({
                where: { id: id }
            });
            if (!priceList) {
                //console.log("Error");
            }
            return priceList;
        });
    }
    //buscar examination
    static getPriceListByExamination(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaprecios = yield config_database_1.default.query(`SELECT 
	    	xp.id,
	    	xp."name",
	    	ex.price discountprice
	    FROM public."PriceLists" pre 
	    inner join public."ExaminationPrices" ex on pre.id = ex."PriceListId"
	    inner join public."Examinations" xp on ex."ExaminationId" = xp.id
	    where xp.status ='A' and pre.id = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
            let listaParseada = [];
            for (const lista of listaprecios) {
                listaParseada.push({
                    id: lista.id,
                    name: lista.name,
                    discountPrice: lista.discountprice,
                });
            }
            return listaParseada;
        });
    }
    static updatePriceList(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceList = yield this.getPriceList(id);
            yield priceList.update(data);
            if (data.examinations) {
                yield ExaminationPrice_1.default.destroy({ where: { PriceListId: id } });
                for (let examination of data.examinations) {
                    yield config_database_1.default.query(`INSERT INTO public."ExaminationPrices"(
                    price, "createdAt", "updatedAt", "ExaminationId", "PriceListId")
                    VALUES (${examination.discountPrice}, NOW(), NOW(), ${examination.id}, ${id});`, { type: sequelize_1.QueryTypes.INSERT });
                }
            }
            return priceList;
        });
    }
    static destroyPriceList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceList = yield PriceList_1.default.findByPk(id);
            if (!priceList)
                //console.log("Error");
                yield priceList.update({ status: 'E' });
        });
    }
}
exports.default = PriceListServicios;
