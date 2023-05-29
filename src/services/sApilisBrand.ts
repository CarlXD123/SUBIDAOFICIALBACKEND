import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisBrand from '../models/ApilisBrand';
import ApilisModel from '../models/ApilisModel';
import ApilisPath from '../models/ApilisPath';

class ApilisBrandServicios {
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

  
    public static async getAllBrand(offset: any, limit: any, query: any) {
        let where = ApilisBrandServicios.buildQuery(query);
        const { count: total, rows } = await ApilisBrand.findAndCountAll({
            where,
            distinct: true,
            offset,
            limit,
            order: [["nameBrand", "ASC"]],
        });

        
        let datos = []

        for (const r of rows) {
            const daton = (await db.query<any>(`SELECT 
            apb.id apbid, apb."nameBrand" nameBrand, apb."codBaja" codBajaBrand

            FROM public."ApilisBrands" apb
			where apb.id=${r.get('id')}`, { type: QueryTypes.SELECT }))[0];


        const daton3 = (await db.query<any>(`SELECT 
        apm.id apmid, apm."nameModel" nameModel, apm."codBaja", apm."idBrand" idBrandModel
        FROM public."ApilisModels" apm
        where apm."idBrand"=${r.get('id')} and apm."codBaja"=0`, { type: QueryTypes.SELECT }));

          
            let persona = r.get()

            if (!daton)
                continue
           
            
            
            datos.push({
                ...persona,
                model: {
                    modelo: daton3
                },
            });
          
            //     where["$Client.UserId$"] = query.UserId;
            // }

        }


        const result = {
            total,
            count: rows.length,
            data: datos
        };
        return result;
    }

    public static async getBrand(id:any){
        const brand = await ApilisBrand.findOne({
            where: { id }
        });
        if (!brand) {
            //console.log("Error");
        }
        return brand;
    }

    public static async getModelByBrand(id: any) {
        return await db.query(`SELECT 
        pm.id,
        pm."nameModel"
        FROM public."ApilisBrands" api
        inner join public."ApilisModels" pm on api.id = pm."idBrand"
        where api.id= ${id}`, { type: QueryTypes.SELECT })
    }

    public static async addBrand(data: any) {
        const apilisBrand = await ApilisBrand.create(data);
        return apilisBrand
    }

    public static async updateBrand(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisBrand = await ApilisBrand.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisBrand.update(data);
        });
    }

    public static async destroyBrand(id: any) {
        db.transaction(async transaction => {
        try {
            await ApilisBrand.update(
                {
                    codBaja: 1,
                },
                {
                    where: { id: id }
                }
            );

            await ApilisModel.update(
                {
                    codBaja: 1,
                },
                {
                    where: { idBrand: id }
                }
            );
            const modelsToUpdate = await ApilisModel.findAll({
                where: { 
                    idBrand: id, 
                    codBaja: 1
                },
            });

            const modelIds = modelsToUpdate.map((model: any) => model.id);


            await ApilisPath.update({
                codBaja: 1,
            }, {
                where: { 
                    idModel: { [Op.in]: modelIds } 
                },
            });
        } catch (error) {
            console.log("Error in transaction: ", error);
        }
        });
    }

}
export default ApilisBrandServicios; 