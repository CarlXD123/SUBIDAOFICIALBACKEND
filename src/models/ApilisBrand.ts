import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ApilisBrandAtributos = {
    id: number,
    nameBrand: string,
    Descr: string,
    codBaja: number,
    Color: string,
}
type ApilisBrandCreateAtributos = Optional<ApilisBrandAtributos, 'id'>;
const ApilisBrand: ModelDefined<ApilisBrandAtributos, ApilisBrandCreateAtributos> = db.define("ApilisBrands", {
    nameBrand: DataTypes.STRING,
    Descr: DataTypes.STRING,
    codBaja: DataTypes.INTEGER,
    Color: DataTypes.STRING,
})
export default ApilisBrand;