import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisPath from '../models/ApilisPath';
import { type } from 'os';

class ApilisPathServicios {
    constructor() {
    }

    public static buildQuery(query: any) {
        let where = {
            codBaja: {
                [Op.ne]: 1,
            },
        };

        if (query.codBaja) {
            where['"codBaja"'] = query.codBaja;
        }
         
        if (query.codBaja == 0) {
            if (query.date) {
                where['id'] = query.date;
            }
        }

        if (query.codBaja == 1) {
            if (query.date) {
                where['id'] = query.date;
            }
        }
        return where;

    }

  
    public static async getAllPath(offset: any, limit: any, query: any) {
        let where = ApilisPathServicios.buildQuery(query);
        const { count: total, rows } = await ApilisPath.findAndCountAll({
            where,
            distinct: true,
            offset,
            limit,
            //order: [["nameBrand", "ASC"]],
        });

        
        const result = {
            total,
            count: rows.length,
            data: rows
        };
        return result;
    }

    public static async getPath(id:any){
        const path = await ApilisPath.findByPk(id);
        if(!path) {
            //console.log("Error");
        }
        return path;
    }

    public static async addPath(data: any) {
        const apilisPath = await ApilisPath.create(data);
        ApilisPath.update(
            {
                id: apilisPath.get().id
            },
            {
                where: {
                    id: apilisPath.get().id
                }
            }
        );
    }

    public static async updatePath(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisPath = await ApilisPath.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisPath.update(data);
        });
    }

    public static async destroyPath(id: any) {
        db.transaction(async transaction => {
            await ApilisPath.update(
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
export default ApilisPathServicios; 