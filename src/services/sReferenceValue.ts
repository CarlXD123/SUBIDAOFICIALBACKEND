import { QueryTypes } from "sequelize";
import db from "../config/config.database";
import ExaminationReferenceValue from "../models/ExaminationReferenceValue";
import ExaminationValue from "../models/ExaminationValue";

class ReferenceValueServicios {
    constructor() {
    }
    public static async getPagedReferenceValue(offset: any, limit: any) {
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
    }
    public static async getAllReferenceValue() {
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
    }
    public static async createReferenceValue(data: any) {
        //await ExaminationValue.create(data);
    }
    public static async getReferenceValue(id: any) {
        const evalue =(await db.query<any>(`SELECT 
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
        where ev.id= ${id} order by ev.id`, { type: QueryTypes.SELECT }))[0]

        
            const refvalue = await this.getExaminationReferencesValue(evalue.idev);
            let daton = {
                id: evalue.idev,
                name: evalue.nameev,
                result:evalue.result,
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
                    id: evalue.egid ,
                    name: evalue.egname,
                    countEV:evalue.egcountev ,
                    status: evalue.egstatus ,
                    createdAt: evalue.egcreate ,
                    updatedAt: evalue.egupdate ,
                    ExaminationId: evalue.egeid
                },
                examinationReferenceValues: refvalue
            }
    

        return daton;
    }
    public static async updateExaminationReferenceValue(id: any, data: any) {
        const examinationReferenceValue = await ExaminationReferenceValue.findOne({ where: { id: id } });
        await examinationReferenceValue.update(data);
    }
    public static async getAllExaminationValues() {
        return await ExaminationValue.findAll({
            nest: true
        });
    }
    public static async getExaminationReferencesValue(id:any){
        const evalues = await db.query<any>(`SELECT  distinct
        rf.id,
        rf."name"
        FROM public."ExaminationReferenceValues" rf 
        where rf."ExaminationValueId" = ${id}`, { type: QueryTypes.SELECT });
        return evalues;
    }

    public static async getExamValuebyExamId(id: any, appointmentId: any) {

        const evalues = await db.query<any>(`SELECT 
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
        where e.id= ${id} order by ev.id`, { type: QueryTypes.SELECT })


        let data = [];
        
        for (const ev of evalues) {
            const refvalue = await this.getExaminationReferencesValue(ev.idev);
            let daton = {
                id: ev.idev,
                name: ev.nameev,
                result:ev.result,
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
                    id: ev.egid ,
                    name: ev.egname,
                    countEV:ev.egcountev ,
                    status: ev.egstatus ,
                    createdAt: ev.egcreate ,
                    updatedAt: ev.egupdate ,
                    ExaminationId: ev.egeid
                },
                examinationReferenceValues: refvalue
            }
            data.push(daton);
        }


        return data;
    }
    public static async updateReferenceValue(id: any, data: any) {
        // const referenceValue = await getReferenceValue(id);
        // await referenceValue.update(data);
    }
    public static async destroyReferenceValue(id: any) {
        // const referenceValue = await getReferenceValue(id);
        // await referenceValue.destroy();
    }
}
export default ReferenceValueServicios;

