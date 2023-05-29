import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type RoleAtributos = {
    id: number,
    name: string,
    description: string,
    status: string
}
type RoleCreateAtributos = Optional<RoleAtributos, 'id'>;
const Role: ModelDefined<RoleAtributos, RoleCreateAtributos> = db.define("Roles", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
}, {
    getterMethods: {
        roleStr() {
            const id = this.getDataValue('id');
            return id === 3 ? 'client' : 'employee';
        }
    }
});
export default Role;