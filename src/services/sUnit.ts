import db from '../config/config.database';
import Unit from '../models/Unit';

class UnitServicios {
    constructor() {
    }
    public static async getAllUnit() {
        return await Unit.findAll({
            order: [["name", "ASC"]],
        });

    }
    public static async getPagedUnit(offset: any, limit: any) {
        const { count: total, rows } = await Unit.findAndCountAll({
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
    public static createUnit(data: any) {
        db.transaction(async (transaction) => {
            const unit = await Unit.create(data, { transaction });

            return unit;
        });
    }
    public static async getUnit(id: any) {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            //console.log("Error");
        }
        return unit;
    }
    public static async updateUnit(id: any, data: any) {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            //console.log("Error");
        }
        return await unit.update(data);
    }
    public static async destroyUnit(id: any) {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            //console.log("Error");
        }
        return unit.destroy();
    }
}
export default UnitServicios;