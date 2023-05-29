import { DataTypes, ModelDefined, Optional } from 'sequelize';
import db from '../config/config.database'
export type RefererAtributos = {
    id: number,
    refererName: string
}
type RefererCreationAtributos = Optional<RefererAtributos, 'id'>;

const Referer: ModelDefined<RefererAtributos, RefererCreationAtributos> = db.define("Referers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    refererName: {
        type: DataTypes.STRING,
    }

});

    //Referer.hasMany(models.Appointment);
export default Referer;