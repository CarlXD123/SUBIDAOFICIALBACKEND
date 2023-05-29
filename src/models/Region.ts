import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type RegionAtributos = {
    id: string,
    name: string

}
type RegionCreateAtributos = Optional<RegionAtributos, 'id'>;
const Region: ModelDefined<RegionAtributos, RegionCreateAtributos> = db.define("Regions", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
})
//Region.hasMany(Province,{as:'Provinces', foreignKey:'RegionId'})
Region.addScope('defaultScope', {
    order: [['name', 'ASC']],
}, { override: true })
export default Region;