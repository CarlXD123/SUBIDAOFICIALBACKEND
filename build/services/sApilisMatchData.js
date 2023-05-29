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
const ApilisMatchData_1 = __importDefault(require("../models/ApilisMatchData"));
const ApilisMatchDataDetail_1 = __importDefault(require("../models/ApilisMatchDataDetail"));

class ApilisMatchDataServicios {
    constructor() {
    }


    static getAllMatchData(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield ApilisMatchData_1.default.findAndCountAll({
                where: {
                    codBaja: {
                        [sequelize_1.Op.ne]: 1,
                    },
                },
                distinct: true,
                offset,
                limit,
            });

            let datos = [];
                const daton = (yield config_database_1.default.query(`SELECT DISTINCT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
                FROM public."Examinations" e 
                left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
                where e."status"= 'A'`, { type: sequelize_1.QueryTypes.SELECT }));

                const daton2 = (yield config_database_1.default.query(`SELECT e.id as id, e.name as nameex,ev.id as idvalueexam,ev.name examvaluename
                FROM public."ExaminationValues" ev 
                inner join public."ExaminationGroups" as eg on (ev."ExaminationGroupId" = eg.id)
                inner join public."Examinations" as e on (e."id" = eg."ExaminationId" )  
                left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
                where e."status"= 'A'`, { type: sequelize_1.QueryTypes.SELECT }));


                datos.push(Object.assign(Object.assign({}), { matchexam: daton, val: daton2}));
            
                //     where["$Client.UserId$"] = query.UserId;
                // }
            
            const result = {
                total,
                count: daton.length,
                data: datos
            };
            return datos;
        });
    }

    static getMatchData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield ApilisMatchData_1.default.findByPk(id);
            if (!match) {
                //console.log("Error");
            }
            return match;
        });
    }

    static addMatchData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilismatch = yield ApilisMatchData_1.default.create(data);
            //const apilismatchdatadetail = yield ApilisMatchDataDetail_1.default.create(
                //{
                    //idApilisMatchData: apilismatch.get().id,
                //}
               // );
            //yield ApilisMatchDataDetail_1.default.create(
               // {
               //     idApilisMatchData: apilismatch.get().id,
                //    idExamenValue: 5,
               //     fields: "do",
                //    priority: 2,
                //    createdBy: "d",
               //     modifiedBy: "df",
                //});
            //console.log(apilismatch)
           // console.log(apilismatchdatadetail)
            console.log(apilismatch.get().id)
            return apilismatch.get().id;

        });
    }

    static updateMatchData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let apilisMatch = yield ApilisMatchData_1.default.findOne({
                    where: {
                        id
                    }
                });
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield apilisMatch.update(data);
            }));
        });
    }

    static destroyMatchData(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisMatchData_1.default.update({
                codBaja: 1,
                Color: "",
            }, {
                where: { idExamen: id }
            });
        }));
    }

}

exports.default = ApilisMatchDataServicios;