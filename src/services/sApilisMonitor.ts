import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisMonitor from '../models/ApilisMonitor';
import ApilisMatchDataDetail from '../models/ApilisMatchDataDetail';
import { type } from 'os';

class ApilisMonitorServicios {
    constructor() {
    }

    public static async getAllMonitor(offset: any, limit: any) {
        const { count: total, rows } = await ApilisMonitor.findAndCountAll({
            where: {
                codBaja: {
                    [Op.ne]: 1,
                },
            },
            distinct: true,
            offset,
            limit,

        });

        let datos = []
        
           /* const daton = (await db.query<any>(`SELECT DISTINCT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
            FROM public."Examinations" e 
            left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
            where e."status"= 'A'`, { type: QueryTypes.SELECT }));*/
  
            const daton2 = (await db.query<any>(`SELECT DISTINCT 
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
        `, { type: QueryTypes.SELECT }));

            datos.push({
              val: daton2,
                
            });

            //     where["$Client.UserId$"] = query.UserId;
            // }
        const result = {
            total,
            count: daton2.length,
            data: datos
        };
        return daton2;
    }

    public static async getMonitor(id:any){
        const match = await ApilisMonitor.findByPk(id);
        if(!match) {
            //console.log("Error");
        }
        return match;
    }

    //Agregue un nuevo campo para que agregue data a la tabla apilismatchdatadetail
    public static async addMonitor(data: any) {
        const apilismatch = await ApilisMonitor.create(data);
        //const apilismatchdatadetail = await ApilisMatchDataDetail.create(
            //{
               // idApilisMatchData: apilismatch.get().id,
            //}
            //);
       
        //await ApilisMatchDataDetail.create(
         //   { 
           //     idApilisMatchData: apilismatch.get().id,
           //     idExamenValue: 5,
            //    fields: "do",
            //    priority: 2,
            //    createdBy: "d",
             //   modifiedBy: "df",
           // });7
        console.log(apilismatch)
        //console.log(apilismatchdatadetail)
        console.log(apilismatch.get().id)
        return apilismatch.get().id;

    }

    public static async updateMonitor(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisMatch = await ApilisMonitor.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisMatch.update(data);
        });
    }

    public static async destroyMonitor(id: any) {
        db.transaction(async transaction => {
            await ApilisMonitor.update(
                {
                    codBaja: 1,
                },
                {
                    where: { id: id }
                }
            );

            
        });
    }

}
export default ApilisMonitorServicios; 