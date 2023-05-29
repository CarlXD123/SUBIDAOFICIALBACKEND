import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type RoleFunctionAtributos = {
    canView: boolean,
    canEdit: boolean,
    canDelete: boolean,
    canCreate: boolean,
    FunctionId: number,
    RoleId: number
}
type RoleFunctionCreateAtributos = Optional<RoleFunctionAtributos, 'RoleId'>;
const RoleFunction: ModelDefined<RoleFunctionAtributos, RoleFunctionCreateAtributos> = db.define("RoleFunctions", {
    canView: { type: DataTypes.BOOLEAN, defaultValue: true },
    canEdit: { type: DataTypes.BOOLEAN, defaultValue: true },
    canDelete: { type: DataTypes.BOOLEAN, defaultValue: true },
    canCreate: { type: DataTypes.BOOLEAN, defaultValue: true },
});
export default RoleFunction;