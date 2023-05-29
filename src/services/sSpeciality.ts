import db from "../config/config.database";
import Speciality from "../models/Speciality";

class SpecialityServicios {
    constructor() {
    }
    public static async getPagedSpeciality(offset: any, limit: any) {
        const { count: total, rows } = await Speciality.findAndCountAll({
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
    public static async getAllSpeciality() {
        return await Speciality.findAll();
    }
    public static createSpeciality(data: any) {
        db.transaction(async (transaction) => {
            const speciality = await Speciality.create(data, { transaction });

            return speciality;
        });
    }
    public static async getSpeciality(id: any) {
        const speciality = await Speciality.findByPk(id);
        if (!speciality) {
            //console.log("Error");
        }
        return speciality;
    }
    public static async updateSpeciality(id: any, data: any) {
        const speciality = await SpecialityServicios.getSpeciality(id);
        if (!speciality) {
            //console.log("Error");
        }
        await speciality.update(data);
    }
    public static async destroySpeciality(id: any) {
        const speciality = await SpecialityServicios.getSpeciality(id);
        if (!speciality) {
            //console.log("Error");
        }
        await speciality.destroy();
    }
}
export default SpecialityServicios;