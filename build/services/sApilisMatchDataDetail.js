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
const ApilisMatchDataDetail_1 = __importDefault(require("../models/ApilisMatchDataDetail"));


class ApilisMatchDataDetailServicios {
    constructor() {
    }


    static getAllMatchDataDetail(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield ApilisMatchDataDetail_1.default.findAndCountAll({
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
                const daton = (yield config_database_1.default.query(`SELECT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
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
                count: rows.length,
                data: rows
            };
            return result;
        });
    }

    static getExamValueByExamination(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`SELECT DISTINCT apdeta."idApilisMatchData" as idapilismatchdata,
            apdeta."idExamenValue" as idvalueexam,
            apdeta.fields as namevalue,
            apdeta.priority,
            ap.id as idapilis
        FROM public."ExaminationValues" as ev
        INNER JOIN public."ExaminationGroups" as eg ON (ev."ExaminationGroupId" = eg.id)
        INNER JOIN public."Examinations" as ex ON (ex."id" = eg."ExaminationId" )
        INNER JOIN public."ApilisMatchDatas" as ap ON (ap."idExamen" = ex."id" )
        INNER JOIN public."ApilisMatchDataDetails" as apdeta ON (apdeta."idApilisMatchData" = ap."id" ) WHERE ap."idExamen" = ${id} and apdeta."codBaja"=0
        ORDER BY apdeta.priority ASC;`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }

    static getExamValueByExamination2(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`select ex.id as ExaminationID,ev.id as idvalueexam,ev.name as namevalue from public."ExaminationValues" as ev
            inner join public."ExaminationGroups" as eg on (ev."ExaminationGroupId" = eg.id)
            inner join public."Examinations" as ex on (ex."id" = eg."ExaminationId" )  where ex.id = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
        });
    }

    static getMatchDataDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchdetail = yield ApilisMatchDataDetail_1.default.findByPk(id);
            if (!matchdetail) {
                //console.log("Error");
            }
            return matchdetail;
        });
    }

    static addMatchDataDetail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilismatchdetail = yield ApilisMatchDataDetail_1.default.create(data);
            //const apilismatchdetail = yield ApilisMatchDataDetail_1.default.create(data);
           //ApilisMatchDataDetail_1.default.update({
            //    idApilisMatchData: apilismatch.get().id
            //}, {
             //   where: {
             //       id: apilismatchdetail.get().id
             //   }
            //});
            console.log(apilismatchdetail)

            return apilismatchdetail;

        });
    }

    static updateMatchDataDetail(priorityid, idvalueexam) {
          return __awaiter(this, void 0, void 0, function* () {
            return yield config_database_1.default.query(`UPDATE public."ApilisMatchDataDetails"
            SET priority = ${priorityid}
            WHERE "idExamenValue" = ${idvalueexam};`);
        });
    }

    

    static destroyMatchDataDetail(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisMatchDataDetail_1.default.update({
                codBaja: 1,
            }, {
                where: { idApilisMatchData: id }
            });
        }));
    }

}

exports.default = ApilisMatchDataDetailServicios;