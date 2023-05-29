import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisModel from '../models/ApilisModel';
import ApilisPath from '../models/ApilisPath';
import { type } from 'os';

class ApilisModelServicios {
    constructor() {
    }

    public static async getAllModel(idBrand: any) {
        const { count: total, rows } = await ApilisModel.findAndCountAll({
            where: {
                idBrand,
                codBaja: {
                    [Op.ne]: 1,
                },
            },
            order: [["nameModel", "ASC"]],
        });

        const result = {
            total,
            count: rows.length,
            data: rows
        };
        return result;
    }

    public static async getModel(id:any){
        const model = await ApilisModel.findByPk(id);
        if(!model) {
            //console.log("Error");
        }
        return model;
    }

    public static async getModelByMatchData(id:any){
        return await db.query(`SELECT e.id as idex, e.name as nameex, MAX(s."Color") as status, MAX(s."idExamen") as ide, MAX(s."idModel") as idmodel, MAX(s."ColorAle") as color, MAX(s.id) as idmatch
        FROM public."Examinations" e 
        LEFT JOIN public."ApilisMatchDatas" s ON e.id = s."idExamen" AND s."codBaja" = 0
        where e."status"= 'A' and s."idModel"= ${id} 
        GROUP BY e.id, e.name`, { type: QueryTypes.SELECT })
    }


    public static async addModel(data: any) {
        const apilisModel = await ApilisModel.create(data);
        const apilisPath = await ApilisPath.create(data);
        ApilisPath.update(
            {
                idModel: apilisModel.get().id
            },
            {
                where: {
                    id: apilisPath.get().id
                }
            }
        );

        return apilisModel

    }

    public static async updateModel(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisModel = await ApilisModel.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisModel.update(data);
        });
    }

    public static async destroyModel(id: any) {
        db.transaction(async transaction => {
            await ApilisModel.update(
                {
                    codBaja: 1,
                },
                {
                    where: { id: id }
                }
            );

            await ApilisPath.update(
                {
                    codBaja: 1,
                },
                {
                    where: { idModel: id }
                }
            );



        });
    }

}
export default ApilisModelServicios; 