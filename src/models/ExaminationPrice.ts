import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
import Examination from "./Examination";
import PriceList from "./PriceList";

export type ExaminationPriceAtributos = {
    price: number,
    ExaminationId: number,
    PriceListId: number
}
type ExaminationPriceCreateAtributos = Optional<ExaminationPriceAtributos, 'price'>;
const ExaminationPrice: ModelDefined<ExaminationPriceAtributos, ExaminationPriceCreateAtributos> = db.define("ExaminationPrices", {
    price: DataTypes.FLOAT,
    ExaminationId: DataTypes.INTEGER,
    PriceListId: DataTypes.INTEGER
})
//ExaminationPrice.belongsTo(PriceList);
//ExaminationPrice.belongsTo(Examination);
export default ExaminationPrice;