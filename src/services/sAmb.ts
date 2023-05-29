import db from '../config/config.database';
import Amb from '../models/Amb';

class AmbServicios {
    constructor() {
    }
    public static async getAllAmb() {
        return await Amb.findAll({
            order: [["name", "ASC"]],
        });
    }
    public static async getPagedAmb(offset: any, limit: any) {
        const { count: total, rows } = await Amb.findAndCountAll({
            offset,
            limit,
        });

        const result = {
            total,
            count: rows.length,
            data: rows
        };

        return result;
    }
    public static createAmb(data: any) {
        db.transaction(async (transaction) => {
            const amb = await Amb.create(data, { transaction });

            return amb;
        });
    }
    public static async getAmb(id: any) {
        const amb = await Amb.findByPk(id);
        if (!amb) {
            //console.log("Error");
        }
        return amb;
    }
    public static async updateAmb(id: any, data: any) {
        const amb = await Amb.findByPk(id);
        if (!amb) {
            //console.log("Error");
        }
        return await amb.update(data);
    }
    public static async destroyAmb(id: any) {
        const amb = await Amb.findByPk(id);
        if (!amb) {
            //console.log("Error");
        }
        return await amb.destroy();
    }
}
export default AmbServicios;