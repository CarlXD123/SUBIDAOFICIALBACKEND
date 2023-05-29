import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type TuitionAtributos = {
    id: number,
    name: string,
    description: string
}
type TuitionCreateAtributos = Optional<TuitionAtributos, 'id'>;
const Tuition: ModelDefined<TuitionAtributos, TuitionCreateAtributos> = db.define("Tuitions", {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000)
})
Tuition.addScope('defaultScope', {
    order: [['id', 'ASC']],
}, { override: true })
export default Tuition;