import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisMatchDataDetail from '../models/ApilisMatchDataDetail';
import { type } from 'os';

class ApilisMatchDataDetailServicios {
    constructor() {
    }

    public static async getAllMatchDataDetail(offset: any, limit: any) {
        const { count: total, rows } = await ApilisMatchDataDetail.findAndCountAll({
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
        
            const daton = (await db.query<any>(`SELECT e.id as id, e.name as nameex, s."Color" as status, s."idExamen" as ide, s."idModel" as idmodel, s."ColorAle" as color
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
            count: rows.length,
            data: rows
        };
        return result;
    }

    public static async getExamValueByExamination(id:any){
        return await db.query(`SELECT DISTINCT apdeta."idApilisMatchData" as idapilismatchdata,
        apdeta."idExamenValue" as idvalueexam,
        apdeta.fields as namevalue,
        apdeta.priority,
        ap.id as idapilis
    FROM public."ExaminationValues" as ev
    INNER JOIN public."ExaminationGroups" as eg ON (ev."ExaminationGroupId" = eg.id)
    INNER JOIN public."Examinations" as ex ON (ex."id" = eg."ExaminationId" )
    INNER JOIN public."ApilisMatchDatas" as ap ON (ap."idExamen" = ex."id" )
    INNER JOIN public."ApilisMatchDataDetails" as apdeta ON (apdeta."idApilisMatchData" = ap."id" ) WHERE ap."idExamen" = ${id} and apdeta."codBaja"=0
    ORDER BY apdeta.priority ASC;`, { type: QueryTypes.SELECT })
    }

    public static async getExamValueByExamination2(id:any){
        return await db.query(`select ex.id as ExaminationID,ev.id as idvalueexam,ev.name as namevalue from public."ExaminationValues" as ev
        inner join public."ExaminationGroups" as eg on (ev."ExaminationGroupId" = eg.id)
        inner join public."Examinations" as ex on (ex."id" = eg."ExaminationId" )  where ex.id = ${id}`, { type: QueryTypes.SELECT })
    }

    public static async getMatchDataDetail(id:any){
        const matchdetail = await ApilisMatchDataDetail.findByPk(id);
        if(!matchdetail) {
            //console.log("Error");
        }
        return matchdetail;
    }

    //Agregue un nuevo campo para que agregue data a la tabla apilismatchdatadetail
    public static async addMatchDataDetail(data: any) {
        const apilismatchdetail = await ApilisMatchDataDetail.create(data);
       // const apilismatchdetail = await ApilisMatchDataDetail.create(data);
      //  ApilisMatchDataDetail.update(
          // {
         //       idApilisMatchData: apilismatch.get().id
          //  },
          // {
         //       where: {
          //       id: apilismatchdetail.get().id
          //     }
          //  }
        //);
        return apilismatchdetail;

    }

    public static async updateMatchDataDetail(priorityid: any, idvalueexam: any) {
        return await db.query(`UPDATE public."ApilisMatchDataDetails"
        SET priority = ${priorityid}
        WHERE "idExamenValue" = ${idvalueexam};`);
    }

    public static async destroyMatchDataDetail(id: any) {
        db.transaction(async transaction => {
            await ApilisMatchDataDetail.update(
                {
                    codBaja: 1,
                },
                {
                    where: { idApilisMatchData: id }
                }
            );

        });
    }

}
export default ApilisMatchDataDetailServicios; 