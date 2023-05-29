import { DataTypes, ModelDefined, Optional } from "sequelize";
import db from "../config/config.database";

export type HeadquarterAtributos = {
    id:number,
    name:string,
    address:string,
    tlfNumber:string,
    email:string,
    urlImage:string
}
type HeadquarterCreateAtributos=Optional<HeadquarterAtributos,'id'>;
const Headquarter:ModelDefined<HeadquarterAtributos,HeadquarterCreateAtributos>=db.define("Headquarters",{
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    urlImage: {
      type: DataTypes.STRING(2000),
      defaultValue: `localhost:3000/public/imgs/headquarter/dark-material-bg.jpg`
    }
})
Headquarter.addScope('defaultScope',{
  order: [['id', 'ASC']]
}, { override: true })
export default Headquarter;
