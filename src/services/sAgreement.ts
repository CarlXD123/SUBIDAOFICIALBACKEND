
import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import Agreement from '../models/Agreements';

class AgreementServicios {
    constructor() {
    }
    public static buildQuery(query: any) {
        let where = {};

        if (query.string) {
            where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query.string}%` } }
                ],
            };
        }
        return where;
    }
    public static async getFilterAgreement(query: any) {
        const where = this.buildQuery(query);
        const { count: total, rows } = await Agreement.findAndCountAll({
            where,
            offset: 0,
            limit: 10
        });
        const result = {
            total,
            count: rows.length,
            data: rows
        };

        return result;
    }
    public static async getAllAgreement() {
        return await Agreement.findAll();
    }
    public static async getPagedAgreement(offset: any, limit: any) {
        const { count: total, rows } = await Agreement.findAndCountAll({
            offset,
            limit
        });

        const result = {
            total,
            count: rows.length,
            data: rows
        }
        return result
    }
    public static async getAgreement(id: any) {
        const agreement = await Agreement.findOne({
            where: { id }
        });
        if (!agreement) {
            //console.log("Error");
        }
        return agreement;
    }

    public static async getAgreementByPriceList(id: any) {
        return await db.query(`SELECT 
        p.id,
        p."name"
        FROM public."Agreements" a 
        inner join public."PriceLists" p on a.id = p.id
        where a.id= ${id}`, { type: QueryTypes.SELECT })
    }


    public static createAgreement(data: any) {
        db.transaction(async transaction => {
            const agreement = await Agreement.create(data, { transaction });
            return agreement;
        });
    }
    public static async updateAgreement(id: any, data: any) {
        const agreement = await Agreement.findByPk(id);
        if (!agreement) {
            //console.log("Error");
        }
        return agreement.update(data);
    }
    public static async destroyAgreement(id: any) {
        const agreement = await Agreement.findByPk(id);
        if (!agreement) {
            //console.log("Error");
        }
        return agreement.destroy();
    }
}
export default AgreementServicios; 