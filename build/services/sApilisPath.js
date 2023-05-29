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
const ApilisPath_1 = __importDefault(require("../models/ApilisPath"));

class ApilisPathServicios {
    constructor() {
    }

    static buildQuery(query) {
        let where = {
            codBaja: {
                [sequelize_1.Op.ne]: 1,
            },

        };

        if (query.codBaja) {
            where['"codBaja"'] = query.codBaja;
        }
   
        if (query.codBaja == 0) {
            if (query.date) {
                where['id'] = query.date;
            }
        }

        if (query.codBaja == 1) {
            if (query.date) {
                where['id'] = query.date;
            }
        }
        return where;
    }

    static getAllPath(offset, limit, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = ApilisPathServicios.buildQuery(query);
            const { count: total, rows } = yield ApilisPath_1.default.findAndCountAll({
                where,
                distinct: true,
                offset,
                limit,
                //order: [["nameBrand", "ASC"]],
            });


            const result = {
                total,
                count: rows.length,
                data: rows
            };
            
            return result;
        });
    }

    static getPath(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield ApilisPath_1.default.findByPk(id);
            if (!path) {
                //console.log("Error");
            }
            return path;
        });
    }

    static addPath(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilisPath = yield ApilisPath_1.default.create(data);
            ApilisPath_1.default.update({
                id: apilisPath.get().id
            }, {
                where: {
                    id: apilisPath.get().id
                }
            });
        });
    }

    static updatePath(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let apilisPath = yield ApilisPath_1.default.findOne({
                    where: {
                        id
                    }
                });
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield apilisPath.update(data);
            }));
        });
    }

    static destroyPath(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisPath_1.default.update({
                codBaja: 1,
            }, {
                where: { id: id }
            });

        }));
    }

}

exports.default = ApilisPathServicios;