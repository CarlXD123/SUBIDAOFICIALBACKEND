import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ExaminationValueAtributos = {
    id: number,
    name: string,
    countVR: number,
    status: string,
    ExaminationGroupId: number,
    MethodId: number,
    UnitId: number,
    countVR2: string,
}
type ExaminationValueCreateAtributos = Optional<ExaminationValueAtributos, 'id'>;
const ExaminationValue: ModelDefined<ExaminationValueAtributos, ExaminationValueCreateAtributos> = db.define("ExaminationValues", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    countVR: DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: DataTypes.STRING(1),
    },
    ExaminationGroupId: DataTypes.INTEGER,
    MethodId: DataTypes.INTEGER,
    UnitId: DataTypes.INTEGER,
    countVR2: DataTypes.STRING,
})
ExaminationValue.addScope(
    "defaultScope",
    {
        order: [["id", "ASC"]],
        where: { status: "A" },
    },
    { override: true }
);
export default ExaminationValue;