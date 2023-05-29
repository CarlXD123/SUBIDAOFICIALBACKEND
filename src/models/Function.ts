import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type FunctionAtributos = {
    id: number,
    title: string,
    type: string,
    parent_id: number,
    url: string,
    icon: string
}
type FunctionCreateAtributos = Optional<FunctionAtributos, 'id'>;
const Function: ModelDefined<FunctionAtributos, FunctionCreateAtributos> = db.define("Functions", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    icon: DataTypes.STRING,
    typeApplication: {
        type: DataTypes.STRING(1),
        defaultValue: 'I'
    }
})

export default Function;