import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type NationAtributos = {
    id: number,
    name: string,
    description: string
}
type NationCreateAtributos = Optional<NationAtributos, 'id'>;
const Nation: ModelDefined<NationAtributos, NationCreateAtributos> = db.define("Nations", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
export default Nation;