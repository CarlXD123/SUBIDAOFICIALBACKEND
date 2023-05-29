import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type SpecialityAtributos = {
    id: number,
    name: string,
    description: string
}
type SpecialityCreateAtributos = Optional<SpecialityAtributos, 'id'>;
const Speciality: ModelDefined<SpecialityAtributos, SpecialityCreateAtributos> = db.define("Specialities", {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000)
})
Speciality.addScope('defaultScope', {
    order: [['id', 'ASC']],
}, { override: true })
export default Speciality;