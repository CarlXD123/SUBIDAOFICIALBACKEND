import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
import Agreement from "./Agreements";

export type PriceListAtributos = {
    id: number,
    name: string,
    status: string,
    AgreementId:number
}
type PriceListCreateAtributos = Optional<PriceListAtributos, 'id'>;
const PriceList: ModelDefined<PriceListAtributos, PriceListCreateAtributos> = db.define("PriceLists", {
    name: DataTypes.STRING,
    status: {
        type: DataTypes.STRING(1),
        defaultValue: 'A'
    },
    AgreementId:DataTypes.NUMBER,
})
//PriceList.belongsTo(Agreement);
PriceList.addScope('defaultScope', {
    order: [['id', 'asc']],
}, { override: true })

export default PriceList;