import { Op, QueryTypes } from "sequelize";
import db from "../config/config.database";
import Examination from "../models/Examination";
import ExaminationGroup from "../models/ExaminationGroups";
import ExaminationReferenceValue from "../models/ExaminationReferenceValue";
import ExaminationValue from "../models/ExaminationValue";

class ExaminationServicios {
    constructor() {
    }
    //Get examinatioGroups by id
    public static async getExaminationGroupsID(examinationid: any) {
        const examinatioGroups = await db.query<any>(`SELECT  distinct
        *
    FROM public."ExaminationGroups" e
    where e.status='A' and e."ExaminationId" = ${examinationid} `, { type: QueryTypes.SELECT });
        return examinatioGroups;
    }
    public static async getPagedExamination(offset: any, limit: any) {
        const { count: total, rows } = await Examination.findAndCountAll({
            order: [["name", "ASC"]],
            nest: true,
            offset,
            limit,
            distinct: true
        });
        //console.log(rows);
        let datos = [];
        for (const r of rows) {
            const daton = (await db.query<any>(`SELECT 
            s.id serviceid,
            s."name" servicename,
            s.description servicedecription
            FROM public."Examinations" e
            inner join public."Services" s on s.id= e."ServiceId"
            where e.id = ${r.get('id')}`, { type: QueryTypes.SELECT }))[0]

            const groups = await this.getExaminationGroupsID(r.get('id'));


            let persona = r.get()
            let data = {
                ...persona,
                service: {
                    id: daton.serviceid,
                    name: daton.servicename,
                    description: daton.servicedecription
                },
                examinationGroups: groups
            }

            datos.push(data);

        }


        const result = {
            total,
            count: rows.length,
            data: datos
        };

        return result;
    }
    public static async getAllExamination() {
        return await Examination.findAll({
            order: [["name", "ASC"]],
            nest: true,
        });
    }
    public static buildQuery(query: any) {
        let where = {};

        // filter OR
        if (query.string) {
            where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query.string}%` } },
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
            where["name"] = { [Op.iLike]: `%${query.name}%` };
        }
        if (query.code) {
            where["code"] = query.code.toUpperCase();
        }

        return where;
    }
    public static async getFilterExamination(query: any) {
        const where = ExaminationServicios.buildQuery(query);
        const { count: total, rows } = await Examination.findAndCountAll({
            where,
            nest: true,
            offset: 0,
            limit: 10,
            distinct: true,
        });
        let datos = [];
        for (const r of rows) {
            const daton = (await db.query<any>(`SELECT 
            s.id serviceid,
            s."name" servicename,
            s.description servicedecription
            FROM public."Examinations" e
            inner join public."Services" s on s.id= e."ServiceId"
            where e.id = ${r.get('id')}`, { type: QueryTypes.SELECT }))[0]

            const groups = await this.getExaminationGroupsID(r.get('id'));
            let persona = r.get()
            let data = {
                ...persona,
                service: {
                    id: daton.serviceid,
                    name: daton.servicename,
                    description: daton.servicedecription
                },
                examinationGroups: groups
            }

            datos.push(data);
        }

        const result = {
            total,
            count: rows.length,
            data: datos
        };

        return result;
    }
    public static async updateExaminationValues(id: any, data: any) {
        const examinationValues = await ExaminationValue.findOne({
            where: { id: id }
        });

        await examinationValues.update(data);
    }
    public static async createExamination(data: any) {
        const examination = await Examination.create(data);
        Examination.update(
            {
                code: "E0" + examination.get().id
            },
            {
                where: {
                    id: examination.get().id,
                }
            }
        );
        for (const eg of data.examinationGroups) {
            eg.ExaminationId = examination.get().id;
            const examinationGroups = await ExaminationGroup.create(eg);

            for (const ev of eg.examinationValues) {
                ev.ExaminationGroupId = examinationGroups.get().id;
                const examinationValues = await ExaminationValue.create(ev);

                for (const erv of ev.examinationReferenceValues) {
                    erv.ExaminationValueId = examinationValues.get().id;
                    erv.ExaminationId = examination.get().id;
                    await ExaminationReferenceValue.create(erv);
                }
            }
        }
    }

    public static async updateExaminationTotal(data: any) {
        const examination = await this.getExaminationComplete(data.id);
        examination.update(data);
        //a  add
        //u  update
        //d  delete
        for (const eg of data.examinationGroups) {
            eg.ExaminationId = examination.get().id;
            let examinationGroups: any = {}
            if (eg.action == 'u') {
                examinationGroups = await ExaminationGroup.update(eg, {
                    where: {
                        id: eg.id
                    }
                });
            } else if (eg.action == 'a') {
                console.log(eg)
                examinationGroups = await ExaminationGroup.create(eg);
            } else if (eg.action == 'd') {
                let valuesr = await ExaminationValue.findAll({ where: { ExaminationGroupId: eg.id } })
                for (const vals of valuesr) {
                    ExaminationReferenceValue.destroy({
                        where: { ExaminationValueId: vals.get().id }
                    });
                }
                ExaminationValue.destroy({
                    where: { ExaminationGroupId: eg.id }
                });

                ExaminationGroup.destroy({
                    where: { id: eg.id }
                });
                continue;
            }
            for (const ev of eg.examinationValues) {
                ev.ExaminationGroupId = examinationGroups.id == null ? eg.id : examinationGroups.id;
                let examinationValues: any = {}

                if (ev.action == 'u') {
                    examinationValues = await ExaminationValue.update(ev, {
                        where: {
                            id: ev.id
                        }
                    });
                } else if (ev.action == 'a') {
                    examinationValues = await ExaminationValue.create(ev);
                } else if (ev.action == 'd') {

                    ExaminationReferenceValue.destroy({
                        where: { ExaminationValueId: ev.id }
                    });

                    ExaminationValue.destroy({
                        where: { id: ev.id }
                    });

                    continue;
                }


                for (const erv of ev.examinationReferenceValues) {
                    erv.ExaminationValueId = examinationValues.id == null ? ev.id : examinationValues.id;
                    erv.ExaminationId = examination.get().id;

                    if (erv.action == 'u') {
                        await ExaminationReferenceValue.update(erv, {
                            where: {
                                id: erv.id
                            }
                        });
                    } else if (erv.action == 'a') {
                        await ExaminationReferenceValue.create(erv);
                    } else if (erv.action == 'd') {

                        ExaminationReferenceValue.destroy({
                            where: { id: erv.id }
                        });

                    }
                }
            }
        }
    }

    public static async getExaminationComplete(id: any) {
        const examination = await Examination.findByPk(id, {
            nest: true
        });
        return examination;
    }
    public static async getExamination(id: any) {
        const examination = await Examination.findByPk(id, {
            nest: true
        });
        const daton = (await db.query<any>(`SELECT distinct
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
            where e.id = ${id}`, { type: QueryTypes.SELECT }))[0]

        const groups = await this.getExaminationGroupsID(id);
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
        }
        const result = {
            ...data
        };

        if (!examination) {
            //console.log("Error");
        }
        return result;
    }
    public static async updateExamination(id: any, { data, metaData }) {//, { data, metaData }) {
        switch (metaData.modelName) {
            case "examGroup":
                if (metaData.action === "create") {
                    return ExaminationGroup.create({
                        ...data,
                        ExaminationId: metaData.relationId,
                    });
                } else {
                    ExaminationGroup.destroy({
                        where: { id: data.id }
                    });
                }
            case "examValue":
                if (metaData.action === "create") {
                    return ExaminationValue.create({
                        name: data.name,
                        UnitId: data.unit.id,
                        ExaminationGroupId: data.examGroup.id,
                        MethodId: data.methodology.id,
                    });
                } else {
                    ExaminationValue.destroy({
                        where: { id: data.id }
                    })
                };
            case "examRef":
                if (metaData.action === "create") {
                    return ExaminationReferenceValue.create({
                        name: data.name,
                        ExaminationValueId: data.examValue.id,
                    });
                } else {
                    ExaminationReferenceValue.destroy({
                        where: { id: data.id }
                    })
                };
            default:
                const examination = await this.getExaminationComplete(id);
                return examination.update(data);
        }

    }

    public static async destroyExamination(id: any) {
        const examination = await Examination.findByPk(id);
        if (!examination) {
            //console.log("Error");
        }
        await examination.update({ status: "E" });
        const examinatioGroups = await ExaminationGroup.findAll({
            where: { ExaminationId: examination.get().id }
        })
        for (const eg of examinatioGroups) {
            const examinationValue = await ExaminationValue.findAll({
                where: { ExaminationGroupId: eg.get().id }
            })
            for (const ev of examinationValue) {
                ev.update({ status: "E" })
            }
            eg.update({ status: "E" })
        }
    }
}
export default ExaminationServicios;