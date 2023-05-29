import db from '../config/config.database';
import Tuition from '../models/Tuition';

class TuitionServicios {
    constructor() {
    }
    public static async getPagedTuition(offset: any, limit: any) {
        const { count: total, rows } = await Tuition.findAndCountAll({
            offset,
            limit
        });

        const result = {
            total,
            count: rows.length,
            data: rows,
        }

        return result
    }
    public static async getAllTuition() {
        return await Tuition.findAll();
    }
    public static createTuition(data: any) {
        db.transaction(async (transaction) => {
            const tuition = await Tuition.create(data, { transaction });
            return tuition;
        });
    }
    public static async getTuition(id:any) {
        const tuition = await Tuition.findByPk(id);
        if(!tuition) {
            //console.log("Error");
        }
        return tuition;
    }
    public static async updateTuition(id: any, data: any) {
        const tuition = await TuitionServicios.getTuition(id);
        if (!tuition) {
            //console.log("Error");
        }
        await tuition.update(data);
    }
    public static async destroyTuition(id:any){
        const tuition = await TuitionServicios.getTuition(id);
        if(!tuition) {
            //console.log("Error");
        }
        await tuition.destroy();
    }
}
export default TuitionServicios;