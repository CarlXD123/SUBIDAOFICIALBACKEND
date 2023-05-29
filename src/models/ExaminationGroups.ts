import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ExaminationGroupsAtributos = {
    id: number,
    name: string,
    countEV: number,
    status: string,
    ExaminationId: number
}
type ExaminationGroupCreateAtributos = Optional<ExaminationGroupsAtributos, 'id'>;
const ExaminationGroup: ModelDefined<ExaminationGroupsAtributos, ExaminationGroupCreateAtributos> = db.define("ExaminationGroups", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    countEV: DataTypes.INTEGER,
    status: {
        defaultValue: "A",
        type: DataTypes.STRING(1),
    },
    ExaminationId:DataTypes.INTEGER
})

ExaminationGroup.addScope(
    "defaultScope",
    {
      where: { status: "A" },
    },
    { override: true }
  );
  export default ExaminationGroup;