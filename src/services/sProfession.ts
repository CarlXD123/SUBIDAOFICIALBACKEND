import db from '../config/config.database';
import Profession from '../models/Profession';
class ProfessionServicios {
    constructor() {
    }
    public static async getPagedProfession(offset: any, limit: any) {
        const { count: total, rows } = await Profession.findAndCountAll({
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
    public static async getAllProfession() {
        return await Profession.findAll();
    }
    public static async getProfession(id: any) {
        const profession = await Profession.findByPk(id);
        if (!profession) {
            //console.log("Error");
        }
        return profession;
    }
    public static createProfession(data: any) {
        db.transaction(async (transaction) => {
            const profession = await Profession.create(data, { transaction });
            return profession;
        });
    }
    public static async updateProfession(id: any, data: any) {
        const profession = await ProfessionServicios.getProfession(id);
        if (!profession) {
            //console.log("Error");
        }
        await profession.update(data);
    }
    public static async destroyProfession(id: any) {
        const profession = await ProfessionServicios.getProfession(id);
        if (!profession) {
            //console.log("Error");
        }
        await profession.destroy();
    }
}
export default ProfessionServicios;