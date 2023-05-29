import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
export type ProvinceAtributos = {
    id: string,
    name: string,
    RegionId: string
}
type ProvinceCreateAtributos = Optional<ProvinceAtributos, 'id'>;
const Province: ModelDefined<ProvinceAtributos, ProvinceCreateAtributos> = db.define("Provinces", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    RegionId: DataTypes.STRING
})
//Province.belongsTo(Region,{foreignKey:'RegionId'})
//Province.hasMany(District,{as:'Districts',foreignKey:'ProvinceId'})

Province.addScope('defaultScope', {
    order: [['name', 'ASC']],
}, { override: true })
export default Province;