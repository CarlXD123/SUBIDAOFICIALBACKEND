import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ApilisModelAtributos = {
    id: number,
    nameModel: string,
    codBaja: number,
    Color: string,
    idBrand: number,
}
type ApilisModelCreateAtributos = Optional<ApilisModelAtributos, 'id'>;
const ApilisModel: ModelDefined<ApilisModelAtributos, ApilisModelCreateAtributos> = db.define("ApilisModels", {
    nameModel: DataTypes.STRING,
    codBaja: DataTypes.INTEGER,
    Color: DataTypes.STRING,
    idBrand: DataTypes.INTEGER,
})
export default ApilisModel;