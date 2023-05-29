import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type TypeEmployeeAtributos = {
    id: number,
    name: string,
    description: string
}
type TypeEmployeeCreateAtributos = Optional<TypeEmployeeAtributos, 'id'>;
const TypeEmployee: ModelDefined<TypeEmployeeAtributos, TypeEmployeeCreateAtributos> = db.define("TypeEmployees", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
TypeEmployee.addScope('defaultScope', {
    order: [['id', 'ASC']],
}, { override: true })

export default TypeEmployee;
