import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type AmbAtributos = {
    id: number,
    name: string,
    description: string
}
type AmbCreateAtributos = Optional<AmbAtributos, 'id'>;
const Amb: ModelDefined<AmbAtributos, AmbCreateAtributos> = db.define("Ambs", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
export default Amb;