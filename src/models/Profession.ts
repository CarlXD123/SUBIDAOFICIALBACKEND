import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";


export type ProfessionAtributos = {
    id:number,
    name:string,
    descriptioin:string
}
type ProfessionCreationAtributos= Optional<ProfessionAtributos,'id'>;
const Profession:ModelDefined<ProfessionAtributos,ProfessionCreationAtributos>= db.define("Professions",{
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000)
});

Profession.addScope('defaultScope', {
    order: [['id', 'ASC']],
}, { override: true })
export default Profession;
