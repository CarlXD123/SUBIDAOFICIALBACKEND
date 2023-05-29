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
const ApilisMonitor_1 = __importDefault(require("../models/ApilisMonitor"));
const ApilisMatchDataDetail_1 = __importDefault(require("../models/ApilisMatchDataDetail"));

class ApilisMatchDataServicios {
    constructor() {
    }


    static getAllMonitor(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield ApilisMonitor_1.default.findAndCountAll({
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
                /*const daton = (yield config_database_1.default.query(`SELECT DISTINCT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
                FROM public."Examinations" e 
                left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
                where e."status"= 'A'`, { type: sequelize_1.QueryTypes.SELECT }));*/

                const daton2 = (yield config_database_1.default.query(`SELECT DISTINCT 
                cl.name as nameclie, 
                cl."lastNameP" as clilastNameP, 
                cl."lastNameM" as clilastnameM, 
                ex.name as nameex, 
                apm.id as idmonitor, 
                apm."processedAt" as fechaprocess, 
                apm.field01 as status, 
                apm."codeApi" as codeApi, 
                apm.val01, apm.val02, apm.val03, apm.val04, apm.val05, apm.val06, apm.val07, apm.val08, apm.val09, apm.val10, 
                apm.val11, apm.val12, apm.val13, apm.val14, apm.val15, apm.val16, apm.val17, apm.val18, apm.val19, apm.val20, 
                apm.val21, apm.val22, apm.val23, apm.val24, apm.val25, apm.val26, apm.val27, apm.val28, apm.val29, apm.val30, 
                apm.val31, apm.val32, apm.val33, apm.val34, apm.val35, apm.val36, apm.val37, apm.val38, apm.val39, apm.val40
            FROM public."ApilisMonitors" apm
            LEFT JOIN public."Clients" cl ON apm."idPatient" = cl.id 
            LEFT JOIN public."Examinations" ex ON apm."idExam" = ex.id
            INNER JOIN public."ApilisMatchDatas" amd ON apm."idExam" = amd."idExamen";
            `, { type: sequelize_1.QueryTypes.SELECT }));


                datos.push(Object.assign(Object.assign({}), {val: daton2}));
            
                //     where["$Client.UserId$"] = query.UserId;
                // }
            
            const result = {
                total,
                count: daton2.length,
                data: datos
            };
            return daton2;
        });
    }

    static getMonitor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield ApilisMonitor_1.default.findByPk(id);
            if (!match) {
                //console.log("Error");
            }
            return match;
        });
    }

    static addMonitor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilismatch = yield ApilisMonitor_1.default.create(data);
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

    static updateMonitor(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let apilisMatch = yield ApilisMonitor_1.default.findOne({
                    where: {
                        id
                    }
                });
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield apilisMatch.update(data);
            }));
        });
    }

    static destroyMonitor(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisMonitor_1.default.update({
                codBaja: 1,
            }, {
                where: { idExamen: id }
            });
        }));
    }

}

exports.default = ApilisMatchDataServicios;