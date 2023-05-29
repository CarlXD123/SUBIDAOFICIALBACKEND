import { Op, QueryTypes } from "sequelize";
import db from "../config/config.database";
import Function from "../models/Function";

class FunctionServicios {
    constructor() {
    }
    public static async getAllFunctions() {
        const functions = await Function.findAll({
            order: [
                ['id', 'asc']
            ]
        });
        return functions;
    }
    //buscar roles
    public static async getFunctionByRole(id: any) {
        return await db.query(`SELECT 
            rf."RoleId",
            r."name",
            r.description
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where rf."FunctionId" = ${id}`, { type: QueryTypes.SELECT })
    }
    public static async getLinkableFunctions() {
        const functions = await Function.findAll({
            // where: { link: { [Op.ne]: null } },
            // // include: [
            // //     {
            // //         model: models.Function, as: 'children', include: [{
            // //             model: models.Function, as: 'children'
            // //         }]
            // //     },
            // // ],
            // order: [
            //     ['id', 'asc'],
            // ]
        });
        return functions;
    }
    public static async createFunction(data: any) {
        db.transaction(async (transaction) => {
            const functions = await Function.create(data, { transaction });

            return functions;
        });
    }
    public static async getFunction(id: any) {
        const auxFunction = await Function.findOne({
            where: { id: id },
            // include: [
            //     { model: models.Role },
            //     { model: models.Function, as: 'children' }
            // ],
            // order: [
            //     ['id', 'asc'],
            //     [models.Role, 'id', 'asc']
            // ]
        });
        if (!auxFunction) {
            //console.log("Error");
        }
        return auxFunction;
    }
    public static async updateFunction(id: any, data: any) {
        const auxFunction = await Function.findByPk(id);
        if (!auxFunction) {
            //console.log("Error");
        }
        return await auxFunction.update(data);
    }
    public static async destroyFunction(id: any) {
        const auxFunction = await Function.findByPk(id);
        if (!auxFunction) {
            //console.log("Error");
        }
        return await auxFunction.destroy();
    }
    public static async getRolesForFunction(id: any) {
        let auxFunction = await Function.findByPk(id)
        //if (!auxFunction)
            //console.log("Error");
        // let roles = await auxFunction.getRoles();
        // if (!roles || !roles.length)
        //     //console.log("Error");

        // return roles
    }
    public static async getActionsByRole(function_id: any, role_id: any) {
        const auxFunction = await Function.findOne({
            where: { id: function_id },
            // include: {
            //     model: models.Role, where: { id: role_id }, through: {
            //         attributes: ['canView', 'canCreate', 'canEdit', 'canDelete'],
            //     }
            // }
        });

        if (!auxFunction)
            //console.log("Error");

        return auxFunction;
    }

}
export default FunctionServicios;