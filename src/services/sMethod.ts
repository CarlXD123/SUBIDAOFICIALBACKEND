import db from '../config/config.database';
import Method from '../models/Method';

class MethodServicios {
    constructor() {
    }
    public static async getAllMethod() {
        return await Method.findAll({
            order: [["name", "ASC"]],
        });
    }
    public static async getPagedMethod(offset: any, limit: any) {
        const { count: total, rows } = await Method.findAndCountAll({
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
    public static createMethod(data: any) {
        db.transaction(async (transaction) => {
            const method = await Method.create(data, { transaction });

            return method;
        });
    }
    public static async getMethod(id: any) {
        const method = await Method.findByPk(id);
        if (!method) {
            //console.log("Error");
        }
        return method;
    }
    public static async updateMethod(id: any, data: any) {
        const method = await Method.findByPk(id);
        if (!method) {
            //console.log("Error");
        }
        return await method.update(data);
    }
    public static async destroyMethod(id: any) {
        const method = await Method.findByPk(id);
        if (!method) {
            //console.log("Error");
        }
        return await method.destroy();
    }
}
export default MethodServicios;
