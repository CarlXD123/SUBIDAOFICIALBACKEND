import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ApilisMatchDataAtributos = {
    id: number,
    codBaja: number,
    idExamen: number,
    idModel: number,
    Color: string,
    ColorAle: string,
}
type ApilisMatchDataCreateAtributos = Optional<ApilisMatchDataAtributos, 'id'>;
const ApilisMatchData: ModelDefined<ApilisMatchDataAtributos, ApilisMatchDataCreateAtributos> = db.define("ApilisMatchDatas", {
    codBaja: DataTypes.INTEGER,
    idExamen: DataTypes.INTEGER,
    idModel: DataTypes.INTEGER,
    Color: DataTypes.STRING,
    ColorAle: DataTypes.STRING,
})
export default ApilisMatchData;