import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ApilisMatchDataDetailAtributos = {
    id: number,
    codBaja: number,
    idApilisMatchData: number,
    idExamenValue: number,
    fields: string,
    priority: number,
    createdBy: string,
    modifiedBy: string,
}
type ApilisMatchDataDetailCreateAtributos = Optional<ApilisMatchDataDetailAtributos, 'id'>;
const ApilisMatchDataDetail: ModelDefined<ApilisMatchDataDetailAtributos, ApilisMatchDataDetailCreateAtributos> = db.define("ApilisMatchDataDetails", {
    codBaja: DataTypes.INTEGER,
    idApilisMatchData: DataTypes.INTEGER,
    idExamenValue: DataTypes.INTEGER,
    fields: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING,
})
export default ApilisMatchDataDetail;