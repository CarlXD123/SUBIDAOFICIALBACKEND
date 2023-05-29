import {DataTypes, ModelDefined, Optional} from 'sequelize'
import db from '../config/config.database';

export type DoctorsAtributos ={
    id:number,
    doctorName:string
}
type DoctorsCreationAtributos = Optional<DoctorsAtributos,'id'>;

const Doctors: ModelDefined<DoctorsAtributos,DoctorsCreationAtributos>=db.define("Doctors",{
    id: { 
        type:DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
      },
      doctorName: {
        type: DataTypes.STRING,
      }
});

export default Doctors;