import db from '../config/config.database';
import Nation from '../models/Nation';

class NationServicios {
    constructor() {
    }
    public static async getAllNation() {
        return await Nation.findAll({
            order: [["name", "ASC"]],
        });
    }
    public static async getPagedNation(offset: any, limit: any) {
        const { count: total, rows } = await Nation.findAndCountAll({
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
    public static createNation(data: any) {
        db.transaction(async (transaction) => {
            const nation = await Nation.create(data, { transaction });

            return nation;
        });
    }
    public static async getNation(id: any) {
        const nation = await Nation.findByPk(id);
        if (!nation) {
            //console.log("Error");
        }
        return nation;
    }
    public static async updateNation(id: any, data: any) {
        const nation = await Nation.findByPk(id);
        if (!nation) {
            //console.log("Error");
        }
        return await nation.update(data);
    }
    public static async destroyNation(id: any) {
        const nation = await Nation.findByPk(id);
        if (!nation) {
            //console.log("Error");
        }
        return await nation.destroy();
    }
}
export default NationServicios;