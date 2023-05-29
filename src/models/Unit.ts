import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type UnitAtributos = {
    id:number,
    name:string,
}
type UnitCreateAtributos=Optional<UnitAtributos,'id'>;
const Unit:ModelDefined<UnitAtributos,UnitCreateAtributos>=db.define("Units",{
    name: DataTypes.STRING
})
export default Unit;