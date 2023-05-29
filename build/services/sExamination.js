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
const Examination_1 = __importDefault(require("../models/Examination"));
const ExaminationGroups_1 = __importDefault(require("../models/ExaminationGroups"));
const ExaminationReferenceValue_1 = __importDefault(require("../models/ExaminationReferenceValue"));
const ExaminationValue_1 = __importDefault(require("../models/ExaminationValue"));
class ExaminationServicios {
    constructor() {
    }
    //Get examinatioGroups by id
    static getExaminationGroupsID(examinationid) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinatioGroups = yield config_database_1.default.query(`SELECT  distinct
        *
    FROM public."ExaminationGroups" e
    where e.status='A' and e."ExaminationId" = ${examinationid} `, { type: sequelize_1.QueryTypes.SELECT });
            return examinatioGroups;
        });
    }
    static getPagedExamination(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Examination_1.default.findAndCountAll({
                order: [["name", "ASC"]],
                nest: true,
                offset,
                limit,
                distinct: true
            });
            //console.log(rows);
            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            s.id serviceid,
            s."name" servicename,
            s.description servicedecription
            FROM public."Examinations" e
            inner join public."Services" s on s.id= e."ServiceId"
            where e.id = ${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                const groups = yield this.getExaminationGroupsID(r.get('id'));
                let persona = r.get();
                let data = Object.assign(Object.assign({}, persona), { service: {
                        id: daton.serviceid,
                        name: daton.servicename,
                        description: daton.servicedecription
                    }, examinationGroups: groups });
                datos.push(data);
            }
            const result = {
                total,
                count: rows.length,
                data: datos
            };
            return result;
        });
    }
    static getAllExamination() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Examination_1.default.findAll({
                order: [["name", "ASC"]],
                nest: true,
            });
        });
    }
    static buildQuery(query) {
        let where = {};
        // filter OR
        if (query.string) {
            where = {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.iLike]: `%${query.string}%` } },
                    { code: query.string.toUpperCase() },
                ],
            };
        }
        // filter AND
        if (query.service && query.service !== "") {
            where["ServiceId"] = query.service;
        }
        if (query.method && query.method !== "") {
            where["MethodId"] = query.method;
        }
        if (query.name) {
            where["name"] = { [sequelize_1.Op.iLike]: `%${query.name}%` };
        }
        if (query.code) {
            where["code"] = query.code.toUpperCase();
        }
        return where;
    }
    static getFilterExamination(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = ExaminationServicios.buildQuery(query);
            const { count: total, rows } = yield Examination_1.default.findAndCountAll({
                where,
                nest: true,
                offset: 0,
                limit: 10,
                distinct: true,
            });
            let datos = [];
            for (const r of rows) {
                const daton = (yield config_database_1.default.query(`SELECT 
            s.id serviceid,
            s."name" servicename,
            s.description servicedecription
            FROM public."Examinations" e
            inner join public."Services" s on s.id= e."ServiceId"
            where e.id = ${r.get('id')}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
                const groups = yield this.getExaminationGroupsID(r.get('id'));
                let persona = r.get();
                let data = Object.assign(Object.assign({}, persona), { service: {
                        id: daton.serviceid,
                        name: daton.servicename,
                        description: daton.servicedecription
                    }, examinationGroups: groups });
                datos.push(data);
            }
            const result = {
                total,
                count: rows.length,
                data: datos
            };
            return result;
        });
    }
    static updateExaminationValues(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const examinationValues = yield ExaminationValue_1.default.findOne({
                where: { id: id }
            });
            yield examinationValues.update(data);
        });
    }
    static createExamination(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield Examination_1.default.create(data);
            Examination_1.default.update({
                code: "E0" + examination.get().id
            }, {
                where: {
                    id: examination.get().id,
                }
            });
            for (const eg of data.examinationGroups) {
                eg.ExaminationId = examination.get().id;
                const examinationGroups = yield ExaminationGroups_1.default.create(eg);
                for (const ev of eg.examinationValues) {
                    ev.ExaminationGroupId = examinationGroups.get().id;
                    const examinationValues = yield ExaminationValue_1.default.create(ev);
                    for (const erv of ev.examinationReferenceValues) {
                        erv.ExaminationValueId = examinationValues.get().id;
                        erv.ExaminationId = examination.get().id;
                        yield ExaminationReferenceValue_1.default.create(erv);
                    }
                }
            }
        });
    }
    static updateExaminationTotal(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield this.getExaminationComplete(data.id);
            examination.update(data);
            //a  add
            //u  update
            //d  delete
            for (const eg of data.examinationGroups) {
                eg.ExaminationId = examination.get().id;
                let examinationGroups = {};
                if (eg.action == 'u') {
                    examinationGroups = yield ExaminationGroups_1.default.update(eg, {
                        where: {
                            id: eg.id
                        }
                    });
                }
                else if (eg.action == 'a') {
                    console.log(eg);
                    examinationGroups = yield ExaminationGroups_1.default.create(eg);
                }
                else if (eg.action == 'd') {
                    let valuesr = yield ExaminationValue_1.default.findAll({ where: { ExaminationGroupId: eg.id } });
                    for (const vals of valuesr) {
                        ExaminationReferenceValue_1.default.destroy({
                            where: { ExaminationValueId: vals.get().id }
                        });
                    }
                    ExaminationValue_1.default.destroy({
                        where: { ExaminationGroupId: eg.id }
                    });
                    ExaminationGroups_1.default.destroy({
                        where: { id: eg.id }
                    });
                    continue;
                }
                for (const ev of eg.examinationValues) {
                    ev.ExaminationGroupId = examinationGroups.id == null ? eg.id : examinationGroups.id;
                    let examinationValues = {};
                    if (ev.action == 'u') {
                        examinationValues = yield ExaminationValue_1.default.update(ev, {
                            where: {
                                id: ev.id
                            }
                        });
                    }
                    else if (ev.action == 'a') {
                        examinationValues = yield ExaminationValue_1.default.create(ev);
                    }
                    else if (ev.action == 'd') {
                        ExaminationReferenceValue_1.default.destroy({
                            where: { ExaminationValueId: ev.id }
                        });
                        ExaminationValue_1.default.destroy({
                            where: { id: ev.id }
                        });
                        continue;
                    }
                    for (const erv of ev.examinationReferenceValues) {
                        erv.ExaminationValueId = examinationValues.id == null ? ev.id : examinationValues.id;
                        erv.ExaminationId = examination.get().id;
                        if (erv.action == 'u') {
                            yield ExaminationReferenceValue_1.default.update(erv, {
                                where: {
                                    id: erv.id
                                }
                            });
                        }
                        else if (erv.action == 'a') {
                            yield ExaminationReferenceValue_1.default.create(erv);
                        }
                        else if (erv.action == 'd') {
                            ExaminationReferenceValue_1.default.destroy({
                                where: { id: erv.id }
                            });
                        }
                    }
                }
            }
        });
    }
    static getExaminationComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield Examination_1.default.findByPk(id, {
                nest: true
            });
            return examination;
        });
    }
    static getExamination(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield Examination_1.default.findByPk(id, {
                nest: true
            });
            const daton = (yield config_database_1.default.query(`SELECT distinct
            e.id examinationid,
            e."name" examinationname,
            e.code examinationcode,
            e."indications" indications,
            e."typeSample" typesample,
            e."supplies" supplies,
            e."storageTemperature" storagetemperature,
            e."fastingConditions" fastingconditions,
            e."runFrequency" runfrequency,
            e."processTime" processtime,
            e."volume" volume,
            e."reportTime" reportime,
            e.status examinationstatus,
            s.id serviceid,
            s."name" servicename,
            s.description servicedecription
            FROM public."Examinations" e
            left join public."Services" s on s.id= e."ServiceId"
            where e.id = ${id}`, { type: sequelize_1.QueryTypes.SELECT }))[0];
            const groups = yield this.getExaminationGroupsID(id);
            let data = {
                id: daton.examinationid,
                name: daton.examinationname,
                code: daton.examinationcode,
                indications: daton.indications,
                typeSample: daton.typesample,
                supplies: daton.supplies,
                storageTemperature: daton.storagetemperature,
                fastingConditions: daton.fastingconditions,
                runFrequency: daton.runfrequency,
                processTime: daton.processtime,
                volume: daton.volume,
                reportTime: daton.reportime,
                status: daton.examinationstatus,
                service: {
                    id: daton.serviceid,
                    name: daton.servicename,
                    description: daton.servicedecription
                },
                examinationGroups: groups
            };
            const result = Object.assign({}, data);
            if (!examination) {
                //console.log("Error");
            }
            return result;
        });
    }
    static updateExamination(id, { data, metaData }) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (metaData.modelName) {
                case "examGroup":
                    if (metaData.action === "create") {
                        return ExaminationGroups_1.default.create(Object.assign(Object.assign({}, data), { ExaminationId: metaData.relationId }));
                    }
                    else {
                        ExaminationGroups_1.default.destroy({
                            where: { id: data.id }
                        });
                    }
                case "examValue":
                    if (metaData.action === "create") {
                        return ExaminationValue_1.default.create({
                            name: data.name,
                            UnitId: data.unit.id,
                            ExaminationGroupId: data.examGroup.id,
                            MethodId: data.methodology.id,
                        });
                    }
                    else {
                        ExaminationValue_1.default.destroy({
                            where: { id: data.id }
                        });
                    }
                    ;
                case "examRef":
                    if (metaData.action === "create") {
                        return ExaminationReferenceValue_1.default.create({
                            name: data.name,
                            ExaminationValueId: data.examValue.id,
                        });
                    }
                    else {
                        ExaminationReferenceValue_1.default.destroy({
                            where: { id: data.id }
                        });
                    }
                    ;
                default:
                    const examination = yield this.getExaminationComplete(id);
                    return examination.update(data);
            }
        });
    }
    static destroyExamination(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const examination = yield Examination_1.default.findByPk(id);
            if (!examination) {
                //console.log("Error");
            }
            yield examination.update({ status: "E" });
            const examinatioGroups = yield ExaminationGroups_1.default.findAll({
                where: { ExaminationId: examination.get().id }
            });
            for (const eg of examinatioGroups) {
                const examinationValue = yield ExaminationValue_1.default.findAll({
                    where: { ExaminationGroupId: eg.get().id }
                });
                for (const ev of examinationValue) {
                    ev.update({ status: "E" });
                }
                eg.update({ status: "E" });
            }
        });
    }
}
exports.default = ExaminationServicios;
