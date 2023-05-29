import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type AgreementsAtributos = {
    id: number,
    name: string,
    address: string,
    ruc: string,
    email: string,
    tlfNumber: string,
    description: string,
    TypeAgreementId: number,
}
type AgreementCreateAtributos = Optional<AgreementsAtributos, 'id'>;
const Agreement: ModelDefined<AgreementsAtributos, AgreementCreateAtributos> = db.define("Agreements", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    ruc: DataTypes.STRING,
    email: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    TypeAgreementId: DataTypes.INTEGER,
})
Agreement.addScope('defaultScope', {
    order: [['id', 'desc']],
}, { override: true });
//Agreement.hasMany(PriceList);
//Agreement.belongsTo(TypeAgreement);
export default Agreement;

