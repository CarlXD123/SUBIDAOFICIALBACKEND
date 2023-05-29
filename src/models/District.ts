import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";
import Client from "./Client";
import Employee from "./Employee";
export type DistrictAtributos = {
    id: string,
    name: string,
    ProvinceId: string,
}
type DistrictCreateAtributos = Optional<DistrictAtributos, 'id'>;
const District: ModelDefined<DistrictAtributos, DistrictCreateAtributos> = db.define("Districts", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    ProvinceId: DataTypes.STRING,
})
//District.belongsTo(Province,{foreignKey:'ProvinceId'})
District.hasMany(Employee)
District.hasMany(Client)

District.addScope('defaultScope', {
    order: [['name', 'ASC']],
}, { override: true })
export default District;