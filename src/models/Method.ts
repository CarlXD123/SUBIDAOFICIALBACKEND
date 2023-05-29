import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type MethodAtributos = {
    id: number,
    name: string,
    description: string
}
type MethodCreateAtributos = Optional<MethodAtributos, 'id'>;
const Method: ModelDefined<MethodAtributos, MethodCreateAtributos> = db.define("Methods", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
export default Method;