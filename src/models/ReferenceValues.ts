
import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ReferenceValuesAtributos = {
    id: number,
    name: string,
    unit: string
}
type ReferenceValuesCreateAtributos = Optional<ReferenceValuesAtributos, 'id'>;
const ReferenceValues: ModelDefined<ReferenceValuesAtributos, ReferenceValuesCreateAtributos> = db.define("ReferenceValues", {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
})
ReferenceValues.addScope(
    "defaultScope",
    {
        order: [["name", "ASC"]],
    },
    { override: true }
);

export default ReferenceValues;