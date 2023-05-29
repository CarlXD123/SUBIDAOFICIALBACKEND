import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ExaminationReferenceValueAtributos = {
    id: number,
    name: string,
    ExaminationValueId: number,
    ExaminationId: number
}
type ExaminationReferenceValueCreateAtributos = Optional<ExaminationReferenceValueAtributos, 'id'>;
const ExaminationReferenceValue: ModelDefined<ExaminationReferenceValueAtributos, ExaminationReferenceValueCreateAtributos> = db.define("ExaminationReferenceValues", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    ExaminationValueId:DataTypes.INTEGER,
    ExaminationId:DataTypes.INTEGER
})
ExaminationReferenceValue.addScope(
    "defaultScope",
    {
        order: [["id", "ASC"]]
    },
    { override: true }
);
export default ExaminationReferenceValue;