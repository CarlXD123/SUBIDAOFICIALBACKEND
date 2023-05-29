import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ApilisPathAtributos = {
    id: number,
    env: string,
    Api: string,
    codBaja: number,
    user: string,
    passw: string,
    idModel: number,
}
type ApilisPathCreateAtributos = Optional<ApilisPathAtributos, 'id'>;
const ApilisPath: ModelDefined<ApilisPathAtributos, ApilisPathCreateAtributos> = db.define("ApilisPaths", {
    env: DataTypes.STRING,
    Api: DataTypes.STRING,
    codBaja: DataTypes.INTEGER,
    user: DataTypes.STRING,
    passw: DataTypes.STRING,
    idModel: DataTypes.INTEGER,
})
export default ApilisPath;