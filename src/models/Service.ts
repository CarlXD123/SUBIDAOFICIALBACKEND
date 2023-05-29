import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type ServiceAtributos = {
    id: number,
    name: string,
    description: string
}
type ServiceCreateAtributos = Optional<ServiceAtributos, 'id'>;
const Service: ModelDefined<ServiceAtributos, ServiceCreateAtributos> = db.define("Services", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
})
export default Service;