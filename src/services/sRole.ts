import { QueryTypes } from "sequelize";
import db from "../config/config.database";
import Function from "../models/Function";
import Role from "../models/Role";
import RoleFunction from "../models/RoleFunction";

class RoleServicios {
    constructor() {
    }
    public static async getAllRole() {
        return await Role.findAll();
    }
    public static async getPagedRole(offset: any, limit: any) {
        const { count: total, rows } = await Role.findAndCountAll({
            where: { status: "A" },
            order: [
                ['id', 'asc']
            ],
            offset,
            limit,
            distinct: true
        });

        const result = {
            total,
            count: rows.length,
            data: rows
        }

        return result
    }
    public static async getFunctionByRole(id: any) {
        return await db.query(`SELECT rf."FunctionId"
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where r.id = ${id}`, { type: QueryTypes.SELECT })
    }
    public static async getFunctionByRoleComplete(id: any) {
        return await db.query(`SELECT *
        FROM public."RoleFunctions" rf 
        inner join public."Roles" r on r.id = rf."RoleId"
        where r.id = ${id}`, { type: QueryTypes.SELECT })
    }

    public static createRole(data: any) {
        db.transaction(async transaction => {
            Role.create(data, { transaction }).then(async (r: any) => {
                const roles = await RoleFunction.findAll({ where: { RoleId: r.id } })
                if (!roles) {
                    RoleFunction.create(data.functions, { transaction }).then();
                } else {
                    RoleFunction.destroy({ where: { RoleId: r.id }, transaction }).then((d: any) => {
                        RoleFunction.create(data.functions, { transaction }).then();
                    });
                }

            });

        });
    }
    public static async getRole(id: any) {
        const role = Role.findOne({
            where: { id: id },
            order: [
                ['id', 'asc']
            ]
        });
        if (!role) {
            console.error('Error')
        }
        return await role;
    }
    public static async updateRole(id: any, data: any) {
        db.transaction(async transaction => {
            Role.update(id, data).then(async (r: any) => {
                const roles = await RoleFunction.findAll({ where: { RoleId: r.id } })
                if (!roles) {
                    RoleFunction.create(data.functions, { transaction }).then();
                } else {
                    RoleFunction.destroy({ where: { RoleId: r.id }, transaction }).then((d: any) => {
                        RoleFunction.create(data.functions, { transaction }).then();
                    });
                }

            });

        });
    }
}
export default RoleServicios;