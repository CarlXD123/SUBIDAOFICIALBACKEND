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
const ExaminationReferenceValue_1 = __importDefault(require("../models/ExaminationReferenceValue"));
const ExaminationValue_1 = __importDefault(require("../models/ExaminationValue"));
class ReferenceValueServicios {
    constructor() {
    }
    static getPagedReferenceValue(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { count: total, rows } = await ExaminationValues.findAndCountAll({
            //     offset,
            //     limit,
            //     nest: true,
            //     include: [
            //         {
            //             model: models.ExaminationReferenceValue,
            //             as: "examinationReferenceValues",
            //         },
            //         {
            //             model: models.ExaminationGroup,
            //         },
            //         {
            //             model: models.Unit,
            //         },
            //         {
            //             model: models.Method,
            //         },
            //     ],
            // });
            // const result = {
            //     total,
            //     rows,
            //     count: rows.length,
            // };
            // return result;
        });
    }
    static getAllReferenceValue() {
        return __awaiter(this, void 0, void 0, function* () {
            // return await ExaminationValue.findAll({
            //     nest: true,
            //     include: [
            //         {
            //             model: models.ExaminationReferenceValue,
            //             as: "examinationReferenceValues",
            //         },
            //         {
            //             model: models.ExaminationGroup,
            //         },
            //         {
            //             model: models.Unit,
            //         },
            //         {
            //             model: models.Method,
            //         },
            //     ],
            // });
        });
    }
    static createReferenceValue(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //await ExaminationValue.create(data);
        });
    }
    static getReferenceValue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evalue = (yield config_database_1.default.query(`SELECT 
        ev.id idev,
        ev."name" nameev,
        ev."UnitId" unitev,
        ev."countVR" result,
        u."name" uname,
	    u."createdAt" ucreate,
	    u."updatedAt" uupdate,
        m.id mid,
        m."name" mname,
        m.description mdescription,
        m."createdAt" mcreate,
        m."updatedAt" mupdate,
	    eg.id egid,
	    eg."name" egname,
	    eg."countEV" egcountev,
	    eg.status egstatus,
	    eg."createdAt" egcreate,
	    eg."updatedAt" egupdate,
	    eg."ExaminationId" egeid


        FROM public."ExaminationValues" ev
        left join public."ExaminationGroups" eg on eg.id = ev."ExaminationGroupId"
        left join public."Examinations" e on e.id = eg."ExaminationId"
        left join public."Units" u ON u.id = ev."UnitId"
        left join public."Methods" m ON m.id = ev."MethodId"
        where ev.id= ${id} order by ev.id`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            const refvalue = yield this.getExaminationReferencesValue(evalue.idev);
            let daton = {
                id: evalue.idev,
                name: evalue.nameev,
                result: evalue.result,
                unit: {
                    id: evalue.unitev,
                    name: evalue.uname,
                    createdAt: evalue.ucreate,
                    updatedAt: evalue.uupdate
                },
                methodology: {
                    id: evalue.mid,
                    name: evalue.mname,
                    description: evalue.mdescription,
                    createdAt: evalue.mcreate,
                    updatedAt: evalue.mupdate
                },
                examGroup: {
                    id: evalue.egid,
                    name: evalue.egname,
                    countEV: evalue.egcountev,
                    status: evalue.egstatus,
                    createdAt: evalue.egcreate,
                    updatedAt: evalue.egupdate,
                    ExaminationId: evalue.egeid
                },
                examinationReferenceValues: refvalue
            };
            return daton;
        });
    }
    static updateExaminationReferenceValue(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinationReferenceValue = yield ExaminationReferenceValue_1.default.findOne({ where: { id: id } });
            yield examinationReferenceValue.update(data);
        });
    }
    static getAllExaminationValues() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ExaminationValue_1.default.findAll({
                nest: true
            });
        });
    }
    static getExaminationReferencesValue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evalues = yield config_database_1.default.query(`SELECT  distinct
        rf.id,
        rf."name"
        FROM public."ExaminationReferenceValues" rf 
        where rf."ExaminationValueId" = ${id}`, { type: sequelize_1.QueryTypes.SELECT });
            return evalues;
        });
    }
    static getExamValuebyExamId(id, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const evalues = yield config_database_1.default.query(`SELECT 
        ev.id idev,
        ev."name" nameev,
        ev."UnitId" unitev,
        ev."countVR2" result,
        u."name" uname,
	    u."createdAt" ucreate,
	    u."updatedAt" uupdate,
        m.id mid,
        m."name" mname,
        m.description mdescription,
        m."createdAt" mcreate,
        m."updatedAt" mupdate,
	    eg.id egid,
	    eg."name" egname,
	    eg."countEV" egcountev,
	    eg.status egstatus,
	    eg."createdAt" egcreate,
	    eg."updatedAt" egupdate,
	    eg."ExaminationId" egeid


        FROM public."ExaminationValues" ev
        left join public."ExaminationGroups" eg on eg.id = ev."ExaminationGroupId"
        left join public."Examinations" e on e.id = eg."ExaminationId"
        left join public."Units" u ON u.id = ev."UnitId"
        left join public."Methods" m ON m.id = ev."MethodId"
        where e.id= ${id} order by ev.id`, { type: sequelize_1.QueryTypes.SELECT });
            let data = [];
            for (const ev of evalues) {
                const refvalue = yield this.getExaminationReferencesValue(ev.idev);
                let daton = {
                    id: ev.idev,
                    name: ev.nameev,
                    result: ev.result,
                    unit: {
                        id: ev.unitev,
                        name: ev.uname,
                        createdAt: ev.ucreate,
                        updatedAt: ev.uupdate
                    },
                    methodology: {
                        id: ev.mid,
                        name: ev.mname,
                        description: ev.mdescription,
                        createdAt: ev.mcreate,
                        updatedAt: ev.mupdate
                    },
                    examGroup: {
                        id: ev.egid,
                        name: ev.egname,
                        countEV: ev.egcountev,
                        status: ev.egstatus,
                        createdAt: ev.egcreate,
                        updatedAt: ev.egupdate,
                        ExaminationId: ev.egeid
                    },
                    examinationReferenceValues: refvalue
                };
                data.push(daton);
            }
            return data;
        });
    }
    static updateReferenceValue(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const referenceValue = await getReferenceValue(id);
            // await referenceValue.update(data);
        });
    }
    static destroyReferenceValue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const referenceValue = await getReferenceValue(id);
            // await referenceValue.destroy();
        });
    }
}
exports.default = ReferenceValueServicios;
