import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ExaminationAtributos = {
    examinationGroups: any;
    id: number,
    name: string,
    code: string,
    indications: string,
    typeSample: string,
    volume: string,
    supplies: string,
    storageTemperature: string,
    fastingConditions: string,
    runFrequency: string,
    processTime: string,
    reportTime: string,
    countEG: string,
    status: string,
    appointmentDetailId :string
    ServiceId :number
}
type ExaminationCreateAtributos = Optional<ExaminationAtributos, 'id'>;
const Examination: ModelDefined<ExaminationAtributos, ExaminationCreateAtributos> = db.define("Examinations", {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    indications: DataTypes.STRING(3000),
    typeSample: DataTypes.STRING,
    volume: DataTypes.STRING,
    supplies: DataTypes.STRING,
    storageTemperature: DataTypes.STRING,
    fastingConditions: DataTypes.STRING,
    runFrequency: DataTypes.STRING,
    processTime: DataTypes.STRING,
    reportTime: DataTypes.STRING,
    countEG: DataTypes.STRING,
    status: {
        defaultValue: "A",
        type: DataTypes.STRING(1),
    },
    ServiceId:DataTypes.INTEGER
})
//ExaminationPrice.belongsTo(PriceList);
//ExaminationPrice.belongsTo(Examination);

Examination.addScope(
    "defaultScope",
    {
        where: { status: "A" },
    },
    { override: true }
);
export default Examination;