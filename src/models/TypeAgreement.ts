import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type TypeAgreementAtributos = {
    id: number,
    name: string,
    description: string
}
type TypeAgreementCreateAtributos = Optional<TypeAgreementAtributos, 'id'>;
const TypeAgreement: ModelDefined<TypeAgreementAtributos, TypeAgreementCreateAtributos> = db.define("TypeAgreements", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})

export default TypeAgreement;