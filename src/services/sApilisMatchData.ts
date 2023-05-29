import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisMatchData from '../models/ApilisMatchData';
import ApilisMatchDataDetail from '../models/ApilisMatchDataDetail';
import { type } from 'os';

class ApilisMatchDataServicios {
    constructor() {
    }

    public static async getAllMatchData(offset: any, limit: any) {
        const { count: total, rows } = await ApilisMatchData.findAndCountAll({
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
        
            const daton = (await db.query<any>(`SELECT DISTINCT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
            FROM public."Examinations" e 
            left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
            where e."status"= 'A'`, { type: QueryTypes.SELECT }));
  
            const daton2 = (await db.query<any>(`SELECT e.id as id, e.name as nameex,ev.id as idvalueexam,ev.name examvaluename
            FROM public."ExaminationValues" ev 
			inner join public."ExaminationGroups" as eg on (ev."ExaminationGroupId" = eg.id)
            inner join public."Examinations" as e on (e."id" = eg."ExaminationId" )  
            left join public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" <> 1
            where e."status"= 'A'`, { type: QueryTypes.SELECT }));

            datos.push({
              matchexam: daton,
              val: daton2,
                
            });

            //     where["$Client.UserId$"] = query.UserId;
            // }
        const result = {
            total,
            count: daton.length,
            data: datos
        };
        return datos;
    }

    public static async getMatchData(id:any){
        const match = await ApilisMatchData.findByPk(id);
        if(!match) {
            //console.log("Error");
        }
        return match;
    }

    //Agregue un nuevo campo para que agregue data a la tabla apilismatchdatadetail
    public static async addMatchData(data: any) {
        const apilismatch = await ApilisMatchData.create(data);
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

    public static async updateMatchData(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisMatch = await ApilisMatchData.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisMatch.update(data);
        });
    }

    public static async destroyMatchData(id: any) {
        db.transaction(async transaction => {
            await ApilisMatchData.update(
                {
                    codBaja: 1,
                    Color: "",
                },
                {
                    where: { idExamen: id }
                }
            );

            
        });
    }

}
export default ApilisMatchDataServicios; 