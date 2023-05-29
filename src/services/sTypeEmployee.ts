import db from "../config/config.database";
import TypeEmployee from "../models/TypeEmployee";

class TypeEmployeeServicios {
    constructor() {
    }
    public static async getPagedTypeEmployee(offset: any, limit: any) {
        const { count: total, rows } = await TypeEmployee.findAndCountAll({
            offset,
            limit
        });

        const result = {
            total,
            count: rows.length,
            data:rows
            
        }

        return result
    }
    public static async getAllTypeEmployee() {
        return await TypeEmployee.findAll();
    }
    public static createTypeEmployee(data: any) {
        db.transaction(async (transaction) => {
            const typeEmployee = await TypeEmployee.create(data, { transaction });

            return typeEmployee;
        });
    }
    public static async getTypeEmployee(id: any) {
        const typeEmployee = await TypeEmployee.findByPk(id);
        if (!typeEmployee) {
            //console.log("Error");
        }
        return typeEmployee;
    }
    public static async updateTypeEmployee(id: any, data: any) {
        const typeEmployee = await TypeEmployeeServicios.getTypeEmployee(id);
        if (!typeEmployee) {
            //console.log("Error");
        }
        await typeEmployee.update(data);
    }
    public static async destroyTypeEmployee(id: any) {
        const typeEmployee = await TypeEmployeeServicios.getTypeEmployee(id);
        if (!typeEmployee) {
            //console.log("Error");
        }
        await typeEmployee.destroy();
    }

}
export default TypeEmployeeServicios;
